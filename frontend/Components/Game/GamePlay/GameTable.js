import { GameOver } from "/Components/Game/GamePlay/GameOver.js";
import { LaunchingGame } from "/Components/Game/GamePlay/launchingGame.js";
import { userInfo } from "/Components/Game/GamePlay/Lobby.js";
import { goNextStage } from "/Components/Game/GamePlay/configs/ScoreManager.js";
import { wsUrl, HOST } from "/Utils/GlobalVariables.js";
import { PausePage } from "./Pause-Page.js";
import { router } from "/root/Router.js";
import { createApiData } from "/Utils/APIManager.js";
import { gameBard } from "/Components/CustomElements/CustomSliders.js";
import { opponentInfo } from "./Lobby.js";
import { updateApiData } from "/Utils/APIManager.js";
import { PROFILE_API_URL, updateCurrentPlayer } from "/Utils/GlobalVariables.js";
import { svgSlider } from "/Slides.js";
import { CustomSpinner } from "/Components/CustomElements/CustomSpinner.js";
const game_page = document.createElement("template");

const RACKET_SPEED = 10;

let score = {
    player: 0,
    opponent: 0,
};

game_page.innerHTML = /*html*/ `
`;

let CANVAS_WIDTH = 1900;
let CANVAS_HEIGHT = 900;

