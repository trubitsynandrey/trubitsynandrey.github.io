import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'

import { RightAnswer } from '../../../containers/QuizProvider'
import styles from './RightContent.module.scss'

type Props = {
  imgSrc: string | string[]
  handleNext: () => void
  isCheaper?: boolean
  isFinal?: boolean
} & Partial<Omit<RightAnswer, 'title'>>

const RightContent = ({
  imgSrc,
  whiteSubText,
  importantSubText,
  unimportantSubText,
  handleNext,
  isCheaper,
  isFinal,
}: Props) => {
  const [active, setActive] = useState(false)

  const interval = useRef<number>()

  useEffect(() => {
    if (!Array.isArray(imgSrc)) return
    interval.current = setInterval(() => {
      setActive((prev) => !prev)
    }, 3000)

    return () => {
      clearInterval(interval.current)
    }
  }, [imgSrc])

  return (
    <>
      <div className={styles.container}>
        <div className={styles.imgWrapper}>
          {!Array.isArray(imgSrc) ? (
            <>
              <img src={imgSrc} />
              {isCheaper && (
                <div className={styles.isCheaperBox}>
                  <p>Такие простые вещи могут изменить качество нашей жизни.</p>
                  <p>
                    При использовании IQOS остается меньше запаха на руках,
                    волосах и одежде по сравнению с курением сигарет
                  </p>
                </div>
              )}
            </>
          ) : (
            <>
              {imgSrc.map((src, idx) => (
                <div
                  key={idx}
                  className={classNames(
                    idx === 0 && active && styles.notActiveImg,
                  )}
                >
                  <img src={src} />
                </div>
              ))}
            </>
          )}
        </div>
        {!isCheaper && (
          <div className={styles.description}>
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
        )}
      </div>
      <button className={styles.nextButton} onClick={handleNext}>
        {!isFinal ? 'Продолжить игру' : 'Начать заново'}
      </button>
    </>
  )
}

export default RightContent
