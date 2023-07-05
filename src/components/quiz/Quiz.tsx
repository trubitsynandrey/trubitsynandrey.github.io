import { createElement, useCallback, useRef, useState } from 'react'
import classNames from 'classnames'

import imgUrl from '../../assets/adult.png'
import imgCheaper from '../../assets/cheaper.png'
import imgCoffe from '../../assets/coffe.png'
import imgPrice from '../../assets/price.png'
import imgRent from '../../assets/rent.png'
import { Answer, useQuizContext } from '../../containers/QuizProvider'
import { quizData } from '../../data/quizData'
import AnswerPickCard from '../../ui/AnswerPickCard/AnswerPickCard'
import { Modal } from '../modal/Modal'
import styles from './quiz.module.scss'
import RightContent from './ui/RightContent'

const slideNumberToImg = {
  '1': {
    url: imgCoffe,
    sizes: {},
  },
  '2': {
    url: imgCheaper,
    sizes: {
      height: '390px',
    },
  },
  '3': { url: imgPrice, sizes: {} },
  '4': { url: imgRent, sizes: {} },
}

export const Quiz = () => {
  const {
    currentQuestion,
    handleNextQuestion,
    isWrongTheme,
    isRightTheme,
    setIsRightTheme,
    startFromTheBeginning,
    setIsBeenRated,
    isStartModal,
    setIsStartModal,
    timer,
  } = useQuizContext()

  const handleCloseModal = () => {
    window.ym(94197337, 'reachGoal', 'quizStart')
    setIsStartModal(false)
  }

  const caption = useRef<HTMLDivElement | null>(null)

  const scrollToTop = () => {
    caption.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const handleRightTheme = () => {
    setIsRightTheme(true)
    scrollToTop()
  }

  const isFinal = currentQuestion.id === '4'

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
      setIsBeenRated(false)
    } else {
      handleNextQuestion()
    }

    handleClick()
    scrollToTop()
  }

  const isWrongContentShow = isWrongTheme && !isRightTheme

  const handlePressCard = useCallback(
    (item: Answer) => {
      window.ym(94197337, 'reachGoal', 'answers', {
        [currentQuestion.question]: item.text,
      })

      if (currentQuestion?.isLast) {
        window.ym(94197337, 'reachGoal', 'startOver')
        window.ym(94197337, 'reachGoal', 'game_time_seconds', {
          seconds: {
            'Время игры': timer,
          },
        })
      }
    },
    [currentQuestion.question, currentQuestion?.isLast],
  )

  return (
    <>
      <div
        className={classNames(
          styles.container,
          isWrongContentShow && styles.container__wrong,
          animate && styles.fadeIn,
          isStartModal && styles.startModal,
        )}
      >
        <div>
          <div className={styles.sliderCaption} ref={caption}>
            <div
              className={classNames(
                isWrongContentShow && styles.caption__wrong,
              )}
            >
              {Array.from({ length: quizData.length }, (_, i) =>
                String(i + 1),
              ).map((item, idx) => (
                <div
                  key={idx}
                  className={classNames(
                    styles.circlePoint,
                    currentQuestion.id === item && styles.circlePoint__active,
                  )}
                ></div>
              ))}
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
                <p
                  className={classNames(styles.notPickedSecond, styles.p_x_12)}
                >
                  {currentQuestion.question}
                </p>
              </>
            ) : (
              <>
                <p className={styles.captionBoldText}>ВЕРНЫЙ ОТВЕТ</p>
                <p
                  className={classNames(styles.captionThinText, styles.p_x_12)}
                >
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
                  scrollToTop={item.isTrue ? scrollToTop : undefined}
                  handlePress={() => handlePressCard(item)}
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
              unimportantSubText={
                currentQuestion.rightAnswer?.unimportantSubText
              }
              whiteText={currentQuestion.rightAnswer?.whiteText}
              handleNext={handleNext}
              isCheaper={currentQuestion.id === '2'}
              isFinal={isFinal}
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
            <button
              className={styles.lookRightAnswer}
              onClick={handleRightTheme}
            >
              Посмотреть верный ответ
            </button>
          )}
        </div>
      </div>
      <Modal handleCloseModal={handleCloseModal} isModal={isStartModal} />
    </>
  )
}
