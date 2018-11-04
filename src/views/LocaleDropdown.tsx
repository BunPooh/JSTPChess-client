import { Button, Dropdown, Menu } from "antd";
import { inject } from "mobx-react";
import * as PropTypes from "prop-types";
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
  public static propTypes = {
    localeStore: PropTypes.instanceOf(LocaleStore).isRequired,
    className: PropTypes.string,
    menuClassName: PropTypes.string
  };

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
        <Button>
          <FormattedMessage id="locales.title" />
        </Button>
      </Dropdown>
    );
  }
}
