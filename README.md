# mqtt-debugger
author(s): khuynh, rokamura

## Description
A simple react web app used for debugging mqtt communication. It is built using [create-react-app](https://github.com/facebook/create-react-app) and uses the [paho.mqtt.javascript](https://github.com/eclipse/paho.mqtt.javascript) library.

## Usage

### Cloning the Repository

First, clone the repository

```
git clone git@bitbucket.org:hkennyv/mqtt-debugger.git
```

### Install deps

Second, change directories into the cloned folder and run the following command to install the dependencies:

**for npm**
```
npm install
```

**for yarn**
```
yarn install
```

### Configure .env

Rename the `.env.sample` file to `.env` and configure the two environment variables inside.

| environment variable | description |
| -------------------- | ----------- |
| REACT_APP_MQTT_BROKER | The hostname to the mqtt broker |
| REACT_APP_MQTT_PORT | The port to conect to the mqtt broker (default is 11883 if websockets is enabled through broker) |

### Build webapp

Third, build the webapp using npm/yarn.

```
npm build
```

```
yarn build
```

### Hosting

Lastly, serve the webapp through your preferred method. Using [serve](https://www.npmjs.com/package/serve) is recommended for simple local hosting.
