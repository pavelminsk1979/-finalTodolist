import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {EditModeTitle} from "../Components/EditModeTitle";

export default {
    title: 'Todolist Project/EditModeTitle',
    component:EditModeTitle ,
} as ComponentMeta<typeof EditModeTitle>;


const Template: ComponentStory<typeof EditModeTitle> = (args) => <EditModeTitle {...args} />;

export const EditModeTitleStory = Template.bind({});
EditModeTitleStory.args = {
    callback : action('EditTitle'),
    title:'DobleClick here'
};