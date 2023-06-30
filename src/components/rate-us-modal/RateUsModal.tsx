import classNames from 'classnames'

import { RateUsIcon } from '../../ui/icons/rate-us-icon'
import { Star } from '../../ui/icons/star'
import styles from './RateUsModal.module.scss'

type Props = {
  handleCloseModal: () => void
  isModal: boolean
}

const RateUsModal = ({ handleCloseModal, isModal }: Props) => {
  return (
    <>
      <div
        onClick={handleCloseModal}
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
              {Array.from({ length: 5 }).map((_, idx) => (
                <button onClick={handleCloseModal} key={idx}>
                  <Star />
                </button>
              ))}
            </div>
          </div>
          <div>
            <p>Изменилось ли Ваше восприятие цены на устройство и стики?</p>
            <div>
              {Array.from({ length: 5 }).map((_, idx) => (
                <button onClick={handleCloseModal} key={idx}>
                  <Star />
                </button>
              ))}
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
