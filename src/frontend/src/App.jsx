import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Pokemon List</div>} />
        <Route path="/pokemon/:id" element={<div>Pokemon Detail</div>} />
        <Route path="/pokedex" element={<div>Pokedex</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
