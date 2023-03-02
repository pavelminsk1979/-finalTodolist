import React from "react";


type ButtonType={
name:string
callback:()=>void
    className?:string
}

export const Button = (props:ButtonType) => {
  return(
      <button
          onClick={props.callback}
          className={props.className}
      >{props.name}</button>
  )
}