import { Router } from 'express'
import { CommentController } from '../controllers/comment.js'

const router = Router()

router.get('/', CommentController.getComments)
router.get('/:id', CommentController.getCommentById)
router.post('/', CommentController.createComment)
router.put('/:id', CommentController.updateComment)
router.delete('/:id', CommentController.deleteComment)

export default router