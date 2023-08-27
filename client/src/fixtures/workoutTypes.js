import ChestIcon from 'src/assets/chest-male.svg'
import BackIcon from 'src/assets/back-male.svg'
import LegIcon from 'src/assets/leg-muscle.svg'
import FreestyleIcon from 'src/assets/waist-male.svg'

export const WORKOUT_TYPES = {
  CHEST_WORKOUT_TYPE: 'chest',
  BACK_WORKOUT_TYPE: 'back',
  LEG_WORKOUT_TYPE: 'leg',
  FREESTYLE_WORKOUT_TYPE: 'free',
}

export const TYPE_OBJECTS = [
  { type: WORKOUT_TYPES.CHEST_WORKOUT_TYPE, title: 'Chest Day', icon: ChestIcon },
  { type: WORKOUT_TYPES.BACK_WORKOUT_TYPE, title: 'Back Day', icon: BackIcon },
  { type: WORKOUT_TYPES.LEG_WORKOUT_TYPE, title: 'Leg Day', icon: LegIcon },
  { type: WORKOUT_TYPES.FREESTYLE_WORKOUT_TYPE, title: 'Freestyle', icon: FreestyleIcon },
]
