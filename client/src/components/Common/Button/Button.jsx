const Button = ({ children, onClick }) => {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl" onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
