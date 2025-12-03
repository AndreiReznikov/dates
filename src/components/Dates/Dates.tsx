import { useId, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";

import { Point } from "../../types";

import { getShortestRotation } from "./utils";
import styles from "./Dates.module.scss";

const SWIPER_CONFIG = {
  spaceBetween: 25,
  slidesPerView: 2,
  breakpoints: {
    1024: {
      slidesPerView: 3,
      spaceBetween: 80,
    },
  },
  modules: [Navigation, Pagination],
};

const WHEEL_ANGLE = 360;
const WHEEL_DIAMETER = 530;
const SHIFT_ANGLE = -60;

interface DatesProps {
  points: Point[];
}

export const Dates: React.FC<DatesProps> = ({ points }) => {
  const [targetPoint, setTargetPoint] = useState<number>(0);
  const swiperId = useId();

  const fullRotationRef = useRef<number>(SHIFT_ANGLE);
  const wheelRef = useRef<HTMLDivElement>(null);
  const pointRefs = useRef<HTMLDivElement[]>([]);
  const initYearRef = useRef<HTMLSpanElement>(null);
  const lastYearRef = useRef<HTMLSpanElement>(null);

  const yearValues = useRef({
    initYear: points[0].initYear,
    lastYear: points[0].lastYear,
  });

  const POINT_ANGLE = WHEEL_ANGLE / points?.length;

  useGSAP(() => {
    pointRefs.current.forEach((pointRef, index) => {
      const pointAngle = index * POINT_ANGLE;
      gsap.set(pointRef, {
        rotate: -pointAngle - SHIFT_ANGLE,
      });
    });

    gsap.set(wheelRef.current, { rotation: SHIFT_ANGLE, duration: 0 });
  }, []);

  const animateYears = (index: number) => {
    const targetInitYear = points[index].initYear;
    const targetLastYear = points[index].lastYear;

    gsap.to(yearValues.current, {
      duration: 1,
      initYear: targetInitYear,
      lastYear: targetLastYear,
      roundProps: "initYear,lastYear",
      onUpdate: () => {
        if (initYearRef.current) {
          initYearRef.current.textContent = Math.round(
            yearValues.current.initYear
          ).toString();
        }
        if (lastYearRef.current) {
          lastYearRef.current.textContent = Math.round(
            yearValues.current.lastYear
          ).toString();
        }
      },
    });
  };

  const handlePoint = (index: number) => {
    const currentTargetAngle =
      SHIFT_ANGLE - index * POINT_ANGLE - fullRotationRef.current;

    const shortestRotation = getShortestRotation(currentTargetAngle);

    animateYears(index);

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

  if (!points.length) {
    return <div>Нет дат для отображения</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.verticalLine}></div>
      <div className={styles.horizontalLine}></div>
      <div className={styles.titleContainer}>
        <div className={styles.titleDesignLine}></div>
        <h1 className={styles.title}>
          Исторические
          <br />
          даты
        </h1>
      </div>
      <div className={styles.years}>
        <span className={styles.initYear} ref={initYearRef}>
          {points[targetPoint].initYear}
        </span>
        <span className={styles.lastYear} ref={lastYearRef}>
          {points[targetPoint].lastYear}
        </span>
      </div>
      <div ref={wheelRef} className={styles.wheel}>
        {points?.map((point, index) => (
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
            <div className={styles.point}>
              <div
                ref={(el) => {
                  if (el) pointRefs.current[index] = el;
                }}
                className={styles.pointContent}
              >
                <span className={styles.pointIndex}>{index + 1}</span>
                <h2 className={styles.pointName}>{point?.name ?? ""}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.wheelControl}>
        <div className={styles.targetPointIndex}>
          0{targetPoint + 1}/0{points?.length}
        </div>
        <div className={styles.wheelButtons}>
          <button
            onClick={() => handlePoint(targetPoint - 1)}
            disabled={targetPoint === 0}
          >
            {"<"}
          </button>
          <button
            onClick={() => handlePoint(targetPoint + 1)}
            disabled={targetPoint === points?.length - 1}
          >
            {">"}
          </button>
        </div>
      </div>
      <div className={styles.swiperWrapper}>
        <button
          className={styles.swiperPrev}
          data-swiper-button={`prev-${swiperId}`}
        >
          {"<"}
        </button>
        <div className={styles.swiperContainer}>
          <Swiper
            key={targetPoint}
            navigation={{
              nextEl: `[data-swiper-button="next-${swiperId}"]`,
              prevEl: `[data-swiper-button="prev-${swiperId}"]`,
            }}
            {...SWIPER_CONFIG}
          >
            {points[targetPoint].events.map((event) => (
              <SwiperSlide key={event.id}>
                <div className={styles.slideContent}>
                  <h3>{event.year}</h3>
                  <p>{event.text}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <button
          className={styles.swiperNext}
          data-swiper-button={`next-${swiperId}`}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};
