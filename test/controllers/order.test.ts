import connect, { MongodHelper } from "../../test/db-helper"

describe("order controller", ()=>{
let mongodHelper: MongodHelper
beforeAll(async()=>{
    mongodHelper = await connect()
})

afterEach(async()=>{
await mongodHelper.clearDatabase()
})
afterAll(async()=>{
    await mongodHelper.closeDatabase()
})

})