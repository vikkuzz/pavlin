"use client";
import { useAuth } from "@/AuthContext";
import { categoryAbout } from "@/collections/categoryAbout";
import {
  getAllRateCategory,
  getUserRateCategory,
  rateCategory,
} from "@/database/actionsDatabase";
import { green, grey } from "@mui/material/colors";
import { BarChart } from "@mui/x-charts/BarChart";
import {
  Button,
  ConfigProvider,
  Divider,
  Grid,
  Rate,
  Skeleton,
  Tooltip,
} from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import Reviews from "./Reviews";
const { useBreakpoint } = Grid;

const AboutContent = () => {
  console.log("render");
  const { user } = useAuth();
  const data = [
    "январь",
    "февраль",
    "март",
    "апрель",
    "май",
    "июнь",
    "июль",
    "август",
    "сентябрь",
    "октябрь",
    "ноябрь",
    "декабрь",
  ];
  const screens = useBreakpoint();
  const [width, setWidth] = useState(320);
  const [category, setCategory] = useState("transport");
  const [dataVoices, setDataVoices] = useState([]);
  const [labelVoices, setLabelVoices] = useState([]);
  const [rate, setRate] = useState();
  const [isRated, setIsRated] = useState(false);

  const getrate = async (id, category) => {
    let _rate = null;
    if (id) {
      _rate = await getUserRateCategory(id, category);
    }

    const _rateAll = await getAllRateCategory(category);
    return [_rate, _rateAll];
  };

  useEffect(() => {
    if (!user) {
      (async () => {
        try {
          const [_rate, _rateAll] = await getrate(null, category);
          setDataVoices(_rateAll.averages);
          setLabelVoices(_rateAll.numVotes);
          console.log(labelVoices);
        } catch (error) {
          console.error("Ошибка при получении рейтинга:", error);
        }
      })();
    } else if (user && category) {
      (async () => {
        try {
          const [_rate, _rateAll] = await getrate(user.uid, category);
          console.log(_rate, _rateAll);
          if (_rate) {
            setIsRated(false);
            setRate(_rate);
          } else {
            setIsRated(true);
            setRate(null);
          }
          setDataVoices(_rateAll.averages);
          setLabelVoices(_rateAll.numVotes);
          console.log(labelVoices);
        } catch (error) {
          console.error("Ошибка при получении рейтинга:", error);
        }
      })();
    }
  }, [user, category]);

  useEffect(() => {
    if (screens.lg || screens.xl || screens.xxl) {
      setWidth(900);
    } else if (screens.md) {
      setWidth(600);
    } else {
      setWidth(320);
    }
  }, [screens]);
  return (
    <ConfigProvider
      theme={{
        components: {
          Rate: {
            starBg: "#a8ada9",
            starColor: "#17bf3f",
            starSize: screens.md ? 40 : 20,
          },
        },
      }}>
      <div className="flex flex-col w-full h-full items-center justify-between font-mono text-sm p-3">
        <div className="flex gap-2 flex-wrap max-w-full">
          {categoryAbout.map((el) => (
            <Button
              color="default"
              id={el.id}
              key={el.id}
              onClick={() => setCategory(el.id)}
              variant={el.id === category && "solid"}>
              {el.name}
            </Button>
          ))}
        </div>
        {dataVoices.length === 0 ? (
          <>
            <Skeleton active className="mt-10" />
            <Skeleton active />
          </>
        ) : (
          <BarChart
            xAxis={[
              {
                id: "barCategories",
                data: data,
                scaleType: "band",
                label: "Средняя оценка транспорта в жк по месяцам",
                labelStyle: {
                  paddingTop: 20,
                },
              },
            ]}
            yAxis={[
              {
                max: 10,
              },
            ]}
            series={[
              {
                data: dataVoices,
              },
            ]}
            // barLabel={(item) => {
            //   return labelVoices[item.dataIndex] !== 0
            //     ? `${labelVoices[item.dataIndex].toString()}`
            //     : null;
            // }}
            width={width}
            height={!screens.md ? 250 : 400}
          />
        )}

        <section className="mt-10">
          <div className="flex items-center h-14">
            {!user ? (
              <Tooltip
                placement="top"
                title={"Авторизуйтесь чтобы добавить свою оценку"}
                arrow={true}>
                <div>
                  <Rate count={10} value={rate} disabled={!user} />
                </div>
              </Tooltip>
            ) : (
              <div className="flex flex-col gap-6 mt-10">
                {isRated ? (
                  <h2 className="text-xl font-bold">Поставь свою оценку:</h2>
                ) : (
                  <h2 className="text-xl font-bold">
                    Ты уже поставил оценку, но можешь изменить:
                  </h2>
                )}
                <Rate
                  count={10}
                  value={rate}
                  disabled={!user}
                  onChange={(value) => setRate(value)}
                />
                <Button
                  className="!h-10"
                  onClick={async () => {
                    await rateCategory(user.uid, category, rate);
                    (async () => {
                      try {
                        const [_rate, _rateAll] = await getrate(
                          user.uid,
                          category
                        );
                        setRate(_rate);
                        setDataVoices(_rateAll.averages);
                      } catch (error) {
                        console.error("Ошибка при получении рейтинга:", error);
                      }
                    })();
                  }}
                  color="primary"
                  variant={"solid"}>
                  Отправить
                </Button>
              </div>
            )}
          </div>
        </section>
        <section className="w-full pt-16 md:p-24 ">
          <Divider orientation="center">
            <h2 className="text-lg font-bold">Отзывы</h2>
          </Divider>
          <Reviews category={category} />
        </section>
      </div>
    </ConfigProvider>
  );
};

export default AboutContent;
