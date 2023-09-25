const { connect, connection } = require('mongoose');

const connectionString =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/social-netwerk';

// To ensure MongoDB connection is using the latest recommended features
connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


module.exports = connection;