const User = require("../model/user");
const bcrypt = require("bcrypt");

//----------------------------* Get All Users From DataBase *----------------------------//

exports.getUser = async (req, res, next) => {
    try {
        let response = await User.find();
        res.status(200).send(response);
    } catch (err) {
        res.status(400).send(err);
    }
};

//----------------------------* Get User By ID From DataBase *----------------------------//

exports.getUserById = async (req, res, next) => {
    try {
        let response = await User.findById(req.params.userId);
        res.status(200).send(response);
    } catch (err) {
        res.status(400).send(err);
    }
};

//----------------------------* Update User By Id *----------------------------//

exports.updateUser = async (req, res, next) => {
    try {
        var existUser = await User.findOne({ email: req.body.email }).exec();
        if (existUser)
            return res
                .status(400)
                .send({ msg: "Email already exists.", status: "error" });

        var existUsername = await User.findOne({
            username: req.body.username,
        }).exec();
        if (existUsername)
            return res
                .status(400)
                .send({ msg: "Username already exists.", status: "error" });

        var existNumber = await User.findOne({
            number: req.body.number,
        }).exec();
        if (existNumber)
            return res
                .status(400)
                .send({ msg: "Number already exists.", status: "error" });

        const user = await User.findById(req.params.userId);
        const data = {
            first_name: req.body.first_name || user.first_name,
            last_name: req.body.last_name || user.last_name,
            username: req.body.username || user.username,
            number: req.body.number || user.number,
            post: req.body.post || user.post,
            email: req.body.email || user.email,
        };
        const response = await User.findByIdAndUpdate(req.params.userId, data, {
            new: true,
        });
        res.status(200).json({
            msg: "Your Account has been updated successfully...",
            status: "success",
            data: response
        });
    } catch (err) {
        res.status(400).send(err);
    }
};

//----------------------------* Update User By Id *----------------------------//

exports.updatePassword = async (req, res, next) => {
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10);
        await User.findByIdAndUpdate(
            req.params.userId,
            {
                password: newPassword,
            },
            { new: true }
        );
        res.status(200).send({
            msg: "You have successfully updated your account..!",
            status: "success",
        });
    } catch (err) {
        res.status(400).send(err);
    }
};

//----------------------------* Delete User By Id *----------------------------//

exports.deleteUser = async (req, res, next) => {
    try {
        let response = await User.findByIdAndRemove(req.params.userId);
        res.status(200).send(response);
    } catch (err) {
        res.status(400).send(err);
    }
};

//----------------------------* Save The Post *----------------------------//

exports.SavePost = async (req, res, next) => {
    try {
        let post = await User.findByIdAndUpdate(
            req.params.userId,
            {
                $push: { saved: req.body.saved },
            },
            { new: true }
        );
        res.status(200).send(post);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

//----------------------------* Delete the Saved The Post *----------------------------//

exports.DeleteSavedPost = async (req, res, next) => {
    try {
        let post = await User.findByIdAndUpdate(
            req.params.userId,
            {
                $pull: { saved: req.body.saved },
            },
            { new: true }
        );
        res.status(200).send(post);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
