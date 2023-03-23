import axios from "axios";



const instance = axios.create ({
    baseURL:'https://social-network.samuraijs.com/api/1.1/',
    withCredentials:true,
    headers:{
        'API-KEY':"b48cd3f5-7cda-4a22-b331-9292412429bd"
    }
})


export const todolistsApi = {
    getTodolists () {
        return instance.get<TodolistType[]>('todo-lists')
    },

    createTodolists (title:string) {
        return instance.post<AxiosTodolistType<{ item:TodolistType }>>('todo-lists',{title})
    },

    deleteTodolists (todolistId:string) {
        return instance.delete<AxiosTodolistType>(`todo-lists/${todolistId}`)
    },

    updateTodolists (todolistId:string,putAfterItemId:string) {
        return instance.put<AxiosTodolistType>(`todo-lists/${todolistId}`,{putAfterItemId})
    },
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