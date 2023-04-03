import Router from 'koa-router'
import {connectTag, createTag, tagBlock} from '../database'
import {wrapOkResponse} from '../utils/ResponseUtil'

const router = new Router()
router.prefix('/tag')
router.post("/", async (ctx) => {
    const tag = ctx.request.body;
    let res = await connectTag(tag);
    ctx.body = wrapOkResponse(res)
});
router.post("/connectionWithBlock", async (ctx) => {
    const {tagId, blockId} = ctx.request.body
    ctx.body = wrapOkResponse(await tagBlock(tagId, blockId))
})
router.post("/connection", async (ctx) => {
    const {tagId1, tagId2} = ctx.request.body
    ctx.body = wrapOkResponse(await createTag(tagId1, tagId2))
})

export default router
