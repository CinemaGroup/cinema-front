'use client'

import cn from 'classnames'
import { ContentState, EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import { FC, useEffect, useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import styles from './TextEditor.module.scss'
import { ITextEditor } from './interface/text-editor.interface'

const TextEditor: FC<ITextEditor> = ({
	onChange,
	value,
	placeholder,
	error,
	label,
	className,
}) => {
	const [editorState, setEditorState] = useState(EditorState.createEmpty())
	const [isUpdated, setIsUpdated] = useState(false)

	useEffect(() => {
		if (isUpdated) return

		const defaultValue = value || ''
		const blocksFromHtml = htmlToDraft(defaultValue)

		const contentState = ContentState.createFromBlockArray(
			blocksFromHtml.contentBlocks,
			blocksFromHtml.entityMap
		)

		const newEditorState = EditorState.createWithContent(contentState)
		setEditorState(newEditorState)
	}, [value, isUpdated])

	const onEditorStateChange = (editorState: EditorState) => {
		setIsUpdated(true)
		setEditorState(editorState)

		return onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())))
	}

	return (
		<div className={cn(styles.wrapper, className && className)}>
			{label && <label className={styles.label}>{label}</label>}
			{error && <p className={styles.error}>{error.message}</p>}
			<div className={styles.fill}>
				<Editor
					toolbarClassName={styles.toolbar}
					editorClassName={styles.editor}
					editorState={editorState}
					onEditorStateChange={onEditorStateChange}
					placeholder={placeholder}
					spellCheck
					toolbar={{
						options: ['inline', 'list'],
						inline: {
							inDropdown: false,
							className: undefined,
							component: undefined,
							dropdownClassName: undefined,
							options: ['bold', 'italic', 'underline', 'strikethrough'],
						},
						list: {
							inDrodown: false,
							options: ['unordered', 'ordered'],
						},
					}}
				/>
			</div>
		</div>
	)
}

export default TextEditor
