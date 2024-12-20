const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.join(__dirname, './protos/user.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const userProto = grpc.loadPackageDefinition(packageDefinition).user;
const client = new userProto.UserService(
    'localhost:50051',
    grpc.credentials.createInsecure()
);

// Test unary call
function getUser(id) {
    client.getUser({ id }, (error, response) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log('User:', response);
    });
}

// Test streaming call
function getUsers(limit) {
    const call = client.getUsers({ limit });
    call.on('data', (user) => {
        console.log('Received user:', user);
    });
    call.on('end', () => {
        console.log('Stream ended');
    });
    call.on('error', (error) => {
        console.error(error);
    });
}

// Test the service
console.log('Testing getUser...');
getUser(1);

console.log('\nTesting getUsers...');
getUsers(2); 