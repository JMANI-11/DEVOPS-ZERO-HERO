package redis

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"redisapp/models"
	"time"

	"github.com/redis/go-redis/v9"
)

// Operations handles Redis operations
type Operations struct {
	client *Client
	logger *log.Logger
}

// NewOperations creates a new Operations instance
func NewOperations(client *Client, logger *log.Logger) *Operations {
	return &Operations{
		client: client,
		logger: logger,
	}
}

// ==== String Operations ====

// SetProduct sets a product in Redis with a key of product:ID
func (o *Operations) SetProduct(ctx context.Context, product models.Product) error {
	key := fmt.Sprintf("product:%s", product.ID)
	data, err := json.Marshal(product)
	if err != nil {
		return fmt.Errorf("error marshaling product: %w", err)
	}

	// Set with an expiration time
	cmd := o.client.GetClient().Set(ctx, key, data, 24*time.Hour)
	return cmd.Err()
}

// GetProduct retrieves a product from Redis
func (o *Operations) GetProduct(ctx context.Context, id string) (models.Product, error) {
	var product models.Product
	key := fmt.Sprintf("product:%s", id)

	data, err := o.client.GetClient().Get(ctx, key).Result()
	if err != nil {
		if err == redis.Nil {
			return product, fmt.Errorf("product not found")
		}
		return product, err
	}

	if err := json.Unmarshal([]byte(data), &product); err != nil {
		return product, fmt.Errorf("error unmarshaling product: %w", err)
	}

	return product, nil
}

// DeleteProduct removes a product from Redis
func (o *Operations) DeleteProduct(ctx context.Context, id string) error {
	key := fmt.Sprintf("product:%s", id)
	return o.client.GetClient().Del(ctx, key).Err()
}

// ==== Hash Operations ====

// SetUserProfile stores a user profile as a hash
func (o *Operations) SetUserProfile(ctx context.Context, user models.User) error {
	key := fmt.Sprintf("user:%s", user.ID)
	
	fields := map[string]interface{}{
		"id":         user.ID,
		"first_name": user.FirstName,
		"last_name":  user.LastName,
		"email":      user.Email,
		"created_at": user.CreatedAt.Format(time.RFC3339),
	}
	
	return o.client.GetClient().HSet(ctx, key, fields).Err()
}

// GetUserProfile retrieves a user profile from Redis
func (o *Operations) GetUserProfile(ctx context.Context, id string) (models.User, error) {
	var user models.User
	key := fmt.Sprintf("user:%s", id)
	
	fields, err := o.client.GetClient().HGetAll(ctx, key).Result()
	if err != nil {
		return user, err
	}
	
	if len(fields) == 0 {
		return user, fmt.Errorf("user not found")
	}
	
	user.ID = fields["id"]
	user.FirstName = fields["first_name"]
	user.LastName = fields["last_name"]
	user.Email = fields["email"]
	
	if createdAt, exists := fields["created_at"]; exists {
		if t, err := time.Parse(time.RFC3339, createdAt); err == nil {
			user.CreatedAt = t
		}
	}
	
	return user, nil
}

// ==== List Operations ====

// AddOrdersToHistory adds orders to a user's order history list
func (o *Operations) AddOrdersToHistory(ctx context.Context, userID string, orders []models.Order) error {
	key := fmt.Sprintf("user:%s:orders", userID)
	
	pipe := o.client.GetClient().Pipeline()
	for _, order := range orders {
		data, err := json.Marshal(order)
		if err != nil {
			return fmt.Errorf("error marshaling order: %w", err)
		}
		pipe.LPush(ctx, key, data)
	}
	
	// Execute pipeline
	_, err := pipe.Exec(ctx)
	if err != nil {
		return err
	}
	
	// Set expiration on the list
	return o.client.GetClient().Expire(ctx, key, 7*24*time.Hour).Err()
}

// GetOrderHistory retrieves a user's order history
func (o *Operations) GetOrderHistory(ctx context.Context, userID string, start, stop int64) ([]models.Order, error) {
	key := fmt.Sprintf("user:%s:orders", userID)
	
	data, err := o.client.GetClient().LRange(ctx, key, start, stop).Result()
	if err != nil {
		return nil, err
	}
	
	orders := make([]models.Order, 0, len(data))
	for _, item := range data {
		var order models.Order
		if err := json.Unmarshal([]byte(item), &order); err != nil {
			o.logger.Printf("Error unmarshaling order: %v", err)
			continue
		}
		orders = append(orders, order)
	}
	
	return orders, nil
}

