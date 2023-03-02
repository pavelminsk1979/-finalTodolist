import React, {ChangeEvent} from "react";


type CheckboxType={
    callback:(valueCheckbox: boolean)=>void
    valueChecked:boolean
}

export const Checkbox = (props:CheckboxType) => {

    const checkboxHundler = ( event:ChangeEvent<HTMLInputElement>) => {
        props.callback( event.currentTarget.checked)
    }

    return(
        <input
            onChange={checkboxHundler}
            type="checkbox"
            checked={props.valueChecked}/>
    )
}