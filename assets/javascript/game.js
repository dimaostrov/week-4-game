// contstruct a player class
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
                <div class="card">
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

fighters.map(x => $("#game").append(characterCard(x)));

//make an options object that will control global sound on/off and background change

//make logic to play game
//start with character selection
// then allow enemy selection and carry out attacks as well checks to see if either party hp goes down to 0
// make state object

$('.card').click(function(){
    if(!gameState.mainCharacter){
        gameState.mainCharacter = true;
        $("#fight-area").append($(this));
    }
})

let gameState = {
    mainCharacter: false,
    enemy: false,
    soundEffects: true,
    resetGame: () => {
        gameState.mainCharacter = false;
    }
}