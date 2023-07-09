import type { Meta, StoryObj } from '@storybook/react';

import LoginOverlay from './LoginOverlay';

const meta: Meta<typeof LoginOverlay> = {
    component: LoginOverlay,
    title: 'login module',
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof LoginOverlay>;

export const mobile: Story = {
    render: () => <LoginOverlay />
};