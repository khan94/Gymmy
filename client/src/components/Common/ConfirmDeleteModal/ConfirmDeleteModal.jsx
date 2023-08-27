import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from 'react-modal'

const ConfirmDeleteModal = ({ title, children, handleDelete, onClose, isOpen }) => {
  console.log('tempo')
  return (
    <Modal
      className="bg-zinc-800 p-4 rounded-xl flex flex-col gap-4 min-w-[20rem] max-w-[90%]"
      overlayClassName="inset-0 fixed flex items-center justify-center bg-gray-600/[.50]"
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
    >
      <div className="flex flex-row justify-between items-center text-xl font-bold">
        <span>{title}</span>
        <FontAwesomeIcon icon={faTimes} onClick={onClose} />
      </div>
      <div>{children}</div>
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl" onClick={handleDelete}>
        Delete
      </button>
    </Modal>
  )
}

export default ConfirmDeleteModal
