function loadingComponent() {
    window.app.innerHTML = '<div class="loading__heading">Ожидание соперника...</div><div class="loading__spinner"><i class="fa fa-spinner fa-pulse fa-5x fa-fw"></i></div>';
    const enemyRequest = () => {
        const request = new XMLHttpRequest();
        request.open("GET", window.backURL + 'game-status?token=' + window.token + '&id=' + window.gameId);
        request.responseType = 'json';
        request.send();
        request.onload = () => {
            if (request.response['game-status'].status === 'waiting-for-your-move') {
                clearInterval(enemyFinder);
                window.enemy = request.response["game-status"].enemy.login;
                window.yourMoveComponent();
            }
            else if (request.response['game-status'].status === 'waiting-for-enemy-move') {
                window.enemy = request.response["game-status"].enemy.login;
                clearInterval(enemyFinder);
                window.opponentMoveComponent();
            }
        }
    }
    const enemyFinder = setInterval(enemyRequest, 500);
}