import { useState } from 'react'
import './App.css'
import ApiComponent from './components/ApiComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='name '>Navigator</div>
      <div>
        <ApiComponent/>
      </div>
    </>
  )
}

export default App
