function lossComponent() {
    window.app.innerHTML = `<div class="result__heading">Вы проиграли хитрому ${window.enemy}</div>
    <div class="button__container"><button class="repeat__router button-6">Ещё разок</button></div>
    <div class="button__container"><button class="lobby__router button-6" >Не, давай в лобби</button></div>`;
    document.querySelector('.repeat__router').addEventListener('click', window.gameFinder);
    document.querySelector('.lobby__router').addEventListener('click', window.lobbyComponent);
}