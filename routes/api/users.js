const Router = require('koa-router')
const router = new Router()
// 引入user
const User = require('../../models/Users')
// 引入工具类
const tools = require('../../config/tools')
//引入jsonwebToken(生成token)
const jwt = require('jsonwebtoken')
// 引入keys
const keys = require('../../config/keys')
//引入passport
const passport = require('koa-passport')

/**
 * @route POST api/users/test
 * @desc 测试接口地址
 * @access 接口是公开的
*/
router.get('/test',async ctx=>{
    ctx.status = 200;
    ctx.body = {msg:"users works..."}
})

/**
 * @route POST api/users/register
 * @desc 注册接口地址
 * @access 接口是公开的
*/
router.post('/register',async ctx=>{
    // console.log(ctx.request.body)
    // 查找数据库中是否含有相同的email
    const findResult =  await User.find({email:ctx.request.body.email})
    // console.log(findResult)
    if(findResult.length > 0){
        ctx.status = 500;
        ctx.body = {
            "email":"邮箱已被占用"
        }
    }else{
        //模型赋值
        const newUser = new User({
            name:ctx.request.body.name,
            email:ctx.request.body.email,
            password:tools.enbcrypt(ctx.request.body.password)
        });
        // 存入数据库
        await newUser.save().then(body=>{
            // 返回数据到页面
            ctx.body = body
        }).catch(error=>{
            console.log(error)
        })
    }
})


/**
 * @route POST api/users/login
 * @desc 登录接口地址
 * @access 接口是公开的
*/
router.post('/login',async ctx=>{
    // 查询数据库邮箱(异步请求)
    const findResult = await User.find({email:ctx.request.body.email})
    // 密码
    const password = ctx.request.body.password
    // user
    const user = findResult[0]

    // console.log(findResult[0])
    if(findResult.length == 0){
        ctx.status = 404;
        ctx.body = {
            msg:"用户名不存在"
        }
    }else{
        // 查询到后密码(旧密码对比新密码)
        const comparePsd = tools.comparePwd(password,user.password);
        // 如果请求成功
        if(comparePsd){
            // 生成token
            const payload = {id:user.id,name:user.name,password:user.password}
            const token = jwt.sign(payload,keys.tokenKey,{expiresIn:3600})//超时时间1小时

            ctx.status = 200
            ctx.body = {
                token : 'Bearer ' + token,
                success:true
            }
        }else{
            ctx.status = 400;
            ctx.body = {
                password:"密码错误"
            }
        }
    }
})

/**
 * @route POST api/users/current
 * @desc 用户信息接口 返回用户信息
 * @access 接口是私有的
*/
router.get('/current',passport.authenticate('jwt', { session: false }),async ctx=>{
    // ctx.body = {
    //     success:true
    // }
    // ctx.body = ctx.state.user
    // 过滤密码
    ctx.body = {
        id:ctx.state.user.id,
        name:ctx.state.user.name,
        email:ctx.state.user.email
    }
})

module.exports = router.routes();