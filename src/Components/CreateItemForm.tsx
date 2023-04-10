import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';

import IconButton from "@mui/material/IconButton";
import PlusOne from "@mui/icons-material/PlusOne";
import TextField from "@mui/material/TextField";

type CreateItemFormType = {
    name:string
    callback:(text: string)=>void
    disableValue?:boolean
}


export const CreateItemForm =memo( ({name,callback,disableValue}: CreateItemFormType) => {

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
                error={!!inputError}/*для ошибки и красного Инпута если попытка ввода с пустым полем   это тоже самое что и  error={true} */
               helperText={inputError} /*это отобразит текст который  внутри inputError
                снизу рамки ИНПУТА если создание при пустом инпуте */
                color="secondary"
                focused
               /* className={inputError ? stule.inputError : ''}*/
                onKeyPress={onKeyPressCreateText}
                onChange={onChangeCreateText}
                value={text}
                label="Text"
                variant="outlined" />


            <IconButton
                disabled={disableValue}
                onClick={onClickCreateTask}>
                <PlusOne/>{name}
            </IconButton>

        </div>
    )
})