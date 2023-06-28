import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react'

import { quizData } from '../data/quizData'

interface Answer {
  id: string
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  text: string
  isTrue?: boolean
  wrongText?: string
  subWrongText?: string
}

interface Question {
  id: string
  question: string
  answers: Answer[]
}

interface InitialValues {
  currentQuestion: Question
  handleNextQuestion: () => void
  isWrongTheme: boolean
  setIsWrongTheme: React.Dispatch<React.SetStateAction<boolean>>
}

const initial: InitialValues = {
  currentQuestion: quizData[0],
  handleNextQuestion: () => undefined,
  isWrongTheme: false,
  setIsWrongTheme: () => undefined,
}

const QuizContext = createContext<InitialValues>(initial)

export const QuizProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const index = useRef(0)
  const [currentQuestion, setCurrentQuestion] = useState<Question>(quizData[0])
  const [isWrongTheme, setIsWrongTheme] = useState(false)

  const handleNextQuestion = () => {
    index.current += 1
    setCurrentQuestion(quizData[index.current])
  }

  const values: InitialValues = useMemo(
    () => ({
      currentQuestion,
      handleNextQuestion,
      isWrongTheme,
      setIsWrongTheme,
    }),
    [handleNextQuestion, currentQuestion],
  )

  return <QuizContext.Provider value={values}>{children}</QuizContext.Provider>
}

export const useQuizContext = (): InitialValues => useContext(QuizContext)
