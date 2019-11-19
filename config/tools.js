// hash加密密码算法
var bcrypt = require("bcryptjs");

const tools = {
  enbcrypt(password) {
    // 密码hash
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash; 
  },

  // 密码对比效验
  comparePwd(newPwd,oldPwd){
    const comparePsd =  bcrypt.compareSync(newPwd,oldPwd)
    return comparePsd;
  }
};

module.exports = tools