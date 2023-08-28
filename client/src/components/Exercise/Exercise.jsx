import {
  faCaretDown,
  faCaretUp,
  faEdit,
  faInfoCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo, useState } from "react";
import styled from "styled-components";
import CurrentSet from "./partials/CurrentSet/CurrentSet";
import EditSetModal from "./partials/EditSetModal/EditSetModal";
import ExerciseInfoModal from "./partials/ExerciseInfoModal/ExerciseInfoModal";
import axios from "axios";
import ConfirmDeleteModal from "../Common/ConfirmDeleteModal/ConfirmDeleteModal";

const Collapse = styled.div`
  overflow: auto;
  max-height: 0;
  transition: max-height 0.5s cubic-bezier(0, 1, 0, 1);
  ${({ $isOpen }) =>
    $isOpen &&
    `
    max-height: 200px;
    transition: max-height 1s ease-in-out;
  `}
`;

const Exercise = ({
  exercise,
  isExpanded,
  setExpandedExercise,
  handleAddSet,
  handleUpdateSet,
  getWorkoutDetails,
}) => {
  const [editingSet, setEditingSet] = useState(null);
  const [isDeleteExerciseModalOpen, setIsDeleteExerciseModalOpen] =
    useState(false);
  const [setIdToDelete, setSetIdToDelete] = useState(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const setsToShow = useMemo(() => {
    return exercise?.sets?.reverse();
  }, [exercise?.sets]);

  const handleDeleteExercise = async () => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_CORE_API}/api/exercises/${exercise.id}`
      );
      setIsDeleteExerciseModalOpen(false);
      getWorkoutDetails();
    } catch (err) {
      console.error("Error ocurred when trying to delete exercise: ", err);
    }
  };

  const handleDeleteSet = async (setId) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_CORE_API}/api/sets/${setId}`
      );
      setSetIdToDelete(null);
      getWorkoutDetails();
    } catch (err) {
      console.error("Error ocurred when trying to delete exercise: ", err);
    }
  };

  return (
    <div className="border border-zinc-500 p-2 rounded-xl">
      <div
        role="button"
        className="flex flex-row justify-between items-center"
        onClick={() =>
          isExpanded
            ? setExpandedExercise(null)
            : setExpandedExercise(exercise.id)
        }
      >
        <span>{exercise.name}</span>
        <span className="flex flex-row gap-3">
          <FontAwesomeIcon
            icon={faInfoCircle}
            onClick={(e) => {
              e.stopPropagation();
              setIsInfoModalOpen(true);
            }}
          />
          <FontAwesomeIcon
            icon={faTrash}
            onClick={(e) => {
              e.stopPropagation();
              setIsDeleteExerciseModalOpen(true);
            }}
          />
          <FontAwesomeIcon icon={isExpanded ? faCaretDown : faCaretUp} />
        </span>
      </div>
      <Collapse $isOpen={isExpanded}>
        <CurrentSet handleAddSet={handleAddSet} />
        <div>
          {exercise?.sets?.length ? (
            exercise?.sets?.map((set, i) => (
              <div key={set.id} className="  py-1">
                <div className="flex flex-row justify-between items-center">
                  <span className="font-extrabold">
                    SET {exercise.sets.length - i}:
                  </span>
                  <span>{set.weight} lbs</span>
                  <span>{set.reps} reps</span>
                  <div className="flex flex-row gap-5">
                    <FontAwesomeIcon
                      role="button"
                      icon={faTrash}
                      onClick={() => setSetIdToDelete(set.id)}
                    />
                    <FontAwesomeIcon
                      role="button"
                      icon={faEdit}
                      onClick={() => setEditingSet(set)}
                    />
                  </div>
                </div>
                {set.notes && <span>Notes: {set.notes}</span>}
              </div>
            ))
          ) : (
            <div className="text-center">No Sets yet, let's get it dawg!</div>
          )}
        </div>
      </Collapse>
      {Boolean(editingSet) && (
        <EditSetModal
          editingSet={editingSet}
          handleUpdateSet={handleUpdateSet}
          onClose={() => setEditingSet(null)}
        />
      )}
      {isDeleteExerciseModalOpen && (
        <ConfirmDeleteModal
          title="Confirm Delete Exercise"
          isOpen={isDeleteExerciseModalOpen}
          onClose={() => setIsDeleteExerciseModalOpen(false)}
          handleDelete={handleDeleteExercise}
        >
          <div>
            Are you sure you want to delete exercise{" "}
            <span className="font-extrabold">{exercise.name}</span> with
            <span className="font-extrabold">
              {" "}
              {exercise?.sets.length} sets
            </span>
            ?
          </div>
        </ConfirmDeleteModal>
      )}
      {setIdToDelete && (
        <ConfirmDeleteModal
          isOpen={Boolean(setIdToDelete)}
          title="Confirm Delete Set"
          onClose={() => setSetIdToDelete(null)}
          handleDelete={() => handleDeleteSet(setIdToDelete)}
        >
          <div>
            Are you sure you want to delete set from
            <span className="font-extrabold"> {exercise.name}</span> exercise?
          </div>
        </ConfirmDeleteModal>
      )}
      {isInfoModalOpen && (
        <ExerciseInfoModal
          exercise={exercise}
          onClose={() => setIsInfoModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Exercise;
