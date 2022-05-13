const router = require('express').Router();
const {CreatePost, GetPost, DeletePost, PatchPost, GetPostById} = require('../modules/PostModule');
const upload = require('../middleWare/multer');

//----------------------------* Routes for Posts *----------------------------//

router.post('/post', upload.single('image'), CreatePost);

router.get('/get', GetPost);

router.get('/get/:id', GetPostById);

router.delete('/delete/:id', DeletePost);

router.patch('/patch/:id', upload.single('image'), PatchPost);

//----------------------------* Exporting Modules *----------------------------//

module.exports = router;