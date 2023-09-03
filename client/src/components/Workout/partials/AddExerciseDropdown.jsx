import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

const DropdownWrapper = styled.div`
  ${({ $isOpen }) =>
    $isOpen &&
    `
    flex: 1;
  `}
`

const AddExerciseDropdown = ({ isOpen, setIsOpen, handleCreateNewExercise }) => {
  const [searchValue, setSearchValue] = useState('')
  const [options, setOptions] = useState([])

  const dropdownRef = useRef()

  const getExercises = useCallback(async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_NINJAS_API_EXERCISES}?name=${searchValue}`, {
        headers: { 'X-Api-Key': import.meta.env.VITE_EXERCISES_API_KEY, token: undefined },
      })
      console.log('res: ', res)
      setOptions(res.data)
      // TODO: write an algorithm to collect the result and store into some localStorage, and if some of the results are already in the stored value, ignore them
    } catch (err) {
      if (err.response.data?.error) {
        console.error(err.response.data.error)
      } else console.error('error ocurred trying to retrieve list of exercises: ', err)
    }
  }, [])

  useEffect(() => {
    const clickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', clickOutside)
    return () => document.removeEventListener('mousedown', clickOutside)
  }, [])

  useEffect(() => {
    setSearchValue('')
    if (isOpen) {
      getExercises()
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      console.log('call API to filter?')
    }
  }, [searchValue])

  return (
    <DropdownWrapper className="relative" $isOpen={isOpen} ref={dropdownRef}>
      {isOpen ? (
        <input
          type="text"
          id="default-input"
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.code === 'Escape') {
              setIsOpen(false)
            }
          }}
          autoFocus
          className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      ) : (
        <button
          id="dropdownMenuIconButton"
          className="inline-flex items-center p-2 font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          type="button"
          onClick={() => setIsOpen(true)}
        >
          <FontAwesomeIcon className="h-5 w-5" icon={faPlus} />
        </button>
      )}
      {isOpen && (
        <div
          id="dropdownDots"
          className="absolute z-10 w-full right-18 top-12 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
            {options.map((option) => (
              <li
                key={option.name}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => handleCreateNewExercise(option)}
              >
                {option.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </DropdownWrapper>
  )
}

export default AddExerciseDropdown
