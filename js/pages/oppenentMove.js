function opponentMoveComponent() {
    window.app.innerHTML = `<div class="game__heading">Вы играете против ${window.enemy}</div><div class="game__hint">Ход соперника...</div><div class="loading__spinner"><i class="fa fa-spinner fa-pulse fa-5x fa-fw"></i></div>`;
    const opponentMoveChecker = setInterval(moveCheck, 500);
    function moveCheck() {
        const request = new XMLHttpRequest();
        request.open('GET', window.backURL + "game-status?token=" + window.token + "&id=" + window.gameId);
        request.responseType = 'json';
        request.onload = () => {
            if (request.response['game-status'].status === 'waiting-for-enemy-move') {
                console.log('Противник ход не сделал ещё');
                return;
            }
            else if (request.response['game-status'].status === 'waiting-for-your-move') {
                console.log('Ваш ход');
                clearInterval(opponentMoveChecker);
                window.yourMoveComponent();
            }
            else if (request.response['game-status'].status === 'lose') {
                console.log('Вы проиграли');
                clearInterval(opponentMoveChecker);
                window.lossComponent();
            }
            else if (request.response['game-status'].status === 'win') {
                console.log('Вы выиграли');
                clearInterval(opponentMoveChecker);
                window.victoryComponent();
            }
        }
        request.send();
    }

}