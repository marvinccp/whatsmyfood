"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { InfoCard } from "./components/InfoCard/InfoCard";
export default function Home() {
  const [login, setLogin] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [message, setMessage] = useState("Press 1");
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);

  const handleClick = (e) => {
    const number = e.target.outerText;

    if (number == 1) {
      setCheck1(true);
      setMessage("Press 2");
      setDisabled(false);
    } else if ((number == 2) & check1) {
      setMessage("Press 3");
      setCheck2(true);
    } else if ((number == 3) & check2 & check1) {
      setMessage("Press 4");
      setCheck3(true);
    } else if ((number == 4) & check3 & check2 & check1) {
      setCheck4(true);
      setLogin(true);
    }
  };
  return (
    <>
      {!login && (
        <section className={styles.section}>
          <main className={styles.main}>
            <Image
              className={styles.image}
              src={"/images/logo-wmf.png"}
              alt="logo"
              width={150}
              height={150}
            />
          </main>
          <div className={styles.message}>
            <h1>{message}</h1>
          </div>
          <button
            onClick={(e) => handleClick(e)}
            className={`${styles.button} ${styles.topleft}`}
          >
            1
          </button>
          <button
            disabled={disabled}
            onClick={(e) => handleClick(e)}
            className={`${styles.button} ${styles.topright}`}
          >
            2
          </button>
          <button
            onClick={(e) => handleClick(e)}
            className={`${styles.button} ${styles.btnleft}`}
          >
            3
          </button>
          <button
            onClick={(e) => handleClick(e)}
            className={`${styles.button} ${styles.btnright}`}
          >
            4
          </button>
        </section>
      )}
      {
        login && (
          <InfoCard />
        )
      }
    </>
  );
}
