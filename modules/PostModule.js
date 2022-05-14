const Posts = require("../model/Post");
const cloudinary = require("../middleWare/cloudinary");


//----------------------------* Create Post *----------------------------//

const CreatePost = async (req, res) => {
  console.log('entering')
  try {
    console.log('entered')
    console.log(req.body)
    // Upload image to cloudinary
    console.log('name:'+ req.body.name,
    'description:'+ req.body.description,
    'file:'+ req.body.file,
    'user_email:'+ req.body.user_email)

    const result = await cloudinary.uploader.upload(req.file.path,{
                upload_preset:"memories"
            });
    console.log('name:'+ req.body.name,
      'avatar:'+ result.secure_url,
      'cloudinary_id:'+ result.public_id,
      'description:'+ req.body.description,
      'user_email:'+ req.body.user_email)

    let post = new Posts({
      name: req.body.name,
      avatar: result.secure_url,
      cloudinary_id: result.public_id,
      description: req.body.description,
      user_email: req.body.user_email
    });
    console.log(post)
    
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
    // Find post by id
    let post = await Posts.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(post.cloudinary_id,{
                upload_preset:"memories"
            });
    // Delete post from db
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
    // Delete image from cloudinary
    // Upload image to cloudinary
    let result = [];
    if (req.file) {
      await cloudinary.uploader.destroy(post.cloudinary_id,{
                upload_preset:"memories"
            });

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
    // Find user by id
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