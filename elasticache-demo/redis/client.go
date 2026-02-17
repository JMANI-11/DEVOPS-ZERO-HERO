package redis

import (
	"context"
	"fmt"
	"redisapp/config"
	"time"

	"github.com/redis/go-redis/v9"
)

// Client wraps the Redis client
type Client struct {
	rdb *redis.Client
}

// NewClient creates a new Redis client
func NewClient(cfg *config.Config) (*Client, error) {
	var options *redis.Options
	
	if cfg.Redis.URL != "" {
		// Parse options from URL if provided
		opt, err := redis.ParseURL(cfg.Redis.URL)
		if err != nil {
			return nil, fmt.Errorf("error parsing Redis URL: %w", err)
		}
		options = opt
	} else {
		// Use individual configuration parameters
		options = &redis.Options{
			Addr:         fmt.Sprintf("%s:%s", cfg.Redis.Host, cfg.Redis.Port),
			Password:     cfg.Redis.Password,
			DB:           cfg.Redis.DB,
			PoolSize:     cfg.Redis.PoolSize,
			DialTimeout:  cfg.Redis.DialTimeout,
			ReadTimeout:  cfg.Redis.ReadTimeout,
			WriteTimeout: cfg.Redis.WriteTimeout,
			MinIdleConns: 5,
			MaxRetries:   3,
			PoolTimeout:  4 * time.Second,
		}
	}

	rdb := redis.NewClient(options)
	return &Client{rdb: rdb}, nil
}

// Ping checks the connection to Redis
func (c *Client) Ping(ctx context.Context) error {
	_, err := c.rdb.Ping(ctx).Result()
	return err
}

// Close closes the Redis client connection
func (c *Client) Close() error {
	return c.rdb.Close()
}

// GetClient returns the underlying Redis client
func (c *Client) GetClient() *redis.Client {
	return c.rdb
}