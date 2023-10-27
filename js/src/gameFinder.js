function gameFinder() {
    const request = new XMLHttpRequest();
    request.open('GET', window.backURL + 'start?token=' + window.token);
    request.responseType = 'json';
    request.send();
    request.onload = () => {
        console.log(request.response);
        window.gameId = request.response["player-status"].game.id;
        console.log(window.gameId);
        window.loadingComponent();
    }
}