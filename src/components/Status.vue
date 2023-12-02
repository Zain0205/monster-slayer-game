<script>
  function randomNumber(min, max){
    return Math.floor(Math.random() * (max - min) + min)
  }

  export default {
    data(){
      return {
        playerHealth: 100,
        monsterHealth: 100,
        round: 0,
        winner: null,
        surender: false,
        logMessage: [],
      }
    },
    watch: {
      playerHealth(value){
        if (value <= 0 && this.monsterHealth <= 0 ){
          this.winner = "Draw"
        } else if (value <= 0){
          this.winner = "Monster"
        }
      },
      monsterHealth(value){
        if (value <= 0 && this.playerHealth <= 0){
          this.winner = "Draw"
        } else if (value <= 0) {
          this.winner = "Player"
        }
      }
    },
    computed: {
      monsterBar(){
        if (this.monsterHealth < 0){
          return { width: "0%" }
        } else if (this.monsterHealth < 50 && this.monsterHealth > 25){
          return { width: this.monsterHealth + "%", backgroundColor: "#E1C514" }
        } else if (this.monsterHealth < 25){
          return { width: this.monsterHealth + "%", backgroundColor: "#D60505" }
        } else {
          return { width: this.monsterHealth + "%" }
        }
      },
      playerBar(){
        if (this.playerHealth < 0){
          return { width: "0%" }
        } else if (this.playerHealth < 50 && this.playerHealth > 25){
          return { width: this.playerHealth + "%", backgroundColor: "#E1C514" }
        } else if (this.playerHealth < 25){
          return { width: this.playerHealth + "%", backgroundColor: "#D60505" }
        } else {
          return { width: this.playerHealth + "%" }
        }
      },
      useSpecialAtt(){
        return this.round % 3 !== 1
      },
      useHeal(){
        return this.round % 3 !== 0
      }
    },
    methods: {
      startGame(){
        this.monsterHealth = 100;
        this.playerHealth = 100;
        this.round = 0;
        this.winner = null;
        this.surender = false;
        this.logMessage = [];
      },
      playerAtt(){
        this.round++
        const rNum = randomNumber(5, 12)
        this.monsterHealth -= rNum
        this.addLog('Player', 'Attack', rNum)
        this.monsterAtt()
      },
      monsterAtt(){
        const rNum = randomNumber(8, 16)
        this.playerHealth -= rNum
        this.addLog('Monster', 'Attack', rNum)
      },
      specialAtt(){
        this.round++
        const rNum = randomNumber(10, 25)
        this.monsterHealth -= rNum
        this.addLog('Player', 'Special Attack', rNum)
        this.monsterAtt()
      },
      playerHeal(){
        this.round++
        const heal = randomNumber(10, 20)
        if (this.playerHealth + heal > 100){
          this.playerHealth = 100
        } else {
          this.playerHealth += heal
        }

        this.addLog('player', 'heal', heal)

        this.monsterAtt()
      },
      surenderBtn(){
        this.winner = "Monster"
        this.surender = !this.surender
      },
      addLog(who, what, value){
        this.logMessage.unshift({
          action: who,
          type: what,
          value: value
        })
      }
    },
  }
</script>

<template>
  <section id="monster" class="container">
    <h2>Monster Health</h2>
    <div class="health-bar">
      <div class="health-value" :style="monsterBar"></div>
    </div>
  </section>

  <section id="player" class="container">
    <h2>Player Health</h2>
    <div class="health-bar">
      <div class="health-value" :style="playerBar"></div>
    </div>
  </section>

  <section class="container" v-if="winner">
    <h2>Game Over</h2>
    <h2 v-if="surender === true ">You Surender</h2>
    <h2 v-if="winner === 'Draw' ">Draw</h2>
    <h2 v-else-if="winner === 'Player' ">Player Win</h2>
    <h2 v-else>Monster Win</h2>
    <button @click="startGame">Start New Game</button>
  </section>

  <section id="control" v-else>
    <button @click="playerAtt">Attack</button>
    <button @click="specialAtt" :disabled="useSpecialAtt">Special Attack</button>
    <button @click="playerHeal" :disabled="useHeal">Heal</button>
    <button @click="surenderBtn">Surender</button>
  </section>

  <section class="container" id="log">
    <h2>Battle Log</h2>
    
    <p v-for="log in logMessage" > {{ log.action }} - {{ log.type }} {{ log.value }} </p>
  </section>
</template>

<style>
section {
  width: 90%;
  max-width: 40rem;
  margin: 1rem auto;
}

.container {
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 12px;
  padding: 0.5rem;
}

.health-bar {
  width: 100%;
  height: 45px;
  background-color: #fde5e5;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.health-value {
  width: 100%;
  height: 100%;
  background-color: #00a876;
}

#monster h2,
#player h2 {
  margin: 0.25rem;
}

#control {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

button {
  font: inherit;
  border: 1px solid #395886;
  background-color: #395886;
  color: white;
  cursor: pointer;
  padding: 1rem 2rem;
  margin: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 12px;
  width: 12rem;
}

button:disabled {
  background-color: #ccc;
  border-color: #ccc;
  box-shadow: none;
  color: #3f3f3f;
  cursor: not-allowed;
}
</style>
