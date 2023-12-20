import { EditorProps } from 'draft-js'
import { IFieldProps } from '../../field/interface/field.interface'

type TypeEditorPropsField = EditorProps & IFieldProps

export interface ITextEditor extends Omit<TypeEditorPropsField, 'editorState'> {
	onChange: (...event: any[]) => void
	value: string | undefined
}
