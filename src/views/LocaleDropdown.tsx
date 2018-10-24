import { Button, Dropdown, Menu, message } from "antd";
import { inject } from "mobx-react";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import { LocaleStore } from "src/store/LocaleStore";

interface IComponentProps {
  localeStore?: LocaleStore;
  className?: string;
  menuClassName?: string;
}

@inject("localeStore")
export class LocaleDropdown extends React.Component<IComponentProps> {
  constructor(props: IComponentProps) {
    super(props);
  }

  public changeLocale = ({ key }: { key: string }) => {
    this.props.localeStore!.setLocale(key);
  };

  public render() {
    const menu = (
      <Menu onClick={this.changeLocale} className={this.props.menuClassName}>
        <Menu.Item key="en">
          <FormattedMessage id="locale.english" />
        </Menu.Item>
        <Menu.Item key="fr">
          <FormattedMessage id="locale.french" />
        </Menu.Item>
      </Menu>
    );

    return (
      <Dropdown
        overlay={menu}
        placement="bottomRight"
        className={this.props.className}
      >
        <Button>Locales</Button>
      </Dropdown>
    );
  }
}
