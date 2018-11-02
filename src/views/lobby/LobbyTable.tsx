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
    title: "Action",
    key: "action",
    render: (text: string, item: any) => <span />
  }
];

export function LobbyTable(props: { data: IRoom[] }) {
  return <Table columns={columns} rowKey="uid" dataSource={props.data} />;
}

LobbyTable.propTypes = {
  data: PropTypes.array.isRequired
};
