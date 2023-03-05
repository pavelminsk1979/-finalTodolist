import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import stule from "./Todolist.module.css";

type CreateItemFormType = {
    name:string
    callback:(text: string)=>void
}


export const CreateItemForm = ({name,callback}: CreateItemFormType) => {

    const [text, setText] = useState('')
    const [inputError, setInputError] = useState<string | null>(null)

    const onClickCreateTask = () => {
        if (text.trim() !== '') {
            callback( text.trim())
            setText('')
        } else {
            setInputError('Text reguared')
        }

    }

    const onChangeCreateText = (event: ChangeEvent<HTMLInputElement>) => {
        if (inputError) {
            setInputError(null)
        }
        setText(event.currentTarget.value)
    }

    const onKeyPressCreateText = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickCreateTask()
        }
    }

    return (
        <div>
            <input
                className={inputError ? stule.inputError : ''}
                onKeyPress={onKeyPressCreateText}
                onChange={onChangeCreateText}
                value={text}/>

            <button
                onClick={onClickCreateTask}
            >{name}
            </button>

            {inputError ? <div className={stule.messageError}>{inputError}</div> : <br/>}
        </div>
    )
}