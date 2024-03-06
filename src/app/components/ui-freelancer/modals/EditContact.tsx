import { useState } from "react";
import { Col, Form, Row } from "antd";
import { EditButton } from "../../button/buttons";
import { FormInput } from "../../input/inputs";
import { CustomFormModal } from "../../modal/modal";
import { UserDetail } from "../../../models/user";
import { nations } from "../../../../constants/testData";
import { FormSelect } from "../../select/select";

export default function EditContact() {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const initialValues: Pick<
    UserDetail,
    "address" | "email" | "phone" | "nation"
  > = {
    address: "abc abc",
    email: "a@gmail.com",
    phone: "0987654321",
    nation: nations['us']
  };

  const handleSubmit = async (values: typeof initialValues) => {
    console.log("Received values of form: ", values);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <EditButton onClick={() => setOpen(true)} />
      <CustomFormModal
        open={open}
        title="Thông tin liên hệ"
        onCancel={() => {
          handleCancel();
          form.resetFields();
        }}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              handleSubmit(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="EditContact"
          initialValues={initialValues}
        >
          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <FormInput />
          </Form.Item>
          <Form.Item
            name="email"
            label="Mail"
            rules={[
              {
                required: true,
                type: "email",
              },
            ]}
          >
            <FormInput />
          </Form.Item>
          <Row gutter={10}>
            <Col span={12}>
              <Form.Item name="nation" label="Múi giờ">
                <FormSelect
                  onChange={() => {}}
                  options={Object.values(nations)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="SĐT"
                rules={[
                  {
                    required: true,
                    type: "number",
                  },
                ]}
              >
                <FormInput />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </CustomFormModal>
    </>
  );
}
