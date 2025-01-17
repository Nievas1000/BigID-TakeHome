import { sequelize } from "../config/db.js";
import { Article } from "../models/article.js";
import { Comment } from "../models/comment.js";
import { User } from "../models/user.js";

export class ArticleController {
    static async getArticles(req, res) {
        try {
            const articles = await Article.findAll({
                include: [
                    {
                        model: User,
                        attributes: ['email'],
                    },
                    {
                        model: Comment,
                        attributes: [],
                    },
                ],
                attributes: [
                    'id',
                    'title',
                    'content',
                    [sequelize.fn('COUNT', sequelize.col('Comments.id')), 'commentCount'],
                ],
                group: ['Article.id', 'User.id'],
            });

            if (articles.length === 0) {
                return res.status(200).json({
                    message: 'No articles found.',
                    data: [],
                });
            }

            res.status(200).json({
                message: 'Articles successfully retrieved.',
                data: articles,
            });
        } catch (error) {
            res.status(500).json({
                message: 'An error occurred while retrieving articles.',
                error: error.message,
            });
        }
    }

    static async getArticleById(req, res) {
        const { id } = req.params;

        try {
            const article = await Article.findByPk(id, {
                include: [
                    {
                        model: User,
                        attributes: ['email'],
                    },
                    {
                        model: Comment,
                        attributes: [],
                    },
                ],
                attributes: [
                    'id',
                    'title',
                    'content',
                    [sequelize.fn('COUNT', sequelize.col('Comments.id')), 'commentCount'],
                ],
                group: ['Article.id', 'User.id'],
            });

            if (!article) {
                return res.status(404).json({
                    message: 'Article not found.',
                });
            }

            res.status(200).json({
                message: 'Article successfully retrieved.',
                data: article,
            });
        } catch (error) {
            res.status(500).json({
                message: 'An error occurred while retrieving the article.',
                error: error.message,
            });
        }
    }

    static async createArticle(req, res) {
        const { title, content, userId } = req.body;

        try {
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({
                    message: 'User not found',
                });
            }

            const article = await Article.create({ title, content, userId });

            res.status(201).json({
                message: 'Article successfully created.',
                data: article,
            });
        } catch (error) {
            res.status(500).json({
                message: 'An error occurred while creating the article.',
                error: error.message,
            });
        }
    }

    static async updateArticle(req, res) {
        const { id } = req.params;
        const { title, content } = req.body;

        try {
            const article = await Article.update(
                { title, content },
                { where: { id } }
            );

            if (!article[0]) {
                return res.status(404).json({
                    message: 'Article not found.',
                });
            }

            res.status(200).json({
                message: 'Article successfully updated.',
            });
        } catch (error) {
            res.status(500).json({
                message: 'An error occurred while updating the article.',
                error: error.message,
            });
        }
    }

    static async deleteArticle(req, res) {
        const { id } = req.params;

        try {
            const rowsDeleted = await Article.destroy({ where: { id } });

            if (!rowsDeleted) {
                return res.status(404).json({
                    message: 'Article not found.',
                });
            }

            res.status(204).send();
        } catch (error) {
            res.status(500).json({
                message: 'An error occurred while deleting the article.',
                error: error.message,
            });
        }
    }

    static async getCommentsByArticle(req, res) {
        const { id } = req.params;

        try {
            const article = await Article.findByPk(id);
            if (!article) {
                return res.status(404).json({
                    message: 'Article not found.',
                });
            }

            const comments = await Comment.findAll({
                where: { article_id: id },
                attributes: ['content'],
            });

            res.status(200).json({
                message: 'Comments successfully retrieved.',
                data: comments,
            });
        } catch (error) {
            res.status(500).json({
                message: 'An error occurred while retrieving comments.',
                error: error.message,
            });
        }
    }
}
