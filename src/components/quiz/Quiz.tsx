import { createElement, useState } from 'react'
import classNames from 'classnames'

import imgUrl from '../../assets/adult.png'
import imgAsh from '../../assets/ash.png'
import imgBurn from '../../assets/burning.png'
import imgCheaper from '../../assets/cheaper.png'
import imgCoffe from '../../assets/coffe.png'
import imgPrice from '../../assets/price.png'
import imgRent from '../../assets/rent.png'
import { useQuizContext } from '../../containers/QuizProvider'
import { quizData } from '../../data/quizData'
import AnswerPickCard from '../../ui/AnswerPickCard/AnswerPickCard'
import styles from './quiz.module.scss'
import RightContent from './ui/RightContent'

const slideNumberToImg = {
  '1': imgCoffe,
  '2': [imgAsh, imgBurn],
  '3': imgCheaper,
  '4': imgPrice,
  '5': imgRent,
}

export const Quiz = () => {
  const {
    currentQuestion,
    handleNextQuestion,
    isWrongTheme,
    isRightTheme,
    setIsRightTheme,
    startFromTheBeginning,
  } = useQuizContext()

  const handleRightTheme = () => {
    setIsRightTheme(true)
  }

  const isFinal = currentQuestion.id === '5'

  const [animate, setAnimate] = useState(false)

  const handleClick = () => {
    setAnimate(true)
    setTimeout(() => {
      setAnimate(false)
    }, 1000)
  }

  const handleNext = () => {
    if (isFinal) {
      startFromTheBeginning()
    } else {
      handleNextQuestion()
    }

    handleClick()
  }

  const isWrongContentShow = isWrongTheme && !isRightTheme

  return (
    <div
      className={classNames(
        styles.container,
        isWrongContentShow && styles.container__wrong,
        animate && styles.fadeIn,
      )}
    >
      <div className={styles.sliderCaption}>
        <div
          className={classNames(isWrongContentShow && styles.caption__wrong)}
        >
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
        {!isRightTheme ? (
          <>
            <p
              className={classNames(
                styles.notPickedFirst,
                isWrongTheme && styles.notPickedFirst__wrong,
              )}
            >
              Выберите верный ответ
            </p>
            <p className={styles.notPickedSecond}>{currentQuestion.question}</p>
          </>
        ) : (
          <>
            <p className={styles.captionBoldText}>СОВЕРШЕННО ВЕРНО!</p>
            <p className={styles.captionThinText}>
              {currentQuestion.rightAnswer?.title}
            </p>
          </>
        )}
      </div>
      {!isRightTheme ? (
        <div className={styles.answersWrapper}>
          {currentQuestion.answers.map((item, idx) => (
            <AnswerPickCard
              key={idx}
              icon={item.icon ? createElement(item.icon) : undefined}
              answerVariant={item.id}
              text={item.text}
              isWrong={!item.isTrue}
              subWrongText={item.subWrongText}
              wrongText={item.wrongText}
            />
          ))}
        </div>
      ) : (
        <RightContent
          imgSrc={
            slideNumberToImg[
              currentQuestion.id as keyof typeof slideNumberToImg
            ]
          }
          whiteSubText={currentQuestion.rightAnswer?.whiteSubText}
          importantSubText={currentQuestion.rightAnswer?.importantSubText}
          unimportantSubText={currentQuestion.rightAnswer?.unimportantSubText}
          handleNext={handleNext}
          isCheaper={currentQuestion.id === '3'}
          isFinal={currentQuestion.id === '5'}
        />
      )}
      {!isRightTheme && currentQuestion.id === '1' && (
        <div className={styles.warning}>
          <div>
            <img src={imgUrl} />
          </div>
          <p>
            ВАЖНО: Не исключает риски. Аэрозоль содержит никотин, вызывающий
            зависимость
          </p>
        </div>
      )}
      {isWrongContentShow && (
        <button className={styles.lookRightAnswer} onClick={handleRightTheme}>
          Посмотреть верный ответ
        </button>
      )}
    </div>
  )
}
