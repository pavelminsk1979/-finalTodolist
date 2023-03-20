import React, {ChangeEvent, useState} from "react";
import TextField from "@mui/material/TextField";

type EditModeTitleType = {
    title: string
    callback: (editTitle: string) => void
}


export const EditModeTitle = ({title, callback}: EditModeTitleType) => {
    const [editMode, setEditMode] = useState(false)
    const [editTitle, setEditTitle] = useState(title)

    const spanOnDubleClickHundler = () => {
        setEditMode(true)
    }

    const inputOnChangeHundler = (event: ChangeEvent<HTMLInputElement>) => {
        setEditTitle(event.currentTarget.value)
    }

    const inputOnBlurHundler = () => {
        callback(editTitle)
        setEditMode(false)
    }

    return (
        editMode
            ? <TextField
                color="error"
                autoFocus
                onBlur={inputOnBlurHundler}
                value={editTitle}
                onChange={inputOnChangeHundler}
                label="EditText"
                variant="standard" />

            : <span
                onDoubleClick={spanOnDubleClickHundler}
            >{title}</span>
    )
}