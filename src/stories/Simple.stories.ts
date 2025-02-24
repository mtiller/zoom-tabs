import type { Meta, StoryObj } from "@storybook/react";
import { SimpleLayouts } from "./Simple";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Simple Layouts",
  component: SimpleLayouts,
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
} satisfies Meta<typeof SimpleLayouts>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicLayout: Story = {
  args: {
    aspectRatio: 1.6,
    width: "20%",
    gap: 0,
  },
};

export const WideAspectRatio: Story = {
  args: {
    aspectRatio: 3,
    width: "20%",
    gap: 0,
  },
};

export const WiderSidebar: Story = {
  args: {
    aspectRatio: 1.6,
    width: "33%",
    gap: 0,
  },
};

export const WithGap: Story = {
  args: {
    aspectRatio: 1.6,
    width: "20%",
    gap: 8,
  },
};
