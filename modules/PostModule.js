const Posts = require("../model/Post");
const cloudinary = require("../middleWare/cloudinary");


//----------------------------* Create Post *----------------------------//

const CreatePost =  async (req, res) => {
    try {
        // Upload image to cloudinary
        console.log(req.file.path)
        const result = await cloudinary.uploader.upload(req.file.path);
    
        // Create new post
        let post = new Posts({
          name: req.body.name,
          avatar: result.secure_url,
          cloudinary_id: result.public_id,
          description:req.body.description,
          user_email:req.body.user_email
        });
        console.log(post)
        // Save post
        // await post.save();
        res.json(post);
      } catch (err) {
        console.log(err);
      }
  }

//----------------------------* Get Post By Id From DataBase *----------------------------//

const GetPost =  async (req, res) => {
    try {
        let post = await Posts.find();
        res.json(post);
      } catch (err) {
        console.log(err);
      }
}


//----------------------------* Delete Post By Id From DataBase *----------------------------//

const DeletePost = (async (req, res) => {
    try {
        // Find post by id
        let post = await Posts.findById(req.params.id);
        // Delete image from cloudinary
        await cloudinary.uploader.destroy(post.cloudinary_id);
        // Delete post from db
        await post.remove();
        res.send("Your post has been deleted successfully");
      } catch (err) {
        console.log(err);
      }
});

//----------------------------* Update Post By Id From DataBase *----------------------------//

const PutPost =  async (req, res) => {
  try {
      let post = await Posts.findById(req.params.id);
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinary_id);
      // Upload image to cloudinary
      let result;
      if (req.file) {
        result = await cloudinary.uploader.upload(req.file.path);
      }
      const data = {
        name: req.body.name || post.name,
        avatar: result.secure_url || post.avatar,
        cloudinary_id: result.public_id || post.cloudinary_id,
        description: req.body.description || post.description,
      };
      post = await Posts.findByIdAndUpdate(req.params.id, data, { new: true });
      res.json(post);
    } catch (err) {
      console.log(err);
    }
}

//----------------------------* Get Post By Id From DataBase *----------------------------//

const GetPostById =  async (req, res) => {
  try {
      // Find user by id
      let post = await Posts.findById(req.params.id);
      res.json(post);
    } catch (err) {
      console.log(err);
    }
}

//----------------------------* Exporting Modules *----------------------------//

module.exports = {
                    CreatePost,
                    GetPost,
                    DeletePost,
                    PutPost,
                    GetPostById
                  }