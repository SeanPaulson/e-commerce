import type { Meta, StoryObj } from '@storybook/react';

import CardComponent from './CardComponent';
import ContextProvider from '../ContextProvider';

const meta: Meta<typeof CardComponent> = {
    component: CardComponent,
    title: 'Card product preview',
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <ContextProvider>
                <Story />
            </ContextProvider>
        )
    ]
};

export default meta;

type Story = StoryObj<typeof CardComponent>;

export const mobile: Story = {
    render: () => <CardComponent />
}