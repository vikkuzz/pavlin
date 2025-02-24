"use client";
import { useAuth } from "@/AuthContext";
import { deleteUserPost, getPosts } from "@/database/actionsDatabase";
import { Image, Button } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const OneAdContent = ({ id }) => {
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const router = useRouter();
  useEffect(() => {
    getPosts().then((res) => {
      const arrayOfObjects = Object.entries(res)?.map(([id, obj]) => ({
        id,
        ...obj,
      }));
      const currentPost = arrayOfObjects.filter((el) => el.id === id)[0];
      if (currentPost) {
        console.log(currentPost);
        setPost(currentPost);
      }
    });
  }, []);
  return (
    <div className="flex flex-col z-10 w-full h-full items-center justify-between font-mono text-sm lg:flex p-3">
      {post && (
        <>
          <h1 className="text-3xl md:text-4xl">{post.title}</h1>
          <div className="flex flex-col gap-4 justify-center items-center mt-8 w-full h-full">
            <div className="flex flex-col flex-wrap gap-3 w-full h-full">
              <Image width={200} src={post.authorPic} />
              <p>{post.body}</p>
              <p>Желаемый способ связи:{post.contacts}</p>
              <p>Автор: {post.author}</p>
            </div>
            {user.uid === post.uid && (
              <Button
                color="danger"
                variant="outlined"
                onClick={() => {
                  deleteUserPost(post.id, post.uid);
                  router.push("/ads");
                }}>
                Удалить
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default OneAdContent;
