# Online-meeting-system

Simple Web Application that offer you to create video meeting room using WebRTC and Socket

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You have to install [Node.js](https://nodejs.org/en/) in your machine.

### Installing

After installing node clone the repo by using git

```
git clone https://github.com/yashbabariya/online-meeting-system
                        or
git clone git@github.com:yashbabariya/online-meeting-system.git
```

Or you can download the zip file.

Then open cmd or git bash on the project folder to install some modules that I used to build this project

Install Once

```
npm install
```

[Nodemon](https://www.npmjs.com/package/nodemon) For automatically restart the server as a dev dependency (optional)

```
npm i --sav-dev nodemon
```

## Setting Database

For the database I use [mongodb](https://www.mongodb.com/) we can use the local .

Example

```
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:3000/your_db_name", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("database connected");
  }).catch((err) => {
    console.log(`Database Connection Error !!! ${err}`);
  });
```

## Running the App

If you install nodemon the you can use. (devStart script is already added to the package.json)

```
nodemon server.js
```

or

```
node server.js
```

## Preview

<img src="preview/preview.gif" alt="preview image">

## Live Demo

For deploy the project I use [heroku](https://heroku.com)

[Video Chat](https://online-meeting-systems.herokuapp.com/)

## Built With

- [Node Js](https://nodejs.org/en/) - The Backend
- [Peer JS](https://peerjs.com/) - PeerJS simplifies WebRTC peer-to-peer data, video, and audio calls.
- [SocketIo](https://socket.io/) - For realtime communication
- [NPM](https://www.npmjs.com/) - Dependency Management
- [GIT](https://git-scm.com/) - Used for version control
- [Heroku](https://heroku.com) - Used to Deploy Node.js applications

## License

Online-meeting-system is released under the [MIT license](LICENSE.txt).
