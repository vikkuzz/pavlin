import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Tooltip, Upload } from "antd";
import { writeNewPost } from "@/database/actionsDatabase";
import { useAuth } from "@/AuthContext";
import { useRouter } from "next/navigation";
import sendMessageToTelegram from "@/telegram/contact";

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
  const handleSubmit = async (values) => {
    writeNewPost(
      user.uid,
      user.email,
      urlPhoto,
      values.title,
      values.text,
      values.contacts
    );
    await sendMessageToTelegram({
      name: user.email,
      email: user.email,
      message: values.text,
    });
    router.push("/ads");
  };

  function upload(file) {
    if (!file || !file.type.match(/image.*/)) return;
    var fd = new FormData();
    fd.append("image", file);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.imageban.ru/v1");
    xhr.onload = function () {
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
