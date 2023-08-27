const workout = {
  date: '',
  exercises: [],
}

const exerciseType = {
  icon: '',
  name: '',
  howToLink: '', // prob in youtube
}
// if possible, make exercise an extention of exerciseType
const exercise = {
  typeId: '',
  howToLink: '', // prob in youtube, provided from exerciseType
  sets: [],
}

const set = {
  exerciseId: '',
  weight: 0, // optional
  weightType: '', // ENUM
  reps: 0,
  notes: '', // optional
}

const Dashboard = () => {
  return <div>Dashboard</div>
}

export default Dashboard
