# gRPC Node.js Demo Application

A simple gRPC application built with Node.js demonstrating unary and streaming calls.

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## 🛠️ Installation

1. Clone the repository:

2. Install dependencies:

## 🏗️ Project Structure
grpc-demo/
├── protos/
│ └── user.proto # Protocol Buffer definitions
├── server.js # gRPC server implementation
├── client.js # gRPC client implementation
├── package.json
└── README.md

## 🚀 Running the Application

1. Start the gRPC server:
bash
npm run start:server
2. In a separate terminal, run the client:

bash:grpc-application/README.md
npm run start:client

## 📝 API Description

### Service: UserService

#### Unary Call
- **GetUser**
  - Request: `UserRequest` (id: number)
  - Response: `UserResponse` (id, name, email)
  - Description: Retrieves a single user by their ID

#### Server Streaming
- **GetUsers**
  - Request: `UsersRequest` (limit: number)
  - Response: Stream of `UserResponse`
  - Description: Retrieves multiple users up to the specified limit

## 🔧 Available Scripts

- `npm run start:server` - Starts the gRPC server
- `npm run start:client` - Runs the client application

## 🧪 Testing

The client implementation includes test cases for both unary and streaming calls:
- Gets a single user with ID 1
- Streams multiple users with a limit of 2

## 🛠️ Built With

- [@grpc/grpc-js](https://www.npmjs.com/package/@grpc/grpc-js) - Pure JavaScript gRPC implementation
- [@grpc/proto-loader](https://www.npmjs.com/package/@grpc/proto-loader) - Protocol Buffer loader for Node.js

## 🔍 Further Development

You can extend this demo by:
- Adding authentication
- Implementing client streaming
- Implementing bidirectional streaming
- Adding a real database connection
- Adding input validation
- Implementing error handling middleware
- Adding logging
- Adding tests

## 📚 Learn More

- [gRPC Documentation](https://grpc.io/docs/)
- [Protocol Buffers](https://developers.google.com/protocol-buffers)
- [Node.js gRPC Guide](https://grpc.io/docs/languages/node/)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details

