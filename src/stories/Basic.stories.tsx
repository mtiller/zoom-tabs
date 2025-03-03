import type { Meta, StoryObj } from "@storybook/react";
import { Basic } from "./Basic";
import { BasicGrid } from "./BasicGrid";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Stories/Basic",
  component: Basic,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    // layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof Basic>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicExample: Story = {
  name: "Basic Sidebar Usage",
  render: () => <Basic />,
  args: {
    aspectRatio: 1.6,
  },
};

export const BasicGridExample: Story = {
  name: "Bring Your Own Layout",
  render: () => <BasicGrid />,
  args: {
    aspectRatio: 1.6,
  },
};
