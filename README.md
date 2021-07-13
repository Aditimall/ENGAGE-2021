# ENGAGE-2021
Real Time video calling app with chat feature(Microsoft engage 2021)

## Live URL

>[Video Chat App](https://video-call-engage.herokuapp.com/)
## Scripts

  Install node modules
  
 #### `npm install`

  In the project directory, you can run:

#### `npm run start`

  Runs the app in the development mode.<br>
  Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
  
## Project Description

* **Server.js** : Express has been used to set up the server and real time bidirectional communication in enabled by socket.io. Socket.io is used for communication between server and client. Peerjs library has also been used for webRTC implementation ,peer-to-connection and userID generation .
* **Script.js** : This file contains code for generating the video where user will send a connection request to the server to which server will respond and a room will be created.
 If other users want to join then user will send request and if other users accepts it his/her video will be shared in room.We also have a chat option ,when send button is 
 pressed ,request is sent to socket.io which emit data and peerId.PeerID is mapped to name and the name is used for chat.
* **Room.ejs** : It contains code for the extra features built like mute,unmute and chat button.
* **Style.css** : It contains the complete frontend part of the video call application.
