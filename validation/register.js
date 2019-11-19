// 引入验证
const Validator = require('validator')
//引入isEmpty
const isEmpty = require('./isEmpty')

module.exports = function validateRegisterInput(data){
    let error = {}

    // 如果字符串为空，则显示空字符串
    data.name = !isEmpty(data.name) ? data.name : ''
    data.email = !isEmpty(data.email) ? data.email : ''
    data.password = !isEmpty(data.password) ? data.password : ''


    // 验证名字
    if(!Validator.isLength(data.name,{min:2,max:30})){
         error.name = '名字长度不能少于2位并且不能高于30位'
    }

    // 
    if(!Validator.isEmpty(data.name)){
        error.name = '名字不能为空'
    }

    // 验证邮箱
    if(!Validator.isEmail(data.email)){
        error.name = '邮箱不合法'
    }

    if(!Validator.isEmpty(data.email)){
        error.name = '名字不能为空'
    }

    //验证密码
    if(!Validator.isLength(data.password,{min:6,max:30})){
        error.name = '密码长度不能少于2位并且不能高于30位'
    }

    if(!Validator.isEmpty(data.password)){
        error.name = '密码不能为空'
    }

    return{
        error,
        isValid : isEmpty(error)
    }
}
