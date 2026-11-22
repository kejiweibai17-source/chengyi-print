import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { Space, Table, Tag } from "antd";
import { KNOWLEDGE_CATEGORIES } from "../../data/seed";

export const KnowledgeList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
    sorters: {
      initial: [{ field: "sort", order: "asc" }],
    },
  });

  return (
    <List title="印刷相關知識" createButtonProps={{ children: "新增文章" }}>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="status"
          title="狀態"
          width={90}
          render={(value: string) => (
            <Tag color={value === "上架" ? "green" : "default"}>{value}</Tag>
          )}
        />
        <Table.Column
          dataIndex="category"
          title="分類"
          filters={KNOWLEDGE_CATEGORIES.map((category) => ({
            text: category,
            value: category,
          }))}
          onFilter={(value, record) => record.category === value}
          render={(value: string) => <Tag>{value}</Tag>}
        />
        <Table.Column dataIndex="title" title="標題" />
        <Table.Column dataIndex="slug" title="網址 slug" />
        <Table.Column dataIndex="sort" title="排序" width={80} />
        <Table.Column
          title="操作"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <ShowButton hideText size="small" recordItemId={record.id} />
              <EditButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
