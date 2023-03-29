import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "../Components/Task";
import {TaskStatus} from "../common/types";


export default {
    title: 'Todolist Project/Task',
    component:Task ,
    args:{
        callbackDel:action('DeleteTask'),
        callbackCheckbox:action('ChangeCheckboxTask'),
        callbackChangeTitle:action('ChangeTitleTask')
    }
} as ComponentMeta<typeof Task>;


const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskStoryIsDoneTrue = Template.bind({});
TaskStoryIsDoneTrue.args = {
    task: {id:'1',title:"I'm MAIN Title",status:TaskStatus.Complete, todoListId:'todolistId1',description:'',startDate:'',deadline:'',
        addedDate:'',order:0, priority:1},
};

export const TaskStoryIsDoneFalse = Template.bind({});
TaskStoryIsDoneFalse.args = {
    task: {id:'2',title:"I'm small and little title",status:TaskStatus.New, todoListId:'todolistId1',description:'',startDate:'',deadline:'',
        addedDate:'',order:0, priority:1},
};