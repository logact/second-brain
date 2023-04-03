import Koa from 'koa'
import blockRouter from './routers/block'
import tagRouter from './routers/tag'
import cors from 'koa2-cors'


const app = new Koa()
const port = 5000
app.use(cors())

app.use(blockRouter.routes()).use(blockRouter.allowedMethods())
app.use(tagRouter.routes()).use(blockRouter.allowedMethods())




app.listen(port)
console.log("程序已经启动，在" + port + "端口监听")