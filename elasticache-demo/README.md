# Go Redis Application

This application demonstrates extensive Redis functionality using Go, supporting both standalone Redis and Amazon ElastiCache.

## Features

- String operations (products)
- Hash operations (user profiles)
- List operations (order history)
- Set operations (viewed products)
- Pub/Sub functionality (notifications)
- Pipeline operations
- Transaction support

## Configuration

The application can be configured using environment variables:

### Redis Connection

Use either a Redis URL or individual connection parameters:

```env
# Option 1: Redis URL (takes precedence if set)
REDIS_URL=redis://username:password@host:port/db

# Option 2: Individual parameters
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0
```

### Additional Redis Settings

```env
REDIS_POOL_SIZE=10
REDIS_DIAL_TIMEOUT=5s
REDIS_READ_TIMEOUT=3s
REDIS_WRITE_TIMEOUT=3s
```

## Running the Application

1. Ensure Redis is running and accessible
2. Set environment variables as needed
3. Run the application:
   ```bash
   npm start
   ```

## Demo Operations

The application demonstrates:
- Product management
- User profile handling
- Order processing
- Real-time notifications
- Batch operations
- Transaction handling

All operations are logged to the console for visibility.