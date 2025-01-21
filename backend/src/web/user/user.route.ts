import { Router } from 'express'
import errorWrapper from '../../utils/errorWrapper'
import { Components } from '../../components'
import { UserController } from './user.controller'
import authenticateJWT from '../middlewares/authenticateJWT'

const router = ({ userComponent }: Components) => {
    const servicePaths = Router()
    const userController = new UserController(userComponent)

    servicePaths.get(
        '/users',
        authenticateJWT,
        errorWrapper(userController.findUser)
    )

    servicePaths.patch(
        '/users/email',
        authenticateJWT,
        errorWrapper(userController.updateEmail)
    )
    return servicePaths
}

export default router
