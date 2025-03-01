import React, { useEffect, useState } from "react";
import {
  DislikeTwoTone,
  LikeTwoTone,
  PlusCircleTwoTone,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Flex,
  Form,
  Input,
  Modal,
  Radio,
  Tag,
  Tooltip,
} from "antd";
import { addComment, getReviews } from "@/database/actionsDatabase";
import TextArea from "antd/es/input/TextArea";
import { useAuth } from "@/AuthContext";

const actions = [
  <div className="flex justify-center gap-2">
    <span>0</span>
    <LikeTwoTone key="like" />
  </div>,
  <div className="flex justify-center gap-2">
    <span>0</span>
    <DislikeTwoTone key="dislike" />
  </div>,
];

const Reviews = () => {
  const [loading, setLoading] = useState(true);
  const [stateReviews, setStateReviews] = useState([]);
  const [openResponsive, setOpenResponsive] = useState(false);
  const [form] = Form.useForm();
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      const reviews = await getReviews();
      console.log(reviews);
      setLoading(false);
      setStateReviews(reviews);
    })();
  }, []);
  useEffect(() => {
    console.log(stateReviews);
  }, [stateReviews]);
  const handleSubmit = async (values) => {
    console.log(values);
    addComment(user.uid, user.email, values.title, values.text, values.gender);
    form.resetFields();
    setOpenResponsive(false);
    (async () => {
      const reviews = await getReviews();
      console.log(reviews);
      setLoading(false);
      setStateReviews(reviews);
    })();
  };
  return (
    <Flex gap="middle" align="start" vertical>
      <Tooltip
        placement="top"
        title={!user && "Авторизуйтесь чтобы добавить свой отзыв"}
        arrow={true}>
        <Button
          type="primary"
          onClick={() => setOpenResponsive(true)}
          disabled={!user}>
          <PlusCircleTwoTone />
          Добавить свой отзыв
        </Button>
      </Tooltip>
      {loading && (
        <Flex gap="middle" align="start" vertical>
          <Card
            loading={loading}
            actions={actions}
            style={{ minWidth: 300 }}
            className="relative w-full">
            <Tag color="geekblue" className="!absolute -top-2">
              geekblue
            </Tag>
            <Card.Meta
              avatar={
                <Avatar src="https://api.dicebear.com/9.x/miniavs/svg?hair=long" />
              }
              description={<></>}
            />
          </Card>
          <Card
            loading={loading}
            actions={actions}
            style={{ minWidth: 300 }}
            className="relative w-full">
            <Tag color="geekblue" className="!absolute -top-2">
              geekblue
            </Tag>
            <Card.Meta
              avatar={
                <Avatar src="https://api.dicebear.com/9.x/miniavs/svg?hair=classic01" />
              }
              description={<></>}
            />
          </Card>
        </Flex>
      )}
      {stateReviews &&
        stateReviews.length > 0 &&
        stateReviews.map((el, i) => {
          return (
            <Card
              key={i}
              loading={loading}
              actions={[
                <Tooltip
                  placement="top"
                  title={"Пока не работает("}
                  // title={!user && "Авторизуйтесь чтобы оценить отзыв"}
                  arrow={true}>
                  <button
                    className="flex justify-center gap-2 w-full"
                    disabled={!user}>
                    <span>{el.likeCount.length}</span>
                    <LikeTwoTone key="like" />
                  </button>
                </Tooltip>,
                <Tooltip
                  placement="top"
                  title={"Пока не работает("}
                  // title={!user && "Авторизуйтесь чтобы оценить отзыв"}
                  arrow={true}>
                  <button
                    className="flex justify-center gap-2 w-full"
                    disabled={!user}>
                    <span>{el.dislikeCount.length}</span>
                    <DislikeTwoTone key="dislike" />
                  </button>
                </Tooltip>,
              ]}
              style={{ minWidth: 300 }}
              className="relative w-full">
              <Tag color="geekblue" className="!absolute -top-2">
                {el.title}
              </Tag>
              <Card.Meta
                avatar={
                  el.gender === "w" ? (
                    <Avatar src="https://api.dicebear.com/9.x/miniavs/svg?hair=long" />
                  ) : (
                    <Avatar src="https://api.dicebear.com/9.x/miniavs/svg?hair=classic01" />
                  )
                }
                description={
                  <>
                    <p>{el.text}</p>
                    <p>{el.email}</p>
                  </>
                }
              />
            </Card>
          );
        })}
      {!loading && (!stateReviews || stateReviews.length === 0) && (
        <span className="flex justify-center self-center">
          Отзывов пока нет
        </span>
      )}
      <Modal
        title="Добавить свой отзыв"
        centered
        open={openResponsive}
        footer={null}
        onCancel={() => setOpenResponsive(false)}
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}>
        <Form
          form={form}
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
          <Form.Item name="gender" label="Аватарка">
            <Radio.Group required>
              <Radio value="m" required>
                <Avatar src="https://api.dicebear.com/9.x/miniavs/svg?hair=classic01" />
              </Radio>
              <Radio value="w" required>
                <Avatar src="https://api.dicebear.com/9.x/miniavs/svg?hair=long" />
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item className="flex justify-end">
            <Button color="primary" variant={"solid"} htmlType="submit">
              Отправить
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Flex>
  );
};

export default Reviews;
