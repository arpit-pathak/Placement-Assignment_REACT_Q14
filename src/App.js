import React, { Component } from "react";
import { icons } from "react-icons/lib";
import Icon from "./components/icon";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Card, CardBody, Container, Button, Col, Row } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

const itemArray = new Array(9).fill("empty");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCross: false,
      winMessage: "",
    };
  }

  reloadGame = () => {
    this.setState({
      isCross: false,
      winMessage: "",
    });
    itemArray.fill("empty", 0, 9);
  };

  checkIsWinner = () => {
    // checking winner of the game
    const { itemArray } = this.state;

    if (
      itemArray[0] === itemArray[1] &&
      itemArray[0] === itemArray[2] &&
      itemArray[0] !== "empty"
    ) {
      this.setState({ winMessage: `${itemArray[0]} won` });
    } else if (
      itemArray[3] !== "empty" &&
      itemArray[3] === itemArray[4] &&
      itemArray[4] === itemArray[5]
    ) {
      this.setState({ winMessage: `${itemArray[3]} won` });
    } else if (
      itemArray[6] !== "empty" &&
      itemArray[6] === itemArray[7] &&
      itemArray[7] === itemArray[8]
    ) {
      this.setState({ winMessage: `${itemArray[6]} won` });
    } else if (
      itemArray[0] !== "empty" &&
      itemArray[0] === itemArray[3] &&
      itemArray[3] === itemArray[6]
    ) {
      this.setState({ winMessage: `${itemArray[0]} won` });
    } else if (
      itemArray[1] !== "empty" &&
      itemArray[1] === itemArray[4] &&
      itemArray[4] === itemArray[7]
    ) {
      this.setState({ winMessage: `${itemArray[1]} won` });
    } else if (
      itemArray[2] !== "empty" &&
      itemArray[2] === itemArray[5] &&
      itemArray[5] === itemArray[8]
    ) {
      this.setState({ winMessage: `${itemArray[2]} won` });
    } else if (
      itemArray[0] !== "empty" &&
      itemArray[0] === itemArray[4] &&
      itemArray[4] === itemArray[8]
    ) {
      this.setState({ winMessage: `${itemArray[0]} won` });
    } else if (
      itemArray[2] !== "empty" &&
      itemArray[2] === itemArray[4] &&
      itemArray[4] === itemArray[6]
    ) {
      this.setState({ winMessage: `${itemArray[2]} won` });
    } else {
      // check if no one wins or match draw
      if (itemArray.every((item) => item !== "empty")) {
        this.setState({ winMessage: "No one Wins Match Draw!!!" });
        toast("Match Draw", { type: "warning" });
      }
    }
  };

  changeItem = (itemNumber) => {
    const { winMessage, isCross } = this.state;
    if (winMessage) {
      return toast(winMessage, { type: "success" });
    }

    if (itemArray[itemNumber] === "empty") {
      itemArray[itemNumber] = isCross ? "cross" : "circle";
      this.setState({
        isCross: !isCross,
      });
    } else {
      return toast("already filled", { type: "error" });
    }

    this.checkIsWinner();
  };

  render() {
    const { isCross, winMessage } = this.state;

    return (
      <Container className="p-5">
        <ToastContainer position="bottom-center" />
        <Row>
          <Col md={6} className="offset-md-3">
            {winMessage ? (
              <div className="my-2">
                <h1 className="text-success text-uppercase text-center">
                  {winMessage}
                </h1>
                <Button
                  color="success"
                  block
                  onClick={this.reloadGame}
                  className="my-2"
                >
                  Reload the Game
                </Button>
              </div>
            ) : (
              <h1 className="text-center text warning text-white">
                {isCross ? "Cross" : "Circle"} turns
              </h1>
            )}
            <div className="grid">
              {itemArray.map((item, index) => (
                <Card
                  color="warning"
                  onClick={() => this.changeItem(index)}
                  key={index}
                >
                  <CardBody className="box">
                    <Icon name={item} />
                  </CardBody>
                </Card>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
