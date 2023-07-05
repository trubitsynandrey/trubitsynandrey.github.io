import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import _ from 'lodash'

import { quizData } from '../data/quizData'

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ym: any
  }
}

export interface Answer {
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
  isLast?: boolean
}

export type RightAnswer = {
  title: string
  whiteText?: string
  whiteSubText?: string
  importantSubText?: string
  unimportantSubText?: string[]
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
  timer: number
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
  timer: 0,
}

const QuizContext = createContext<InitialValues>(initial)

export const QuizProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const index = useRef(0)
  const intervalId = useRef<number | undefined>(undefined)
  const seconds = useRef(0)
  const [currentQuestion, setCurrentQuestion] = useState<Question>(quizData[0])
  const [isWrongTheme, setIsWrongTheme] = useState(false)
  const [isRightTheme, setIsRightTheme] = useState(false)
  const [isBeenRated, setIsBeenRated] = useState(false)
  const [isStartModal, setIsStartModal] = useState(true)

  const [startTime, setStartTime] = useState<Date | null>(null)

  const calculateTimePassedAndReset = () => {
    if (startTime) {
      setStartTime(null)
      setStartTime(new Date())
    }
  }

  const handleNextQuestion = () => {
    index.current += 1
    setCurrentQuestion(_.cloneDeep(quizData[index.current]))
    setIsRightTheme(false)
    setIsWrongTheme(false)
  }

  const startFromTheBeginning = async () => {
    index.current = 0
    setCurrentQuestion(_.cloneDeep(quizData[index.current]))

    calculateTimePassedAndReset()

    setIsRightTheme(false)
    setIsWrongTheme(false)
    setIsStartModal(true)

    if (intervalId.current !== undefined) {
      clearInterval(intervalId.current)
      seconds.current = 0
    }
  }

  useEffect(() => {
    setStartTime(new Date())
  }, [])

  useEffect(() => {
    if (!isStartModal) {
      const interval = setInterval(() => {
        seconds.current += 1
      }, 1000)
      intervalId.current = interval
    }
  }, [isStartModal])

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
    timer: seconds.current,
  }

  return <QuizContext.Provider value={values}>{children}</QuizContext.Provider>
}

export const useQuizContext = (): InitialValues => useContext(QuizContext)
