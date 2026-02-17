package models

import (
	"time"
)

// User represents a user in the system
type User struct {
	ID        string    `json:"id"`
	FirstName string    `json:"first_name"`
	LastName  string    `json:"last_name"`
	Email     string    `json:"email"`
	CreatedAt time.Time `json:"created_at"`
}

// Product represents a product in the system
type Product struct {
	ID          string    `json:"id"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Price       float64   `json:"price"`
	Category    string    `json:"category"`
	InStock     bool      `json:"in_stock"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

// OrderItem represents an item in an order
type OrderItem struct {
	ProductID   string  `json:"product_id"`
	ProductName string  `json:"product_name"`
	Quantity    int64   `json:"quantity"`
	UnitPrice   float64 `json:"unit_price"`
	TotalPrice  float64 `json:"total_price"`
}

// Order represents an order in the system
type Order struct {
	ID          string      `json:"id"`
	UserID      string      `json:"user_id"`
	Items       []OrderItem `json:"items"`
	TotalAmount float64     `json:"total_amount"`
	Status      string      `json:"status"`
	CreatedAt   time.Time   `json:"created_at"`
	UpdatedAt   time.Time   `json:"updated_at"`
}

// Session represents a user session
type Session struct {
	ID        string    `json:"id"`
	UserID    string    `json:"user_id"`
	IP        string    `json:"ip"`
	UserAgent string    `json:"user_agent"`
	CreatedAt time.Time `json:"created_at"`
	ExpiresAt time.Time `json:"expires_at"`
}

// CartItem represents an item in a user's shopping cart
type CartItem struct {
	ProductID   string  `json:"product_id"`
	ProductName string  `json:"product_name"`
	Quantity    int64   `json:"quantity"`
	UnitPrice   float64 `json:"unit_price"`
	TotalPrice  float64 `json:"total_price"`
}

// Cart represents a user's shopping cart
type Cart struct {
	UserID      string     `json:"user_id"`
	Items       []CartItem `json:"items"`
	TotalAmount float64    `json:"total_amount"`
	UpdatedAt   time.Time  `json:"updated_at"`
}