import axios from "axios";



const instance = axios.create ({
    baseURL:'https://social-network.samuraijs.com/api/1.1/',
    withCredentials:true,
    headers:{
        'API-KEY':"b48cd3f5-7cda-4a22-b331-9292412429bd"
    }
})


export const todolistApi = {
    getTodolists () {
        return instance.get<TodolistType[]>('todo-lists')
    },

    createTodolist (title:string) {
        return instance.post<AxiosTodolistType<{ item:TodolistType }>>('todo-lists',{title})
    },

    deleteTodolist (todolistId:string) {
        return instance.delete<AxiosTodolistType>(`todo-lists/${todolistId}`)
    },

    updateTodolist (todolistId:string,putAfterItemId:string) {
        return instance.put<AxiosTodolistType>(`todo-lists/${todolistId}`,{putAfterItemId})
    },
}

export const taskApi = {
    getTasks (todolistId:string) {
        return instance.get<AxiosGetTaskType>(`todo-lists/${todolistId}/tasks`)
    },

    createTask (todolistId:string,title:string) {
        return instance.post<AxiosTaskType<{item:TaskType}>>(`todo-lists/${todolistId}/tasks`,{title})
    },

    deleteTask (todolistId:string,taskId:string) {
        return instance.delete<AxiosTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },

    updateTask (todolistId:string,taskId:string,payload:PayloadTaskType) {
        return instance.put<AxiosTaskType<{item:TaskType}>>(`todo-lists/${todolistId}/tasks/${taskId}`,{payload})
    }
}

type PayloadTaskType = {
    title:string,
    description:string,
    completed:boolean,
    status:number,
    priority:number,
    startDate:string,
    deadline:string
}

type AxiosTaskType<T={}> = {
    messages:string[]
    resultCode:number
    data:T
}

type AxiosGetTaskType = {
    items:TaskType[]
    totalCount:number
    error:string
}

type TaskType = {
    description:string,
    title:string,
    completed:boolean,
    status:number,
    priority:number,
    startDate:string,
    deadline:string,
    id:string,
    todoListId:string,
    order:number,
    addedDate:string
}



type AxiosTodolistType<T={}> = {
    resultCode:number,
    messages:string[],
    fieldsErrors: string[],
    data:T
}


export type TodolistType = {
    id:string,
    title:string,
    addedData:string,
    order:number
}