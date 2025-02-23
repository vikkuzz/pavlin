import React from "react";
import { Tabs } from "antd";
import Stream from "./Stream";
import Tasks from "./Tasks";
import Chart from "./Chart";
import Terminal from "./Terminal";
import Data from "./Data";
import TabsComp from "./TabsComp";

const tabs = [
  {
    id: 1,
    label: "Stream",
    children: (
      <>
        <Stream />
        <Tasks />
      </>
    ),
  },
  {
    id: 2,
    label: "Trades",
    children: (
      <>
        <Chart />
        <Terminal />
      </>
    ),
  },
  {
    id: 3,
    label: "Analitics",
    children: (
      <>
        <Data />
        <TabsComp />
      </>
    ),
  },
  {
    id: 4,
    label: "Info",
    children: <span>some data</span>,
  },
];

const Menu = ({ ...props }) => {
  return (
    <div {...props}>
      <Tabs
        type="cad"
        tabPosition={"bottom"}
        items={tabs.map((el) => {
          return {
            label: el.label,
            key: el.id,
            children: el.children,
          };
        })}
      />
    </div>
  );
};

export default Menu;
