import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Tooltip, Upload } from "antd";
import { writeNewPost } from "@/database/actionsDatabase";
import { useAuth } from "@/AuthContext";
import { useRouter } from "next/navigation";

const { TextArea } = Input;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const NewAdsContent = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [urlPhoto, setUrlPhoto] = useState("");
  const handleSubmit = (values) => {
    let photo = values.photo ? values.photo[0] : "";
    writeNewPost(
      user.uid,
      user.email,
      urlPhoto,
      values.title,
      values.text,
      values.contacts
    );
    router.push("/ads");
    // Здесь можно отправить данные на сервер через fetch или axios
    // Например:
    // fetch("/your-api-endpoint", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(values),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("Success:", data);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
  };

  function upload(file) {
    if (!file || !file.type.match(/image.*/)) return;
    var fd = new FormData();
    fd.append("image", file);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.imageban.ru/v1");
    xhr.onload = function () {
      console.log(JSON.parse(xhr.responseText).data.link);
      setUrlPhoto(JSON.parse(xhr.responseText).data.link);
    };
    xhr.setRequestHeader("Authorization", "TOKEN FGfFlvkAb63sHUPpBpOi");
    xhr.send(fd);
  }
  return (
    <>
      <Form
        layout="vertical"
        className="flex flex-col w-full"
        style={{ maxWidth: 600 }}
        onFinish={handleSubmit}>
        <Form.Item label="Заголовок" name="title">
          <Input required />
        </Form.Item>
        <Form.Item name="text" label="Текст:">
          <TextArea rows={4} required />
        </Form.Item>
        <Form.Item label="Желаемый способ связи" name="contacts">
          <Input required />
        </Form.Item>

        <Form.Item
          name="photo"
          label="Фото:"
          valuePropName="fileList"
          getValueFromEvent={normFile}>
          <Upload action={upload} listType="picture-card" maxCount={1} required>
            {/* <Tooltip placement="top" title={"Пока не работает :("} arrow={true}> */}
            <button style={{ border: 0, background: "none" }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Загрузить</div>
            </button>
            {/* </Tooltip> */}
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit">Отправить</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default NewAdsContent;
