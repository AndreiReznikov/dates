import { gsap } from "gsap";
import styles from "./Dates.module.scss";
import { useRef, useState } from "react";
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
const SHIFT_ANGLE = 60;

export const Dates: React.FC = () => {
  const [targetPoint, setTargetPoint] = useState<number>(0);
  const circleRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (circleRef.current) {
      gsap.set(circleRef.current, { rotation: -SHIFT_ANGLE, duration: 0 });
    }
  }, []);

  const handlePoint = (index: number) => {
    console.log(index);
    setTargetPoint(index);
  };

  return (
    <div className={styles.container}>
      <div className={styles.verticalLine}></div>
      <div className={styles.horizontalLine}></div>
      <div ref={circleRef} className={styles.circle}>
        {POINTS.map((point, index) => (
          <div
            key={point.id}
            style={{
              transform: `rotate(${index * POINT_ANGLE}deg)
                translate(${CIRCLE_DIAMETER / 2}px)`,
            }}
            className={`${styles.pointContainer} ${
              targetPoint === index ? styles.target : ""
            }`}
            onClick={() => handlePoint(index)}
          >
            <div
              className={styles.point}
              // style={{
              //   transform: `rotate(${
              //     -(index * POINT_ANGLE) + DEFAULT_ANGLE
              //   }deg)`,
              // }}
            >
              <div className={styles.pointContent}>
                <span className={styles.pointIndex}>{index + 1}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
