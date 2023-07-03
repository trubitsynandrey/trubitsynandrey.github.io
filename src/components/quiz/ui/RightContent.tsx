import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'

import imgAsh from '../../../assets/burning.png'
import { RightAnswer, useQuizContext } from '../../../containers/QuizProvider'
import RateUsModal from '../../rate-us-modal/RateUsModal'
import styles from './RightContent.module.scss'

type Props = {
  imgSrc: {
    url: string
    sizes: {
      width?: string
      height?: string
    }
  }
  handleNext: () => void
  isCheaper?: boolean
  isFinal?: boolean
} & Partial<Omit<RightAnswer, 'title'>>

const startOverString = 'Начать заново'

const RightContent = ({
  imgSrc,
  whiteText,
  whiteSubText,
  importantSubText,
  unimportantSubText,
  handleNext,
  isCheaper,
  isFinal,
}: Props) => {
  const [active, setActive] = useState(false)

  const { isBeenRated } = useQuizContext()

  const [isRateModal, setIsRateModal] = useState(false)
  const [buttonText, setButtonText] = useState('Продолжить игру')

  const handleOpenModal = () => {
    setIsRateModal(true)
  }

  const handleCloseModal = () => {
    setTimeout(() => {
      setIsRateModal(false)
    }, 500)

    setButtonText(startOverString)
  }

  const buttonOnClick = () =>
    // eslint-disable-next-line no-nested-ternary
    isBeenRated ? handleNext() : isFinal ? handleOpenModal() : handleNext()

  const interval = useRef<number>()

  useEffect(() => {
    if (!isCheaper) return
    interval.current = setInterval(() => {
      setActive((prev) => !prev)
    }, 5000)

    return () => {
      clearInterval(interval.current)
    }
  }, [imgSrc])

  return (
    <>
      <div className={styles.container}>
        <div
          className={classNames(
            styles.imgWrapper,
            isCheaper && styles.interactiveWrapper,
            isCheaper && active && styles.notActiveDiv,
          )}
        >
          {!isCheaper ? (
            <>
              <img
                src={imgSrc.url}
                style={{ height: imgSrc.sizes?.height ?? '472px' }}
              />
              <div className={styles.description}>
                {whiteText && (
                  <p style={{ marginBottom: '-8px' }}>{whiteText}</p>
                )}
                <p>{whiteSubText}</p>
                {importantSubText && (
                  <p className={styles.importantText}>{importantSubText}</p>
                )}
                {unimportantSubText?.map((item, idx) => (
                  <p key={idx} className={styles.unimportantText}>
                    {item}
                  </p>
                ))}
              </div>
            </>
          ) : (
            <>
              <div>
                <img
                  src={imgSrc.url}
                  style={{ height: imgSrc.sizes?.height ?? '472px' }}
                />
                <div className={styles.isCheaperBox}>
                  <p>Такие простые вещи могут изменить качество нашей жизни.</p>
                  <p>
                    При использовании IQOS остается меньше запаха на руках,
                    волосах и одежде по сравнению с курением сигарет
                  </p>
                </div>
              </div>
              <div>
                <img src={imgAsh} style={{ height: '390px' }} />
                <div className={styles.description}>
                  <p>
                    IQOS ПОЗВОЛЯЕТ НАСЛАДИТЬСЯ НАСТОЯЩИМ ВКУСОМ ТАБАКА. БЕЗ
                    ГОРЕНИЯ. БЕЗ ДЫМА. БЕЗ ПЕПЛА.
                  </p>
                  <p className={styles.unimportantText}>
                    Важно: не исключает риски, в аэрозоле содержится никотин,
                    вызывающий зависимость.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <button className={styles.nextButton} onClick={buttonOnClick}>
        {buttonText}
      </button>
      <RateUsModal handleCloseModal={handleCloseModal} isModal={isRateModal} />
    </>
  )
}

export default RightContent
