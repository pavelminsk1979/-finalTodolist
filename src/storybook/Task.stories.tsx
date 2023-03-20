import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "../Components/Task";


export default {
    title: 'Todolist Project/Task',
    component:Task ,
} as ComponentMeta<typeof Task>;


const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskStory = Template.bind({});
TaskStory.args = {
    task: {id:'1',title:"I'm MAIN Title",isDone:true},
    callbackDel:action('DeleteTask'),
        callbackCheckbox:action('ChangeCheckboxTask'),
    callbackChangeTitle:action('ChangeTitleTask')
};