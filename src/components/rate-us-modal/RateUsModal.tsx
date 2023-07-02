import { useEffect, useState } from 'react'
import classNames from 'classnames'

import { useQuizContext } from '../../containers/QuizProvider'
import { RateUsIcon } from '../../ui/icons/rate-us-icon'
import { Star } from '../../ui/icons/star'
import styles from './RateUsModal.module.scss'

type Props = {
  handleCloseModal: () => void
  isModal: boolean
}

const RateUsModal = ({ handleCloseModal, isModal }: Props) => {
  const [firstFilledIndex, setFirstFilledIndex] = useState<number | null>(null)
  const [secondFilledIndex, setSecondFilledIndex] = useState<number | null>(
    null,
  )

  const { setIsBeenRated } = useQuizContext()

  useEffect(() => {
    if (secondFilledIndex === null || firstFilledIndex === null) return
    setIsBeenRated(true)
    handleCloseModal()
  }, [firstFilledIndex, secondFilledIndex])

  return (
    <>
      <div
        className={classNames(
          styles.rateUsBackDrop,
          !isModal && styles.rateUsBackDrop__closed,
        )}
      ></div>
      <div
        className={classNames(
          styles.rateUsInner,
          !isModal && styles.rateUsInner__closed,
        )}
      >
        <div>
          <p>Ваше мнение важно для нас</p>
        </div>
        <div className={styles.whiteBox}>
          <div>
            <p>Информация в игре была для Вас полезна?</p>
            <div>
              {Array.from({ length: 5 }).map((_, idx) => {
                const shouldFill =
                  firstFilledIndex !== null ? firstFilledIndex >= idx : false

                return (
                  <button
                    onClick={() => setFirstFilledIndex(idx)}
                    key={idx}
                    className={classNames(shouldFill && styles.filled)}
                  >
                    <Star />
                  </button>
                )
              })}
            </div>
          </div>
          <div>
            <p>Изменилось ли Ваше восприятие цены на устройство и стики?</p>
            <div>
              {Array.from({ length: 5 }).map((_, idx) => {
                const shouldFill =
                  secondFilledIndex !== null ? secondFilledIndex >= idx : false

                return (
                  <button
                    onClick={() => setSecondFilledIndex(idx)}
                    key={idx}
                    className={classNames(shouldFill && styles.filled)}
                  >
                    <Star />
                  </button>
                )
              })}
            </div>
          </div>
        </div>
        <div className={styles.rateUsIconWrapper}>
          <RateUsIcon />
        </div>
      </div>
    </>
  )
}

export default RateUsModal
