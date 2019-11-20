const Router = require('koa-router')
const router = new Router()
// 引入工具
const tools = require('../../config/tools')

//加载配置
var upload = tools.upLoadImage()

router.post('/upload',upload.single('file'),async(ctx,next)=>{
    // console.log(ctx)
    ctx.body = {
        filename: 'http://localhost:5000/upload/'+ctx.req.file.filename//返回文件名
    }
})

module.exports = router.routes();