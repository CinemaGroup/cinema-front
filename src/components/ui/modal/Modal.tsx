import cn from 'classnames'
import type { FC, PropsWithChildren } from 'react'
import { useRef } from 'react'
import ReactDOM from 'react-dom'
import Icon from '../icon/Icon'
import styles from './Modal.module.scss'
import { IModal } from './interface/modal.interface'

const Modal: FC<PropsWithChildren<IModal>> = ({
	children,
	isOpen,
	className,
	closeModal,
}) => {
	const modalRef = useRef<HTMLElement | null>(document.getElementById('modal'))

	if (!modalRef.current) return null

	return ReactDOM.createPortal(
		<div
			className={cn(
				styles.overlay,
				{
					[styles.show]: isOpen,
				},
				className && className
			)}
		>
			<div className={styles.window}>
				<button onClick={closeModal} className={styles.close}>
					<Icon name="X" />
				</button>
				{children}
			</div>
		</div>,
		modalRef.current
	)
}

export default Modal
