import { Table } from "antd";
import { ColumnProps } from "antd/lib/table";
import * as PropTypes from "prop-types";
import * as React from "react";

interface IRoom {
  uid: string;
  name: string;
  private?: boolean;
  difficulty?: string;
}

type RoomColumn = ColumnProps<IRoom>;

const columns: RoomColumn[] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text: any, room: IRoom) => <span>{room.name}</span>
  },
  {
    title: "Difficulty",
    dataIndex: "difficulty",
    key: "difficulty"
  },
  {
    title: "Action",
    key: "action",
    render: (text: string, item: any) => <span />
  }
];

export function RoomTable(props: { data: IRoom[] }) {
  return <Table columns={columns} dataSource={props.data} />;
}

RoomTable.propTypes = {
  data: PropTypes.array.isRequired
};
