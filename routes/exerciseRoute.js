import express from 'express'
import exerciseController from '../controllers/exerciseController.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/:workoutId', protect, exerciseController.createExercise)

router.delete('/:id', protect, exerciseController.deleteExercise)

export default router
