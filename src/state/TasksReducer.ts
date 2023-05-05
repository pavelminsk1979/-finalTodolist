import {Dispatch} from "redux";
import {taskApi} from "../api/api";
import {PayloadTaskType, TaskStatus, TaskType} from "../common/types";
import {StateStoreType} from "./store";
import {utilsFanctionForMethodCatch, utilsFanctionForShowError} from "../utils/utilsFanction";
import {appActions} from "./appReducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {todolActions} from "./TodolistReducer";


export type StateTaskType = {
    [key: string]: TaskType[]
}

const initialTaskState: StateTaskType = {}


const setTasks = createAsyncThunk('tasks/setTasks',
    async (todolistId: string, thunAPI) => {
        try {
            thunAPI.dispatch(appActions.setLoading({valueLoading: 'loading'}))
            const respons = await taskApi.getTasks(todolistId)
            thunAPI.dispatch(appActions.setLoading(
                {valueLoading: 'finishLoading'}))
            return {todolistId, tasks: respons.data.items}
        } catch (e) {
           return  thunAPI.rejectWithValue('ERROR')
        }
    })

const deleteTask = createAsyncThunk('tasks/deleteTask', async (arg: { idTodolist: string, idTask: string }, thunAPI) => {
    thunAPI.dispatch(appActions.setLoading({valueLoading: 'loading'}))
    const respons = await taskApi.deleteTask(arg.idTodolist, arg.idTask)
    thunAPI.dispatch(appActions.setLoading(
        {valueLoading: 'finishLoading'}))
    return {idTodolist: arg.idTodolist, idTask: arg.idTask}
})

/*export const deleteTaskTC = (idTodolist: string, idTask: string) => (
    dispatch: Dispatch) => {
    dispatch(appActions.setLoading({valueLoading: 'loading'}))
    taskApi.deleteTask(idTodolist, idTask)
        .then((respons) => {
            dispatch(taskActions.deleteTask({idTodolist, idTask}))
            dispatch(appActions.setLoading(
                {valueLoading: 'finishLoading'}))
        })
        .catch((error) => {
            utilsFanctionForMethodCatch(error.message, dispatch)
        })
}*/


const slice = createSlice({
    name: 'tasks',
    initialState: initialTaskState,
    reducers: {
        createTask(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        changeTitleTask(state, action: PayloadAction<{
            idTodolist: string, idTask: string, item: PayloadTaskType
        }>) {
            const tasks = state[action.payload.idTodolist]
            const index = tasks.findIndex(t => t.id === action.payload.idTask)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.item}
            }
        },
        changeCheckboxTask(state, action: PayloadAction<{
            idTodolist: string, idTask: string, item: PayloadTaskType
        }>) {
            const tasks = state[action.payload.idTodolist]
            const index = tasks.findIndex(t => t.id === action.payload.idTask)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.item}
            }
        }
    },
    extraReducers: builder => {
        builder
            .addCase(deleteTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.idTodolist]
                const index = tasks.findIndex(t => t.id === action.payload.idTask)
                if (index > -1) {
                    tasks.splice(index, 1)
                }
            })
            .addCase(setTasks.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks
            })
            .addCase(setTasks.rejected, (state, action) => {

            })
            .addCase(todolActions.createTodolist, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(todolActions.deleteTodolist, (state, actoin) => {
                delete state[actoin.payload.idTodolist]
            })
            .addCase(todolActions.deleteDataWhenLogOut, (state, action) => {
                state = {}
            })
            .addCase(todolActions.setTodolists, (state, actoin) => {
                actoin.payload.todolists.forEach((el: any) => {
                    state[el.id] = []
                })
            })
    }
})


export const tasksReducer = slice.reducer

export const taskActions = slice.actions

export const taskThunks = {setTasks, deleteTask}


export const changeCheckboxTaskTC = (idTodolist: string, idTask: string, valueCheckbox: boolean) => (
    dispatch: Dispatch, getState: () => StateStoreType) => {
    const state = getState()
    const allTasks = state.tasks
    const taskForCorrectTodolist = allTasks[idTodolist]
    const task = taskForCorrectTodolist.find(e => e.id === idTask)
    let value: TaskStatus
    if (valueCheckbox === true) {
        value = TaskStatus.Complete
    } else {
        value = TaskStatus.New
    }
    if (task) {
        dispatch(appActions.setLoading({valueLoading: 'loading'}))
        taskApi.updateCheckboxTask(idTodolist, idTask, {
            title: task.title,
            description: task.description,
            status: value,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline
        })
            .then((respons) => {
                dispatch(taskActions.changeCheckboxTask(
                    {idTodolist, idTask, item: respons.data.data.item}))
                dispatch(appActions.setLoading(
                    {valueLoading: 'finishLoading'}))
            })
            .catch((error) => {
                utilsFanctionForMethodCatch(error.message, dispatch)
            })
    }
}


export const changeTitleTaskTC = (idTodolist: string, idTask: string, editTitle: string) => (
    dispatch: Dispatch, getState: () => StateStoreType) => {
    const state = getState()
    const allTasks = state.tasks
    const taskForCorrectTodolist = allTasks[idTodolist]
    const task = taskForCorrectTodolist.find(e => e.id === idTask)
    if (task) {
        dispatch(appActions.setLoading({valueLoading: 'loading'}))
        taskApi.updateTask(idTodolist, idTask, {
            title: editTitle,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline
        })
            .then((respons) => {
                if (respons.data.resultCode === 0) {
                    dispatch(taskActions.changeTitleTask(
                        {idTodolist, idTask, item: respons.data.data.item}))
                    dispatch(appActions.setLoading(
                        {valueLoading: 'finishLoading'}))
                } else {
                    utilsFanctionForShowError(
                        respons.data.messages, dispatch)
                }
            })
            .catch((error) => {
                utilsFanctionForMethodCatch(error.message, dispatch)
            })
    }
}


export const createTaskTC = (idTodolist: string, text: string) => (
    dispatch: Dispatch) => {
    dispatch(appActions.setLoading({valueLoading: 'loading'}))
    taskApi.createTask(idTodolist, text)
        .then((respons) => {
            if (respons.data.resultCode === 0) {
                dispatch(taskActions.createTask({task: respons.data.data.item}))
                dispatch(appActions.setLoading(
                    {valueLoading: 'finishLoading'}))
            } else {
                utilsFanctionForShowError(
                    respons.data.messages, dispatch)
            }
        })
        .catch((error) => {
            utilsFanctionForMethodCatch(error.message, dispatch)
        })
}





