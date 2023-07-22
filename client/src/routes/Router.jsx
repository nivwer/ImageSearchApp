import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Home } from '../pages/Home'
import { About } from '../pages/About'
import { Navigation } from '../components/Navigation/Navigation'


function Router() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
