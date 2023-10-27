function yourMoveComponent() {
    window.app.innerHTML = `<div class="game__heading">Вы играете против ${window.enemy}</div>
    <div class="game__hint">Ваш ход</div>
    <div class="option__container">
                <img src="./img/Myproject.png" alt="rock" data-move="rock" class="option__img">
                <img src="./img/Myproject1.png" alt="scissors" data-move="scissors" class="option__img">
                <img src="./img/6668763c9ec71f96ad77d4b92dfa2a2b.png" alt="paper" data-move="paper" class="option__img">
            </div>`;
    const clickHandler = (event) => {
        const target = event.target;
        console.log(target.tagName);
        if (target.tagName !== 'IMG') {
            return;
        }
        const move = target.dataset.move;
        console.log(move);
        const request = new XMLHttpRequest();
        request.open('GET', window.backURL + 'play?token=' + window.token + '&id=' + window.gameId + '&move=' + move);
        request.responseType = 'json';
        request.onload = () => {
            console.log('Ход сделан');
            console.log(request.response);
            if (request.response['game-status'].status === 'waiting-for-your-move') {
                return;
            }
            else if (request.response['game-status'].status === 'waiting-for-enemy-move') {
                window.opponentMoveComponent();
            }
            else if (request.response['game-status'].status === 'lose') {
                window.lossComponent();
            }
            else if (request.response['game-status'].status === 'win') {
                window.victoryComponent();
            }
        }
        request.send();
    }
    document.querySelector('.option__container').addEventListener('click', clickHandler);
}