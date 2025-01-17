import { Router } from 'express'
import { UserController } from '../controllers/user.js'

const router = Router()

router.get('/', UserController.getUsers)
router.get('/:id', UserController.getUserById)
router.post('/', UserController.createUser)
router.put('/:id', UserController.updateUser)
router.delete('/:id', UserController.deleteUser)
router.get('/articles/:id', UserController.getArticlesByUser)
router.get('/comments/:id', UserController.getCommentsByUser)


export default router