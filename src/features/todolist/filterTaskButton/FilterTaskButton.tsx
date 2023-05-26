import Button from "@mui/material/Button";
import React from "react";
import {CommonTodolistType, FilterType} from "common/types";
import {todolActions} from "features/todolist/TodolistReducer";
import {useAppDispatch} from "features/app/store";



type PropsType = {
    todolist: CommonTodolistType
}

export const FilterTaskButton = ({todolist}:PropsType) => {
    const dispatch = useAppDispatch()

    const changeTodolistFilter = (valueFilter: FilterType) => {
        dispatch(todolActions.filterTodolist({
            idTodolist: todolist.id,
            valueFilter
        }))
    }

  return(
      <div>
          <Button
              color={'secondary'}
              size={todolist.filter === 'all' ? 'medium' : 'small'}
              variant={todolist.filter === 'all' ? "contained" : 'outlined'}
              onClick={() => changeTodolistFilter('all')}>All
          </Button>
          <Button
              color={'secondary'}
              size={todolist.filter === 'new' ? 'medium' : 'small'}
              variant={todolist.filter === 'new' ? "contained" : 'outlined'}
              onClick={() => changeTodolistFilter('new')}>New
          </Button>
          <Button
              color={'secondary'}
              size={todolist.filter === 'completed' ? 'medium' : 'small'}
              variant={todolist.filter === 'completed' ? "contained" : 'outlined'}
              onClick={() => changeTodolistFilter('completed')}>Completed
          </Button>
      </div>
  )
}