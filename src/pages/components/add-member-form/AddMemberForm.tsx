/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Radio,
  type RadioChangeEvent,
  Row,
  Upload,
  message,
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import type {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/es/upload";
import Image from "next/image";
import { type FamMemberFromValuesType, type GenderConstType } from "types";
import { UploadOutlined } from "@ant-design/icons";

type AddMemberFormmPropTypes = {
  addMemberModalVisible: boolean;
  setAddMemberModalVisible: (value: boolean) => void;
  handleAddFamMember: (values: any) => void;
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

// const getBase64 = (img: RcFile, callback: (url: string) => void) => {
//   const reader = new FileReader();
//   reader.addEventListener("load", () => callback(reader.result as string));
//   reader.readAsDataURL(img);
// };

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

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

const AddMemberForm: React.FC<AddMemberFormmPropTypes> = ({
  addMemberModalVisible,
  setAddMemberModalVisible,
  handleAddFamMember,
}: AddMemberFormmPropTypes) => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<UploadFile>();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const [genderValue, setGenderValue] = useState<GenderConstType>("M");

  const onGenderSelect = (e: RadioChangeEvent) => {
    const value = e.target.value as GenderConstType;
    setGenderValue(value);
  };

  const handleCloseAddMemberModal = () => setAddMemberModalVisible(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );

    return null;
  };

  const handleChange: UploadProps["onChange"] = (info) => {
    setImageUrl(info.file.originFileObj);
    // if (info.file.status === "uploading") {
    //   setLoading(true);
    //   return;
    // }
    // if (info.file.status === "done") {
    //   getBase64(info.file.originFileObj as RcFile, (url) => {
    //     setLoading(false);
    //   });
    // }
  };

  const handleCancel = () => setPreviewOpen(false);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleFinish = async (values: any) => {
    const file = values.image.fileList[0];

    console.log(file);

    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    const payload: FamMemberFromValuesType = {
      name: values.name,
      gender: values.gender,
      image: file.url || (file.preview as string),
    };

    form.resetFields();

    handleAddFamMember(payload);
  };

  return (
    <div>
      <Modal
        open={addMemberModalVisible}
        onCancel={() => handleCloseAddMemberModal()}
        footer={null}
      >
        <Form
          {...layout}
          form={form}
          name="basic"
          onFinish={(values) => handleFinish(values)}
          autoComplete="off"
          labelAlign="left"
        >
          <Row>
            <Col xs={24} lg={6} className="flex items-center justify-center">
              <Form.Item name="image">
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  // showUploadList={false}
                  // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={beforeUpload}
                  onChange={(e) => handleChange(e)}
                  onPreview={handlePreview}
                >
                  <div className="flex w-full items-center justify-evenly">
                    <UploadOutlined />
                    Upload
                  </div>
                </Upload>
              </Form.Item>
            </Col>
            <Col xs={24} lg={16}>
              <Form.Item
                name="name"
                label="Full Name"
                rules={[
                  {
                    required: true,
                    message: "Famliy member full name cannot be empty!",
                  },
                ]}
                colon={false}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="gender"
                label="Gender"
                rules={[
                  {
                    required: true,
                    message: "Famliy member surname cannot be empty!",
                  },
                ]}
                colon={false}
              >
                <Radio.Group onChange={onGenderSelect} value={genderValue}>
                  <Radio value={"M"}>Male</Radio>
                  <Radio value={"F"}>Female</Radio>
                  <Radio value={"O"}>Others</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          <Button htmlType="submit">Save</Button>
          <Button>Cancel</Button>
        </Form>
      </Modal>

      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "80%" }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default AddMemberForm;
