import React from "react";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CancelPresentation from "@mui/icons-material/CancelPresentation";
import {TaskStatus, TaskType} from "common/types";
import {EditModeTitle} from "Components/EditModeTitle";
import st from "./Task.module.css"



type TaskComponentType = {
    task: TaskType
    callbackDel:(idTask: string)=>void
    callbackCheckbox:(idTask: string, valueCheckbox: boolean)=>void
    callbackChangeTitle:(idTask: string, editTitle: string)=>void
    
}

export const Task = (
    {task,callbackDel,callbackCheckbox,callbackChangeTitle}:TaskComponentType) => {

    const onClickDeleteTask = (idTask: string) => {
        callbackDel( idTask)
    }

    const changeCheckboxTaskHundler = (idTask: string, valueCheckbox: boolean) => {
        callbackCheckbox(idTask, valueCheckbox)
    }

    const changeTitleTaskHundler = (idTask: string, editTitle: string) => {
        callbackChangeTitle( idTask, editTitle)
    }

  return(
      <div className={task.status===TaskStatus.Complete
          ? st.completeTask : ''}
           key={task.id}>

          <Checkbox
              checked={task.status===TaskStatus.Complete}
              onChange={(event) => changeCheckboxTaskHundler(
                  task.id, event.currentTarget.checked
              )}
              color="success" />

          <EditModeTitle
              callback={(editTitle: string) => changeTitleTaskHundler(
                  task.id, editTitle)}
              title={task.title}/>

          <IconButton
              size={"small"}
              onClick={
                  () => onClickDeleteTask(task.id)}>
              <CancelPresentation/>
          </IconButton>


      </div>
  )
}