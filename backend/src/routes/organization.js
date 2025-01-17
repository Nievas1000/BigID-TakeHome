import { Router } from 'express'
import { OrganizationController } from '../controllers/organization.js'

const router = Router()

router.get('/', OrganizationController.getOrganizations)
router.post('/', OrganizationController.createOrganization)
router.get('/:id', OrganizationController.getOrganizationById)
router.put('/:id', OrganizationController.updateOrganization)
router.delete('/:id', OrganizationController.deleteOrganization)
router.get('/users/:id', OrganizationController.getUsersByOrganization)

export default router