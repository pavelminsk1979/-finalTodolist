import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import App from "../Components/App";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";


export default {
    title: 'Todolist Project/App',
    component:App ,
    decorators:[ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>;


const Template: ComponentStory<typeof App> = () => <App  />;

export const AppStory = Template.bind({});