const mongoose = require('mongoose');
const db_name = process.env.DB_NAME;

mongoose.connect("mongodb://localhost/" + db_name, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Successfully connected to DB: " + db_name))
  .catch((err) => console.log(err));
