import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import About from '../screens/About'
import Home from '../screens/Home'
import OnboardingDeck from './OnboardingDeck'
import RainSlider from '../screens/RainSlider'

const App: React.FC = () => {
  const hasSeenIntro = false

  return (
    <Router>
      <Routes>
        {!hasSeenIntro && <Route path="/" element={<OnboardingDeck />} />}
        <Route path="/slider" element={<RainSlider />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  )
}

export default App
