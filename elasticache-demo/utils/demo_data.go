package utils

import (
	"fmt"
	"math/rand"
	"redisapp/models"
	"time"
)

// DemoDataGenerator generates sample data for demos
type DemoDataGenerator struct {
	rand *rand.Rand
}

// NewDemoDataGenerator creates a new demo data generator
func NewDemoDataGenerator() *DemoDataGenerator {
	return &DemoDataGenerator{
		rand: rand.New(rand.NewSource(time.Now().UnixNano())),
	}
}

// GenerateUsers generates a list of sample users
func (g *DemoDataGenerator) GenerateUsers(count int) []models.User {
	users := make([]models.User, count)
	
	firstNames := []string{"John", "Jane", "Michael", "Emily", "David", "Sarah", "Robert", "Lisa"}
	lastNames := []string{"Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Wilson"}
	
	for i := 0; i < count; i++ {
		firstName := firstNames[g.rand.Intn(len(firstNames))]
		lastName := lastNames[g.rand.Intn(len(lastNames))]
		
		users[i] = models.User{
			ID:        fmt.Sprintf("user_%d", i+1),
			FirstName: firstName,
			LastName:  lastName,
			Email:     fmt.Sprintf("%s.%s@example.com", firstName, lastName),
			CreatedAt: time.Now().Add(-time.Duration(g.rand.Intn(90)) * 24 * time.Hour),
		}
	}
	
	return users
}

// GenerateProducts generates a list of sample products
func (g *DemoDataGenerator) GenerateProducts(count int) []models.Product {
	products := make([]models.Product, count)
	
	categories := []string{"Electronics", "Clothing", "Books", "Home", "Sports"}
	productNames := []string{
		"Wireless Headphones", "Smart Watch", "Laptop", "Smartphone", "Tablet",
		"T-Shirt", "Jeans", "Jacket", "Dress", "Shoes",
		"Fiction Novel", "Cookbook", "Biography", "Self-Help Book", "Technical Manual",
		"Coffee Maker", "Blender", "Toaster", "Microwave", "Vacuum Cleaner",
		"Tennis Racket", "Basketball", "Yoga Mat", "Dumbbells", "Bicycle",
	}
	
	for i := 0; i < count; i++ {
		category := categories[g.rand.Intn(len(categories))]
		name := productNames[g.rand.Intn(len(productNames))]
		
		now := time.Now()
		created := now.Add(-time.Duration(g.rand.Intn(180)) * 24 * time.Hour)
		updated := created.Add(time.Duration(g.rand.Intn(int(now.Sub(created)/time.Hour))) * time.Hour)
		
		products[i] = models.Product{
			ID:          fmt.Sprintf("prod_%d", i+1),
			Name:        name,
			Description: fmt.Sprintf("This is a %s in the %s category", name, category),
			Price:       float64(g.rand.Intn(10000)) / 100.0,
			Category:    category,
			InStock:     g.rand.Intn(10) > 2, // 80% chance to be in stock
			CreatedAt:   created,
			UpdatedAt:   updated,
		}
	}
	
	return products
}

// GenerateOrders generates a list of sample orders
func (g *DemoDataGenerator) GenerateOrders(users []models.User, products []models.Product, count int) []models.Order {
	orders := make([]models.Order, count)
	
	statuses := []string{"pending", "processing", "shipped", "delivered", "canceled"}
	
	for i := 0; i < count; i++ {
		user := users[g.rand.Intn(len(users))]
		
		// Generate between 1 and 5 items per order
		itemCount := g.rand.Intn(5) + 1
		items := make([]models.OrderItem, itemCount)
		
		var totalAmount float64
		
		// Select random products for the order
		selectedProducts := g.PickRandomProducts(products, itemCount)
		
		for j := 0; j < itemCount; j++ {
			product := selectedProducts[j]
			quantity := g.rand.Int63n(3) + 1
			
			item := models.OrderItem{
				ProductID:   product.ID,
				ProductName: product.Name,
				Quantity:    quantity,
				UnitPrice:   product.Price,
				TotalPrice:  float64(quantity) * product.Price,
			}
			
			items[j] = item
			totalAmount += item.TotalPrice
		}
		
		now := time.Now()
		created := now.Add(-time.Duration(g.rand.Intn(90)) * 24 * time.Hour)
		updated := created.Add(time.Duration(g.rand.Intn(int(now.Sub(created)/time.Hour))) * time.Hour)
		
		orders[i] = models.Order{
			ID:          fmt.Sprintf("order_%d", i+1),
			UserID:      user.ID,
			Items:       items,
			TotalAmount: totalAmount,
			Status:      statuses[g.rand.Intn(len(statuses))],
			CreatedAt:   created,
			UpdatedAt:   updated,
		}
	}
	
	return orders
}

// PickRandomProducts picks n random products from the provided slice
func (g *DemoDataGenerator) PickRandomProducts(products []models.Product, n int) []models.Product {
	if n > len(products) {
		n = len(products)
	}
	
	// Create a copy of products to avoid modifying the original
	productsCopy := make([]models.Product, len(products))
	copy(productsCopy, products)
	
	// Shuffle the products
	g.rand.Shuffle(len(productsCopy), func(i, j int) {
		productsCopy[i], productsCopy[j] = productsCopy[j], productsCopy[i]
	})
	
	// Return the first n products
	return productsCopy[:n]
}

// PickRandom picks n random items from the provided slice
func (g *DemoDataGenerator) PickRandom(items []string, n int) []string {
	if n > len(items) {
		n = len(items)
	}
	
	// Create a copy of items to avoid modifying the original
	itemsCopy := make([]string, len(items))
	copy(itemsCopy, items)
	
	// Shuffle the items
	g.rand.Shuffle(len(itemsCopy), func(i, j int) {
		itemsCopy[i], itemsCopy[j] = itemsCopy[j], itemsCopy[i]
	})
	
	// Return the first n items
	return itemsCopy[:n]
}