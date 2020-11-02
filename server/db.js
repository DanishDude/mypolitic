const mongoose = require('mongoose');

mongoose.connect(process.env.DB, { 
  useNewUrlParser: true,
  useUnifiedTopology: true
 })
  .then(() => console.log("Database Connected Successfully"))
  .catch(err => console.log(`DB Connection error: ${err}`));
 
 mongoose.set('useCreateIndex', true);
 mongoose.set('useFindAndModify', false); // https://mongoosejs.com/docs/deprecations.html#findandmodify

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
