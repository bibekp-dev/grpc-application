const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Load the protobuf
const PROTO_PATH = path.join(__dirname, './protos/user.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const userProto = grpc.loadPackageDefinition(packageDefinition).user;

// Mock database
const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
];

// Implement the service methods
const getUser = (call, callback) => {
    const user = users.find(u => u.id === call.request.id);
    if (user) {
        callback(null, user);
    } else {
        callback({
            code: grpc.status.NOT_FOUND,
            details: 'User not found'
        });
    }
};

const getUsers = (call) => {
    const limit = call.request.limit || users.length;
    users.slice(0, limit).forEach(user => {
        call.write(user);
    });
    call.end();
};

// Create and start the gRPC server
function startServer() {
    const server = new grpc.Server();
    server.addService(userProto.UserService.service, {
        getUser: getUser,
        getUsers: getUsers
    });
    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (error, port) => {
        if (error) {
            console.error(error);
            return;
        }
        server.start();
        console.log(`Server running at http://0.0.0.0:${port}`);
    });
}

startServer(); 