# URL Shortening System

This is a URL shortening system that allows users to shorten long URLs into short and easy-to-remember ones.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/url-shortening-system.git
   ```
2. Install dependencies:
   
   ```bash
   cd url-shortening-system
   npm install
   ```
3. Create a .env file at the root of the project and add the following keys:
   
   ```bash
   URI_POSTGRES=YOUR_POSTGRES_SERVERLESS_DATABASE_URI
   URI_REDIS=YOUR_REDIS_SERVERLESS_URI
   TOKEN_REDIS=YOUR_REDIS_TOKEN
   ```
   Replace YOUR_POSTGRES_SERVERLESS_DATABASE_URI, YOUR_REDIS_SERVERLESS_URI, and YOUR_REDIS_TOKEN with your PostgreSQL and Redis serverless database URIs and token. For example, if you are using Neon for PostgreSQL and Upstash for Redis, the URIs might look like neon://username:password@host/database and redis://:password@hostname:port, respectively.
4. Start the server:
   
   ```bash
   npm run dev
   ```
   The server will be running on port 3333.

## Usage

  Make a POST request to /api/links with the body containing the custom code (code) and the original URL (url) you want to shorten. For example:

  ```bash
  curl -X POST http://localhost:3333/api/links \
  -H "Content-Type: application/json" \
  -d '{"code": "my-link", "url": "https://www.example.com"}'
  ```
  The response will contain the ID of the shortened link.

  ### Redirect URL
  Access http://localhost:3333/your-code in the browser to be redirected to the original URL corresponding to the provided code.

  ### View All Links
  Make a GET request to /api/links to view all the shortened links in the system.

  ```bash
  curl http://localhost:3333/api/links
  ```




