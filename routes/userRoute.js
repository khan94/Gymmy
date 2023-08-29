import express from 'express'
import userController from '../controllers/userController.js'
// import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/', userController.registerUser)
router.post('/auth', userController.authUser)
router.post('/logout', userController.logoutUser)
// router.route('/profile').get(protect, userController.getUserProfile).put(protect, userController.updateUserProfile)
// router.put('/profile-name', protect, userController.updateUserProfileName)
// router.put('/profile-password', protect, userController.updateUserProfilePassword)

export default router
