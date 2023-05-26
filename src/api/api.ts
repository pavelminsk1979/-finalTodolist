import axios from "axios";
import {
    AxiosGetTaskType, AxiosResponseType,
    AxiosTaskType, LoginDataType, MeResponseType,
    PayloadTaskType,
    TaskType,
    TodolistType
} from "common/types";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': "b48cd3f5-7cda-4a22-b331-9292412429bd"
    }
})

export const authApi = {
    logIn(data: LoginDataType) {
        return instance.post<AxiosResponseType<{ userId: number }>>('auth/login', data)
    },

    logOut() {
        return instance.delete<AxiosResponseType>('auth/login')
    },

    me() {
        return instance.get<AxiosResponseType<MeResponseType>>('auth/me')
    }
}


export const todolistApi = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists')
    },

    createTodolist(title: string) {
        return instance.post<AxiosResponseType<{ item: TodolistType }>>('todo-lists', {title})
    },

    deleteTodolist(todolistId: string) {
        return instance.delete<AxiosResponseType>(`todo-lists/${todolistId}`)
    },

    updateTodolist(todolistId: string, putAfterItemId: string) {
        return instance.put<AxiosResponseType>(`todo-lists/${todolistId}`, {title: putAfterItemId})
    },
}

export const taskApi = {
    getTasks(todolistId: string) {
        return instance.get<AxiosGetTaskType>(`todo-lists/${todolistId}/tasks`)
    },

    createTask(todolistId: string, title: string) {
        return instance.post<AxiosTaskType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
    },

    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<AxiosTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },

    updateTask(todolistId: string, taskId: string, payload: PayloadTaskType) {
        return instance.put<AxiosTaskType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, payload)
    },

    updateCheckboxTask(todolistId: string, taskId: string, payload: PayloadTaskType) {
        return instance.put<AxiosTaskType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, payload)
    }
}

