const Koa = require('koa');
const Router = require('koa-router');
const Mongoose = require('mongoose')
//跨域
var cors = require('koa2-cors');

// config
const Config = require('./config/keys')
// 引入user用户模块
const users = require('./routes/api/users')
// 引入上传图片模块
const images = require('./routes/api/imageupload')
//跨域
// const cors = require('koa-cors')
// 引入body-parser接收参数
const bodyParser = require('koa-bodyparser')
// 引入验证工具passport
const passport = require('koa-passport')
// 实例化koa
const app = new Koa();
const router = new Router();
//引入db地址
const db = Config.mongoURI
// 使用bodyParser
app.use(bodyParser())
// 初始化passport
app.use(passport.initialize())
app.use(passport.session())
// // 解决跨域问题
app.use(cors());
require('./config/passport')(passport)
//引入静态资源显示路径(用于显示图片)
app.use(require('koa-static')(__dirname + '/public'))
// 配置路由
app.use(router.routes()).use(router.allowedMethods());

// ☆☆☆☆配置路由地址☆☆☆☆
// 用户请求接口
router.use('/api/users',users)
// 上传图片请求接口
router.use('/api/image',images)

// 链接数据库
Mongoose.connect(
    // 地址
    db,
{ useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
    // 数据库连接成功
    console.log("☆☆☆☆☆☆mongodb is connected!!!!☆☆☆☆☆☆")
}).catch(error=>{
    // 连接失败的Log
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