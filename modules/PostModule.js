const Posts = require("../model/Post");
const cloudinary = require("../middleWare/cloudinary");


//----------------------------* Create Post *----------------------------//

const CreatePost = async (req, res) => {
  try {

    const result = await cloudinary.uploader.upload(req.file.path,{
                upload_preset:"memories"
            });

    let post = new Posts({
      name: req.body.name,
      avatar: result.secure_url,
      cloudinary_id: result.public_id,
      description: req.body.description,
      user_email: req.body.user_email
    });
    
    await post.save();
    res.status(201).send(post);
  } catch (err) {
    res.status(400).json(err);
  }
}

//----------------------------* Get Post By Id From DataBase *----------------------------//

const GetPost = async (req, res) => {
  try {
    let post = await Posts.find();
    res.status(200).send(post);
  } catch (err) {
    res.status(400).json(err);
  }
}


//----------------------------* Delete Post By Id From DataBase *----------------------------//

const DeletePost = (async (req, res) => {
  try {
    
    let post = await Posts.findById(req.params.id);
    
    await cloudinary.uploader.destroy(post.cloudinary_id);
    
    await post.remove();
    res.status(200).json("Your post has been deleted successfully");

  } catch (err) {
    res.status(400).json(err);
  }
});

//----------------------------* Update Post By Id From DataBase *----------------------------//

const PatchPost = async (req, res) => {
  try {

    let post = await Posts.findById(req.params.id);
    let result = [];

    if (req.file) {
      await cloudinary.uploader.destroy(post.cloudinary_id);

      result = await cloudinary.uploader.upload(req.file.path,{
                upload_preset:"memories"
            });
    }
    const data = {
      name: req.body.name || post.name,
      avatar: result.secure_url || post.avatar,
      cloudinary_id: result.public_id || post.cloudinary_id,
      description: req.body.description || post.description,
    };

    post = await Posts.findByIdAndUpdate(req.params.id, data, { new: true });
    res.status(200).send(post);
  } catch (err) {
    res.status(400).send(err);
  }
}

//----------------------------* Get Post By Id From DataBase *----------------------------//

const GetPostById = async (req, res) => {
  try {
    
    let post = await Posts.findById(req.params.id);
    res.status(200).send(post);
  } catch (err) {
    res.status(400).json(err);
  }
}

//----------------------------* Exporting Modules *----------------------------//

module.exports = {
  CreatePost,
  GetPost,
  DeletePost,
  PatchPost,
  GetPostById
}