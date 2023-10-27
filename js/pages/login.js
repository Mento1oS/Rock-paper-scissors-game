function loginComponent() {
    window.app = document.querySelector('.app');
    app.innerHTML = `
    <h1 class="login__heading">Добро пожаловать в игру цу-е-фа</h1>
    <div class="form__group field">
  <input type="text" class="form__field login__input" placeholder="Login"/>
  <label for="name" class="form__label">Логин</label>
</div>
                    <div class="button__container"><button class="login__button button-6">Войти</button></div>`;
    window.backURL = 'https://skypro-rock-scissors-paper.herokuapp.com/';
    const loginInput = document.querySelector('.login__input');
    const loginButton = document.querySelector('.login__button');
    loginButton.addEventListener('click', loginHandler);
    function loginHandler(event) {
        const login = loginInput.value;
        const request = new XMLHttpRequest();
        request.responseType = 'json';
        request.open('GET', backURL + `login?login=${login}`);
        request.onload = (event) => {
            const data = event.target;
            if (data.response.status == 'ok') {
                window.token = data.response.token;
                const enemyRequest = () => {
                    const request = new XMLHttpRequest();
                    request.open("GET", window.backURL + 'player-status?token=' + window.token);
                    request.responseType = 'json';
                    request.send();
                    request.onload = () => {
                        if (request.response['player-status'].status === 'lobby') {
                            window.lobbyComponent();
                        }
                        else if (request.response['player-status'].status === 'game') {
                            window.gameId = request.response['player-status'].game.id;
                            window.loadingComponent();
                        }
                    }
                }
                enemyRequest();
            }
        }
        request.send();
    }
}
