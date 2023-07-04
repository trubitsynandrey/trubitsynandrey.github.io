import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useRef,
  useState,
} from 'react'
import _ from 'lodash'

import { quizData } from '../data/quizData'

interface Answer {
  id: string
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  text: string
  isTrue?: boolean
  wrongText?: string
  subWrongText?: string
}

interface Question {
  id: string
  question: string
  rightAnswer?: RightAnswer
  answers: Answer[]
}

export type RightAnswer = {
  title: string
  whiteText?: string
  whiteSubText?: string
  importantSubText?: string
  unimportantSubText?: string[]
}
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ym: any
  }
}

interface InitialValues {
  currentQuestion: Question
  handleNextQuestion: () => void
  isWrongTheme: boolean
  setIsWrongTheme: React.Dispatch<React.SetStateAction<boolean>>
  isRightTheme: boolean
  setIsRightTheme: React.Dispatch<React.SetStateAction<boolean>>
  startFromTheBeginning: () => void
  isBeenRated: boolean
  setIsBeenRated: React.Dispatch<React.SetStateAction<boolean>>
  isStartModal: boolean
  setIsStartModal: React.Dispatch<React.SetStateAction<boolean>>
}

const initial: InitialValues = {
  currentQuestion: quizData[0],
  handleNextQuestion: () => undefined,
  isWrongTheme: false,
  setIsWrongTheme: () => undefined,
  isRightTheme: false,
  setIsRightTheme: () => undefined,
  startFromTheBeginning: () => undefined,
  isBeenRated: false,
  setIsBeenRated: () => undefined,
  isStartModal: true,
  setIsStartModal: () => undefined,
}

const QuizContext = createContext<InitialValues>(initial)

export const QuizProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const index = useRef(0)
  const [currentQuestion, setCurrentQuestion] = useState<Question>(quizData[0])
  const [isWrongTheme, setIsWrongTheme] = useState(false)
  const [isRightTheme, setIsRightTheme] = useState(false)
  const [isBeenRated, setIsBeenRated] = useState(false)
  const [isStartModal, setIsStartModal] = useState(true)

  const handleNextQuestion = () => {
    index.current += 1
    setCurrentQuestion(_.cloneDeep(quizData[index.current]))
    setIsRightTheme(false)
    setIsWrongTheme(false)
  }

  const startFromTheBeginning = () => {
    window.ym(94197337, 'reachGoal', 'startOver')
    index.current = 0
    setCurrentQuestion(_.cloneDeep(quizData[index.current]))
    setIsRightTheme(false)
    setIsWrongTheme(false)
    setIsStartModal(true)
  }

  const values: InitialValues = {
    currentQuestion,
    handleNextQuestion,
    isWrongTheme,
    setIsWrongTheme,
    isRightTheme,
    setIsRightTheme,
    startFromTheBeginning,
    isBeenRated,
    setIsBeenRated,
    isStartModal,
    setIsStartModal,
  }

  return <QuizContext.Provider value={values}>{children}</QuizContext.Provider>
}

export const useQuizContext = (): InitialValues => useContext(QuizContext)
