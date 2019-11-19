const Koa = require('koa');
const Router = require('koa-router');
const Mongoose = require('mongoose')
// config
const Config = require('./config/keys')
// 引入users
const users = require('./routes/api/users')
// 引入body-parser接收参数
const bodyParser = require('koa-bodyparser')
// 引入验证工具passport
const passport = require('koa-passport')


// 实例化koa
const app = new Koa();
const router = new Router();
//引入db地址
const db = Config.mongoURI
// 配置路由地址
router.use('/api/users',users)
// 使用bodyParser
app.use(bodyParser())
// 初始化passport
app.use(passport.initialize())
// app.use(passport.session())
require('./config/passport')(passport)
// 配置路由
app.use(router.routes()).use(router.allowedMethods());

// 链接数据库
Mongoose.connect(
    // 地址
    db,
{ useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
    console.log("☆☆☆☆☆☆mongodb is connected!!!!☆☆☆☆☆☆")
}).catch(error=>{
    console.log(error)
})

// 路由
router.get('/',async ctx=>{
    ctx.body = {msg:'hello koa interface'}
})


// 设置到端口号
const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`server start on ${port}`);
})