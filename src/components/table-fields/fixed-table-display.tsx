import { Tab, Tabs } from "@material-ui/core";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export interface TabTableCollectionProps {
  path: string[];
  tabs: [string, string][];
  defaultSelectedField: string;
  children: (props: { path: string[]; name: string }) => JSX.Element;
}

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      style={{ width: "100%" }}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {children}
    </div>
  );
}

export function FixedTabDisplay({
  path,
  tabs,
  defaultSelectedField,
  children: Children,
}: TabTableCollectionProps) {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = React.useState(defaultSelectedField);
  const [avaiablesComponents] = useState(tabs);

  const handleChange = (_: React.ChangeEvent<{}>, newValue: string) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        aria-label="simple tabs example"
      >
        {avaiablesComponents.map(([name, label]) => (
          <Tab key={name} label={t(label)} value={name} />
        ))}
      </Tabs>
      {avaiablesComponents.map(([name]) => (
        <TabPanel key={name} value={name} index={selectedTab}>
          <Children path={path} name={name} />
        </TabPanel>
      ))}
    </>
  );
}
