const User = require('../model/user');
const  bcrypt = require('bcrypt');


//----------------------------* Get All Users From DataBase *----------------------------//

exports.getUser = async(req, res, next)=>{
    try{
      let response = await User.find();
      res.status(200).send(response);
    }catch(err){
      res.status(400).send(err);
    }
  };


//----------------------------* Get User By ID From DataBase *----------------------------//

exports.getUserById = async(req, res, next)=>{
  try{
    let response = await User.findById(req.params.userId);
    res.status(200).send(response);
  }catch(err){
    res.status(400).send(err);
  }
};

  //----------------------------* Update User By Id *----------------------------//

  exports.updateUser =async (req, res, next)=>{

    try{
      let response = await User.findByIdAndUpdate(req.params.userId,{
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        username:req.body.username,
        email:req.body.email,
        number:req.body.number
      },{new : true})
      res.status(200).send({msg : "You have successfully updated your account..!", status : "success"}).send(response);
    }catch(err){
      res.status(400).send(err);
    }
  };

  //----------------------------* Update User By Id *----------------------------//

  exports.updatePassword =async (req, res, next)=>{

    try{
      const newPassword = await bcrypt.hash(req.body.password, 10);
      const response = await User.findByIdAndUpdate(req.params.userId,{
        password:newPassword
      },{new : true})
      res.status(200).send({msg : "You have successfully updated your account..!", status : "success"}).send(response);
    }catch(err){
      res.status(400).send(err);
    }
  };

  //----------------------------* Delete User By Id *----------------------------//

  exports.deleteUser =async (req, res, next) => {
    try{
      let response = await User.findByIdAndRemove(req.params.userId);
        res.status(200).send(response);
    }catch(err){
      res.status(400).send(err);
    }
  };

  
//----------------------------* Save The Post *----------------------------//

 exports.SavePost = async (req, res, next) => {
  try{
      let post = await User.findByIdAndUpdate(req.params.userId,{            
        $push:{saved: req.body.saved}
        },{new : true})
      res.status(200).send(post);
  }catch(error){
    res.status(400).send(error.message);
  }
}



//----------------------------* Delete the Saved The Post *----------------------------//

 exports.DeleteSavedPost = async (req, res, next) => {
  try{
      let post = await User.findByIdAndUpdate(req.params.userId,{            
          $pull:{saved: req.body.saved}
          },{new : true})
      res.status(200).send(post);
  }catch(error){
      res.status(400).send(error.message);
  }
}
