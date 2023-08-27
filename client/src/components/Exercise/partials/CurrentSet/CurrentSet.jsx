import { useState } from 'react'
import EditSetForm from '../EditSetForm'

const CurrentSet = ({ handleAddSet }) => {
  const [weight, setWeight] = useState('')
  const [reps, setReps] = useState('')
  const [notes, setNotes] = useState('')

  const clearState = () => {
    setWeight('')
    setReps('')
    setNotes('')
  }

  return (
    <EditSetForm
      handleAddSet={(args) => handleAddSet({ ...args, onSuccess: clearState })}
      weight={weight}
      setWeight={setWeight}
      reps={reps}
      setReps={setReps}
      notes={notes}
      setNotes={setNotes}
    />
  )
}

export default CurrentSet
