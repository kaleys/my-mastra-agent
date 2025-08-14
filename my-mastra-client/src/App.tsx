/** @format */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Other } from './pages/Other'
import { Chat } from './pages/Chat'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/other" element={<Other />} />
      </Routes>
    </Router>
  )
}

export default App
