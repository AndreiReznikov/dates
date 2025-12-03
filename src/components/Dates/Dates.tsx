import { gsap } from "gsap";
import styles from "./Dates.module.scss";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";

const POINTS = [
  {
    id: 1,
    name: "Наука",
    events: [],
  },
  {
    id: 2,
    name: "Кино",
    events: [],
  },
  {
    id: 3,
    name: "Литература",
    events: [],
  },
  {
    id: 4,
    name: "Театр",
    events: [],
  },
  {
    id: 5,
    name: "Спорт",
    events: [],
  },
  {
    id: 6,
    name: "Интернет",
    events: [],
  },
];

const WHEEL_ANGLE = 360;
const WHEEL_DIAMETER = 530;
const POINT_ANGLE = WHEEL_ANGLE / POINTS.length;
const SHIFT_ANGLE = -60;

const getShortestRotation = (angle: number): number => {
  let normalized = angle % 360;
  if (normalized > 180) normalized -= 360;
  if (normalized <= -180) normalized += 360;

  return normalized;
};

export const Dates: React.FC = () => {
  const [targetPoint, setTargetPoint] = useState<number>(0);

  const fullRotationRef = useRef<number>(SHIFT_ANGLE);
  const wheelRef = useRef<HTMLDivElement>(null);
  const pointRefs = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    pointRefs.current.forEach((pointRef, index) => {
      const pointAngle = index * POINT_ANGLE;
      gsap.set(pointRef, {
        rotate: -pointAngle - SHIFT_ANGLE,
      });
    });

    gsap.set(wheelRef.current, { rotation: SHIFT_ANGLE, duration: 0 });
  }, []);

  const handlePoint = (index: number) => {
    const currentTargetAngle =
      SHIFT_ANGLE - index * POINT_ANGLE - fullRotationRef.current;

    const shortestRotation = getShortestRotation(currentTargetAngle);

    gsap.to(wheelRef.current, {
      rotation: `+=${shortestRotation}`,
      duration: 1,
      onUpdate: () => {
        fullRotationRef.current = Number(
          gsap.getProperty(wheelRef.current, "rotation")
        );
        pointRefs.current.forEach((pointRef, index) => {
          gsap.set(pointRef, {
            rotate: -(index * POINT_ANGLE) - fullRotationRef.current,
            duration: 0,
          });
        });
      },
    });

    setTargetPoint(index);
  };

  return (
    <div className={styles.container}>
      <div className={styles.verticalLine}></div>
      <div className={styles.horizontalLine}></div>
      <div ref={wheelRef} className={styles.wheel}>
        {POINTS.map((point, index) => (
          <div
            key={point.id}
            style={{
              transform: `rotate(${index * POINT_ANGLE}deg)
                translate(${WHEEL_DIAMETER / 2}px)`,
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
              <div
                ref={(el) => {
                  if (el) pointRefs.current[index] = el;
                }}
                className={styles.pointContent}
              >
                <span className={styles.pointIndex}>{index + 1}</span>
                <span className={styles.pointName}>{point?.name ?? ""}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
