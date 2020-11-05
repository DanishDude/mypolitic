const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true,
  useUnifiedTopology: true
 })
  .then(() => console.log("Database Connected Successfully"))
  .catch(err => console.log(`DB Connection error: ${err}`));
 
 mongoose.set('useCreateIndex', true);
 mongoose.set('useFindAndModify', false);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
