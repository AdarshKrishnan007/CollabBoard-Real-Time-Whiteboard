# 📌 CollabBoard – Real-Time Whiteboard Collaboration

CollabBoard is a **real-time collaborative whiteboard** web application where multiple users can join a shared room and draw together.  
It features **leader-controlled sessions**, **room-based collaboration**, and a **responsive, minimal UI** for a smooth creative experience.


## 🚀 Features Implemented So Far

✅ **Room-based Collaboration**  
- Each whiteboard session has a unique **Room ID**.
- Users can join via a **shareable link**.

✅ **Real-time Drawing**  
- Canvas updates are instantly shared with all participants using **Socket.io**.
- Supports **pen** and **eraser** tools with adjustable colors and stroke sizes.

✅ **Leader Role & Permissions**  
- First user in the room becomes the **Leader**.
- Only the leader can **start or end the session**.
- Session must be active for participants to draw.

✅ **Participants Panel**  
- Displays a live list of connected participants.
- Updates in real-time when users join or leave.

✅ **Responsive Minimal UI**  
- Clean layout with a **tool sidebar**, **drawing area**, and **permissions panel**.
- Works on both **desktop** and **tablet** screens.


## 🛠️ Tech Stack

- **Frontend:** React.js, Custom CSS
- **Backend:** Node.js, Express.js
- **Real-time Communication:** Socket.io
- **State Management:** React Hooks


