import type { Meta, StoryObj } from "@storybook/react";
import { Open } from "./Open";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Initially Open Slots",
  component: Open,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    // layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof Open>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NestedVideos: Story = {
  args: {
    aspectRatio: 1.6,
    width: "20%",
    gap: 0,
    side: "left",
  },
};

export const NestedVideosOnRight: Story = {
  args: {
    aspectRatio: 1.6,
    width: "20%",
    gap: 0,
    side: "right",
  },
};

export const NestedVideosOnTop: Story = {
  args: {
    aspectRatio: 1.6,
    width: "20%",
    gap: 0,
    side: "top",
  },
};

export const NestedVideosOnBottom: Story = {
  args: {
    aspectRatio: 1.6,
    width: "20%",
    gap: 0,
    side: "bottom",
  },
};

export const NestedVideosOnLeftWithGap: Story = {
  args: {
    aspectRatio: 1.6,
    width: "20%",
    gap: 10,
    side: "left",
  },
};

export const NestedVideosOnTopWithGap: Story = {
  args: {
    aspectRatio: 1.6,
    width: "20%",
    gap: 10,
    side: "top",
  },
};
