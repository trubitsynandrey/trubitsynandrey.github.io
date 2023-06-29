import { useState } from 'react'
import classNames from 'classnames'

import { useQuizContext } from '../../containers/QuizProvider'
import { Wrong } from '../icons/wrong'
import styles from './AnswerPickCard.module.scss'

interface Props {
  answerVariant: string
  text: string
  icon?: JSX.Element
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
  const { setIsWrongTheme, isWrongTheme, setIsRightTheme } = useQuizContext()

  return (
    <button
      onClick={() => {
        if (isWrongTheme) return

        if (isWrong) {
          setIsWrongTriggered(true)
          setIsWrongTheme(true)
        } else {
          setIsRightTheme(true)
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
          paragraphs.map((paragraph, index) => (
            <p key={index} style={{ marginLeft: icon ? '0px' : '54px' }}>
              {paragraph}
            </p>
          ))}
        {isWrongTriggered && <p>{wrongText}</p>}
        {isWrongTriggered && subWrongText && (
          <p className={styles.wrongSubText}>{subWrongText}</p>
        )}
      </div>
      {!isWrongTheme && (
        <div
          className={classNames(
            styles.circle,
            isWrongTriggered && styles.circle__wrong,
          )}
        >
          {answerVariant}
        </div>
      )}
      <div
        className={classNames(
          styles.circle,
          isWrongTriggered && styles.circle__wrong,
          !isWrongTriggered && styles.circle__none,
        )}
      >
        <Wrong />
      </div>
    </button>
  )
}

export default AnswerPickCard
