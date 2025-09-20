const socket = io();
const totalUsersElement = document.getElementById('total-users');
const mostPopularRoomElement = document.getElementById('most-popular-room');
const roomNameInput = document.getElementById('room-name');
const rankingListElement = document.getElementById('ranking-list');
const alertBanner = document.getElementById('alert-banner');
const ctx = document.getElementById('roomsChart').getContext('2d');

const roomsChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: '# de Usuários',
            data: [],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: { beginAtZero: true, ticks: { stepSize: 1 } }
        },
        responsive: true,
        plugins: { legend: { display: false } }
    }
});

const ALERT_THRESHOLD = 5;
let alertedRooms = new Set();

socket.on('update stats', (stats) => {
    totalUsersElement.textContent = stats.totalUsers;
    mostPopularRoomElement.textContent = stats.mostPopularRoom;
    updateRanking(stats.rankedRooms);
    updateChart(stats.rankedRooms);
    checkAndDisplayAlerts(stats.rankedRooms);
});

function updateRanking(rankedRooms) {
    rankingListElement.innerHTML = '';
    if (rankedRooms.length === 0) {
        rankingListElement.innerHTML = '<p>Nenhuma sala ativa.</p>';
        return;
    }
    rankedRooms.forEach(room => {
        const li = document.createElement('li');
        li.innerHTML = `${room.name} <span>${room.userCount}</span>`;
        rankingListElement.appendChild(li);
    });
}

function updateChart(rankedRooms) {
    roomsChart.data.labels = rankedRooms.map(room => room.name);
    roomsChart.data.datasets[0].data = rankedRooms.map(room => room.userCount);
    roomsChart.update();
}

function checkAndDisplayAlerts(rankedRooms) {
    rankedRooms.forEach(room => {
        if (room.userCount > ALERT_THRESHOLD && !alertedRooms.has(room.name)) {
            showAlert(`A sala "${room.name}" está cheia! (${room.userCount} usuários)`);
            alertedRooms.add(room.name);
        } else if (room.userCount <= ALERT_THRESHOLD && alertedRooms.has(room.name)) {
            alertedRooms.delete(room.name);
        }
    });
}

function showAlert(message) {
    alertBanner.textContent = message;
    alertBanner.style.display = 'block';
    setTimeout(() => {
        alertBanner.style.display = 'none';
    }, 5000);
}

function joinRoom() {
    const roomName = roomNameInput.value.trim();
    if (roomName) {
        socket.emit('join room', roomName);
        roomNameInput.value = '';
    } else {
        alert('Por favor, digite o nome da sala.');
    }
}