export class GameTable extends HTMLElement {
    constructor(state, room_name, game_play, save) {
        super();
        this.state = state;
        score.player = 0;
        score.opponent = 0;
        if(this.state !== "offline"){

            this.save_match = save;
            document.body.querySelector("footer-bar").remove();
            this.socket = new WebSocket(`${wsUrl}ws/game/${room_name}/`);
            const spinner = new CustomSpinner();
            spinner.label = "Waiting for opponent to join ...";
            spinner.time = 150;
            spinner.display();
            document.body.appendChild(spinner);
            this.socket.onopen = () => {
            };
            
            this.socket.onclose = () => {
                if(this.Loop_state === true){
                    score.player = 5;
                    score.opponent = 0;
                    this.GameOver("win", score.player, score.opponent, opponentInfo.id);
                }
            };
            
            this.socket.onerror = (error) => {
            };
        }
        
        this.racquet = { width: 8, height: 110 };
        userInfo.color = game_play.first_racket_color ? game_play.first_racket_color : '#FF0000';
        opponentInfo.color = game_play.second_racket_color ? game_play.second_racket_color : '#FF0000';
        this.player = {
            x: 0,
            y: CANVAS_HEIGHT / 2,
            color: game_play.first_racket_color ? game_play.first_racket_color : '#FF0000',
        };
        this.opponent = {
            x: CANVAS_WIDTH - this.racquet.width,
            y: CANVAS_HEIGHT / 2,
            color: game_play.second_racket_color ? game_play.second_racket_color : '#FF0000',
        };
        this.ball_color = game_play.ball_color ? game_play.ball_color : 'white';
        this.round = 1;
        this.room_name = room_name;
        this.requestID = null;
        this.innerHTML = `
            <link rel="stylesheet" href="/Components/Game/GamePlay/GameTable.css">
            <link rel="stylesheet" href="/Utils/utils.css">
            <div class="c_game">
                ${svgSlider[game_play.board]}
                <div class="GameShapes">
                    <div class="table_container">
                        <canvas id="table" class="pingpongTable"></canvas>
                    </div>
                </div>
            </div>
        `
        gameBard(this.querySelector("svg"), game_play.board_color ? game_play.board_color : '#FF0000');
        this.setKeys(false, false, false, false);
        this.Loop_state = true;
        this.pause = false;

    }
    async connectedCallback() {
        if (this.state === "offline") {
            this.roundStart({ round: 1 });
            return;
        }
        document.body.addEventListener("pause-game", () => {
            this.pauser = true;
            this.socket.send(
                JSON.stringify({ message: "pause", id: userInfo.id })
            );
        });
        document.body.addEventListener("resume-game", () => {
            if (this.pauser === true)
                this.socket.send(JSON.stringify({ message: "resume" }));
        });
        document.body.addEventListener("exit-game", () => {
            this.remove();
        });
        this.runder_call = true;
        await this.getMessages();
    }
    gameStart = () => {
        document.body.querySelector("custom-spinner").remove();
        const messages = {
            message: "firstdata",
            canvas_width: CANVAS_WIDTH,
            canvas_height: CANVAS_HEIGHT,
            id: userInfo.id,
            racquet: {
                height: this.racquet.height,
                width: this.racquet.width,
            },
        };
        this.socket.send(JSON.stringify(messages));
    };
    roundOver = async (player_1, player_2) => {
        if (userInfo.id === Number(player_1.id)) {
            score.player = player_1.score;
            score.opponent = player_2.score;
        } else if (userInfo.id === Number(player_2.id)) {
            score.player = player_2.score;
            score.opponent = player_1.score;
        }
        await this.RoundOver();
    };
    roundStart = async (message) => {
        this.luanching = true;
        this.round = message.round;
        const launch = document.body.querySelector("launching-game");
        if (launch) launch.remove();
        await this.resetGame();
    };
    gameEnd = async (player_1, player_2) => {
        let player_state = "";
        let score = "";
        let opponent_score = "";
        if (userInfo.id === Number(player_1.id)) {
            player_state = player_1.game_state;
            score = player_1.score;
            opponent_score = player_2.score;
        } else if (userInfo.id === Number(player_2.id)) {
            player_state = player_2.game_state;
            score = player_2.score;
            opponent_score = player_1.score;
        }
        this.luanching = false;
        await this.GameOver(player_state, score, opponent_score, opponentInfo.id);
    };
    moveRacket = (player_1, player_2) => {
        if (userInfo.id === Number(player_1.id)) {

        } else if (userInfo.id === Number(player_2.id)) {

        }
    };
    gameData = async (message, player_1, player_2) => {
        const ball_y = message.ball.y;
        const ball_radius = message.ball.radius;
        const dy = message.ball.dy;
        let ball_x = 0;
        let dx = 0;
        if (userInfo.id === Number(player_1.id)) {
            this.updatePlayerPosition(player_1.y);
            this.updateOpponentPosition(player_2.y);
            ball_x = player_1.ball_x;
            dx = player_1.ball_dx;
        } else if (userInfo.id === Number(player_2.id)) {
            this.updatePlayerPosition(player_2.y);
            this.updateOpponentPosition(player_1.y);
            ball_x = player_2.ball_x;
            dx = player_2.ball_dx;
        }
        this.setCoordonates(ball_x, ball_y, ball_radius, dx, dy);
    };
    pauseGame = (message) => {
        this.pause = true;
        document.body
            .querySelector(".Play_Pause")
            .querySelector(".status").textContent = "PAUSED";
        document.body.appendChild(new PausePage());
    };
    resumeGame = () => {
        this.pause = false;
        this.pauser = false;
        document.body
            .querySelector(".Play_Pause")
            .querySelector(".status").textContent = "PAUSE";
        document.body.querySelector("pause-page").remove();
    };
    async getMessages() {
        this.socket.onmessage = async (event) => {
            const data = JSON.parse(event.data);
            const message = data.message;
            const player_1 = message.player_1;
            const player_2 = message.player_2;
            const status = message.status;
            if (status === "game_start") this.gameStart();
            else if (status === "RoundOver")
                await this.roundOver(player_1, player_2);
            else if (status === "RoundStart") await this.roundStart(message);
            else if (status === "GameOver")
                await this.gameEnd(player_1, player_2);
            else if (status === "Game")
                await this.gameData(message, player_1, player_2);
            else if (status === "Pause") this.pauseGame(message);
            else if (status === "Resume") this.resumeGame();
        };
    }

    updateOpponentPosition = (opponent_y) => {
        this.opponent.y = opponent_y;
    };

    updatePlayerPosition = (player_y) => {
        this.player.y = player_y;
    };

    updateBallPosition = (ball_x, ball_y) => {
        this.ball.x = ball_x;
        this.ball.y = ball_y;
    };

    updateBallDirection = (dx, dy) => {
        this.ball.dx = dx;
        this.ball.dy = dy;
    };

    getPlayerPosition = () => {
        return this.player;
    };

    getOpponentPosition = () => {
        return this.opponent;
    };

    getRacketSize = () => {
        return this.racquet;
    };
    setCoordonates(x, y, radius, dx, dy) {
        this.concoordonate = {
            x: x,
            y: y,
            radius: radius,
            dx: dx,
            dy: dy,
        };
    }
    getCoordonates(){return this.concoordonate;}
    
