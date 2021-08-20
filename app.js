const app = Vue.createApp({
  data() {
    return {
      playerHP: 100,
      monsterHP: 100,
      specialAttackCountdown: 7,
      healCountdown: 10,
      gameFinished: false,
      battleLog: []
    }
  },
  watch: {
    specialAttackCountdown(countdown) {
      if(countdown === 0){
        return false;
      }else{
        return true;
      }
    },
    healCountdown(countdown) {
      if(countdown === 0){
        return false;
      }else{
        return true;
      }
    },
    playerHP(){
      if(this.playerHP === 0){
        this.gameFinished = true;
      }
    },
    monsterHP(){
      if(this.monsterHP === 0){
        this.gameFinished = true;
      }
    }
  },
  computed: {
    playerHPBarWidth(){
      return { width: this.playerHP+'%'};
    },
    monsterHPBarWidth(){
      return { width: this.monsterHP+'%'};
    },
    logPlayerColor(){
      return { log__player: true };
    },
    logMonsterColor(){
      return { log__monster: true };
    },
    logDamageColor(){
      return { log__damage: true };
    },
    logHealColor(){
      return { log__heal: true };
    }
  },
  methods: {
    playerDamage(playerAttackMultiplier) {
      const playerDamage = Math.ceil(Math.random()*playerAttackMultiplier);
      this.monsterHP = playerDamage >= this.monsterHP ? 0 : this.monsterHP - playerDamage;
      this.battleLog.push({
        actor: 'Player', 
        actorClass: this.logPlayerColor,
        actionValue: playerDamage, 
        actionClass: this.logDamageColor,
        actionType: 'damage'
      });
    },
    monsterDamage() {
      const monsterDamage = Math.ceil(Math.random()*10);
      this.playerHP = monsterDamage >= this.playerHP ? 0 : this.playerHP - monsterDamage;
      this.battleLog.push({
        actor: 'Monster',
        actorClass: this.logMonsterColor,
        actionValue: monsterDamage,
        actionClass: this.logDamageColor,
        actionType: 'damage'
      })
    },
    playerAttack() {
      if(this.specialAttackCountdown !== 0) this.specialAttackCountdown--;
      if(this.healCountdown !== 0) this.healCountdown--;

      this.playerDamage(10);
      this.monsterDamage();
    },
    playerSpecialAttack(){
      this.specialAttackCountdown = 7;
      this.playerDamage(25);
      this.monsterDamage();
    },
    playerHeal() {
      this.healCountdown = 10;
      const amountHealed = Math.ceil(Math.random() * 15);
      this.playerHP += amountHealed;

      this.battleLog.push({
        actor: 'Player',
        actorClass: this.logPlayerColor,
        actionValue: amountHealed,
        actionClass: this.logHealColor,
        actionType: 'heal'
      })

      this.monsterDamage();
    },
    playerSurrender(){
      this.playerHP = 0;
      this.gameFinished = true;
    },
    resetGame(){
      this.gameFinished = false;
      this.specialAttackCountdown = 7;
      this.healCountdown = 10;
      this.playerHP = 100;
      this.monsterHP = 100;
      this.battleLog = []
    }
  }
});

app.mount('#game');
