import { Article } from "../models/article.js";
import { Comment } from "../models/comment.js";
import { User } from "../models/user.js";

export class CommentController {
    static async getComments(req, res) {
        try {
            const comments = await Comment.findAll({
                include: [
                    {
                        model: User,
                        attributes: ['username'],
                    },
                    {
                        model: Article,
                        attributes: ['title'],
                    },
                ],
                attributes: ['id', 'content'],
            });

            if (comments.length === 0) {
                return res.status(200).json({
                    message: 'No comments found.',
                    data: [],
                });
            }

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

    static async getCommentById(req, res) {
        const { id } = req.params;

        try {
            const comment = await Comment.findByPk(id, {
                include: [
                    {
                        model: User,
                        attributes: ['username'],
                    },
                    {
                        model: Article,
                        attributes: ['title'],
                    },
                ],
                attributes: ['id', 'content'],
            });

            if (!comment) {
                return res.status(404).json({
                    message: 'Comment not found.',
                });
            }

            res.status(200).json({
                message: 'Comment successfully retrieved.',
                data: comment,
            });
        } catch (error) {
            res.status(500).json({
                message: 'An error occurred while retrieving the comment.',
                error: error.message,
            });
        }
    }

    static async createComment(req, res) {
        const { content, user_id, article_id } = req.body;

        try {
            const user = await User.findByPk(user_id);
            if (!user) {
                return res.status(404).json({
                    message: 'User not found.',
                });
            }

            const article = await Article.findByPk(article_id);
            if (!article) {
                return res.status(404).json({
                    message: 'Article not found.',
                });
            }

            const comment = await Comment.create({ content, user_id, article_id });

            res.status(201).json({
                message: 'Comment successfully created.',
                data: {
                    content: comment,
                },
            });
        } catch (error) {
            res.status(500).json({
                message: 'An error occurred while creating the comment.',
                error: error.message,
            });
        }
    }

    static async updateComment(req, res) {
        const { id } = req.params;
        const { content } = req.body;

        try {
            const comment = await Comment.update(
                { content },
                { where: { id } }
            );

            if (!comment[0]) {
                return res.status(404).json({
                    message: 'Comment not found.',
                });
            }

            res.status(200).json({
                message: 'Comment successfully updated.',
            });
        } catch (error) {
            res.status(500).json({
                message: 'An error occurred while updating the comment.',
                error: error.message,
            });
        }
    }

    static async deleteComment(req, res) {
        const { id } = req.params;

        try {
            const rowsDeleted = await Comment.destroy({ where: { id } });

            if (!rowsDeleted) {
                return res.status(404).json({
                    message: 'Comment not found.',
                });
            }

            res.status(204).send();
        } catch (error) {
            res.status(500).json({
                message: 'An error occurred while deleting the comment.',
                error: error.message,
            });
        }
    }
}
