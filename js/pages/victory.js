function victoryComponent() {
    window.app.innerHTML = `<div class="result__heading">Вы обыграли опытного ${window.enemy}</div>
    <div class="button__container"><button class="repeat__router button-6">Ещё разок</button></div>
    <div class="button__container"><button class="lobby__router button-6">Да не, тут слабаки одни, я в лобби посижу лучше</button></div>`;
    document.querySelector('.repeat__router').addEventListener('click', window.gameFinder);
    document.querySelector('.lobby__router').addEventListener('click', window.lobbyComponent);
}