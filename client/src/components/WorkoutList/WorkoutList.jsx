import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import NewWorkoutModal from "./partials/NewWorkoutModal";
import { workoutTypeToIconMapper } from "src/utils/mappers";
import { useNavigate } from "react-router-dom";
import { AVAILABLE_ROUTES } from "src/fixtures/routerConfig";
import axios from "axios";
import dayjs from "dayjs";

const WorkoutList = () => {
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const getAllWorkouts = useCallback(async () => {
    try {
      console.log(
        "import.meta.env.VITE_CORE_API: ",
        import.meta.env.VITE_CORE_API
      );
      const res = await axios.get(
        `${import.meta.env.VITE_CORE_API}/api/workouts`
      );
      setWorkouts(res.data);
    } catch (err) {
      console.error("Error ocurred when trying to get workouts list");
    }
  }, []);

  useEffect(() => {
    getAllWorkouts();
  }, [getAllWorkouts]);

  const handleCreateWorkout = async (type, name) => {
    if (!type) {
      console.error("Please select workout type before continuing");
      // TODO: replace with some toast
      return;
    }
    if (!name) {
      console.error("Please select workout name before continuing");
      // TODO: replace with some toast
      return;
    }
    const newWorkout = {
      type,
      name,
      date: new Date(),
    };
    try {
      await axios.post(
        `${import.meta.env.VITE_CORE_API}/api/workouts`,
        newWorkout
      );
      setIsCreateModalOpen(false);
      getAllWorkouts();
    } catch (err) {
      console.error("Error ocurred when trying to add a new workout");
    }
  };

  return (
    <div className="overflow-auto mx-2 h-[calc(100%-3rem)]">
      <div className="flex flex-row gap-3 items-center">
        <span className="text-xl font-bold">Workouts List</span>
      </div>
      <div
        role="button"
        className="text-blue-400 flex flex-row gap-2 my-2 p-2 border rounded-xl border-blue-400 justify-center items-center font-bold"
        onClick={() => setIsCreateModalOpen(true)}
      >
        <FontAwesomeIcon icon={faPlus} />
        <span>New Workout</span>
      </div>
      <div className="m-2 flex flex-col gap-4">
        <span>Previous workouts</span>
        {workouts.length ? (
          workouts.map(({ id, type, name, date, exercises }) => (
            <div
              role="button"
              key={id}
              className="flex flex-row items-center gap-2 border rounded-xl py-1 px-2"
              onClick={() => navigate(`${AVAILABLE_ROUTES.WORKOUT}/${id}`)}
            >
              <img
                src={workoutTypeToIconMapper(type)}
                alt="icon"
                className="h-10"
              />
              <div className="grid grid-cols-4 flex-1">
                <span className="font-extrabold col-span-2 text-lg">
                  {name}
                </span>
                <span className="text-end col-span-2 text-gray-500">
                  {dayjs(date).format("DD/MMM/YYYY")}
                </span>
                <span className="col-span-3 text-gray-500 text-sm">
                  Sets: X, Total reps: XX
                </span>
                <span className="text-end">stats</span>
              </div>
            </div>
          ))
        ) : (
          <div>
            No workouts found, click{" "}
            <span
              role="button"
              className="text-blue-400 underline"
              onClick={() => setIsCreateModalOpen(true)}
            >
              here
            </span>{" "}
            to start a workout
          </div>
        )}
      </div>
      {isCreateModalOpen && (
        <NewWorkoutModal
          isCreateModalOpen={isCreateModalOpen}
          setIsCreateModalOpen={setIsCreateModalOpen}
          handleCreateWorkout={handleCreateWorkout}
        />
      )}
    </div>
  );
};

export default WorkoutList;
