import ChestIcon from 'src/assets/chest-male.svg'
import BackIcon from 'src/assets/back-male.svg'
import LegIcon from 'src/assets/leg-muscle.svg'
import FreestyleIcon from 'src/assets/waist-male.svg'
import { WORKOUT_TYPES } from 'src/fixtures/workoutTypes'

export const workoutTypeToIconMapper = (type) => {
  switch (type) {
    case WORKOUT_TYPES.CHEST_WORKOUT_TYPE:
      return ChestIcon
    case WORKOUT_TYPES.BACK_WORKOUT_TYPE:
      return BackIcon
    case WORKOUT_TYPES.LEG_WORKOUT_TYPE:
      return LegIcon
    case WORKOUT_TYPES.FREESTYLE_WORKOUT_TYPE:
      return FreestyleIcon
    default:
      throw Error('Should not get here, maybe you did not define type?')
  }
}
