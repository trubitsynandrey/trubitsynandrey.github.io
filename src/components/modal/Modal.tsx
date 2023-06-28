import classNames from 'classnames'

import backgroundImg from '../../assets/background-modal.png'
import icosQuiz from '../../assets/icos-quiz.png'
import styles from './modal.module.scss'

type Props = {
  handleCloseModal: () => void
  isModal: boolean
}

export const Modal = ({ handleCloseModal, isModal }: Props) => {
  return (
    <>
      <div
        style={{ backgroundImage: `url(${backgroundImg})` }}
        className={classNames(
          styles.modalBackground,
          !isModal && styles.modalBackground__closed,
        )}
      ></div>
      <div
        className={classNames(
          styles.innerModal,
          !isModal && styles.innerModal__closed,
        )}
      >
        <div>
          <img src={icosQuiz} alt="icos-quiz" />
        </div>
        <button onClick={handleCloseModal}>Начать игру</button>
      </div>
    </>
  )
}