// ==== Set Operations ====

// TrackUserViewedProducts tracks products viewed by a user using a set
func (o *Operations) TrackUserViewedProducts(ctx context.Context, userID string, productIDs []string) error {
	key := fmt.Sprintf("user:%s:viewed", userID)
	
	if len(productIDs) == 0 {
		return nil
	}
	
	// Convert slice of strings to slice of interfaces
	members := make([]interface{}, len(productIDs))
	for i, id := range productIDs {
		members[i] = id
	}
	
	// Add to set and set expiration
	pipe := o.client.GetClient().Pipeline()
	pipe.SAdd(ctx, key, members...)
	pipe.Expire(ctx, key, 30*24*time.Hour)
	
	_, err := pipe.Exec(ctx)
	return err
}

// GetUserViewedProducts gets the products viewed by a user
func (o *Operations) GetUserViewedProducts(ctx context.Context, userID string) ([]string, error) {
	key := fmt.Sprintf("user:%s:viewed", userID)
	return o.client.GetClient().SMembers(ctx, key).Result()
}

// ==== Pub/Sub Operations ====

// PublishNotification publishes a notification to a channel
func (o *Operations) PublishNotification(ctx context.Context, channel, message string) error {
	return o.client.GetClient().Publish(ctx, channel, message).Err()
}

// SubscribeToChannel subscribes to a Redis channel
func (o *Operations) SubscribeToChannel(ctx context.Context, channel string) error {
	pubsub := o.client.GetClient().Subscribe(ctx, channel)
	defer pubsub.Close()
	
	o.logger.Printf("Subscribed to channel: %s", channel)
	
	// Listen for messages in a loop
	ch := pubsub.Channel()
	for {
		select {
		case msg := <-ch:
			o.logger.Printf("Received message from %s: %s", msg.Channel, msg.Payload)
		case <-ctx.Done():
			o.logger.Println("Subscription canceled")
			return ctx.Err()
		}
	}
}

// ==== Pipeline Operations ====

// BatchUpdateProducts updates multiple products in a single pipeline
func (o *Operations) BatchUpdateProducts(ctx context.Context, products []models.Product) error {
	pipe := o.client.GetClient().Pipeline()
	
	for _, product := range products {
		key := fmt.Sprintf("product:%s", product.ID)
		data, err := json.Marshal(product)
		if err != nil {
			return fmt.Errorf("error marshaling product: %w", err)
		}
		pipe.Set(ctx, key, data, 24*time.Hour)
	}
	
	_, err := pipe.Exec(ctx)
	return err
}

// ==== Transaction Operations ====

// ProcessOrderWithTransaction processes an order using a Redis transaction
func (o *Operations) ProcessOrderWithTransaction(ctx context.Context, order models.Order) error {
	// Keys used in the transaction
	orderKey := fmt.Sprintf("order:%s", order.ID)
	userOrdersKey := fmt.Sprintf("user:%s:orders", order.UserID)
	
	// Start a Redis transaction (MULTI/EXEC)
	txf := func(tx *redis.Tx) error {
		// Get the latest order count
		orderCount, err := tx.Get(ctx, fmt.Sprintf("user:%s:order_count", order.UserID)).Int()
		if err != nil && err != redis.Nil {
			return err
		}
		
		// Increment order count
		orderCount++
		
		// Operations to perform in the transaction
		_, err = tx.TxPipelined(ctx, func(pipe redis.Pipeliner) error {
			// Store the order
			orderData, err := json.Marshal(order)
			if err != nil {
				return err
			}
			pipe.Set(ctx, orderKey, orderData, 7*24*time.Hour)
			
			// Add to user's order list
			pipe.LPush(ctx, userOrdersKey, orderData)
			
			// Update order count
			pipe.Set(ctx, fmt.Sprintf("user:%s:order_count", order.UserID), orderCount, 0)
			
			// Update inventory (simulate)
			for _, item := range order.Items {
				pipe.HIncrBy(ctx, fmt.Sprintf("inventory:%s", item.ProductID), "quantity", -item.Quantity)
			}
			
			return nil
		})
		
		return err
	}
	
	// Execute the transaction with optimistic locking
	return o.client.GetClient().Watch(ctx, txf, orderKey)
}

// Cleanup performs any necessary cleanup before application shutdown
func (o *Operations) Cleanup(ctx context.Context) error {
	o.logger.Println("Performing Redis cleanup...")
	// No specific cleanup needed for this demo, but in a real application
	// you might want to close connections, release resources, etc.
	return nil
}