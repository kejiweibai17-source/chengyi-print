import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, InputNumber, Select } from "antd";
import { KNOWLEDGE_CATEGORIES } from "../../data/seed";

export const KnowledgeEdit = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Edit
      title="編輯文章"
      saveButtonProps={{ ...saveButtonProps, children: "儲存" }}
    >
      <Form {...formProps} layout="vertical">
        <Form.Item label="標題" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="網址 slug"
          name="slug"
          rules={[{ required: true }]}
          extra="前台網址：/knowledge/{slug}"
        >
          <Input />
        </Form.Item>
        <Form.Item label="摘要" name="summary" rules={[{ required: true }]}>
          <Input.TextArea rows={2} />
        </Form.Item>
        <Form.Item label="正文" name="body" rules={[{ required: true }]}>
          <Input.TextArea rows={8} />
        </Form.Item>
        <Form.Item label="分類" name="category" rules={[{ required: true }]}>
          <Select
            options={KNOWLEDGE_CATEGORIES.map((value) => ({
              label: value,
              value,
            }))}
          />
        </Form.Item>
        <Form.Item label="狀態" name="status" rules={[{ required: true }]}>
          <Select
            options={[
              { label: "上架", value: "上架" },
              { label: "下架", value: "下架" },
            ]}
          />
        </Form.Item>
        <Form.Item label="排序" name="sort" rules={[{ required: true }]}>
          <InputNumber style={{ width: "100%" }} min={1} />
        </Form.Item>
        <Form.Item label="封面圖 URL" name="coverImage">
          <Input placeholder="https://..." />
        </Form.Item>
        <Form.Item label="封面 alt" name="coverAlt">
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};
