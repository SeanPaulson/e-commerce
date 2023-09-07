import type { Meta, StoryObj } from '@storybook/react';

import CarouselComponent from './Carousel';

const meta: Meta<typeof CarouselComponent> = {
    component: CarouselComponent,
    title: 'Carousel preview',
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof CarouselComponent>;

export const mobile: Story = {
    render: ({ productImage }) => <CarouselComponent productImage={productImage}/>
}