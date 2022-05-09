const mongoose = require('mongoose');


//----------------------------* Creating MogonDB Connections *----------------------------//

exports.connect = () => {
    try{
        mongoose.connect(process.env.MONGO_URI, {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })
          console.log("mongoDB is connected");
    } catch(err) {
        console.log("err");
        process.exit();
    }
}
