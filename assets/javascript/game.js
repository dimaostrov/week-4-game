let playerOne = [];
let enemy = []
class Rapper {
  constructor(name, hp, attack, counter, image) {
    this.name = name;
    this.hp = hp;
    this.attack = attack;
    this.counter = counter;
    this.attackTimes = 1;
    this.updatedAttack;
    this.isAttacking = false;
    this.image = image;
  }
  attack() {
    this.attackTimes++;
    this.updatedAttack = this.attack * this.attackTimes;
  }
}

let characterCard = (x) => {
    let characterTemplate = `<div class="col-sm-6 col-md-4 col-lg-3 mt-4">
                <div class="card border border-dark fighter">
                    <img class="card-img-top" src="assets/images/${x.image}">
                    <div class="card-block">
                        <h5 class="text-bold">${x.name}</h5>
                        <p class="card-text">${x.hp} HP</p>
                    </div>
                </div>
            </div>`;
    return characterTemplate;
  }

// have an array of all characters and their specs
let mfDoom = new Rapper("MF Doom", 100, 15, 15, "doom.jpg");
let bizzyBone = new Rapper("Bizzy Bone", 100, 15, 15, "bizzy.jpg");
let actionBronson = new Rapper("Action Bronson", 100, 15, 15, "action.jpg");
let projectPat = new Rapper("Project Pat", 100, 15, 15, "project_pat.jpg");

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
    $("#player-area").append(characterCard(playerOne[0]))
    $('#enemy-area').empty()
    $("#enemy-area").append(characterCard(enemy[0]))       
}

let movePlayer = (player, fromArray, toArray) => {
    const index = fromArray.filter((x, i) => { if(x.name == getPlayerName(player)) i});
    console.log(index)
    toArray.push(fromArray[index])
    fromArray.splice(index, 1);
}

let getPlayerName = (jqEl) => jqEl[0].innerText.trim().split('  ')[0].trim()

var test;
$('.fighter').click(function(){
    if(!gameState.mainCharacter){
        gameState.mainCharacter = true;
        // make function that will take element out of fighters array and append it to the player array.
        test = $(this);
        movePlayer($(this), fighters, playerOne)
        updateDom()
        $('#message-area').html(`<h2>Now pick your enemy</h2>`);
    } else if (!gameState.enemy) {
        gameState.enemy = true;
        //movePlayer(getPlayerName($(this)), fighters, playerOne)
        updateDom()
        // $('#enemy').append($(this).append('<button class="btn" id="attack">attack</button>')); dont forget to add an attack button to the enemy
        $('#message-area').html(`<h2>Get ready to attack the enemy</h2>`);
    }
})

$('#attack').click(function(){

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

/*

for(var i = 1; i<101;i++){
    if(i % 15 == 0){
        console.log('FizzBuzz')
    } else if (i % 3 == 0){
        console.log('Fizz') 
    } else if (i % 5 == 0) {
        console.log('Buzz')
    } else {
        console.log(i)
    }
}

*/