function lobbyComponent() {
    window.app.innerHTML = `<div class="lobby__heading">Список игроков</div>
    <ul class="lobby__list"></ul>
    <div class="button__container"><button class='lobby__button button-6'>Играть</button></div>`;
    const lobbyList = document.querySelector('.lobby__list');
    const listChecker = () => {
        const playerRequest = new XMLHttpRequest();
        playerRequest.open('GET', window.backURL + 'player-list');
        playerRequest.responseType = 'json';
        playerRequest.send();
        playerRequest.onload = () => {
            if (playerRequest.response.list[0]) {
                lobbyList.innerHTML = '';
                console.log('Обновление');
                playerRequest.response.list.forEach(element => {
                    const player = document.createElement('li');
                    player.classList.add('player');
                    player.textContent = element.login + ': w:' + element.wins + ', l:' + element.loses + ', r:' + element.rocks + ', s:' + element.scissors + ', p:' + element.papers;
                    lobbyList.appendChild(player);
                });
            }
        }
    }
    const playerListInterval = setInterval(listChecker, 2000);
    const lobbyButton = document.querySelector('.lobby__button');
    lobbyButton.addEventListener('click', () => {
        clearInterval(playerListInterval);
        window.gameFinder();
    });
}