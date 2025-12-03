import { gsap } from "gsap";
import styles from "./Dates.module.scss";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";

const POINTS = [
  {
    id: 1,
    name: "Наука",
    initYear: 2015,
    lastYear: 2022,
    events: [
      {
        id: "1-1",
        year: 2015,
        text: "Миссия «Новые горизонты» совершила исторический пролёт мимо Плутона.",
      },
      {
        id: "1-2",
        year: 2016,
        text: "Учёные в обсерватории LIGO впервые подтвердили обнаружение гравитационных волн.",
      },
      {
        id: "1-3",
        year: 2017,
        text: "Астрономы открыли первый межзвёздный объект Оумуамуа.",
      },
      {
        id: "1-4",
        year: 2019,
        text: "Получено первое изображение горизонта событий чёрной дыры в галактике M87.",
      },
      {
        id: "1-5",
        year: 2021,
        text: "Успешный запуск космического телескопа «Джеймс Уэбб».",
      },
    ],
  },
  {
    id: 2,
    name: "Кино",
    initYear: 1995,
    lastYear: 2005,
    events: [
      {
        id: "2-1",
        year: 1995,
        text: "Выход культового анимационного фильма «История игрушек» — первого полнометражного компьютерного мультфильма.",
      },
      {
        id: "2-2",
        year: 1997,
        text: "Премьера «Титаника» Джеймса Кэмерона, который стал самым кассовым фильмом на тот момент.",
      },
      {
        id: "2-3",
        year: 1999,
        text: "Выход «Матрицы» братьев Вачовски, революционного фильма в жанре научной фантастики.",
      },
      {
        id: "2-4",
        year: 2001,
        text: "Премьера первой части трилогии «Властелин колец: Братство Кольца» Питера Джексона.",
      },
      {
        id: "2-5",
        year: 2005,
        text: "Выход «Бэтмен: Начало» Кристофера Нолана, положившего начало трилогии о Тёмном рыцаре.",
      },
    ],
  },
  {
    id: 3,
    name: "Литература",
    initYear: 1988,
    lastYear: 1995,
    events: [
      {
        id: "3-1",
        year: 1988,
        text: "Египетский писатель Нагиб Махфуз получил Нобелевскую премию по литературе.",
      },
      {
        id: "3-2",
        year: 1990,
        text: "Публикация романа «Оно» Стивена Кинга, ставшего одним из самых известных произведений автора.",
      },
      {
        id: "3-3",
        year: 1991,
        text: "Тони Моррисон стала первой афроамериканкой, получившей Нобелевскую премию по литературе.",
      },
      {
        id: "3-4",
        year: 1993,
        text: "Роман «Прощальные песни космических рейнджеров» Джона Скальци получает премию Хьюго.",
      },
      {
        id: "3-5",
        year: 1995,
        text: "Выход «Гарри Поттера и философского камня» Дж. К. Роулинг, начало мировой франшизы.",
      },
    ],
  },
  {
    id: 4,
    name: "Театр",
    initYear: 2008,
    lastYear: 2016,
    events: [
      {
        id: "4-1",
        year: 2008,
        text: "Британский театр National Theatre начинает проект «NT Live» — трансляции спектаклей в кинотеатры.",
      },
      {
        id: "4-2",
        year: 2010,
        text: "Спектакль «Берёза» Дмитрия Крымова получает «Золотую маску» как лучший спектакль малой формы.",
      },
      {
        id: "4-3",
        year: 2013,
        text: "Премьера бродвейского мюзикла «Матильда» по книге Роальда Даля.",
      },
      {
        id: "4-4",
        year: 2016,
        text: "Американский мюзикл «Гамильтон» получает рекордные 11 премий «Тони».",
      },
    ],
  },
  {
    id: 5,
    name: "Спорт",
    initYear: 1986,
    lastYear: 1994,
    events: [
      {
        id: "5-1",
        year: 1986,
        text: "Аргентина с Диего Марадоной выигрывает Чемпионат мира по футболу в Мексике.",
      },
      {
        id: "5-2",
        year: 1988,
        text: "Летние Олимпийские игры в Сеуле. Флоренс Гриффит-Джойнер устанавливает рекорды в беге на 100 и 200 метров.",
      },
      {
        id: "5-3",
        year: 1990,
        text: "Объединённая команда Германии выигрывает Чемпионат мира по футболу в Италии.",
      },
      {
        id: "5-4",
        year: 1992,
        text: "Объединённая команда СНГ выступает на Олимпийских играх в Барселоне.",
      },
      {
        id: "5-5",
        year: 1994,
        text: "Чемпионат мира по футболу в США, где сборная Бразилии в четвёртый раз стала чемпионом.",
      },
    ],
  },
  {
    id: 6,
    name: "Интернет",
    initYear: 1998,
    lastYear: 2007,
    events: [
      {
        id: "6-1",
        year: 1998,
        text: "Основание компании Google Ларри Пейджем и Сергеем Брином.",
      },
      {
        id: "6-2",
        year: 2001,
        text: "Запуск Википедии — свободной многоязычной интернет-энциклопедии.",
      },
      {
        id: "6-3",
        year: 2003,
        text: "Появление социальной сети MySpace, которая быстро набрала популярность.",
      },
      {
        id: "6-4",
        year: 2004,
        text: "Марк Цукерберг запускает социальную сеть Facebook в Гарвардском университете.",
      },
      {
        id: "6-5",
        year: 2007,
        text: "Компания Apple представляет первый iPhone, революционизируя мобильный интернет.",
      },
    ],
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
            <div className={styles.point}>
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
      <div className={styles.wheelControl}>
        <div className={styles.targetPointIndex}>
          0{targetPoint + 1}/0{POINTS.length}
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
            disabled={targetPoint === POINTS.length - 1}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};
