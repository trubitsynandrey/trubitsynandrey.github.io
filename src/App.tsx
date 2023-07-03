import './App.scss'
import './fonts/fonts.css'

import { Quiz } from './components/quiz/Quiz'
import { QuizProvider } from './containers/QuizProvider'

function App() {
  return (
    <QuizProvider>
      <Quiz />
    </QuizProvider>
  )
}

export default App
