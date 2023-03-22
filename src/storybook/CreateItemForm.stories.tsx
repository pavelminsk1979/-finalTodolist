import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {CreateItemForm} from "../Components/CreateItemForm";

export default {
    title: 'Todolist Project/CreateItemForm',
    component:CreateItemForm ,
} as ComponentMeta<typeof CreateItemForm>;


const Template: ComponentStory<typeof CreateItemForm> = (args) => <CreateItemForm {...args} />;

export const CreateItemFormStory = Template.bind({});
CreateItemFormStory.args = {
    name:'Click',
    callback : action('Create Text')
};