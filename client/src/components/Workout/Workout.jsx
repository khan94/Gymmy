import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCallback, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AddExerciseDropdown from './partials/AddExerciseDropdown'
import Exercise from '../Exercise/Exercise'
import { AVAILABLE_ROUTES } from 'src/fixtures/routerConfig'
import axios from 'axios'

const Workout = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [workout, setWorkout] = useState(null)
  const [expandedExercise, setExpandedExercise] = useState(null)
  const [isAddOpen, setIsAddOpen] = useState(false)

  const getWorkoutDetails = useCallback(
    async (isInitial = false) => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_CORE_API}/api/workouts/${id}`)
        setWorkout(res.data)
        if (res.data.exercises.length && isInitial) {
          // INFO: only do when newly loading, otherwise UX is bad
          setExpandedExercise(res.data.exercises[0].id)
        }
      } catch (err) {
        console.error('Error ocurred when trying to retrieve workout details: ', err)
      }
    },
    [id]
  )

  const handleAddSet = async ({ exerciseId, weight, reps, notes, onSuccess }) => {
    if (!weight) {
      console.warn('Please provide weight before adding set')
      return
    }
    if (!reps) {
      console.warn('Please provide reps count before adding set')
      return
    }
    const body = {
      weight,
      reps,
      notes,
    }
    try {
      const res = await axios.post(`${import.meta.env.VITE_CORE_API}/api/sets/${exerciseId}`, body)
      onSuccess && onSuccess()
      getWorkoutDetails()
    } catch (err) {
      console.error('Error ocurred when trying to add new set: ', err)
    }
  }

  const handleUpdateSet = async ({ setId, weight, reps, notes, onSuccess }) => {
    if (!weight) {
      console.warn('Please provide weight before adding set')
      return
    }
    if (!reps) {
      console.warn('Please provide reps count before adding set')
      return
    }
    const body = {
      weight,
      reps,
      notes,
    }
    try {
      const res = await axios.put(`${import.meta.env.VITE_CORE_API}/api/sets/${setId}`, body)
      onSuccess && onSuccess()
      getWorkoutDetails()
    } catch (err) {
      console.error('Error ocurred when trying to edit set: ', err)
    }
  }

  useEffect(() => {
    getWorkoutDetails(true)
  }, [getWorkoutDetails])

  const handleCreateNewExercise = async (exercise) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_CORE_API}/api/exercises/${id}`, exercise)
      getWorkoutDetails()
      setIsAddOpen(false)
    } catch (err) {
      console.error('Error ocurred when trying to add exercise: ', err)
    }
  }

  return (
    <div className="overflow-auto mx-2 h-[calc(100vh-3rem)]">
      <div className="flex flex-row gap-3 items-center py-2">
        <FontAwesomeIcon
          role="button"
          icon={faCircleChevronLeft}
          onClick={() => navigate(AVAILABLE_ROUTES.DASHBOARD)}
        />
        {!isAddOpen && (
          <span className="text-xl font-bold flex-1">{workout ? workout.name || workout.type : 'Loading Data...'}</span>
        )}
        <AddExerciseDropdown
          isOpen={isAddOpen}
          setIsOpen={setIsAddOpen}
          handleCreateNewExercise={handleCreateNewExercise}
        />
      </div>
      {workout?.exercises?.length ? (
        <div className="flex flex-col gap-3">
          {workout.exercises.map((exercise) => (
            <Exercise
              key={exercise.id}
              exercise={exercise}
              isExpanded={expandedExercise === exercise.id}
              setExpandedExercise={setExpandedExercise}
              handleAddSet={(args) => handleAddSet({ exerciseId: exercise.id, ...args })}
              getWorkoutDetails={getWorkoutDetails}
              handleUpdateSet={handleUpdateSet}
            />
          ))}
        </div>
      ) : (
        <div className="text-center p-4">
          No Exercises added yet. Get your ass moving by clicking on the + icon above
        </div>
      )}
    </div>
  )
}

export default Workout
