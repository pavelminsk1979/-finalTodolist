import React, {ChangeEvent, useState} from "react";

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
            ? <input
                autoFocus
                onBlur={inputOnBlurHundler}
                value={editTitle}
                onChange={inputOnChangeHundler}
            />
            : <span
                onDoubleClick={spanOnDubleClickHundler}
            >{title}</span>
    )
}