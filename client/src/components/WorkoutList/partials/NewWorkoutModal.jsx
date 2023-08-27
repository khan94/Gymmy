import Modal from 'react-modal'
import { useState } from 'react'
import styled from 'styled-components'
import { TYPE_OBJECTS } from 'src/fixtures/workoutTypes'
import Input from 'src/components/Common/Input/Input'
import Button from 'src/components/Common/Button/Button'

const WorkoutType = styled.div`
  ${({ $isSelected }) =>
    $isSelected &&
    `
        box-shadow: 0 0 7px 2px #ff6700;
        font-weight: bolder;
    `}
`

const NewWorkoutModal = ({ isCreateModalOpen, setIsCreateModalOpen, handleCreateWorkout }) => {
  const [selectedType, setSelectedType] = useState(null)
  const [workoutName, setWorkoutName] = useState('')

  return (
    <Modal
      className="bg-zinc-800 p-4 rounded-xl flex flex-col gap-4 min-w-[20rem]"
      overlayClassName="inset-0 fixed flex items-center justify-center bg-gray-600/[.50]"
      isOpen={isCreateModalOpen}
      onRequestClose={() => setIsCreateModalOpen(false)}
    >
      <div className="text-center text-xl font-bold">Start Workout</div>
      <div className="grid grid-cols-2 gap-4">
        {TYPE_OBJECTS.map(({ type, title, icon }) => (
          <TypeCard
            key={type}
            icon={icon}
            title={title}
            type={type}
            selectedType={selectedType}
            setSelectedType={(type) => {
              setSelectedType(type)
              setWorkoutName(title)
            }}
          />
        ))}
      </div>
      <Input
        value={workoutName}
        onChange={({ target: { value } }) => setWorkoutName(value)}
        placeholder="Workout name"
      />
      {/* <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"
        onClick={() => handleCreateWorkout(selectedType, workoutName)}
      >
        Start
      </button> */}
      <Button onClick={() => handleCreateWorkout(selectedType, workoutName)}>Start</Button>
    </Modal>
  )
}

const TypeCard = ({ icon, title, type, selectedType, setSelectedType }) => {
  return (
    <WorkoutType
      $isSelected={type === selectedType}
      role="button"
      onClick={() => setSelectedType(type)}
      className="border p-2 rounded-lg flex flex-col items-center"
    >
      <img src={icon} alt="back" />
      <span>{title}</span>
    </WorkoutType>
  )
}

export default NewWorkoutModal
