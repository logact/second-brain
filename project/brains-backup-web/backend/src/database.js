import neo4j from 'neo4j-driver'
import uuid from 'node-uuid'

const uri = "bolt://192.168.1.101:7687";
const user = "neo4j";
const password = "ljl19980909";
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password))


async function dbTemplate(fn) {
    let session
    try {
        session = driver.session();
        return await fn(session)
    } finally {
        session.close().then()
    }
}


export async function deleteBlock(blockId) {
    return await updateBlock({
        blockId,
        isDeleted: 1
    })
}

export async function updateBlock(param) {
    return await dbTemplate(async (session) => {
        let s = 'MATCH (n:Block { id:$blockId })\n' +
            'Set ';
        if (param.content) {
            s = s + 'n.content = $content,'
        }
        if (param.name) {
            s = s + 'n.name = $name,'
        }
        if (param.isDeleted) {
            s = s + 'n.isDeleted = $isDeleted,'
        }
        s = s + 'n.updateTime = $updateTime'
        param.updateTime = Date.now()
        return await session.run(
            s,
            param
        )
    })
}

export async function createBlock(block) {
    return await dbTemplate(async (session) => {
        block.id = uuid.v4()
        block.createTime = Date.now()
        const res = await session.run('CREATE (a:Block {name: $name,content: $content,id:$id,createTime:$createTime}) RETURN a', block)
        return res.records[0].get(0).properties
    })

}

export async function connectBlock(blockId1, blockId2) {
    return await dbTemplate(async (session) => {
        const res = await session.run('MATCH (a:Block), (b:Block) WHERE a.id = $blockId1 AND b.id = $blockId2 \n' +
            `CREATE (a)-[r1: link]->(b),(b)-[r2:isLinked]->(a) \n` +
            '' +
            'RETURN r1, r2', {
            blockId1: blockId1,
            blockId2: blockId2
        })
        return [res.records[0].get(0).properties, res.records[0].get(1).properties]
    })
}

export async function tagBlock(tagId, blockId) {
    return await dbTemplate(async (session) => {
        const res = await session.run('MATCH (a:Tag), (b:Block) WHERE a.id = $tagId AND b.id = $blockId \n' +
            `CREATE (a)-[r1: tag]->(b),(b)-[r2:isTagged]->(a) \n` +
            '' +
            'RETURN r1, r2', {
            tagId: tagId,
            blockId: blockId
        })
        return [res.records[0].get(0).properties, res.records[0].get(1).properties]
    })
}

export async function createTag(tag) {
    return await dbTemplate(async (session) => {
        tag.id = uuid.v4()
        tag.createTime = Date.now()
        const res = await session.run('CREATE (a:Tag {name: $name,description: $description,id:$id,createTime:$createTime}) RETURN a', tag)
        return res.records[0].get(0).properties
    })
}

export async function connectTag(tagId1, tagId2) {
    return await dbTemplate(async (session) => {
        const res = await session.run('MATCH (a:Tag), (b:Tag) WHERE a.id = $tagId1 AND b.id = $tagId2 \n' +
            `CREATE (a)-[r1: link]->(b),(b)-[r2:isLinked]->(a) \n` +
            '' +
            'RETURN r1, r2', {
            tagId1: tagId1,
            tagId2: tagId2
        })
        return [res.records[0].get(0).properties, res.records[0].get(1).properties]

    })
}


export async function deleteTag(tagId) {
    return await updateTag({
        tagId,
        isDeleted: 1
    })
}

export async function updateTag(param) {
    return await dbTemplate(async (session) => {
        let s = 'MATCH (n:Tag { id:$tagId })\n' +
            'Set ';
        if (param.description) {
            s = s + 'n.description = $description,'
        }
        if (param.name) {
            s = s + 'n.name = $name,'
        }
        if (param.isDeleted) {
            s = s + 'n.isDeleted = $isDeleted,'
        }
        s = s + 'n.updateTime = $updateTime'
        param.updateTime = Date.now()
        return await session.run(
            s,
            param
        )
    })
}

export async function queryAllNode() {
    return await dbTemplate(async (session) => {
        let s = 'MATCH p=()-->() RETURN p.start,p.end'
        return await session.run(s)

    })
}

export async function queryBlock(blockId) {
    return await dbTemplate(async (session) => {
        let blocksScript
        let relationsScript
        if (!blockId) {
            blocksScript = 'MATCH (n:Block) RETURN n'
            relationsScript = 'MATCH p=(b:Block)-[l:link]->(n:Block) RETURN l'
        } else {
            blocksScript = 'MATCH (b:Block{id:${blockId}) RETURN b'
            relationsScript = `MATCH p=(b:Block{id:${blockId})-[l]->(n) RETURN l`
        }
        let blocks = await session.run(blocksScript)
        let relations = await session.run(relationsScript)
        let elementId2Id = {}
        blocks = blocks.records.map(block => {
            let properties = block.get(0).properties;
            elementId2Id[block.get(0).elementId] = properties.id
            return {
                id:properties.id,
                name: properties.name,
                category:'block'
            }
        })
        relations = relations.records.map(relation => {
            return {
                target: elementId2Id[relation.get(0).endNodeElementId],
                source: elementId2Id[relation.get(0).startNodeElementId],
            }
        })
        return {
            blocks,
            relations
        }


    })
}

export async function queryNodeById() {

}

export async function queryAllTag() {

}