    async GameOver(playerState, score, opponent_score, opponent_player, winner) {
        this.reset();
        if (this.id && this.id !== "undefined")
            await goNextStage(
                playerState,
                this.id,
                userInfo.id,
                opponentInfo.id,
                score,
                opponent_score
            );
        const gameOver = new GameOver(playerState, this.state, winner);
        document.body.appendChild(gameOver);
        if( this.save_match === true)
        {
            const body = JSON.stringify({'player_score': score, 'opponent_score': opponent_score, 'result': playerState, 'opponent_player': opponent_player});
            const form = new FormData();
            if (playerState === "win")
                form.append('win', 1);
            else
                form.append('loss', 1);
            const updateResponse =  await updateApiData(PROFILE_API_URL + "me/stats/", form);
            await updateCurrentPlayer();

            await createApiData(HOST + '/game/game_history/me/', body);
        }
        setTimeout(() => {
            this.remove();
        }, 5000);
    }
    async LuncheGame(ctx) {
        const game_header = document.body.querySelector("game-header")
        if(game_header)
            game_header.classList.toggle("blur", true);
        const game_table = document.body.querySelector("game-table")
        if(game_table)
            game_table.classList.toggle("blur", true);
        if (this.luanching === false) return;
        let RoundTime = 3;
        const LunchingGame = new LaunchingGame(RoundTime, this.round);
        document.body.appendChild(LunchingGame);
        const Lunching = setInterval(() => {
            RoundTime--;
            if (RoundTime < 0) {
                addEventListener("keydown", (event) => {
                    this.setMove(event, this.getKeys());
                });
                addEventListener("keyup", (event) => {
                    this.resetMove(event, this.getKeys());
                });
                const LunchingGame = document.body.querySelector("launching-game");
                if (LunchingGame) LunchingGame.remove();
                const game_header = document.body.querySelector("game-header")
                if(game_header) game_header.classList.toggle("blur", false);
                const game_table = document.body.querySelector("game-table")
                if(game_table) game_table.classList.toggle("blur", false);
                this.gameLoop(ctx);
                clearInterval(Lunching);
            } else LunchingGame.updateTimer(RoundTime, this.round);
        }, 1000);
    }

    setKeys(keyS, keyW, keyArrowUp, keyArrowDown) {
        this.conKeys = {
            keyS: keyS,
            keyW: keyW,
            keyArrowUp: keyArrowUp,
            keyArrowDown: keyArrowDown,
        };
    }
    getKeys() {
        return this.conKeys;
    }

