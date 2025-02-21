"use client";
import { useAuth } from "@/AuthContext";
import { getPosts } from "@/database/actionsDatabase";
import React, { useEffect, useState } from "react";

const OneAdContent = ({ id }) => {
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  useEffect(() => {
    getPosts().then((res) => {
      const arrayOfObjects = Object.entries(res)?.map(([id, obj]) => ({
        id,
        ...obj,
      }));
      console.log(arrayOfObjects, id);
      const currentPost = arrayOfObjects.filter((el) => el.id === id)[0];
      if (currentPost) {
        setPost(currentPost);
      }
      console.log("currentPost", currentPost);
    });
  }, []);
  return (
    <div className="flex flex-col z-10 w-full h-full items-center justify-between font-mono text-sm lg:flex p-3">
      {post && (
        <>
          <h1 className="text-3xl md:text-4xl">{post.title}</h1>
          <div className="flex flex-col gap-4 justify-center items-center mt-8 w-full h-full">
            <div className="flex flex-col flex-wrap gap-3 w-full h-full">
              <p>{post.body}</p>
              <p>Автор: {post.author}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OneAdContent;
