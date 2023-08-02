//Le manifest est hosté ici : https://thomas01010.github.io/TBC-PBI/extension-manifest.json
//Attention, en cas de message "invalid extension url" lors de la tentative d'ajout sur Connect, il est probable que cela soit dû à une erreur dans le manifest JSON.
//Cela est à controler avec un validateur de format JSON.

import logoPBI from './images/PBI.png';
import React from "react";
import './App.css';
import * as Extensions from "trimble-connect-workspace-api";
import isEqual from 'lodash/isEqual';
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
  Alert,
  InputGroup,
  Badge,
} from "reactstrap";

function inIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

var title = ""
var link = ""

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainMenu: { title: "Tableaux de bord", icon: "https://images2.imgbox.com/49/1e/Nuz67Liq_o.png", command: "main_nav_menu_cliked", },
      /*subMenuItems: [
      { title: "Projet", icon: `https://images2.imgbox.com/49/1e/Nuz67Liq_o.png`, command: "submenu_1_clicked", },
      { title: "Data", icon: `https://images2.imgbox.com/49/1e/Nuz67Liq_o.png`, command: "submenu_2_clicked", },
      ],*/
      queryParams: "?taskId=16&navigate=true",
      editParams: false,
      title: "",
      link: "",
    };
  }

  async componentDidMount() {
    const { mainMenu, subMenuItems = [] } = this.state;
    if (inIframe()) {
      this.API = await Extensions.connect(
        window.parent,
        (event, args) => {
          switch (event) {
            case "extension.command":
              switch (args.data) {
                case "main_nav_menu_cliked":
                  this.setState({ title: "Tableau de bords projet" });
                  this.setState({ link: "https://app.powerbi.com/reportEmbed?reportId=9fc9c128-2287-4ead-9d5e-f0e0f1b6a689&autoAuth=true&ctid=be0be093-a2ad-444c-93d9-5626e83beefc" });
                  break;
                case "submenu_1_clicked":
                  this.setState({ title: "Tableau de bords projet" });
                  this.setState({ link: "https://app.powerbi.com/reportEmbed?reportId=9fc9c128-2287-4ead-9d5e-f0e0f1b6a689&autoAuth=true&ctid=be0be093-a2ad-444c-93d9-5626e83beefc" });
                  break;
                case "submenu_2_clicked":
                  this.setState({ title: "Tableau de bords data"});
                  this.setState({ link: "https://app.powerbi.com/reportEmbed?reportId=9fc9c128-2287-4ead-9d5e-f0e0f1b6a689&autoAuth=true&ctid=be0be093-a2ad-444c-93d9-5626e83beefc" });
                break;
              }
              break;
            case "extension.accessToken":
              this.setState({ accessToken: args.data });
              break;
            case "extension.userSettingsChanged":
              this.setState({ alertMessage: `User settings changed!` });
              this.getUserSettings();
              break;
            default:
          }
        },
        30000
      );

      this.API.ui.setMenu({ ...mainMenu, subMenus: [...subMenuItems] }).then();

      //requesting accessToken after 5 secs
      // setTimeout(() => {
      //   this.API.extension.getPermission("accesstoken").then(permission => console.log("extension:react-client:getPermission", permission));
      // }, 5000);
    }
  }

  render() {
    return (
      <iframe title={this.state.title} width="1600" height="870" src={this.state.link} frameborder="0" allowFullScreen="true">
      </iframe>
  );
  }
}

export default App;
