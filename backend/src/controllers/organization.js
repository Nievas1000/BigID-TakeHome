import { sequelize } from '../config/db.js'
import { Organization } from '../models/organization.js'
import { User } from '../models/user.js'

export class OrganizationController {
    static async getOrganizations(req, res) {
        try {
            const organizations = await Organization.findAll({
                include: [{
                    model: User,
                    attributes: []
                }],
                attributes: [
                    'id',
                    'name',
                    [sequelize.fn('COUNT', sequelize.col('Users.id')), 'userCount']
                ],
                group: ['Organization.id']
            })

            if (organizations.length === 0) {
                return res.status(200).json({
                    message: 'No organizations found.',
                    data: []
                })
            }

            res.status(200).json({
                message: 'Organizations successfully retrieved.',
                data: organizations
            })
        } catch (error) {
            res.status(500).json({
                message: 'An error occurred while retrieving organizations',
                error: error.message
            })
        }
    }

    static async getOrganizationById(req, res) {
        const { id } = req.params;

        try {
            const organization = await Organization.findByPk(id, {
                include: [
                    {
                        model: User,
                        attributes: [],
                    },
                ],
                attributes: [
                    'id',
                    'name',
                    [sequelize.fn('COUNT', sequelize.col('Users.id')), 'userCount']
                ],
            });

            if (!organization) {
                return res.status(404).json({ error: 'Organization not found.' });
            }

            res.status(200).json({
                message: 'Organization successfully retrieved.',
                data: organization
            })
        } catch (error) {
            res.status(500).json({
                message: 'An error occurred while retrieving the organization',
                error: error.message
            })
        }
    };

    static async createOrganization(req, res) {
        const { name } = req.body
        try {
            const organization = await Organization.create({ name });
            res.status(201).json({
                message: 'Organization successfully registered',
                data: organization.name
            })
        } catch (error) {
            res.status(500).json({
                message: 'An error occurred while creating organization',
                error: error.message
            })
        }
    }

    static async updateOrganization(req, res) {
        const { id } = req.params;
        const { name } = req.body;

        try {
            const organization = await Organization.update({ name }, { where: { id } });

            if (!organization[0]) {
                return res.status(404).json({ error: 'Organization not found.' });
            }

            res.status(200).json({ message: 'Organization successfully updated' });
        } catch (error) {
            res.status(500).json({
                message: 'An error occurred while updating organization',
                error: error.message
            })
        }
    }

    static async deleteOrganization(req, res) {
        const { id } = req.params;

        try {
            const rowsDeleted = await Organization.destroy({ where: { id } });

            if (!rowsDeleted) {
                return res.status(404).json({ error: 'Organization not found.' });
            }

            res.status(204).send();
        } catch (error) {
            res.status(500).json({
                message: 'An error occurred while deleting the organization',
                error: error.message
            })
        }
    }

    static async getUsersByOrganization(req, res) {
        const { id } = req.params;

        try {

            const organization = await Organization.findByPk(id);
            if (!organization) {
                return res.status(404).json({ error: 'Organization not found' });
            }


            const users = await User.findAll({
                where: { organization_id: id },
                attributes: ['id', 'username'],
            });

            res.status(200).json({
                message: 'Users successfully retrieved.',
                data: {
                    organization: organization,
                    users
                }
            });
        } catch (error) {
            res.status(500).json({
                message: 'An error occurred while retrieving users',
                error: error.message
            })
        }
    }
}
