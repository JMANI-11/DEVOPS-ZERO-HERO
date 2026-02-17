# HTTP Status Codes

## 200 OK
- **Meaning**: The request has succeeded.
- **Usage**: The server returns this status code when the request was successfully processed and a valid response is available. The response will vary based on the HTTP method used. For example, in a `GET` request, the response body contains the requested resource; in a `POST` request, it may contain a confirmation message or the resource created.
- **Example**: A successful API call to retrieve user data might return a `200 OK` status along with the user's information in JSON format.

## 201 Created
- **Meaning**: The request has been fulfilled, and a new resource has been created as a result.
- **Usage**: This status code is typically returned in response to a `POST` request when a new resource has been created on the server. The response usually includes a `Location` header containing the URL of the newly created resource.
- **Example**: When a new user is registered through an API, the server returns a `201 Created` status along with the user’s details.

## 204 No Content
- **Meaning**: The server has successfully processed the request, but is not returning any content.
- **Usage**: This status code indicates that the server processed the request successfully, but there is no content to send back. It’s often used in response to `DELETE` requests or when a `PUT` request updates a resource without returning any information.
- **Example**: After successfully deleting a resource, the server may respond with a `204 No Content` status.

## 301 Moved Permanently
- **Meaning**: The requested resource has been permanently moved to a new URL.
- **Usage**: This status code indicates that the resource has been moved permanently to a new location specified by the `Location` header. Clients should update their bookmarks and links to the new URL.
- **Example**: A website might change its URL structure, causing an old URL to return a `301 Moved Permanently` status, redirecting users to the new URL.

## 302 Found
- **Meaning**: The requested resource is temporarily located at a different URL.
- **Usage**: This status code indicates that the resource is temporarily available at a different location specified by the `Location` header. Clients are expected to use the original URL for future requests.
- **Example**: A web application might redirect users to a maintenance page temporarily, using a `302 Found` status to indicate the temporary change.

## 400 Bad Request
- **Meaning**: The server cannot process the request due to a client error (e.g., malformed request syntax).
- **Usage**: This status code is returned when the server cannot understand the request due to invalid syntax or parameters. It signifies that the client needs to modify the request before retrying.
- **Example**: Sending a malformed JSON payload in a `POST` request may result in a `400 Bad Request` response.

## 401 Unauthorized
- **Meaning**: Authentication is required and has failed or has not yet been provided.
- **Usage**: This status code indicates that the request requires user authentication. It is commonly used in scenarios where API access requires authentication tokens or credentials.
- **Example**: If a user attempts to access a protected resource without providing valid credentials, the server responds with a `401 Unauthorized` status.

## 403 Forbidden
- **Meaning**: The server understands the request but refuses to authorize it.
- **Usage**: This status code indicates that the server has determined that the client does not have permission to access the requested resource. Unlike a `401 Unauthorized` response, which indicates that authentication is required, a `403 Forbidden` response indicates that the server has rejected the request regardless of authentication.
- **Example**: A user attempting to access an admin panel without the necessary privileges may receive a `403 Forbidden` status, indicating they are not allowed to view that resource.

## 404 Not Found
- **Meaning**: The requested resource could not be found on the server.
- **Usage**: This status code is returned when the server cannot find the requested resource. It may indicate that the resource has been deleted or that the URL was incorrect.
- **Example**: A user trying to access a non-existent webpage will receive a `404 Not Found` response.

## 500 Internal Server Error
- **Meaning**: A generic error message indicating that the server encountered an unexpected condition.
- **Usage**: This status code is returned when the server encounters an unexpected condition that prevents it from fulfilling the request. It does not provide specific details about the error.
- **Example**: A bug in the server code or an unhandled exception may trigger a `500 Internal Server Error` response.

## 502 Bad Gateway
- **Meaning**: The server was acting as a gateway or proxy and received an invalid response from the upstream server.
- **Usage**: This status code indicates that the server, while acting as a gateway or proxy, received an invalid response from the upstream server it accessed in attempting to fulfill the request.
- **Example**: If a server is set up to proxy requests to another server and that upstream server is down or returns an error, the client may receive a `502 Bad Gateway` response.
