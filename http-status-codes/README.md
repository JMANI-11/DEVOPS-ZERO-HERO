# HTTP Status Codes

## 1. Informational Responses (100–199)

- **100 Continue**: The initial part of a request has been received and the client can continue with the request.
- **101 Switching Protocols**: The server is switching protocols as requested by the client.
- **102 Processing**: The server has received and is processing the request, but no response is available yet (WebDAV).

## 2. Successful Responses (200–299)

- **200 OK**: The request has succeeded. The meaning of the success depends on the HTTP method used.
- **201 Created**: The request has succeeded and a new resource has been created as a result.
- **202 Accepted**: The request has been accepted for processing, but the processing is not complete.
- **203 Non-Authoritative Information**: The server successfully processed the request, but is returning information that may be from another source.
- **204 No Content**: The server successfully processed the request, but is not returning any content.
- **205 Reset Content**: The server successfully processed the request, and is asking the client to reset the document view.
- **206 Partial Content**: The server is delivering only part of the resource due to a range header sent by the client.

## 3. Redirection Messages (300–399)

- **300 Multiple Choices**: The request has more than one possible response, and the user or user agent should choose one.
- **301 Moved Permanently**: The requested resource has been permanently moved to a new URL.
- **302 Found**: The requested resource is temporarily located at a different URL, as specified in the Location header.
- **303 See Other**: The response to the request can be found at another URI using a GET method.
- **304 Not Modified**: The resource has not been modified since the last request, and the client can use the cached version.
- **305 Use Proxy**: The requested resource must be accessed through the specified proxy.
- **307 Temporary Redirect**: The requested resource is temporarily located at a different URL, and the client should use the original method for the next request.
- **308 Permanent Redirect**: The requested resource has been permanently moved, and future requests should use the new URL provided (similar to 301 but for methods that are not allowed to change).

## 4. Client Error Responses (400–499)

- **400 Bad Request**: The server cannot process the request due to a client error (e.g., malformed request syntax).
- **401 Unauthorized**: Authentication is required and has failed or has not yet been provided.
- **402 Payment Required**: Reserved for future use, but it is not widely used.
- **403 Forbidden**: The server understands the request but refuses to authorize it.
- **404 Not Found**: The requested resource could not be found on the server.
- **405 Method Not Allowed**: The request method is not supported for the specified resource.
- **406 Not Acceptable**: The server cannot produce a response matching the list of acceptable values defined in the request's headers.
- **407 Proxy Authentication Required**: The client must authenticate itself with the proxy.
- **408 Request Timeout**: The server timed out waiting for the request.
- **409 Conflict**: The request could not be completed due to a conflict with the current state of the resource.
- **410 Gone**: The resource requested is no longer available and no forwarding address is known.
- **411 Length Required**: The server refuses to accept the request without a defined Content-Length.
- **412 Precondition Failed**: The server does not meet one of the preconditions specified in the request headers.
- **413 Payload Too Large**: The request entity is larger than limits defined by the server.
- **414 URI Too Long**: The URI provided was too long for the server to process.
- **415 Unsupported Media Type**: The media type of the request entity is not supported by the server.
- **416 Range Not Satisfiable**: The range specified by the Range header field in the request cannot be satisfied.
- **417 Expectation Failed**: The server cannot meet the requirements of the Expect request-header field.
- **418 I'm a teapot**: An April Fools' joke; the server refuses to brew coffee because it is a teapot (RFC 2324).
- **421 Misdirected Request**: The request was directed at a server that is not able to produce a response.
- **422 Unprocessable Entity**: The request was well-formed but was unable to be followed due to semantic errors (WebDAV).
- **423 Locked**: The resource that is being accessed is locked (WebDAV).
- **424 Failed Dependency**: The request failed due to failure of a previous request (WebDAV).
- **425 Too Early**: Indicates that the server is unwilling to risk processing a request that might be replayed.
- **426 Upgrade Required**: The client should switch to a different protocol (e.g., TLS/1.0).
- **428 Precondition Required**: The origin server requires the request to be conditional.
- **429 Too Many Requests**: The user has sent too many requests in a given amount of time.
- **431 Request Header Fields Too Large**: The server is unwilling to process the request because its header fields are too large.

## 5. Server Error Responses (500–599)

- **500 Internal Server Error**: A generic error message indicating that the server encountered an unexpected condition.
- **501 Not Implemented**: The server does not support the functionality required to fulfill the request.
- **502 Bad Gateway**: The server was acting as a gateway or proxy and received an invalid response from the upstream server.
- **503 Service Unavailable**: The server is currently unable to handle the request due to temporary overload or maintenance of the server.
- **504 Gateway Timeout**: The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.
- **505 HTTP Version Not Supported**: The server does not support the HTTP protocol version used in the request.
- **511 Network Authentication Required**: The client needs to authenticate to gain network access.


