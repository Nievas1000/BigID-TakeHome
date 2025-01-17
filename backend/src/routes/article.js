import { Router } from 'express'
import { ArticleController } from '../controllers/article.js'

const router = Router()

router.get('/', ArticleController.getArticles)
router.get('/:id', ArticleController.getArticleById)
router.post('/', ArticleController.createArticle)
router.put('/:id', ArticleController.updateArticle)
router.delete('/:id', ArticleController.deleteArticle)
router.get('/comments/:id', ArticleController.getCommentsByArticle)

export default router