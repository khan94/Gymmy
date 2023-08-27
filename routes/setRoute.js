import express from 'express'
import setController from '../controllers/setController.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/:exerciseId', protect, setController.createSet)

router.put('/:id', protect, setController.updateSet)

router.delete('/:id', protect, setController.deleteSet)

router.get('/previousSets/:exerciseId', protect, setController.getPreviousSets)

export default router
