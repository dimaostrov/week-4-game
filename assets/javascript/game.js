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

let charactedCard = (x) => {
    let characterTemplate = `<div class="card" style="width: 18rem;">
        <img class="card-img-top" src="assets/images/${x.image}" alt="fighter info">
        <div class="card-body">
        <h5 class="card-title">${x.name}</h5>
        <p class="card-text">${x.hp} HP</p>
        <a href="#" class="btn btn-primary">Attack</a>
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

fighters.map(x => $("#game").append(charactedCard(x)));

//make an options object that will control global sound on/off and background change

//make logic to play game
//start with character selection
// then allow enemy selection and carry out attacks as well checks to see if either party hp goes down to 0
// make state object

let gameState = {
    mainCharacter: false,
    enemy: false,
    soundEffects: true,
    
}