import { Show } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Tag, Typography } from "antd";

const { Title, Text, Paragraph } = Typography;

export const KnowledgeShow = () => {
  const { query, result: record } = useShow();

  return (
    <Show title="文章詳情" isLoading={query.isLoading}>
      <Title level={5}>狀態</Title>
      <Tag color={record?.status === "上架" ? "green" : "default"}>
        {record?.status as string}
      </Tag>
      <Title level={5}>分類</Title>
      <Tag>{record?.category as string}</Tag>
      <Title level={5}>標題</Title>
      <Text>{record?.title as string}</Text>
      <Title level={5}>Slug</Title>
      <Text code>/knowledge/{record?.slug as string}</Text>
      <Title level={5}>摘要</Title>
      <Paragraph>{record?.summary as string}</Paragraph>
      <Title level={5}>正文</Title>
      <Paragraph style={{ whiteSpace: "pre-wrap" }}>
        {record?.body as string}
      </Paragraph>
      <Title level={5}>排序</Title>
      <Text>{record?.sort as number}</Text>
    </Show>
  );
};
