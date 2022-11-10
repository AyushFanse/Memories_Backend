const router = require("express").Router();
const {
    CreatePost,
    GetPost,
    DeletePost,
    PatchPost,
    GetPostById,
} = require("../modules/PostModule");
const upload = require("../middleWare/multer");

//----------------------------* Routes for Posts *----------------------------//

router.post("/post", upload.single("file"), CreatePost);

router.get("/get", GetPost);

router.get("/get/:id", GetPostById);

router.delete("/delete/:id", DeletePost);

router.patch("/update/:id", upload.single("file"), PatchPost);

//----------------------------* Exporting Modules *----------------------------//

module.exports = router;
