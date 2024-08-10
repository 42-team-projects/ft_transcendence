import { GameOver } from "./GameOver.js";
import { LaunchingGame } from "./launchingGame.js";
import { userInfo, opponentInfo } from "./Lobby.js";

const game_page = document.createElement('template');

let score = {
    player: 0,
    opponent: 0,
}


game_page.innerHTML = /*html*/ `
<link rel="stylesheet" href="./Game/GamePlay/GameTable.css">
<div class="c_game">
    <div class="GameShapes">
		<div class="shapes_LT_RT"></div>
		<div class="shapes_LB_RB"></div>
		<div class="shapes_DT"></div>
		<div class="shapes_LR_container">
			<div class="center_shapes_LT_RT"></div>
			<div class="center_shapes_LB_RB"></div>
			<div class="center_shapes_MLR"></div>
		</div>
		<div class="table_container">
            <canvas id="table" class="pingpongTable"></canvas>
		</div>
    </div>
</div>
`

let CANVAS_WIDTH = 1900;
let CANVAS_HEIGHT = 900;

export class GameTable extends HTMLElement{

    constructor(room_name)
    {
        super();
        this.racquet_size = { width: 5, height: 90 };
        this.player = { 
            x: 0, 
            y: CANVAS_HEIGHT / 2, 
            color: 'white'
        };
        this.opponent = { 
            x: CANVAS_WIDTH - this.racquet_size.width, 
            y: CANVAS_HEIGHT / 2, 
            color: '#00b9be'
        };
        this.round = 1;
        this.room_name = room_name;
        this.requestID = null;
        this.appendChild(game_page.content.cloneNode(true))
        this.setKeys(false, false, false, false);
        this.Loop_state = true;
        const message = {
            'status': 'startGame',
            'canvas_width': CANVAS_WIDTH,
            'canvas_height': CANVAS_HEIGHT,
            'room_name': this.room_name,
            'racquet_size': {
                'height': this.racquet_size.height,
                'width': this.racquet_size.width,
            },
        }
        socket.send(JSON.stringify(message))
        // document.addEventListener('visibilitychange', (event)=>{
        //     socket.send(JSON.stringify({'status': 'pause'}))
        // })
    }
    async connectedCallback(){
        this.runder_call = true;
        await this.getMessages();
    }
    async getMessages() {
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.status === 'RoundOver') {
                score.player = data.score.player;
                score.opponent = data.score.opponent;
                this.RoundOver();
            } else if (data.status === 'RoundStart') {
                this.luanching = true;
                this.round = data.round;
                this.resetGame();
            } else if (data.status === 'GameOver') {
                this.luanching = false;
                this.GameOver(data.player_state);
            } else if (data.status === 'move') {
                const opponent_y = data.opponent_y;
                this.updateOpponentPosition(opponent_y);
            } else {
                const ball_y = data.ball.y;
                const ball_x = data.ball.x;
                const ball_radius = data.ball.radius;
                const dx = data.ball.dx;
                const dy = data.ball.dy;
                
                this.setCoordonates(ball_x , ball_y, ball_radius, dx, dy);
            }
        }
    }
    
    updateOpponentPosition = (opponent_y) => {
        this.opponent.y = opponent_y;
    }

    updatePlayerPosition = (player_y) => {
        this.player.y = player_y;
    }

    updateBallPosition = (ball_x, ball_y) => {
        this.ball.x = ball_x;
        this.ball.y = ball_y;
    }

    updateBallDirection = (dx, dy) => {
        this.ball.dx = dx;
        this.ball.dy = dy;
    }

    getPlayerPosition = () => {
        return this.player;
    }

    getOpponentPosition = () => {
        return this.opponent;
    }

    getRacketSize = () => {
        return this.racquet_size;
    }
    setCoordonates(x, y, radius, dx, dy){
        this.concoordonate = {
            x: x,
            y: y,
            radius: radius,
            dx: dx,
            dy: dy,
        };
    }
    getCoordonates(){return this.concoordonate;}
    
    GameOver(playerState){
        this.Loop_state = false;
        const gameOver = new GameOver(playerState);
        document.body.appendChild(gameOver);
    }
    async LuncheGame(ctx){
        document.body.querySelector('game-header').classList.toggle('blur', true)
		document.body.querySelector('game-table').classList.toggle('blur', true)
        if(this.luanching === false)
            return;
        let RoundTime = 3;
        const LunchingGame = new LaunchingGame(RoundTime, this.round);
		document.body.appendChild(LunchingGame);
		const Lunching = setInterval(() => {
			RoundTime--;
			if(RoundTime < 0)
            {
                addEventListener('keydown', (event) => {
                    this.setMove(event, this.getKeys());
                })
                addEventListener('keyup', (event) => {
                    this.resetMove(event, this.getKeys());
                })
                clearInterval(Lunching);
                document.body.querySelector('game-header').classList.toggle('blur', false);
                document.body.querySelector('game-table').classList.toggle('blur', false);
                document.body.querySelector('launching-game').remove();
                this.gameLoop(ctx);
            }
			else
                LunchingGame.updateTimer(RoundTime, this.round);
		}, 1000);
    }

    setKeys(keyS, keyW, keyArrowUp, keyArrowDown){
        this.conKeys = {
            keyS: keyS,
            keyW: keyW,
            keyArrowUp: keyArrowUp,
            keyArrowDown: keyArrowDown,
        }
    }
    getKeys(){return this.conKeys;}

    async RanderRackit(ctx, player){
        ctx.fillStyle = player.color;
        ctx.fillRect(player.x, player.y, this.racquet_size.width, this.racquet_size.height);
    }
    async renderBall(ctx){
        const coordonate = this.getCoordonates();
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(coordonate.x, coordonate.y,coordonate.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
    async resetGame(){
        if(this.requestID)
            cancelAnimationFrame(this.requestID);
        // removeEventListener('keydown');
        // removeEventListener('keyup');
        this.setCoordonates(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 10, 0 , 0);
        this.updatePlayerPosition(CANVAS_HEIGHT / 2);
        this.updateOpponentPosition(CANVAS_HEIGHT / 2);
        this.Loop_state = true;
        this.runder_call = true;
        this.runder();
    }
    async gameLoop(ctx){
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        const player = this.getPlayerPosition();
        const opponent = this.getOpponentPosition();
        this.requestID = requestAnimationFrame(() => this.gameLoop(ctx));
        await this.movePlayer(this.getKeys(), player);
        await this.moveBall(player, opponent, ctx);
        await this.renderBall(ctx);
        await this.RanderRackit(ctx, player);
        await this.RanderRackit(ctx, opponent);
        if(this.Loop_state === false)
            await this.resetGame();
    }
    async runder (){
        // console.log('rendering');

        const container = game_page.querySelector('.table_container');
        const canvas = this.querySelector('#table');
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
        const ctx = canvas.getContext('2d');
        await this.renderBall(ctx);
        await this.RanderRackit(ctx, this.getPlayerPosition());
        await this.RanderRackit(ctx, this.getOpponentPosition());
        await this.LuncheGame(ctx);
    }
    RoundOver(ctx){
        this.Loop_state = false;
        document.querySelector('game-header').updateScore(score);
    }
    async moveBall(player, opponent, ctx){
        let {x, y, radius, dx, dy} = this.getCoordonates();
        // console.log(this.getCoordonates());
        if(y + radius + dy >= CANVAS_HEIGHT || y - radius + dy <= 0)
            dy = -dy;
        if(x + radius + dx >= opponent.x && y >= opponent.y && y <= opponent.y + opponent.height)
            dx = -dx;
        if(x - radius + dx <= player.x + player.width && y >= player.y && y <= player.y + player.height)
            dx = -dx;
        x += dx;
        y += dy;
        // dx = dx + 0.1;
        // dy = dy + 0.1;
        // console.log(dx, dy);
        this.setCoordonates(x, y, radius ,dx, dy);

        //round over reset coordonates and update score
        // if(x - 10 + dx <= 0)
        // {
        //     score.opponent++;
        //     this.RoundOver(ctx);
        // }
        // if(x + 10 + dx >= CANVAS_WIDTH)
        // {
        //     score.player++;
        //     this.RoundOver(ctx);
        // }
    }

    setMove = (event, keys) =>{
        let {keyW, keyS, keyArrowUp, keyArrowDown} = keys;
        if(event.key === 'w' || event.key === 'W') { keyW = true };
        if(event.key === 's' || event.key === 'S') { keyS = true };
        // if(event.key === 'ArrowUp') { keyArrowUp = true };
        // if(event.key === 'ArrowDown') { keyArrowDown = true };

        this.setKeys(keyS, keyW, keyArrowUp, keyArrowDown);
    }
    resetMove = (event, keys) =>{
        let {keyW, keyS, keyArrowUp, keyArrowDown} = keys;

        if(event.key === 'w' || event.key === 'W') { keyW = false };
        if(event.key === 's' || event.key === 'S') { keyS = false };
        // if(event.key === 'ArrowUp') { keyArrowUp = false };
        // if(event.key === 'ArrowDown') { keyArrowDown = false };

        this.setKeys(keyS, keyW, keyArrowUp, keyArrowDown);
    }

    async movePlayer(keys, player){
        const {keyW, keyS, keyArrowUp, keyArrowDown} = keys;
        if(keyW === true) { this.moveUp(player) };
        if(keyS === true) { this.moveDown(player) };
        // if(keyArrowUp === true) { this.moveUp(opponent) };
        // if(keyArrowDown === true) { this.moveDown(opponent) };
        this.updatePlayerPosition(player.y);
    }
    moveDown(player){
        if(player.y + this.racquet_size.height <= CANVAS_HEIGHT)
            player.y += 10;
        const message = {
            'status': 'move',
            'room_name': this.room_name,
            'position': player.y
        }
        socket.send(JSON.stringify(message));
    }
    moveUp(player){
        if(player.y >= 0)
            player.y -= 10;
        const message = {
            'status': 'move',
            'room_name': this.room_name,
            'position': player.y,
        }
        socket.send(JSON.stringify(message));
    }
}
