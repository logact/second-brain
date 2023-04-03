import {
    connectBlock,
    connectTag,
    createBlock,
    createTag,
    deleteBlock,
    deleteTag,
    queryAllNode, queryBlock,
    tagBlock,
    updateBlock,
    updateTag
} from 'backend/src/database'


describe('test block', () => {
    it('should create a block', async () => {
            const block = await createBlock({
                name: "testBlock11111",
                content: 'testcontent'
            })
            expect(block).toBeDefined()
        }
    )
    it('should connect block', async () => {
        const block1 = await createBlock({
            name: "testBlock",
            content: 'testcontent'
        })
        const block2 = await createBlock({
            name: "testBlock",
            content: 'testcontent'
        })
        const res = await connectBlock(block1.id, block2.id)
        expect(res).toBeDefined()
    })
    it('create a Tag', async () => {
        const res = await createTag({
            name: "testBlock",
            description: 'testcontent'
        })
        expect(res).toBeDefined()
    })
    it('connect the tag', async () => {
        const tag1 = await createTag({
            name: "tag1",
            description: 'asdfasdfasdf'
        })
        const tag2 = await createTag({
            name: "tag2",
            description: 'asdfasdfasdf'
        })

        const res = await connectTag(tag1.id, tag2.id)
        expect(res).toBeDefined()
    })
    it('tag the block', async () => {
        const tag1 = await createTag({
            name: "tag1",
            description: 'asdfasdfasdf'
        })
        const block1 = await createBlock({
            name: "testBlock",
            content: 'testcontent'
        })
        const res = await tagBlock(tag1.id, block1.id);
        expect(res).toBeDefined()

    })
    it('update the block', async () => {
        const res = await updateBlock({
            blockId: '02869853-b138-42f0-af64-0f738dc69a69',
            name: 'updatedName1'
        })

    })
    it('delete the block', async () => {
        const res = await deleteBlock('02869853-b138-42f0-af64-0f738dc69a69')
    })
    it('update the tag', async () => {
        const res = await updateTag({
            tagId: '98064231-6c5e-418f-83c7-0eb0ef03e83d',
            name: 'updatename',
            description: 'updatedescription'
        })
    })
    it('delete the tag', async () => {
        const res = await deleteTag('98064231-6c5e-418f-83c7-0eb0ef03e83d')
    })
    it('query all node', async () => {
        const res = await queryAllNode()
        console.log(JSON.stringify(res))
    })
    it('query block',async ()=>{
        const res = await queryBlock()
    })
})