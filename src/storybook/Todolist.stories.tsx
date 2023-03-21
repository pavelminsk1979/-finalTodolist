import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Todolist} from "../Components/Todolist";

export default {
    title: 'Todolist Project/Todolist',
    component:Todolist ,
} as ComponentMeta<typeof Todolist>;


const Template: ComponentStory<typeof Todolist> = (args) => <Todolist {...args} />;

export const TodolistStory = Template.bind({});
TodolistStory.args = {
    deleteTask : action('deleteTask'),
    changeTitleTodolist : action('changeTitleTodolist'),
    changeTitleTask : action('changeTitleTask'),
    deleteTodolist : action('deleteTodolist'),
    changeCheckboxTask : action('changeCheckboxTask'),
    filterTodolist : action('filterTodolist'),
    createTask : action('createTask'),
    filter:'all',
    title:"I'm importatnt todolist",
    todolist:{id:'11',title:"I'm importatnt todolist",filter:'all'},
    tasks:{
    ['11']:[
        {id:'1',title:"I'm MAIN Title",isDone:true},
        {id:'2',title:"I'm small and little title",isDone:false}
    ]
}
};