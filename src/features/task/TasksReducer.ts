
import {taskApi} from "../../api/api";
import { TaskStatus, TaskType} from "../../common/types";
import {appActions} from "../../app/appReducer";
import { createSlice} from "@reduxjs/toolkit";
import {todolActions, todolistThunk} from "../todolist/TodolistReducer";
import {createAppAsyncThunk} from "../../common/utils/createAppAsyncThunk";
import { utilsFanctionForMethodCatch } from "../../common/utils/utilsFanctionForMethodCatch";
import {utilsFanctionForShowError} from "../../common/utils/utilsFanctionForShowError";



export type StateTaskType = {
    [key: string]: TaskType[]
}

const initialTaskState: StateTaskType = {}


const setTasks = createAppAsyncThunk<{ todolistId: string, tasks: TaskType[] }, string>('tasks/setTasks',
    async (todolistId, thunkAPI) => {
        try {
            thunkAPI.dispatch(appActions.setLoading({valueLoading: 'loading'}))
            const respons = await taskApi.getTasks(todolistId)
            thunkAPI.dispatch(appActions.setLoading(
                {valueLoading: 'finishLoading'}))
            return {todolistId, tasks: respons.data.items}
        } catch (e) {
            utilsFanctionForMethodCatch(e, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
        }
    })

const deleteTask = createAppAsyncThunk<{ idTodolist: string, idTask: string }, { idTodolist: string, idTask: string }>('tasks/deleteTask', async (arg, thunkAPI) => {
    try {
        thunkAPI.dispatch(appActions.setLoading({valueLoading: 'loading'}))
        const respons = await taskApi.deleteTask(arg.idTodolist, arg.idTask)
        thunkAPI.dispatch(appActions.setLoading(
            {valueLoading: 'finishLoading'}))
        return {idTodolist: arg.idTodolist, idTask: arg.idTask}
    } catch (e) {
        utilsFanctionForMethodCatch(e, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue(null)
    }
})


const createTask = createAppAsyncThunk<{ task: TaskType },
    { idTodolist: string, text: string }>('tasks/createTask', async (arg, thunkAPI) => {
    thunkAPI.dispatch(appActions.setLoading(
        {valueLoading: 'loading'}))
    try {
        const respons = await taskApi.createTask(arg.idTodolist, arg.text)
        if (respons.data.resultCode === 0) {
            thunkAPI.dispatch(appActions.setLoading(
                {valueLoading: 'finishLoading'}))
            return {task: respons.data.data.item}
        } else {
            utilsFanctionForShowError(
                respons.data.messages, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
        }
    } catch (e) {
        utilsFanctionForMethodCatch(e, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue(null)
    }

})


const changeTitleTask = createAppAsyncThunk<{idTodolist:string,idTask: string, item: TaskType},{ idTodolist: string, idTask: string, editTitle: string }>('tasks/changeTitleTask',
    async (arg, thunkAPI)=>{
        const {dispatch, getState, rejectWithValue} = thunkAPI
        try {
            const state = getState()
            const allTasks = state.tasks
            const taskForCorrectTodolist = allTasks[arg.idTodolist]
            const task = taskForCorrectTodolist.find(e => e.id === arg.idTask)
            if(task){
                dispatch(appActions.setLoading({valueLoading: 'loading'}))
                const respons = await taskApi.updateTask(arg.idTodolist, arg.idTask, {
                    title: arg.editTitle,
                    description: task.description,
                    status: task.status,
                    priority: task.priority,
                    startDate: task.startDate,
                    deadline: task.deadline
                })
                if (respons.data.resultCode === 0) {
                    dispatch(appActions.setLoading(
                        {valueLoading: 'finishLoading'}))
                    return {idTodolist: arg.idTodolist,
                        idTask: arg.idTask,
                        item: respons.data.data.item}
                } else {
                    utilsFanctionForShowError(
                        respons.data.messages, dispatch)
                    return rejectWithValue(null)
                }
            } else {
                return rejectWithValue(null)
            }
        } catch (e) {
            utilsFanctionForMethodCatch(e, dispatch)
            return rejectWithValue(null)
        }
    })

const changeCheckboxTask = createAppAsyncThunk<{
    idTodolist:string,
    idTask:string,
    item:TaskType},
    {idTodolist: string,
        idTask: string,
        valueCheckbox: boolean}>(
    'tasks/changeCheckboxTask',async (arg,thunkAPI)=>{
        const {dispatch, getState, rejectWithValue} = thunkAPI
        try {
            const state = getState()
            const allTasks = state.tasks
            const taskForCorrectTodolist = allTasks[arg.idTodolist]
            const task = taskForCorrectTodolist.find(e => e.id === arg.idTask)
            let value: TaskStatus
            if (arg.valueCheckbox === true) {
                value = TaskStatus.Complete
            } else {
                value = TaskStatus.New
            }
            if (task) {
                dispatch(appActions.setLoading(
                    {valueLoading: 'loading'}))
                const respons = await  taskApi.updateCheckboxTask(
                    arg.idTodolist, arg.idTask, {
                    title: task.title,
                    description: task.description,
                    status: value,
                    priority: task.priority,
                    startDate: task.startDate,
                    deadline: task.deadline
                })
                dispatch(appActions.setLoading(
                    {valueLoading: 'finishLoading'}))
                return {idTodolist:arg.idTodolist,
                    idTask:arg.idTask,
                    item: respons.data.data.item}

            }else {
                return rejectWithValue(null)
            }
        } catch (e) {
            utilsFanctionForMethodCatch(e, dispatch)
            return rejectWithValue(null)
        }
    })


/*export const changeCheckboxTaskTC = (idTodolist: string, idTask: string, valueCheckbox: boolean) => (
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
}*/


/*
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
    }*/

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
        reducers: {},
        extraReducers: builder => {
            builder
                .addCase(changeCheckboxTask.fulfilled,(state,action)=>{
                    const tasks = state[action.payload.idTodolist]
                    const index = tasks.findIndex(t => t.id === action.payload.idTask)
                    if (index > -1) {
                        tasks[index] = {...tasks[index], ...action.payload.item}
                    }
                })
                .addCase(changeTitleTask.fulfilled, (state, action)=>{
                    const tasks = state[action.payload.idTodolist]
                    const index = tasks.findIndex(t => t.id === action.payload.idTask)
                    if (index > -1) {
                        tasks[index] = {...tasks[index], ...action.payload.item}
                    }
                })
                .addCase(createTask.fulfilled, (state, action) => {
                    state[action.payload.task.todoListId].unshift(action.payload.task)
                })
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
                .addCase(todolistThunk.createTodolist.fulfilled, (state, action) => {
                    state[action.payload.todolist.id] = []
                })
                .addCase(todolActions.deleteTodolist, (state, actoin) => {
                    delete state[actoin.payload.idTodolist]
                })
                .addCase(todolActions.deleteDataWhenLogOut, (state, action) => {
                    state = {}
                })
                .addCase(todolistThunk.setTodolists.fulfilled, (state, actoin) => {
                    actoin.payload.todolists.forEach((el: any) => {
                        state[el.id] = []
                    })
                })
        }
    })


    export const tasksReducer = slice.reducer


    export const taskThunks = {setTasks, deleteTask, createTask, changeTitleTask,changeCheckboxTask}














