import { useState } from 'react'
import './App.css'
import ApiComponent from './components/ApiComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        
      </div>
      <h1 className='name '>Navigator</h1>
      <div>
        <ApiComponent/>
      </div>
    </>
  )
}

export default App
