const router = require('express').Router();
const {CreatePost, GetPost, DeletePost, PutPost, GetPostById} = require('../modules/PostModule');
const upload = require('../middleWare/multer');

//----------------------------* Routes for Posts *----------------------------//

router.post('/', upload.single('image'), CreatePost);

router.get('/', GetPost);

router.delete('/:id', DeletePost);

router.put('/:id', upload.single('image'), PutPost);

router.get('/:id', GetPostById);

//----------------------------* Exporting Modules *----------------------------//

module.exports = router;