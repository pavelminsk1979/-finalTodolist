import React, {ChangeEvent, KeyboardEvent} from "react";
import stule from "./Todolist.module.css";


type InputType = {
    setText: (text: string) => void
    text: string
    callback: () => void
    inputError:string|null
    setInputError:(inputError:string|null)=>void
}

export const Input = (props: InputType) => {

    const onKeyPressCreateText = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.callback()
        }
    }

    const onChangeCreateText = (event: ChangeEvent<HTMLInputElement>) => {
        if (props.inputError) {
            props.setInputError(null)
        }
        props.setText(event.currentTarget.value)
    }

    return (
        <input
            className={props.inputError ? stule.inputError : ''}
            onKeyPress={onKeyPressCreateText}
            onChange={onChangeCreateText}
            value={props.text}/>
    )
}