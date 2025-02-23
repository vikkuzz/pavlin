"use client";
import { Header } from "@/components/Header/Header";
import styles from "./page.module.css";
import NavBar from "@/components/NavBar/NavBar";
import { Grid } from "antd";
import Stream from "@/components/Stream";
import Tasks from "@/components/Tasks";
import Terminal from "@/components/Terminal";
import Menu from "@/components/Menu";
import Chart from "@/components/Chart";
import TabsComp from "@/components/TabsComp";
import Data from "@/components/Data";
const { useBreakpoint } = Grid;

export default function MyApp() {
  const screens = useBreakpoint();
  return (
    <div className={styles.wrapper}>
      <Header className={styles.header} />
      {!screens.md && <NavBar className={styles.navbar} />}
      {screens.md && (
        <>
          <Stream className={styles.stream} />
          <Tasks className={styles.tasks} />
          <Chart className={styles.chart} />
          <TabsComp className={styles.tabs} />
          <Terminal className={styles.terminal} />
          <Data className={styles.data} />
        </>
      )}
      {!screens.md && (
        <Menu
          className={`${styles.menu} flex mt-auto w-full h-full justify-center `}
        />
      )}
    </div>
  );
}
