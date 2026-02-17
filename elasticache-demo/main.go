package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"os/signal"
	"redisapp/config"
	"redisapp/models"
	"redisapp/redis"
	"redisapp/utils"
	"syscall"
	"time"
)

func main() {
	// Setup logger
	logger := log.New(os.Stdout, "[REDIS-APP] ", log.LstdFlags)
	logger.Println("Starting Redis application...")

	// Initialize configuration
	cfg, err := config.Load()
	if err != nil {
		logger.Fatalf("Failed to load configuration: %v", err)
	}

	// Create a context that we can cancel
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	// Create Redis client
	redisClient, err := redis.NewClient(cfg)
	if err != nil {
		logger.Fatalf("Failed to create Redis client: %v", err)
	}
	defer redisClient.Close()

	// Check Redis connection
	if err := redisClient.Ping(ctx); err != nil {
		logger.Fatalf("Failed to ping Redis: %v", err)
	}
	logger.Println("Successfully connected to Redis!")

	// Initialize operations handler
	ops := redis.NewOperations(redisClient, logger)

	// Setup a channel to handle graceful shutdown
	shutdown := make(chan os.Signal, 1)
	signal.Notify(shutdown, os.Interrupt, syscall.SIGTERM)

	// Create a demo data generator
	demoData := utils.NewDemoDataGenerator()

	// Start subscription handler in a goroutine
	go func() {
		if err := ops.SubscribeToChannel(ctx, "notifications"); err != nil {
			logger.Printf("Subscription error: %v", err)
		}
	}()

	// Delay to ensure subscription is setup
	time.Sleep(500 * time.Millisecond)

	// Run demo operations
	logger.Println("Running demo operations...")
	runDemoOperations(ctx, ops, demoData, logger)

	// Wait for shutdown signal
	<-shutdown
	logger.Println("Shutting down...")

	// Create a context with timeout for shutdown
	shutdownCtx, shutdownCancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer shutdownCancel()

	// Perform cleanup
	if err := ops.Cleanup(shutdownCtx); err != nil {
		logger.Printf("Error during cleanup: %v", err)
	}

	logger.Println("Application terminated")
}

func runDemoOperations(ctx context.Context, ops *redis.Operations, demoData *utils.DemoDataGenerator, logger *log.Logger) {
	// Generate sample data
	users := demoData.GenerateUsers(5)
	products := demoData.GenerateProducts(10)
	orders := demoData.GenerateOrders(users, products, 20)

	// Demonstrate string operations
	logger.Println("==== String Operations ====")
	for _, product := range products {
		if err := ops.SetProduct(ctx, product); err != nil {
			logger.Printf("Failed to set product: %v", err)
			continue
		}
	}

	// Fetch a product
	product, err := ops.GetProduct(ctx, products[0].ID)
	if err != nil {
		logger.Printf("Failed to get product: %v", err)
	} else {
		logger.Printf("Retrieved product: %s - $%.2f", product.Name, product.Price)
	}

	// Demonstrate hash operations
	logger.Println("\n==== Hash Operations ====")
	for _, user := range users {
		if err := ops.SetUserProfile(ctx, user); err != nil {
			logger.Printf("Failed to set user profile: %v", err)
			continue
		}
	}

	// Fetch user profiles
	for _, user := range users[:2] {
		fetchedUser, err := ops.GetUserProfile(ctx, user.ID)
		if err != nil {
			logger.Printf("Failed to get user profile: %v", err)
		} else {
			logger.Printf("Retrieved user: %s %s (%s)", fetchedUser.FirstName, fetchedUser.LastName, fetchedUser.Email)
		}
	}

	// Demonstrate list operations
	logger.Println("\n==== List Operations ====")
	for _, user := range users[:2] {
		userOrders := filterOrdersByUser(orders, user.ID)
		if err := ops.AddOrdersToHistory(ctx, user.ID, userOrders); err != nil {
			logger.Printf("Failed to add orders to history: %v", err)
			continue
		}

		// Get order history
		orderHistory, err := ops.GetOrderHistory(ctx, user.ID, 0, 10)
		if err != nil {
			logger.Printf("Failed to get order history: %v", err)
		} else {
			logger.Printf("User %s has %d orders in history", user.ID, len(orderHistory))
			for i, order := range orderHistory {
				logger.Printf("  Order %d: %s - $%.2f", i+1, order.ID, order.TotalAmount)
			}
		}
	}

	// Demonstrate set operations
	logger.Println("\n==== Set Operations ====")
	productIDs := make([]string, len(products))
	for i, p := range products {
		productIDs[i] = p.ID
	}

	// Track viewed products for users
	for _, user := range users[:3] {
		// Simulate user viewing 3 random products
		viewedProducts := demoData.PickRandom(productIDs, 3)
		if err := ops.TrackUserViewedProducts(ctx, user.ID, viewedProducts); err != nil {
			logger.Printf("Failed to track viewed products: %v", err)
			continue
		}

		// Get viewed products
		viewed, err := ops.GetUserViewedProducts(ctx, user.ID)
		if err != nil {
			logger.Printf("Failed to get viewed products: %v", err)
		} else {
			logger.Printf("User %s viewed %d products", user.ID, len(viewed))
			for i, id := range viewed {
				logger.Printf("  Product %d: %s", i+1, id)
			}
		}
	}

	// Demonstrate pub/sub operations
	logger.Println("\n==== Pub/Sub Operations ====")
	messages := []string{
		"New product added: Gaming Laptop",
		"Flash sale starting in 10 minutes!",
		"System maintenance scheduled for tonight",
	}

	for _, msg := range messages {
		if err := ops.PublishNotification(ctx, "notifications", msg); err != nil {
			logger.Printf("Failed to publish notification: %v", err)
		}
		// Small delay to see messages in order
		time.Sleep(500 * time.Millisecond)
	}

	// Demonstrate pipeline operations
	logger.Println("\n==== Pipeline Operations ====")
	if err := ops.BatchUpdateProducts(ctx, products); err != nil {
		logger.Printf("Failed to batch update products: %v", err)
	} else {
		logger.Printf("Successfully batch updated %d products", len(products))
	}

	// Demonstrate transaction operations
	logger.Println("\n==== Transaction Operations ====")
	if err := ops.ProcessOrderWithTransaction(ctx, orders[0]); err != nil {
		logger.Printf("Failed to process order with transaction: %v", err)
	} else {
		logger.Printf("Successfully processed order %s with transaction", orders[0].ID)
	}
}

func filterOrdersByUser(orders []models.Order, userID string) []models.Order {
	var result []models.Order
	for _, order := range orders {
		if order.UserID == userID {
			result = append(result, order)
		}
	}
	return result
}