import api from "./API"

let token = ""
let infoTest
let organizationTest
let boardTest
let listTest
let listMoveTest
let cardTest

test('Get user infos', async() => {
    infoTest = await api.getUserInfos(token);
    expect(infoTest).toBeDefined()
});

test('Organization', async () => {
    let info = await infoTest
    organizationTest = await api.createOrganization("organizationTests", "", token)
    let organizationTestGet = await api.getUserOrganizations(info.id, token)
    let organizationRenameTest = await api.renameWorkspace(organizationTest.id, "rename Test", token)
    let organizationMember = await api.getOrganizationMembers(organizationTest.id, token)
    expect(info).toBeDefined()
    expect(organizationTest).toBeDefined()
    expect(organizationTestGet).toBeDefined()
    expect(organizationRenameTest).toBeDefined()
    expect(organizationMember).toBeDefined()
});

test('boards', async() =>{
    let info = await infoTest
    let organization = await organizationTest
    boardTest = await api.createBoard("test board", "", token)
    let boardRenameTest = await api.renameBoardById(boardTest.id, "rename test", token)
    let allBoard = await api.getAllBoards(organization.id, token)
    expect(info).toBeDefined()
    expect(organization).toBeDefined()
    expect(boardTest).toBeDefined()
    expect(boardRenameTest).toBeDefined()
    expect(allBoard).toBeDefined()
});

test("lists", async() => {
    let board = await boardTest
    listTest = await api.createList(board.id, "list test", token)
    let listRenameTest = await api.renameListById(listTest.id, "test rename", token)
    let allList = await api.getAllLists(board.id, token)
    listMoveTest = allList[1]
    expect(listTest).toBeDefined()
    expect(listRenameTest).toBeDefined()
    expect(allList).toBeDefined()
})

test ("cards", async() =>{
    let list = await listTest
    cardTest = await api.createCard(list.id, "card test", "", token)
    let cardRenameTest = await api.renameCardById(cardTest.id,"test rename" , token)
    let cardMoveTest = await api.moveCardToList(cardTest.id, listMoveTest.id, token)
    expect(cardTest).toBeDefined()
    expect(cardRenameTest).toBeDefined()
    expect(cardMoveTest).toBeDefined()
})

test ("delete", async() => {
    let organization = await organizationTest
    let organizationDelete = await api.deleteOrganization(organization.id, token)
    expect(organizationDelete).toBeDefined()
})

