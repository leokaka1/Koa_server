// 引入验证
const Validator = require('validator')
//引入isEmpty
const isEmpty = require('./isEmpty')

module.exports = function validateRegisterInput(data){
    let error = {}
    if(Validator.isLength(data.name,{min:2,max:30})){
         error.name = '名字长度不能少于2位并且不能高于30位'
    }
    return{
        error,
        isValid : isEmpty(error)
    }
}
