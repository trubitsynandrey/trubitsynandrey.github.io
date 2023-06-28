import { createElement } from 'react'
import classNames from 'classnames'

import imgUrl from '../../assets/adult.png'
import { useQuizContext } from '../../containers/QuizProvider'
import { quizData } from '../../data/quizData'
import AnswerPickCard from '../../ui/AnswerPickCard/AnswerPickCard'
import styles from './quiz.module.scss'

export const Quiz = () => {
  const { currentQuestion, handleNextQuestion, isWrongTheme } = useQuizContext()

  // console.log(currentQuestion, 'current')

  return (
    <div
      className={classNames(
        styles.container,
        isWrongTheme && styles.container__wrong,
      )}
    >
      <div className={styles.sliderCaption}>
        <div className={classNames(isWrongTheme && styles.caption__wrong)}>
          {Array.from({ length: quizData.length }, (_, i) => String(i + 1)).map(
            (item, idx) => (
              <div
                key={idx}
                className={classNames(
                  styles.circlePoint,
                  currentQuestion.id === item && styles.circlePoint__active,
                )}
              ></div>
            ),
          )}
        </div>
        <p>Выберите верный ответ</p>
        <p>{currentQuestion.question}</p>
      </div>
      <div className={styles.answersWrapper}>
        {currentQuestion.answers.map((item, idx) => (
          <AnswerPickCard
            key={idx}
            icon={createElement(item.icon)}
            answerVariant={item.id}
            text={item.text}
            isWrong={!item.isTrue}
            subWrongText={item.subWrongText}
            wrongText={item.wrongText}
          />
        ))}
      </div>
      <div className={styles.warning}>
        <div>
          <img src={imgUrl} />
        </div>
        <p>
          ВАЖНО: Не исключает риски. Аэрозоль содержит никотин, вызывающий
          зависимость
        </p>
      </div>
    </div>
  )
}
