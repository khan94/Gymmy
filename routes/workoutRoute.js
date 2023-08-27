import express from 'express'
import workoutController from '../controllers/workoutController.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()
router.get('/', protect, workoutController.getWorkouts)

router.post('/', protect, workoutController.createWorkout)

router.get('/:id', protect, workoutController.getWorkoutDetails)

export default router
