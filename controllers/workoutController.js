import asyncHandler from 'express-async-handler'
import knex from '../db.js'
import { v4 as uuid } from 'uuid'
import lodash from 'lodash'

// @desc    Get workouts
// @route   GET /api/workouts
// @access  Private
const getWorkouts = asyncHandler(async (req, res) => {
  const workouts = await knex.select('*').from('workouts').where('userId', req.user.id).orderBy('created_at', 'desc')

  res.status(200).json(workouts)
})

// @desc    Add new workout
// @route   POST /api/workouts
// @access  Private
const createWorkout = asyncHandler(async (req, res) => {
  // TODO: implement validations for date
  const newWorkout = {
    id: uuid(),
    type: req.body.type,
    name: req.body.name,
    date: req.body.date,
    userId: req.user.id,
  }
  try {
    await knex('workouts').insert(newWorkout)
    console.log('Successfully inserted new workout')
    res.status(200).json()
  } catch (err) {
    console.error('Error ocurred when trying to insert new workout into db: ', err)
  }
  res.status(200).json()
})

const getWorkoutDetails = asyncHandler(async (req, res) => {
  const queryResults = await knex('workouts')
    .select(
      'workouts.id as workoutId',
      'workouts.type as workoutType',
      'workouts.date',
      'workouts.name as workoutName',
      'exercises.id as exerciseId',
      'exercises.type as exerciseType',
      'exercises.name as exerciseName',
      'exercises.muscle as exerciseMuscle',
      'exercises.equipment as exerciseEquipment',
      'exercises.difficulty as exerciseDifficulty',
      'exercises.instructions as exerciseInstructions',
      'sets.id as setId',
      'sets.weight as setWeight',
      'sets.reps as setReps',
      'sets.notes as setNotes'
    )
    .leftJoin('exercises', 'workouts.id', '=', 'exercises.workoutId')
    .leftJoin('sets', 'exercises.id', '=', 'sets.exerciseId')
    .orderBy('exercises.created_at', 'desc')
    .orderBy('sets.created_at', 'asc')
    .where('workouts.id', req.params.id)
    .andWhere('workouts.userId', req.user.id)
  const grouped = lodash.groupBy(queryResults, (col) => col.exerciseId)
  const parsed = Object.values(grouped)
  const exercises = parsed
    .filter((e) => e[0].exerciseId)
    .map((e) => {
      return {
        id: e[0].exerciseId,
        type: e[0].exerciseType,
        name: e[0].exerciseName,
        muscle: e[0].exerciseMuscle,
        equipment: e[0].exerciseEquipment,
        difficulty: e[0].exerciseDifficulty,
        instructions: e[0].exerciseInstructions,
        sets: e
          .filter((s) => s.setId)
          .map((s) => {
            return {
              id: s.setId,
              weight: s.setWeight,
              reps: s.setReps,
              notes: s.setNotes,
            }
          }),
      }
    })
  const workoutDetails = {
    id: parsed[0][0].workoutId,
    type: parsed[0][0].workoutType,
    name: parsed[0][0].workoutName,
    date: parsed[0][0].date,
    exercises,
  }
  res.status(200).json(workoutDetails)
})

export default { getWorkouts, createWorkout, getWorkoutDetails }
