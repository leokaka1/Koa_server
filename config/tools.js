// hash加密密码算法
var bcrypt = require("bcryptjs");
// 引入multer
const multer = require("koa-multer");

const tools = {
  enbcrypt(password) {
    // 密码hash
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash;
  },

  // 密码对比效验
  comparePwd(newPwd, oldPwd) {
    const comparePsd = bcrypt.compareSync(newPwd, oldPwd);
    return comparePsd;
  },

  // 上传图片到/public/upload文件夹中（以后根据需求可以改变路径）
  upLoadImage() {
    const storage = multer.diskStorage({
      // 文件保存路径
      destination: (req, file, cb) => {
        cb(null, "public/upload/");
      },
      // 修改文件名
      filename: (req, file, cb) => {
        const fileFormat = file.originalname.split("."); //以点分割成数组，数组的最后一项就是后缀名
        cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
      }
    });
    const finalResult = multer({ storage: storage });
    return finalResult;
  }
};

module.exports = tools;
