import Router from 'koa-router'
import {connectBlock, createBlock, queryBlock} from '../database'
import {wrapOkResponse} from '../utils/ResponseUtil'

const router = new Router()
router.prefix('/block')
router.post("/", async (ctx) => {
    const block = ctx.request.body;
    let res = await createBlock(block);
    ctx.body = wrapOkResponse(res)
});
router.post("/connection", async (ctx) => {
    const {blockId1, blockId2} = ctx.request.body
    ctx.body = wrapOkResponse(await connectBlock(blockId1, blockId2))
})
router.get('/',async(ctx)=>{
    const {blockId} = ctx.request.params
    ctx.body = wrapOkResponse(await queryBlock(blockId))
})


export default router
