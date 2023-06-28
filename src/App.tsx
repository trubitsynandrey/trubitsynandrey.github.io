import './App.scss'

import { useState } from 'react'

import { Modal } from './components/modal/Modal'
import { Quiz } from './components/quiz/Quiz'
import { QuizProvider } from './containers/QuizProvider'

function App() {
  const [isModal, setIsModal] = useState(true)

  const handleCloseModal = () => setIsModal(false)

  return (
    <>
      <QuizProvider>
        <Quiz />
      </QuizProvider>
      <Modal handleCloseModal={handleCloseModal} isModal={isModal} />
    </>
  )
}

export default App
