// contstruct a player class
class Fighter {
    constructor(hp, attack, counter) {
        this.hp = hp;
        this.attack = attack;
        this.counter = counter;
        this.attackTimes = 1;
        this.updatedAttack;
        this.isAttacking = false;
    }
    attack(){
        this.attackTimes++;
        this.updatedAttack = this.attack * this.attackTimes;
    }
};


// have an array of all characters and their specs

//make an options object that will control global sound on/off and background change

//