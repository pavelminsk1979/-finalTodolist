import {taskApi} from "api/api";
import {TaskStatus, TaskType} from "common/types";
import {appActions} from "features/app/appReducer";
import {createSlice} from "@reduxjs/toolkit";
import {todolActions, todolistThunk} from "../todolist/TodolistReducer";
import {createAppAsyncThunk} from "common/utils/createAppAsyncThunk";
import {utilsFanctionForShowError} from "common/utils/utilsFanctionForShowError";
import {thunkTryCatch} from "common/utils/thunkTryCatch";


export type StateTaskType = {
    [key: string]: TaskType[]
}

const initialTaskState: StateTaskType = {}


const setTasks = createAppAsyncThunk<{ todolistId: string, tasks: TaskType[] },
    string>('tasks/setTasks',
    async (todolistId, thunkAPI) => {
        return thunkTryCatch(thunkAPI, async () => {
            const respons = await taskApi.getTasks(todolistId)
            return {todolistId, tasks: respons.data.items}
        })
    })

const deleteTask = createAppAsyncThunk<{ idTodolist: string, idTask: string }, { idTodolist: string, idTask: string }>('tasks/deleteTask',
    async (arg, thunkAPI) => {
        return thunkTryCatch(thunkAPI, async () => {
            const respons = await taskApi.deleteTask(arg.idTodolist, arg.idTask)
            return {idTodolist: arg.idTodolist, idTask: arg.idTask}
        })
    })


const createTask = createAppAsyncThunk<{ task: TaskType },
    { idTodolist: string, text: string }>('tasks/createTask',
    async (arg, thunkAPI) => {
        return thunkTryCatch(thunkAPI, async () => {
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
        })
    })

const changeTitleTask = createAppAsyncThunk<{ idTodolist: string, idTask: string, item: TaskType }, { idTodolist: string, idTask: string, editTitle: string }>(
    'tasks/changeTitleTask',
    async (arg, thunkAPI) => {
        return thunkTryCatch(thunkAPI, async () => {
            const {dispatch, getState, rejectWithValue} = thunkAPI
            const state = getState()
            const allTasks = state.tasks
            const taskForCorrectTodolist = allTasks[arg.idTodolist]
            const task = taskForCorrectTodolist.find(e => e.id === arg.idTask)
            if (task) {
                const respons = await taskApi.updateTask(arg.idTodolist, arg.idTask, {
                    title: arg.editTitle,
                    description: task.description,
                    status: task.status,
                    priority: task.priority,
                    startDate: task.startDate,
                    deadline: task.deadline
                })
                if (respons.data.resultCode === 0) {
                    return {
                        idTodolist: arg.idTodolist,
                        idTask: arg.idTask,
                        item: respons.data.data.item
                    }
                } else {
                    utilsFanctionForShowError(
                        respons.data.messages, dispatch)
                    return rejectWithValue(null)
                }
            } else {
                return rejectWithValue(null)
            }
        })
    })

const changeCheckboxTask = createAppAsyncThunk<{
    idTodolist: string,
    idTask: string,
    item: TaskType
},
    {
        idTodolist: string,
        idTask: string,
        valueCheckbox: boolean
    }>('tasks/changeCheckboxTask', async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
        const {dispatch, getState, rejectWithValue} = thunkAPI
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
            const respons = await taskApi.updateCheckboxTask(
                arg.idTodolist, arg.idTask, {
                    title: task.title,
                    description: task.description,
                    status: value,
                    priority: task.priority,
                    startDate: task.startDate,
                    deadline: task.deadline
                })
            return {
                idTodolist: arg.idTodolist,
                idTask: arg.idTask,
                item: respons.data.data.item
            }
        } else {
            return rejectWithValue(null)
        }
    })
})


const slice = createSlice({
    name: 'tasks',
    initialState: initialTaskState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(changeCheckboxTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.idTodolist]
                const index = tasks.findIndex(t => t.id === action.payload.idTask)
                if (index > -1) {
                    tasks[index] = {...tasks[index], ...action.payload.item}
                }
            })
            .addCase(changeTitleTask.fulfilled, (state, action) => {
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
            .addCase(todolistThunk.deleteTodolist.fulfilled, (state, actoin) => {
                delete state[actoin.payload.idTodolist]
            })
            .addCase(todolActions.deleteDataWhenLogOut, (state, action) => {
                return  {}
            })
            .addCase(todolistThunk.setTodolists.fulfilled, (state, actoin) => {
                actoin.payload.todolists.forEach((el: any) => {
                    state[el.id] = []
                })
            })
    }
})


export const tasksReducer = slice.reducer


export const taskThunks = {setTasks, deleteTask, createTask, changeTitleTask, changeCheckboxTask}














