const mongoose = require("mongoose");


//----------------------------* Using Schemas for Post *----------------------------//

const postSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  user_email:   {
    type: String
  },
  cloudinary_id: {
    type: String,
  },
  createdAt: {
      type: Date,
      default: new Date(),
  },
  description:  {
    type: String,
  }
});


//----------------------------* Exporting Modules *----------------------------//

module.exports = mongoose.model("Post", postSchema);
