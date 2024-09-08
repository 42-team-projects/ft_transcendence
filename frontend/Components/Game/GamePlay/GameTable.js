import { GameOver } from "./GameOver.js";
import { LaunchingGame } from "./launchingGame.js";
import { userInfo, opponentInfo } from "./Lobby.js";
import { ip } from "../../../Utils/GlobalVariables.js";
import { useWebsocket } from "../../../Utils/TournamentWebSocketManager.js";
import { goNextStage } from "./configs/ScoreManager.js";
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
let now;
export class GameTable extends HTMLElement{

    constructor(room_name)
    {
        super();
        this.socket = new WebSocket(`ws://${ip}:8000/ws/game/${room_name}/`);
        this.socket.onopen = () => {
            console.log('connected');
        }

        this.socket.onclose = () => {
            console.log('disconnected');
        }

        this.socket.onerror = (error) => {
            console.log('error', error);
        }

        this.racquet = { width: 5, height: 90 };
        this.player = { 
            x: 0, 
            y: CANVAS_HEIGHT / 2,
            color: 'white'
        };
        this.opponent = { 
            x: CANVAS_WIDTH - this.racquet.width, 
            y: CANVAS_HEIGHT / 2, 
            color: '#00b9be'
        };
        this.round = 1;
        this.room_name = room_name;
        this.requestID = null;
        this.appendChild(game_page.content.cloneNode(true))
        this.setKeys(false, false, false, false);
        this.Loop_state = true;
        
        // document.addEventListener('visibilitychange', (event)=>{
        //     this.socket.send(JSON.stringify({'status': 'pause'}))
        // })
    }
    async connectedCallback(){
        this.runder_call = true;
        // sleep 
        // if (userInfo.id == 1 || userInfo.id == 4)
        //     await new Promise(r => setTimeout(r, 20000));

        if(userInfo.id % 2)
            await this.GameOver('lose')
        else
            await this.GameOver('win')
        // await this.getMessages();
    }
    async getMessages() {
        this.socket.onmessage = async (event) => {
            const data = JSON.parse(event.data);
            const message = data.message;
            const player_1 = message.player_1;
            const player_2 = message.player_2;
            const status = message.status;
            console.log('message', message);
            if (status === 'game_start') {
                const message = {
                    'message': 'firstdata',
                    'canvas_width': CANVAS_WIDTH,
                    'canvas_height': CANVAS_HEIGHT,
                    'id': userInfo.id,
                    'racquet': {
                        'height': this.racquet.height,
                        'width': this.racquet.width,
                    },
                }
                this.socket.send(JSON.stringify(message))
            } else if (status === 'RoundOver') {
                if (userInfo.id === Number(player_1.id)) {
                    score.player = player_1.score;
                    score.opponent = player_2.score;
                } else if (userInfo.id === Number(player_2.id)) {
                    score.player = player_2.score;
                    score.opponent = player_1.score;
                }
                await this.RoundOver();
                console.log('time', new Date() - now);
            } else if (status === 'RoundStart') {
                this.luanching = true;
                this.round = message.round;
                await this.resetGame();
                now = new Date();
            } else if (status === 'GameOver') {
                let player_state = '';
                if (userInfo.id === Number(player_1.id)) {
                    player_state = player_1.game_state;
                } else if (userInfo.id === Number(player_2.id)) {
                    player_state = player_2.game_state;
                }
                this.luanching = false;
                await this.GameOver(player_state);
            } else if (status === 'move') {
                if (userInfo.id === Number(player_1.id)) {
                    this.updatePlayerPosition(player_1.y);
                    this.updateOpponentPosition(player_2.y);
                } else if (userInfo.id === Number(player_2.id)) {
                    this.updatePlayerPosition(player_2.y);
                    this.updateOpponentPosition(player_1.y);
                }
            } else if(status === 'Game'){
                const ball_y = message.ball.y;
                const ball_radius = message.ball.radius;
                const dy = message.ball.dy;
                let ball_x = 0;
                let dx = 0;
                if (userInfo.id === Number(player_1.id)) {
                    ball_x = player_1.ball_x;
                    dx = player_1.ball_dx;
                } else if (userInfo.id === Number(player_2.id)) {
                    ball_x = player_2.ball_x;
                    dx = player_2.ball_dx;
                }
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
        return this.racquet;
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
    
    async GameOver(playerState){
        this.Loop_state = false;
        console.log("this.id: ", this.id);
        if (this.id)
            goNextStage(playerState, this.id);
        const gameOver = new GameOver(playerState);
        document.body.appendChild(gameOver);
    }
    async LuncheGame(ctx){
        // console.log('lunching');
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
        ctx.fillRect(player.x, player.y, this.racquet.width, this.racquet.height);
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
        // if(this.requestID)
        //     cancelAnimationFrame(this.requestID);
        //     removeEventListener('keydown', (event) => {
        //         this.setMove(event, this.getKeys());
        //     })
        //     removeEventListener('keyup', (event) => {
        //         this.resetMove(event, this.getKeys());
        //     })
        this.setCoordonates(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 10, 0 , 0);
        this.updatePlayerPosition(CANVAS_HEIGHT / 2);
        this.updateOpponentPosition(CANVAS_HEIGHT / 2);
        this.Loop_state = true;
        this.runder_call = true;
        await this.runder();
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
    async RoundOver(ctx){
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
        if(player.y + this.racquet.height <= CANVAS_HEIGHT)
            player.y += 10;
        const message = {
            'message': 'move',
            'y': player.y
        }
        this.socket.send(JSON.stringify(message));
    }

    moveUp(player){
        if(player.y >= 0)
            player.y -= 10;
        const message = {
            'message': 'move',
            'y': player.y,
        }
        this.socket.send(JSON.stringify(message));
    }
}
