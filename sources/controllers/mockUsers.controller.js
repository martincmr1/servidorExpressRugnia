const {Router} = require ('express')
const MockUsersManager= require('../Dao/mockUsers.manager')
const router = Router()

const mockUsersManager= new MockUsersManager()

router.get('/',mockUsersManager.getMockUsers.bind(mockUsersManager))



module.exports = router

