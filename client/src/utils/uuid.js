const uuid = () => {
  return `${parseInt(Math.random(10000) * 100000000000, 10)}`
}

export default uuid
