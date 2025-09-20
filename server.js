const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

let totalUsers = 0;
const rooms = {};

io.on('connection', (socket) => {
    totalUsers++;
    console.log(`[CONECTOU] ID: ${socket.id} | Total: ${totalUsers}`);

    socket.on('join room', (roomName) => {
        for (const room of socket.rooms) {
            if (room !== socket.id) {
                socket.leave(room);
                if (rooms[room]) {
                    rooms[room].delete(socket.id);
                    if (rooms[room].size === 0) {
                        delete rooms[room];
                    }
                }
            }
        }

        socket.join(roomName);
        if (!rooms[roomName]) {
            rooms[roomName] = new Set();
        }
        rooms[roomName].add(socket.id);
        console.log(`[ENTROU NA SALA] ID: ${socket.id} | Sala: ${roomName}`);
    });

    socket.on('disconnecting', () => {
        totalUsers--;
        for (const room of socket.rooms) {
            if (room !== socket.id) {
                if (rooms[room]) {
                    rooms[room].delete(socket.id);
                    if (rooms[room].size === 0) {
                        delete rooms[room];
                    }
                }
            }
        }
        console.log(`[DESCONECTOU] ID: ${socket.id} | Total: ${totalUsers}`);
    });
});

setInterval(() => {
    const rankedRooms = Object.entries(rooms)
        .map(([name, usersSet]) => ({
            name,
            userCount: usersSet.size
        }))
        .sort((a, b) => b.userCount - a.userCount);

    const mostPopularRoom = rankedRooms.length > 0 ? rankedRooms[0].name : 'Nenhuma';

    const stats = {
        totalUsers,
        mostPopularRoom,
        rankedRooms
    };

    io.emit('update stats', stats);
}, 1000);

server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