    async RanderRackit(ctx, player) {
        ctx.fillStyle = player.color;
        ctx.fillRect(
            player.x,
            player.y,
            this.racquet.width,
            this.racquet.height
        );
    }
    async renderBall(ctx) {
        const coordonate = this.getCoordonates();
        ctx.fillStyle = this.ball_color;
        ctx.beginPath();
        ctx.arc(coordonate.x, coordonate.y, coordonate.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
    async resetGame() {
        if (this.requestID) cancelAnimationFrame(this.requestID);
        removeEventListener("keydown", (event) => {
            this.setMove(event, this.getKeys());
        });
        removeEventListener("keyup", (event) => {
            this.resetMove(event, this.getKeys());
        });
        this.setCoordonates(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 12, 10, 7);
        this.updatePlayerPosition(CANVAS_HEIGHT / 2);
        this.updateOpponentPosition(CANVAS_HEIGHT / 2);
        this.Loop_state = true;
        this.runder_call = true;
        await this.runder();
    }
    async gameLoop(ctx) {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        const player = this.getPlayerPosition();
        const opponent = this.getOpponentPosition();
        this.requestID = requestAnimationFrame(() => this.gameLoop(ctx));
        await this.movePlayer(this.getKeys(), player, opponent);
        await this.moveBall(player, opponent, ctx);
        await this.renderBall(ctx);
        await this.RanderRackit(ctx, player);
        await this.RanderRackit(ctx, opponent);
        if (this.Loop_state === false) await this.resetGame();
    }
    async runder() {

        const container = game_page.querySelector(".table_container");
        const canvas = this.querySelector("#table");
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
        const ctx = canvas.getContext("2d");
        await this.renderBall(ctx);
        await this.RanderRackit(ctx, this.getPlayerPosition());
        await this.RanderRackit(ctx, this.getOpponentPosition());
        await this.LuncheGame(ctx);
    }
    async RoundOver() {
        document.querySelector("game-header").updateScore(score);
    }
    
    async moveBall(player, opponent, ctx) {
        if (this.pause === true) return;
        if ( this.state === "offline" ) {
            let { x, y, radius, dx, dy } = this.getCoordonates();
            let stop = false;
            if (y + radius + dy >= CANVAS_HEIGHT || y - radius + dy <= 0) dy = -dy;
            if (x + radius + dx >= opponent.x && y >= opponent.y && y <= opponent.y + this.racquet.height)
                dx = -dx;
            else if (x + radius + dx >= CANVAS_WIDTH) {
                score.player++;
                stop = true;
            }
            if (x - radius + dx <= player.x + this.racquet.width && y >= player.y && y <= player.y + this.racquet.height)
                dx = -dx;
            else if (x - radius + dx <= 0)
            {
                score.opponent++;
                stop = true;
            }
            x += dx;
            y += dy;
            this.setCoordonates(x, y, radius, dx, dy);
            if (this.state === "offline") {
                if(stop === true){
                    if (this.round > 4) {
                        this.RoundOver(ctx);
                        this.loop_state = false;
                        this.luanching = false;
                        if (score.player > score.opponent) {
                            this.GameOver("win", score.player, score.opponent, opponentInfo.id, userInfo.username);
                        }
                        else {
                            this.GameOver("win", score.player, score.opponent, opponentInfo.id, opponentInfo.username);
                        }
                    }
                    else {
                        this.RoundOver(ctx);
                        this.round++;
                        this.roundStart({ round: this.round });
                    }
                }
            }
        }
    }

    setMove = (event, keys) => {
        let { keyW, keyS, keyArrowUp, keyArrowDown } = keys;
        if (event.key === "w" || event.key === "W") {
            keyW = true;
        }
        if (event.key === "s" || event.key === "S") {
            keyS = true;
        }
        if(this.state === "offline"){
            if(event.key === 'ArrowUp') { keyArrowUp = true };
            if(event.key === 'ArrowDown') { keyArrowDown = true };
        }
        this.setKeys(keyS, keyW, keyArrowUp, keyArrowDown);
    };
    resetMove = (event, keys) => {
        let { keyW, keyS, keyArrowUp, keyArrowDown } = keys;

        if (event.key === "w" || event.key === "W") {
            keyW = false;
        }
        if (event.key === "s" || event.key === "S") {
            keyS = false;
        }
        if(this.state === "offline") {

            if(event.key === 'ArrowUp') { keyArrowUp = false };
            if(event.key === 'ArrowDown') { keyArrowDown = false };
        }

        this.setKeys(keyS, keyW, keyArrowUp, keyArrowDown);
    };

    async movePlayer(keys, player,  opponent) {
        const { keyW, keyS, keyArrowUp, keyArrowDown } = keys;
        if (keyW === true) {
            this.moveUp(player);
        }
        if (keyS === true) {
            this.moveDown(player);
        }
        this.updatePlayerPosition(player.y);
        if(opponent === undefined) return;
        if(keyArrowUp === true) { this.moveUp(opponent) };
        if(keyArrowDown === true) { this.moveDown(opponent) };
        this.updateOpponentPosition(opponent.y);
    }

    moveDown(player) {
        let y = player.y;
        if (y + this.racquet.height <= CANVAS_HEIGHT) y += RACKET_SPEED;
        if (this.state === "offline") {
            player.y = y;
            return;
        }
        const message = {
            message: "move",
            y: y,
        };
        this.socket.send(JSON.stringify(message));
    }

    moveUp(player) {
        let y = player.y;
        if (y >= 0) y -= RACKET_SPEED;
        if (this.state === "offline") {
            player.y = y;
            return;
        }
        const message = {
            message: "move",
            y: y,
        };
        this.socket.send(JSON.stringify(message));
    }

    reset() {
        this.Loop_state = false;
        this.pause = false;
        this.luanching = false;
        this.runder_call = false;

        const Pause = document.body.querySelector("pause-page");
        const GameOver = document.body.querySelector("game-over");
        const Launching = document.body.querySelector("launching-game");
        const Waiting = document.body.querySelector("custom-spinner");
        if (Waiting) Waiting.remove();
        if (Launching) Launching.remove();
        if (GameOver) GameOver.remove();
        if (Pause) Pause.remove();
    }
    disconnectedCallback() {

        this.reset();
        if (this.state !== "offline") {
            this.socket.onclose = () => {
            };
            if (this.socket.readyState === 1)
                this.socket.close();
        }
        if(this.loop_state === true){
            score.player = 5;
            score.opponent = 0;
            this.GameOver("win", score.player, score.opponent, opponentInfo.id);
        }
        router.randred = false;
        router.handleRoute(window.location.pathname);
    }
}
