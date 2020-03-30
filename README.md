# Rocket.Chat Uber App

## How to use it

Use the slash command to request a ride
The app currently just provides a display of what the UI would look like. Integration with the Uber API will be done soon.


You'll need to set up the Rocket.Chat Apps dev environment, please see https://rocket.chat/docs/developer-guides/developing-apps/getting-started/

To install the using the command line, you have to turn on the setting `Enable development mode` on the Rocket.Chat server under `Admin > General > Apps`.

Then you can clone this repo and then:

```bash
npm install
rc-apps deploy
```

Follow the instructions and when you're done, the app will be installed on your Rocket.Chat server.
