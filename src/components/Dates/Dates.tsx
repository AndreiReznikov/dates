import styles from "./Dates.module.scss";

const POINTS = [
  {
    id: 1,
    events: [],
  },
  {
    id: 2,
    events: [],
  },
  {
    id: 3,
    events: [],
  },
  {
    id: 4,
    events: [],
  },
  {
    id: 5,
    events: [],
  },
  {
    id: 6,
    events: [],
  },
];

const CIRCLE_ANGLE = 360;
const CIRCLE_DIAMETER = 530;
const POINT_ANGLE = CIRCLE_ANGLE / POINTS.length;

export const Dates: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.verticalLine}></div>
        <div className={styles.horizontalLine}></div>
        <div className={styles.circle}>
          {POINTS.map((point, index) => (
            <div
              style={{
                transform: `rotate(${index * POINT_ANGLE}deg)
                translate(${CIRCLE_DIAMETER / 2}px)`,
              }}
              className={styles.pointContainer}
            >
              <div className={styles.point}>
                <div className={styles.pointContent}>
                  <span className={styles.pointIndex}>{++index}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
