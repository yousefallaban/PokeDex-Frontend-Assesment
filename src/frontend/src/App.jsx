import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PokedexProvider } from './context/PokedexContext'
import Navigation from './components/Navigation/Navigation'
import PokemonListPage from './pages/PokemonListPage'
import CollectionPage from './pages/CollectionPage'

function App() {
  return (
    <BrowserRouter>
      <PokedexProvider>
        <Navigation />
        <Routes>
          <Route path="/" element={<PokemonListPage />} />
          <Route path="/collection" element={<CollectionPage />} />
        </Routes>
      </PokedexProvider>
    </BrowserRouter>
  )
}

export default App
