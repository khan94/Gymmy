import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import dayjs from 'dayjs'
import { useCallback, useEffect, useState } from 'react'
import Modal from 'react-modal'

const ExerciseInfoModal = ({ exercise, onClose }) => {
  const [prevExerciseInfo, setPrevExerciseInfo] = useState(null)
  const [isInstructionsExpanded, setIsInstructionsExpanded] = useState(false)

  const getExercisePrevStats = useCallback(async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_CORE_API}/api/sets/previousSets/${exercise.id}`)
      if (res.data.sets.length > 0) setPrevExerciseInfo(res.data)
    } catch (err) {
      console.error('Error ocurred when trying to get previous ')
    }
  }, [exercise.id])

  useEffect(() => {
    getExercisePrevStats()
  }, [getExercisePrevStats])

  return (
    <Modal
      className="bg-zinc-800 p-4 rounded-xl flex flex-col gap-4 min-w-[20rem] max-w-[90%] max-h-[80%] overflow-auto"
      overlayClassName="inset-0 fixed flex items-center justify-center bg-gray-600/[.50]"
      isOpen={Boolean(exercise)}
      onRequestClose={onClose}
      ariaHideApp={false}
    >
      <div className="flex flex-row justify-between items-center text-xl font-bold">
        <span>{exercise.name}</span>
        <FontAwesomeIcon icon={faTimes} onClick={onClose} />
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex-1">Type: {exercise.type}</div>
        {/* for difficulty: use icons: {beginner, intermediate, expert} */}
        <div className="flex-1">Difficulty: {exercise.difficulty}</div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex-1">Equipment: {exercise.equipment}</div>
        <div className="flex-1">Muscle: {exercise.muscle}</div>
      </div>
      {prevExerciseInfo && (
        <div>
          <div>Previous Results: {dayjs(prevExerciseInfo.date).format('DD MMM, YYYY')}</div>
          {prevExerciseInfo.sets.map((set, i) => (
            <div key={set.id} className="  py-1">
              <div className="flex flex-row justify-between items-center">
                <span className="font-extrabold">SET {prevExerciseInfo.sets.length - i}:</span>
                <span>{set.weight} lbs</span>
                <span>{set.reps} reps</span>
              </div>
              {set.notes && <span>{set.notes}</span>}
            </div>
          ))}
        </div>
      )}
      <div>
        <div>Instructions</div>
        {/* TODO: implement constants to use, such as max chars, height of header, etc. */}
        <div>
          {isInstructionsExpanded ? (
            <span>{exercise.instructions}</span>
          ) : (
            <span>{exercise.instructions.slice(0, 145)}</span>
          )}
          {exercise.instructions.length > 145 && (
            <>
              {' '}
              {isInstructionsExpanded ? (
                <span className="text-sky-600 underline" onClick={() => setIsInstructionsExpanded(false)}>
                  Read less
                </span>
              ) : (
                <span className="text-sky-600 underline" onClick={() => setIsInstructionsExpanded(true)}>
                  Read more
                </span>
              )}
            </>
          )}
        </div>
      </div>
      {/* TODO: potentially might move some delete functionality in here so users don't accidentally press it */}
    </Modal>
  )
}

export default ExerciseInfoModal
