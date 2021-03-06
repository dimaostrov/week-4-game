let playerOne = [];
let enemy = []
class Rapper {
    constructor(name, hp, attack, counter, image) {
        this.name = name;
        this.hp = hp;
        this.attack = attack;
        this.counter = counter;
        this.attackTimes = 1;
        this.updatedAttack = attack;
        this.isAttacking = false;
        this.image = image;
    }
    attackAdd() {
        this.attackTimes++;
        this.updatedAttack = this.attack * this.attackTimes;
    }
}

let characterCard = (x, attack, playerOne) => {
    let attackBtn = '<button class="btn btn-danger" id="attack">Attack</button>'
    let characterTemplate = `<div class="col-sm-6 col-md-4 col-lg-3 mt-4">
                <div class="card border border-dark ${!playerOne? 'fighter': ''}">
                    <img class="card-img-top" src="assets/images/${x.image}">
                    <div class="card-block">
                        <h5 class="text-bold">${x.name}</h5>
                        <p class="card-text">${x.hp} HP ${attack ? attackBtn : '' }</p>
                    </div>
                </div>
            </div>`;
    return characterTemplate;
}



// have an array of all characters and their specs
let mfDoom = new Rapper("MF Doom", 200, 15, 20, "doom.jpg");
let bizzyBone = new Rapper("Bizzy Bone", 100, 35, 35, "bizzy.jpg");
let actionBronson = new Rapper("Action Bronson", 220, 13, 25, "action.jpg");
let projectPat = new Rapper("Project Pat", 210, 26, 50, "project_pat.jpg");

let fighters = [mfDoom, bizzyBone, actionBronson, projectPat];

fighters.map(x => $("#fighter-area").append(characterCard(x)));


//make an options object that will control global sound on/off and background change

let updateDom = () => {
    // make it traverse through fighters, plOne, enemy arrays
    // and render it to their respective dom elements
    // before rendering them empty the dom nodes so when it gets re-rendered it will have updated info.
    $('#fighter-area').empty()
    //fighters.map(x => console.log(x))
    fighters.map(x => $("#fighter-area").append(characterCard(x)));
    $('#player-area').empty()
    $("#player-area").append(characterCard(playerOne[0], false, true))
    if (enemy != undefined && enemy.length != 0) {
        $('#enemy-area').empty()
        $("#enemy-area").append(characterCard(enemy[0], true))
    }
}

let movePlayer = (player, fromArray, toArray) => {
    let index = fromArray.map((x, i) => {
        if (x.name == getPlayerName(player)) return i
    })
    index = index.filter(x => Number.isInteger(x))
    index = index[0]
    toArray.push(fromArray[index])
    fromArray.splice(index, 1);
}

let getPlayerName = (jqEl) => jqEl[0].innerText.trim().split('\n')[0]




$(document).on('click', '.fighter', function () {
    if (!gameState.mainCharacter) {
        gameState.mainCharacter = true;
        // make function that will take element out of fighters array and append it to the player array.
        movePlayer($(this), fighters, playerOne)
        updateDom()
        $('#message-area').html(`<h2>Now pick your enemy</h2>`);
    } else if (!gameState.enemy && gameState.mainCharacter) {
        gameState.enemy = true;
        movePlayer($(this), fighters, enemy)
        updateDom()
        // $('#enemy').append($(this).append('<button class="btn" id="attack">attack</button>')); dont forget to add an attack button to the enemy
        $('#message-area').html(`<h2>Get ready to attack the enemy</h2>`);
    }
})

let isDead = () => {
    if (enemy[0].hp <= 0) {
        let enemyName = enemy.pop().name
        updateDom()
        $('#message-area').html(`<h2>You've killed ${enemyName}. Pick another enemy</h2>`)
        gameState.wins++
            if (gameState.wins == 3) {
                $('#message-area').html(`<h2>You've won the game. </h2><button class="btn btn-info" id="restart">Restart</button>`)
            }
        gameState.enemy = false;
    } else if (playerOne[0].hp <= 0) {
        $('#message-area').html(`<h2>You died</h2><h2>Game Over</h2><button class="btn btn-info" id="restart">Restart</button>`)
    }
}

$(document).on('click', '#attack', function () {
    enemy[0].hp -= playerOne[0].updatedAttack
    updateDom()
    $('#message-area').html(`<h2>You've dealt ${playerOne[0].updatedAttack} damage</h2>`);
    playerOne[0].attackAdd()
    // check if enemy is dead otherwise
    isDead()
    playerOne[0].hp -= enemy[0].counter
    updateDom()
    isDead()
    $('#message-area').append(`<h2>Enemy dealt ${enemy[0].counter} damage</h2>`);
})

$(document).on('click', '#restart', function () {
    location.reload()
})

let gameState = {
    mainCharacter: false,
    enemy: false,
    soundEffects: true,
    wins: 0,
    resetGame: () => {
        gameState.mainCharacter = false;
    },
    enemyDefeat: () => {
        gameState.enemy = false;
        gameState.wins++ > 2 ? gameState.winGame : gameState.wins;
    },
    winGame: () => {
        $("#message-area").html('<h2>You have won</h2>')
    }
}

if(!gameState.mainCharacter) $('#message-area').html(`<h2>Choose your player</h2>`) 