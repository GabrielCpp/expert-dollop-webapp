import { Box, Tab, Tabs } from "@mui/material";
import { useCallback, useState } from "react";
import { getJsxElements, MixedChildren } from "../helpers";

interface StaticTabsProps {
  defaultSelectedField: string;
  children: MixedChildren;
  active?: boolean;
}

export function StaticTabs({
  defaultSelectedField,
  children,
  active = true,
}: StaticTabsProps) {
  const [selectedTab, setSelectedTab] = useState(defaultSelectedField);
  const handleChange = useCallback(
    (_: React.ChangeEvent<{}>, newValue: string) => {
      setSelectedTab(newValue);
    },
    [setSelectedTab]
  );

  const elements = getJsxElements(children);

  return (
    <>
      <Tabs value={selectedTab} onChange={handleChange}>
        {active &&
          elements
            .map((x) => [x.key, x.props.label])
            .map(([key, label]) => <Tab key={key} label={label} value={key} />)}
      </Tabs>
      {elements.map((child) => (
        <TabPanel key={child.key} value={child.key} index={selectedTab}>
          <Box sx={{ marginTop: 1.5 }}>{child}</Box>
        </TabPanel>
      ))}
    </>
  );
}

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {children}
    </div>
  );
}
