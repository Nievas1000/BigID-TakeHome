import { Organization } from "../models/organization.js";
import { User } from "../models/user.js";
import { Comment } from "../models/comment.js"
import { Article } from "../models/article.js";
import { sequelize } from "../config/db.js";

export class UserController {
    static async getUsers(req, res) {
        try {
            const users = await User.findAll({
                include: [
                    {
                        model: Organization,
                        attributes: ['id', 'name',],
                    },
                    {
                        model: Article,
                        attributes: [],
                    },
                    {
                        model: Comment,
                        attributes: [],
                    },
                ],
                attributes: [
                    'id',
                    'username',
                    'email',
                    [sequelize.fn('COUNT', sequelize.col('Articles.id')), 'articleCount'],
                    [sequelize.fn('COUNT', sequelize.col('Comments.id')), 'commentCount'],
                ],
                group: ['User.id', 'Organization.id'],
            });

            if (users.length === 0) {
                return res.status(200).json({
                    message: 'No users found.',
                    data: [],
                });
            }

            res.status(200).json({
                message: 'Users successfully retrieved.',
                data: users,
            });
        } catch (error) {
            res.status(500).json({
                message: 'An error occurred while retrieving users.',
                error: error.message,
            });
        }
    }

    static async getUserById(req, res) {
        const { id } = req.params;

        try {
            const user = await User.findByPk(id, {
                include: [
                    {
                        model: Organization,
                        attributes: ['name'],
                    },
                    {
                        model: Article,
                        attributes: [],
                    },
                    {
                        model: Comment,
                        attributes: [],
                    },
                ],
                attributes: [
                    'id',
                    'username',
                    'email',
                    [sequelize.fn('COUNT', sequelize.col('Articles.id')), 'articleCount'],
                    [sequelize.fn('COUNT', sequelize.col('Comments.id')), 'commentCount'],
                ],
                group: ['User.id', 'Organization.id'],
            });

            if (!user) {
                return res.status(404).json({
                    message: 'User not found.',
                });
            }

            res.status(200).json({
                message: 'User successfully retrieved.',
                data: user,
            });
        } catch (error) {
            res.status(500).json({
                message: 'An error occurred while retrieving the user.',
                error: error.message,
            });
        }
    }

    static async createUser(req, res) {
        const { username, email, organization_id } = req.body;

        try {
            const organization = await Organization.findByPk(organization_id);
            if (!organization) {
                return res.status(404).json({
                    message: 'Organization not found. Cannot create user.',
                });
            }

            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({
                    message: 'Email already exists.',
                });
            }
            const user = await User.create({ username, email, organization_id });

            res.status(201).json({
                message: 'User successfully created.',
                data: user,
            });
        } catch (error) {
            res.status(500).json({
                message: 'An error occurred while creating the user.',
                error: error.message,
            });
        }
    }

    static async updateUser(req, res) {
        const { id } = req.params;
        const { username, email, organizationId } = req.body;

        try {
            const user = await User.update(
                { username, email, organizationId },
                { where: { id } }
            );

            if (!user[0]) {
                return res.status(404).json({
                    message: 'User not found.',
                });
            }

            res.status(200).json({
                message: 'User successfully updated.',
            });
        } catch (error) {
            res.status(500).json({
                message: 'An error occurred while updating the user.',
                error: error.message,
            });
        }
    }

    static async deleteUser(req, res) {
        const { id } = req.params;

        try {
            const rowsDeleted = await User.destroy({ where: { id } });

            if (!rowsDeleted) {
                return res.status(404).json({
                    message: 'User not found.',
                });
            }

            res.status(204).send();
        } catch (error) {
            res.status(500).json({
                message: 'An error occurred while deleting the user.',
                error: error.message,
            });
        }
    }

    static async getCommentsByUser(req, res) {
        const { userId } = req.params;

        try {
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({
                    message: 'User not found.',
                });
            }

            const comments = await Comment.findAll({
                where: { userId },
                attributes: ['content', 'articleId'],
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

    static async getArticlesByUser(req, res) {
        const { userId } = req.params;

        try {
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({
                    message: 'User not found.',
                });
            }

            const articles = await Article.findAll({
                where: { userId },
                attributes: ['title', 'content'],
            });

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
}