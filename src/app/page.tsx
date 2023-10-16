"use client";
import { Chart } from "@/page_components/chart";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <Chart />
      </div>
    </main>
  );
}
