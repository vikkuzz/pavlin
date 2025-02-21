"use client";
import { useAuth } from "@/AuthContext";
import { getPosts } from "@/database/actionsDatabase";
import { Card, Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const { Meta } = Card;

const AdsContent = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPosts().then((res) => {
      const arrayOfObjects = Object.entries(res)?.map(([id, obj]) => ({
        id,
        ...obj,
      }));
      setPosts(arrayOfObjects);
    });
  }, []);
  return (
    <div className="flex flex-col z-10 w-full h-full items-center justify-between font-mono text-sm lg:flex">
      <h1 className="text-4xl">Новоград Павлино | Объявления</h1>
      <div className="flex items-center h-14">
        { !user ? 
          (<Tooltip placement="top" title={"Авторизуйтесь чтобы добавить свое объявление"} arrow={true}>
            <div>
              <Link href={"/ads/new"} className={'pointer-events-none'}>Написать объявление</Link>
            </div>
          </Tooltip>)
          : (<Link href={"/ads/new"}>Написать объявление</Link>)
        }
        
      </div>
      <div className="flex flex-col gap-4 justify-center items-center mt-8 w-full h-full">
        <div className="flex flex-wrap gap-3 w-full h-full">
          {posts.length > 0 ? (
            posts.map((el) => {
              return (
                <Link href={`/ads/${el.id}`}>
                <Card
                  key={el.id}
                  hoverable
                  
                  style={{ width: 240 }}
                  // cover={
                  //   <img
                  //     alt="example"
                  //     src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  //   />
                  // }
                >
                  <Meta
                    title={el.title}
                    description={el.body.slice(0, 10) + "..."}
                  />
                </Card></Link>
              );
            })
          ) : (
            <div className="relative w-full h-full">
              <h2 className="text-center">А тут пока пусто... Будь первым!</h2>
              <div className="relative w-full h-full opacity-90 min-h-72">
                <Image
                  fill
                  alt="empty"
                  src={"/image/empty-street-animate.svg"}
                  objectFit="contain"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdsContent;
