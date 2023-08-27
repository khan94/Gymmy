import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from 'react-modal'
import EditSetForm from '../EditSetForm'
import { useState } from 'react'

const EditSetModal = ({ editingSet, handleUpdateSet, onClose }) => {
  const [weight, setWeight] = useState(editingSet.weight || '')
  const [reps, setReps] = useState(editingSet.reps || '')
  const [notes, setNotes] = useState(editingSet.notes || '')

  return (
    <Modal
      className="bg-zinc-800 p-4 rounded-xl flex flex-col gap-4 min-w-[20rem]"
      overlayClassName="inset-0 fixed flex items-center justify-center bg-gray-600/[.50]"
      isOpen={Boolean(editingSet)}
      onRequestClose={onClose}
      ariaHideApp={false}
    >
      <div className="flex flex-row justify-between items-center text-xl font-bold">
        <span>Edit Set X</span>
        <FontAwesomeIcon icon={faTimes} onClick={onClose} />
      </div>
      <EditSetForm
        weight={weight}
        setWeight={setWeight}
        reps={reps}
        setReps={setReps}
        notes={notes}
        setNotes={setNotes}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"
        onClick={() => handleUpdateSet({ setId: editingSet.id, weight, reps, notes, onSuccess: onClose })}
      >
        Save
      </button>
    </Modal>
  )
}

export default EditSetModal
