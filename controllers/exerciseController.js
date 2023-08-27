import asyncHandler from 'express-async-handler'
import knex from '../db.js'
import { v4 as uuid } from 'uuid'

// @desc    Create exercise
// @route   POST /api/exercises/:workoutId
// @access  Private
const createExercise = asyncHandler(async (req, res) => {
  if (!req.params.workoutId) {
    res.status(400).json({ errorMessage: 'Please provide proper workout id to create an exercise' })
  }
  const newExercise = {
    id: uuid(),
    type: req.body.type,
    name: req.body.name,
    muscle: req.body.muscle,
    equipment: req.body.equipment,
    difficulty: req.body.difficulty,
    instructions: req.body.instructions,
    workoutId: req.params.workoutId,
    userId: req.user.id,
  }

  try {
    await knex('exercises').insert(newExercise)
    console.log('Successfully inserted new exercise')
    res.status(200).json()
  } catch (err) {
    console.error('Error ocurred when trying to insert new exercise into db: ', err)
    if (err.code === 'SQLITE_ERROR') {
      res.status(500).json({ errorMessage: 'Error ocurred when trying to store exercise in DB' })
    }
  }
})

// @desc    Delete exercise
// @route   DELETE /api/exercises/:id
// @access  Private
const deleteExercise = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ errorMessage: 'Please provide proper id to delete an exercise' })
  }
  try {
    await knex('exercises').where({ id: req.params.id }).del()
    console.log('Successfully delete the exercise')
    res.status(200).json()
  } catch (err) {
    console.error('Error ocurred when trying to delete the exercise in db: ', err)
    if (err.code === 'SQLITE_ERROR') {
      res.status(500).json({ errorMessage: 'Error ocurred when trying to delete exercise from DB' })
    }
  }
})

export default { createExercise, deleteExercise }
