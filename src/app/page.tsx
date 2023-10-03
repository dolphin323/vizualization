"use client";
import styles from "./page.module.css";
import { Chart } from "@/components/chart/chart";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <Chart />
      </div>
    </main>
  );
}
