import React, { FunctionComponent } from "react";
import { Tabs, Tab, TabsProps } from "@mui/material";
import styles from "./styles.module.scss";

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface Props extends TabsProps {
  tabs: string[];
  isFill?: boolean;
  tabIndex: number;
  setTabIndex: (index: number) => void;
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
    >
      {value === index && children}
    </div>
  );
}

const CustomTabs: FunctionComponent<Props> = ({
  tabs,
  isFill,
  tabIndex,
  setTabIndex,
  ...others
}) => {
  const handleTabChange = (event: React.SyntheticEvent, index: number) => {
    setTabIndex(index);
  };

  return (
    <Tabs value={tabIndex} onChange={handleTabChange} {...others}>
      {tabs.map((tab, index) => (
        <Tab key={index} {...a11yProps(index)} label={tab} />
      ))}
    </Tabs>
  );
};

export { CustomTabs };
