const Input = ({ value, onChange, placeholder }) => {
  return (
    <input
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className="w-full bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    />
  )
}

export default Input
