import { gsap } from "gsap";
import styles from "./Dates.module.scss";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

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
const DEFAULT_ANGLE = 60;

export const Dates: React.FC = () => {
  const circleRef = useRef(null);

  useGSAP(() => {
    if (circleRef.current) {
      gsap.set(circleRef.current, { rotation: -DEFAULT_ANGLE, duration: 0 });
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.verticalLine}></div>
      <div className={styles.horizontalLine}></div>
      <div ref={circleRef} className={styles.circle}>
        {POINTS.map((point, index) => (
          <div
            style={{
              transform: `rotate(${index * POINT_ANGLE}deg)
                translate(${CIRCLE_DIAMETER / 2}px)`,
            }}
            className={styles.pointContainer}
          >
            <div
              className={styles.point}
              style={{
                transform: `rotate(${
                  -(index * POINT_ANGLE) + DEFAULT_ANGLE
                }deg)`,
              }}
            >
              <div className={styles.pointContent}>
                <span className={styles.pointIndex}>{++index}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
