import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import stule from "./Todolist.module.css";
import IconButton from "@mui/material/IconButton";
import PlusOne from "@mui/icons-material/PlusOne";
import TextField from "@mui/material/TextField";

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
            <TextField
                color="secondary"
                focused
                className={inputError ? stule.inputError : ''}
                onKeyPress={onKeyPressCreateText}
                onChange={onChangeCreateText}
                value={text}
                label="Text"
                variant="outlined" />


            <IconButton
                onClick={onClickCreateTask}>
                <PlusOne/>{name}
            </IconButton>


            {inputError ? <div className={stule.messageError}>{inputError}</div> : <br/>}
        </div>
    )
}