export type PayloadTaskType = {
    title:string,
    description:string,
    status:number,
    priority:number,
    startDate:string,
    deadline:string
}

export type AxiosTaskType<T={}> = {
    messages:string[]
    fieldsErrors:string[]
    resultCode:number
    data:T
}

export type AxiosGetTaskType = {
    items:TaskType[]
    totalCount:number
    error:string
}

export enum TaskStatus{
    New=0,
    inProgress=1,
    Complete=2,
    Draft=3
}

export type TaskType = {
    description:string,
    title:string,
    status:TaskStatus,
    priority:number,
    startDate:string,
    deadline:string,
    id:string,
    todoListId:string,
    order:number,
    addedDate:string
}



export type AxiosTodolistType<T={}> = {
    resultCode:number,
    messages:string[],
    fieldsErrors: string[],
    data:T
}


export  type TodolistType = {
    id:string,
    title:string,
    addedData:string,
    order:number
}

export type FilterType = 'all' | 'new' | 'completed'

export type CommonTodolistType = TodolistType & {
    filter:FilterType,
    disableStatus:boolean
}