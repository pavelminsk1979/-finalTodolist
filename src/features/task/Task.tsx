import React from "react";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CancelPresentation from "@mui/icons-material/CancelPresentation";
import {TaskStatus, TaskType} from "common/types";
import {EditModeTitle} from "Components/EditModeTitle";
import st from "./Task.module.css"
import {useAppDispatch} from "features/app/store";
import { taskThunks } from "./TasksReducer";



type PropsType = {
    task: TaskType
    idTodolist:string
}

export const Task = (
    {task,idTodolist}:PropsType) => {

    const dispatch = useAppDispatch()

    const onClickDeleteTask = (idTask: string) => {
        dispatch(taskThunks.deleteTask({idTodolist, idTask}))
    }

    const changeCheckboxTaskHundler = (idTask: string, valueCheckbox: boolean) => {
        dispatch(taskThunks.changeCheckboxTask({idTodolist, idTask, valueCheckbox}))
    }

    const changeTitleTaskHundler = (idTask: string, editTitle: string) => {
        dispatch(taskThunks.changeTitleTask({idTodolist, idTask, editTitle}))
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