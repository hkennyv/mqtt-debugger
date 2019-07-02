import React from "react";
import { Client } from "paho-mqtt";
import { Container, Input } from "semantic-ui-react";
import StaticBox from "./StaticBox";
import MessageBox from "./MessageBox";
import "./MqttBox.css";

class MqttBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageTopic1: "",
      messagesTopic2: [],
      topic1: "",
      topicInput1: "",
      topic2: "",
      topicInput2: "",

      outgoingTopic: "",
      outgoingMsg: "",
      outgoingTopicInput: "",
      outgoingMsgInput: ""
    };

    this.onConnect = this.onConnect.bind(this);
    this.onConnectionLost = this.onConnectionLost.bind(this);
    this.onMessageArrived = this.onMessageArrived.bind(this);
    this.renderMessages = this.renderMessages.bind(this);
  }

  outgoingTopicOnChange = (e, { value }) =>
    this.setState({ outgoingTopic: value });
  outgoingMsgOnChange = (e, { value }) => this.setState({ outgoingMsg: value });
  onChangeInput1 = (e, { value }) => this.setState({ topicInput1: value });
  onChangeInput2 = (e, { value }) => this.setState({ topicInput2: value });
  onSubmitInput1 = e => {
    e.preventDefault();
    const { topicInput1, topic1 } = this.state;
    if (!topicInput1) return;
    /*
     * for some reason this line throws an err:
     * paho-mqtt.js:993 Uncaught Error: AMQJS0011E Invalid state not connected.
     */
    // this.client.unsubscribe(topic1);
    this.setState({ topic1: topicInput1 });
    this.client.subscribe(topicInput1);
  };
  onSubmitInput2 = e => {
    e.preventDefault();
    const { topicInput2, topic2 } = this.state;
    if (!topicInput2) return;
    /*
     * for some reason this line throws an err:
     * paho-mqtt.js:993 Uncaught Error: AMQJS0011E Invalid state not connected.
     */
    // this.client.unsubscribe(topic2);
    this.setState({ topic2: topicInput2 });
    this.client.subscribe(topicInput2);
  };
  onOutgoingSubmit = e => {
    e.preventDefault();
    console.log("something");
    const { outgoingMsg, outgoingTopic } = this.state;
    if (!outgoingMsg || !outgoingTopic) return;
    this.client.send(outgoingTopic, outgoingMsg);
    this.setState({ outgoingMsg: "" });
  };

  componentDidMount() {
    this.client = new Client(
      `${process.env.REACT_APP_MQTT_BROKER}`,
      parseInt(process.env.REACT_APP_MQTT_PORT, 10),
      `webapp-${new Date().getTime()}`
    );
    this.client.onConnectionLost = this.onConnectionLost;
    this.client.onMessageArrived = this.onMessageArrived;
    this.client.connect({ onSuccess: this.onConnect });
  }

  onConnect() {
    console.log("onConnect");
  }

  onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      const { errorMessage } = responseObject;
      console.log(`onConnectionLost: ${errorMessage}`);
    }
  }

  onMessageArrived(message) {
    const { destinationName, payloadString } = message;
    const { messagesTopic2, messageTopic1, topic1, topic2 } = this.state;

    console.log(destinationName, topic1, topic2);
    switch (destinationName) {
      case topic1:
        this.setState({ messageTopic1: payloadString });
        break;
      case topic2:
        if (messagesTopic2.length === 5) {
          this.setState(prevState => ({
            messagesTopic2: [
              ...prevState.messagesTopic2.slice(1, 5),
              payloadString
            ]
          }));
        } else {
          this.setState(prevState => ({
            messagesTopic2: [...prevState.messagesTopic2, payloadString]
          }));
        }
        break;
      default:
        console.log(
          "well this is awkward...there is an error somewhere around here..."
        );
        break;
    }
  }

  renderMessages() {
    const { messagesTopic2 } = this.state;
    return (
      <div>
        <h4>MsgBox</h4>
        {messagesTopic2.map(msg => (
          <p>
            [{msg.destinationName}] {msg.payloadString}
          </p>
        ))}
      </div>
    );
  }

  render() {
    const {
      messageTopic1,
      messagesTopic2,
      topic1,
      topic2,
      outgoingTopic,
      outgoingMsg
    } = this.state;
    return (
      <div className="mqttArea">
        <form className="mqttInput" onSubmit={this.onOutgoingSubmit}>
          {/* <div className="mqttInput"> */}
          <h3>Outgoing</h3>
          {/* <div className="outgoingInput"> */}
          <Input
            className="outgoingInput"
            fluid
            size="mini"
            label="topic:"
            value={outgoingTopic}
            onChange={this.outgoingTopicOnChange}
          />
          {/* </div> */}
          {/* <div className="outgoingInput"> */}
          <Input
            className="outgoingInput"
            fluid
            size="mini"
            label="msg:"
            value={outgoingMsg}
            onChange={this.outgoingMsgOnChange}
          />
          {/* </div> */}
          <button className="hidden" />
          {/* </div> */}
        </form>
        <div className="mqttOutput">
          <StaticBox
            onChangeInput1={this.onChangeInput1}
            onSubmitInput1={this.onSubmitInput1}
            message={messageTopic1}
            topic={topic1}
          />
          <MessageBox
            onChangeInput2={this.onChangeInput2}
            onSubmitInput2={this.onSubmitInput2}
            messages={messagesTopic2}
            topic={topic2}
          />
        </div>
      </div>
    );
  }
}

export default MqttBox;
