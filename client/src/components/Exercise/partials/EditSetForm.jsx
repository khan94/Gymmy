import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const EditSetForm = ({ handleAddSet, weight, setWeight, reps, setReps, notes, setNotes }) => {
  return (
    <div className="flex flex-col gap-2 pt-2">
      <div className="flex flex-row gap-2 items-center">
        <div className="relative flex-1">
          <input
            value={weight}
            placeholder="Weight (in lbs.)"
            onChange={({ target: { value } }) => setWeight(value)}
            className="w-full bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="relative flex-1">
          <input
            value={reps}
            placeholder="Reps"
            onChange={({ target: { value } }) => setReps(value)}
            className="w-full bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        {handleAddSet && (
          <FontAwesomeIcon
            className="border rounded-full w-4 h-4 p-1 border-gray-600 bg-gray-600"
            role="button"
            icon={faPlus}
            onClick={() => handleAddSet({ weight, reps, notes })}
          />
        )}
      </div>
      <div>
        <textarea
          value={notes}
          onChange={({ target: { value } }) => setNotes(value)}
          placeholder="Any notes? (optional)"
          className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
    </div>
  )
}

export default EditSetForm
