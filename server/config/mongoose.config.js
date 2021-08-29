const mongoose = require('mongoose');
const db_name = process.env.DB_NAME;

mongoose.connect("mongodb://localhost/" + db_name, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((res) => console.log("Successfully connected to DB: " + db_name))
  .catch((err) =>{
    console.log(err);
    console.log("error in mongoose config");
    console.log(db_name);

  });
