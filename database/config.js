const mongoose = require('mongoose');


const dbConnection = async () => {

   try{

       await mongoose.connect(process.env.MONGO_URL, {
           useNewUrlParser: true,
           useUnifiedTopology: true,
           useCreateIndex: true,
           useFindAndModify: false
       });

       console.log('Connection successful');

   }catch(err){
       console.log('An error has ocurred');
   }

}

module.exports = {
    dbConnection
}