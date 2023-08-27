import asyncHandler from 'express-async-handler'
import knex from '../db.js'
import { v4 as uuid } from 'uuid'

// @desc    Create set
// @route   POST /api/sets/:exerciseId
// @access  Private
const createSet = asyncHandler(async (req, res) => {
  if (!req.params.exerciseId) {
    res.status(400).json({ errorMessage: 'Please provide proper exercise id to create a set' })
  }
  const newSet = {
    id: uuid(),
    weight: req.body.weight,
    reps: req.body.reps,
    notes: req.body.notes,
    exerciseId: req.params.exerciseId,
    userId: req.user.id,
  }

  try {
    await knex('sets').insert(newSet)
    console.log('Successfully inserted new set')
    res.status(200).json()
  } catch (err) {
    console.error('Error ocurred when trying to insert new set into db: ', err)
    if (err.code === 'SQLITE_ERROR') {
      res.status(500).json({ errorMessage: 'Error ocurred when trying to store set in DB' })
    }
  }
})

// @desc    Update set
// @route   PUT /api/sets/:id
// @access  Private
const updateSet = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ errorMessage: 'Please provide proper id to update a set' })
  }
  const newSet = {
    weight: req.body.weight,
    reps: req.body.reps,
    notes: req.body.notes,
  }
  try {
    await knex('sets').where({ id: req.params.id }).update(newSet)
    console.log('Successfully deleted the set')
    res.status(200).json()
  } catch (err) {
    console.error('Error ocurred when trying to update the set in db: ', err)
    if (err.code === 'SQLITE_ERROR') {
      res.status(500).json({ errorMessage: 'Error ocurred when trying to update set from DB' })
    }
  }
})

// @desc    Delete set
// @route   DELETE /api/sets/:id
// @access  Private
const deleteSet = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ errorMessage: 'Please provide proper id to delete a set' })
  }
  try {
    await knex('sets').where({ id: req.params.id }).del()
    console.log('Successfully deleted the set')
    res.status(200).json()
  } catch (err) {
    console.error('Error ocurred when trying to delete the set in db: ', err)
    if (err.code === 'SQLITE_ERROR') {
      res.status(500).json({ errorMessage: 'Error ocurred when trying to delete set from DB' })
    }
  }
})

// @desc    Get sets from previous time
// @route   PUT /api/previous-sets/:exerciseId
// @access  Private
const getPreviousSets = asyncHandler(async (req, res) => {
  if (!req.params.exerciseId) {
    res.status(400).json({ errorMessage: 'Please provide proper exercise id to get previous sets for this exercise' })
  }
  try {
    const currentExerciseData = await knex('workouts')
      .select('workouts.date', 'exercises.name')
      .join('exercises', 'workouts.id', '=', 'exercises.workoutId')
      // .orderBy('workouts.date')
      // .select('date')
      .where('exercises.id', req.params.exerciseId)
      .andWhere('userId', req.user.id)

    const prevDate = await knex('sets')
      .select('date')
      .join('exercises', 'sets.exerciseId', '=', 'exercises.id')
      .join('workouts', 'exercises.workoutId', '=', 'workouts.id')
      .where('date', '<', currentExerciseData[0].date)
      .where('exercises.name', currentExerciseData[0].name)
      .orderBy('date', 'desc')
      .limit(1)

    if (prevDate.length === 0) res.status(200).json({ date: null, sets: [] })

    const prevSets = await knex('sets')
      .select('date', 'sets.id as id', 'weight', 'reps', 'notes')
      .join('exercises', 'sets.exerciseId', '=', 'exercises.id')
      .join('workouts', 'exercises.workoutId', '=', 'workouts.id')
      .where('exercises.name', currentExerciseData[0].name)
      .where('workouts.date', prevDate[0].date)
      .orderBy('sets.created_at', 'desc')

    res.status(200).json({
      date: prevSets[0].date,
      sets: prevSets.map((set) => {
        return {
          id: set.id,
          reps: set.reps,
          weight: set.weight,
          notes: set.notes,
        }
      }),
    })
  } catch (err) {
    console.error('Error ocurred when trying to get the previous sets from db: ', err)
    if (err.code === 'SQLITE_ERROR') {
      res.status(500).json({ errorMessage: 'Error ocurred when trying to get previous sets from DB' })
    }
  }
})

export default { createSet, updateSet, deleteSet, getPreviousSets }
