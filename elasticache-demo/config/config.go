package config

import (
	"errors"
	"os"
	"strconv"
	"time"
)

// Config holds the application configuration
type Config struct {
	Redis RedisConfig
}

// RedisConfig holds Redis-specific configuration
type RedisConfig struct {
	URL          string
	Host         string
	Port         string
	Password     string
	DB           int
	PoolSize     int
	DialTimeout  time.Duration
	ReadTimeout  time.Duration
	WriteTimeout time.Duration
}

// Load loads configuration from environment variables
// or uses sensible defaults
func Load() (*Config, error) {
	redisURL := getEnv("REDIS_URL", "")
	redisHost := getEnv("REDIS_HOST", "localhost")
	redisPort := getEnv("REDIS_PORT", "6379")
	redisPassword := getEnv("REDIS_PASSWORD", "")
	
	redisDB, err := strconv.Atoi(getEnv("REDIS_DB", "0"))
	if err != nil {
		return nil, errors.New("invalid REDIS_DB value")
	}
	
	redisPoolSize, err := strconv.Atoi(getEnv("REDIS_POOL_SIZE", "10"))
	if err != nil {
		return nil, errors.New("invalid REDIS_POOL_SIZE value")
	}
	
	dialTimeout, err := time.ParseDuration(getEnv("REDIS_DIAL_TIMEOUT", "5s"))
	if err != nil {
		return nil, errors.New("invalid REDIS_DIAL_TIMEOUT value")
	}
	
	readTimeout, err := time.ParseDuration(getEnv("REDIS_READ_TIMEOUT", "3s"))
	if err != nil {
		return nil, errors.New("invalid REDIS_READ_TIMEOUT value")
	}
	
	writeTimeout, err := time.ParseDuration(getEnv("REDIS_WRITE_TIMEOUT", "3s"))
	if err != nil {
		return nil, errors.New("invalid REDIS_WRITE_TIMEOUT value")
	}
	
	return &Config{
		Redis: RedisConfig{
			URL:          redisURL,
			Host:         redisHost,
			Port:         redisPort,
			Password:     redisPassword,
			DB:           redisDB,
			PoolSize:     redisPoolSize,
			DialTimeout:  dialTimeout,
			ReadTimeout:  readTimeout,
			WriteTimeout: writeTimeout,
		},
	}, nil
}

// getEnv retrieves an environment variable or returns a default value
func getEnv(key, defaultValue string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return defaultValue
}