import type { Meta, StoryObj } from '@storybook/react';

import ImgPreviewCircle from './ImgPreviewCircle';

const meta: Meta<typeof ImgPreviewCircle> = {
    component: ImgPreviewCircle,
    title: 'product preview',
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ImgPreviewCircle>;

export const mobile: Story = {
    render: () => <ImgPreviewCircle />
};