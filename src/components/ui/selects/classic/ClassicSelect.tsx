'use client'

import cn from 'classnames'
import { FC, useState } from 'react'
import styles from './ClassicSelect.module.scss'
import { IClassicSelect } from './interface/classic-select.interface'

const ClassicSelect: FC<IClassicSelect> = ({
	data,
	value,
	title,
	onChange,
}) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className={styles.select}>
			<button onClick={() => setIsOpen(!isOpen)}>
				{title && <b>{title}: </b>}
				{value?.label || 'Default'}
			</button>
			{isOpen && (
				<ul>
					{data.map((item) => (
						<li
							key={item.key?.toString()}
							className={cn({
								[styles.active]: item.key === value?.key,
							})}
						>
							<button
								onClick={() => {
									onChange(item)
									setIsOpen(false)
								}}
								disabled={item.key === value?.key}
							>
								{item.label}
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default ClassicSelect
