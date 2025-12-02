import styles from "./Dates.module.scss";

export const Dates: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.verticalLine}></div>
        <div className={styles.horizontalLine}></div>
        <div className={styles.circle}></div>
      </div>
    </section>
  );
};
