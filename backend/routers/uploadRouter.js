import { isAuth } from "../utils.js";
import express from 'express';
import multer from "multer";

const uploadRouter = express.Router();


// https://www.npmjs.com/package/multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // 接收到文件后输出的保存路径（若不存在则需要创建）
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      // 将保存文件名设置为 时间戳 + 文件原始名
      cb(null, `${Date.now()}.jpg`);
    },
})

const upload = multer({storage});

uploadRouter.post('/', isAuth, upload.single('image'), (req,res) => {
    res.send(`/${req.file.path}`);
});

export default uploadRouter;

