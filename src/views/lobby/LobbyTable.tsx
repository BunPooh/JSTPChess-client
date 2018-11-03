import { Button, Table } from "antd";
import { ColumnProps } from "antd/lib/table";
import * as PropTypes from "prop-types";
import * as React from "react";

import { IRoom } from "../../store/RoomStore";

type RoomColumn = ColumnProps<IRoom>;

interface IComponentProps {
  data: IRoom[];
  onClickPlay: (room: IRoom) => void;
}

export function LobbyTable(props: IComponentProps) {
  const columns: RoomColumn[] = [
    {
      title: "Opponent",
      dataIndex: "creator.id",
      key: "creator.id",
      render: (text: any, room: IRoom) => <span>{room.creator.id}</span>
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, item: IRoom) => {
        const onItemClick = () => props.onClickPlay(item);
        return (
          <Button
            className="btn btn-sm btn-block"
            type="primary"
            onClick={onItemClick}
          >
            Play
          </Button>
        );
      }
    }
  ];

  return (
    <Table
      className="Lobby--table"
      size="small"
      columns={columns}
      rowKey="id"
      dataSource={props.data}
    />
  );
}

LobbyTable.propTypes = {
  data: PropTypes.array.isRequired
};
