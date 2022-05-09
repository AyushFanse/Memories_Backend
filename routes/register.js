const express = require('express');
const router = express.Router();
const Register = require('../modules/registerModule');

//----------------------------* Resister Router *----------------------------//

router.post('/registeruser', Register.register);

//----------------------------* Login Router *----------------------------//

router.post('/login', Register.login);

//----------------------------* Exporting Modules *----------------------------//

module.exports = router;