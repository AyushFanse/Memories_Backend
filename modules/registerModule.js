const User = require('../model/user');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//----------------------------* Registration Part *----------------------------//

exports.register = async (req, res, next) => {
    const schema = Joi.object({
        first_name: Joi.string().min(3).max(50).trim(true).required(),
        last_name: Joi.string().min(3).max(50).trim(true).required(),
        username: Joi.string().trim(true).min(4).max(25).required(),
        email: Joi.string().lowercase().min(6).max(50).email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        number: Joi.string().min(10).pattern(/^[0-9]+$/).required(),
        password: Joi.string().trim(true).required()
    })

    try {

        var { error } = await schema.validate(req.body);
        if (error) return res.status(400).send({ msg: error.details[0].message });

        var existUser = await User.findOne({ "email": req.body.email }).exec();
        if (existUser) return res.status(400).send({ msg: "Email already exists.", status: "error" });

        var existUsername = await User.findOne({ "username": req.body.username }).exec();
        if (existUsername) return res.status(400).send({ msg: "Username already exists.", status: "error" });

        var existNumber = await User.findOne({ "number": req.body.number }).exec();
        if (existNumber) return res.status(400).send({ msg: "Number already exists.", status: "error" });

        const salt = await bcrypt.genSalt(10);
        const Password = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            email: req.body.email,
            number: req.body.number,
            password: Password
        })
        var response = await user.save();
        res.status(200).send(response);
    } catch (err) {
        res.status(400).send(err);
    }

}

//----------------------------* Login Part *----------------------------//

exports.login = async (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().min(6).max(50).email().required(),
        password: Joi.string().min(4).max(15).required()
    })

    try {
        var { error } = await schema.validate(req.body);
        if (error) return res.status(400).send({ msg: error.details[0].message });

        var existUser = await User.findOne({ "email": req.body.email }).exec();
        if (!existUser) return res.status(400).send({ msg: "Email not reqistered", status: "error" });

        var user = {};
        user.first_name = existUser.first_name;
        user.last_name = existUser.last_name;
        user.username = existUser.username;
        user._id = existUser._id;
        user.email = existUser.email;
        user.number = existUser.number;

        var isValid = await bcrypt.compare(req.body.password, existUser.password);
        if (!isValid) return res.status(400).send({ msg: "Password doesn't match.", status: "error" });

        var token = jwt.sign({ user }, 'SWERA', { expiresIn: '2h' });
        res.send({ userToken: token, status: "success" });
    } catch {
        res.status(400).send(err);
    }
}
