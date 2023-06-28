import { useState } from 'react'
import classNames from 'classnames'

import { useQuizContext } from '../../containers/QuizProvider'
import { Wrong } from '../icons/wrong'
import styles from './AnswerPickCard.module.scss'

interface Props {
  icon: JSX.Element
  answerVariant: string
  text: string
  subWrongText?: string
  wrongText?: string
  isWrong?: boolean
}

const AnswerPickCard = ({
  icon,
  answerVariant,
  text,
  subWrongText,
  wrongText,
  isWrong,
}: Props) => {
  const paragraphs = text.split('\n')
  const [isWrongTriggered, setIsWrongTriggered] = useState(false)
  const { setIsWrongTheme, isWrongTheme } = useQuizContext()

  return (
    <button
      onClick={() => {
        if (isWrong) {
          setIsWrongTriggered(true)
          setIsWrongTheme(true)
        }
      }}
      type="button"
      className={classNames(
        styles.card,
        isWrongTriggered && styles.card__wrong,
      )}
    >
      {icon}
      <div>
        {isWrongTriggered && <p>Неверный ответ</p>}
        {!isWrongTriggered &&
          paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        {isWrongTriggered && <p>{wrongText}</p>}
        {isWrongTriggered && subWrongText && (
          <p className={styles.wrongSubText}>{subWrongText}</p>
        )}
      </div>
      <div
        className={classNames(
          styles.circle,
          isWrongTriggered && styles.circle__wrong,
          !isWrongTriggered && styles.circle__none,
        )}
      >
        {isWrongTriggered ? <Wrong /> : answerVariant}
      </div>
    </button>
  )
}

export default AnswerPickCard
