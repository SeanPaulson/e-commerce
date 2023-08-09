import type { Meta, StoryObj } from '@storybook/react';

import CardComponent from './CardComponent';
import UserContext from '../UserContext';

const meta: Meta<typeof CardComponent> = {
    component: CardComponent,
    title: 'Card product preview',
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <UserContext>
                <Story />
            </UserContext>
        )
    ]
};

export default meta;

type Story = StoryObj<typeof CardComponent>;

export const mobile: Story = {
    render: () => <CardComponent />
}