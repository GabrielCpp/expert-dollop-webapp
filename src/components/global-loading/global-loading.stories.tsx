import React from "react";
import { Story, Meta } from "@storybook/react";

import { GlobalLoading } from "./global-loading";

export default {
  title: "Loading/GlobalLoading",
  component: GlobalLoading,
} as Meta;

const Template: Story<{}> = (args) => <GlobalLoading {...args} />;

export const GlobalLoadingRunning = Template.bind({});
