/* eslint-disable @typescript-eslint/no-floating-promises */
import { Button, Col, Form, Input, Modal, Row, Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import type {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/es/upload";
import Image from "next/image";

type AddMemberFormmProps = {
  addMemberModalVisible: boolean;
  setAddMemberModalVisible: (value: boolean) => void;
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const AddMemberForm: React.FC<AddMemberFormmProps> = ({
  addMemberModalVisible,
  setAddMemberModalVisible,
}: AddMemberFormmProps) => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleCloseAddMemberModal = () => setAddMemberModalVisible(false);
  // const handleOpenAddMemberModal = () => setAddMemberModalVisible(true)

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div>
      <Modal
        open={addMemberModalVisible}
        onCancel={handleCloseAddMemberModal}
        footer={null}
      >
        <Form {...layout} form={form} name="basic">
          <Row>
            <Col xs={24} lg={6} className="flex items-center justify-center">
              <Form.Item name="name">
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    // <Image
                    //   src={imageUrl}
                    //   alt="avatar"
                    //   style={{ width: "100%" }}
                    // />
                    uploadButton
                  )}
                </Upload>
              </Form.Item>
            </Col>
            <Col xs={24} lg={16}>
              <Form.Item name="name" label="Name" required colon={false}>
                <Input />
              </Form.Item>

              <Form.Item name="surName" label="Surname" required colon={false}>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Button>Save</Button>
          <Button>Cancel</Button>
        </Form>
      </Modal>
    </div>
  );
};

export default AddMemberForm;
