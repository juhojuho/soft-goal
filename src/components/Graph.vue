<template>
  <div class="graph-wrapper">
    <svg class="graph-meter">
      <circle
        r="150"
        cx="50%"
        cy="50%"
        stroke="#FFD8A7"
        stroke-width="30"
        fill="none"
        stroke-dasharray="471 943"
      />
      <circle
        v-if="userInfo.type != '0'"
        r="150"
        cx="50%"
        cy="50%"
        stroke="#F9EDE3"
        stroke-width="30"
        :stroke-dasharray="pickedDateInfo.margin*471/100 + ' 943'"
        fill="none"
      />
      <circle
        r="150"
        cx="50%"
        cy="50%"
        :stroke="pickedDateInfo.evaluation != 'false' ? blue : red"
        stroke-width="15"
        stroke-dasharray="471 943"
        fill="none"
      />
      <circle
        v-if="pickedDateInfo.evaluation == 'false'"
        r="150"
        cx="50%"
        cy="50%"
        stroke="#FFD8A7"
        stroke-width="30"
        :stroke-dasharray="471*(pickedDateInfo.goal - pickedDateInfo.step)/pickedDateInfo.goal + ' 943'"
        fill="none"
      />
      <circle
        v-if="pickedDateInfo.evaluation == 'half' && userInfo.type != '0'"
        r="150"
        cx="50%"
        cy="50%"
        stroke="#F9EDE3"
        stroke-width="30"
        :stroke-dasharray="471*(pickedDateInfo.goal - pickedDateInfo.step)/pickedDateInfo.goal + ' 943'"
        fill="none"
      />
      <circle
        v-else-if="pickedDateInfo.evaluation == 'false' && userInfo.type != '0'"
        r="150"
        cx="50%"
        cy="50%"
        stroke="#F9EDE3"
        stroke-width="30"
        :stroke-dasharray="pickedDateInfo.margin*471/100 + ' 943'"
        fill="none"
      />
    </svg>
    <div class="graph-figure">
      <div class="graph-step">{{ addComma(pickedDateInfo.step) }}</div>
      <div class="graph-remainder">
        {{Math.floor(pickedDateInfo.step / pickedDateInfo.goal * 100)}}%
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arrowUp: "arrow-up",
      arrowDown: "arrow-down",
      arrow: "arrow",
      red: "#F44336",
      blue: "#4CAF50"
    };
  },
  computed: {
    pickedDateInfo() {
      return this.$store.state.pickedDateInfo;
    },
    userInfo() {
        return this.$store.state.userInfo;
    }
  },
  methods: {
    convertKth(num) {
      return parseInt(num / 100) / 10;
    },
    addComma(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
};
</script>
<style scoped>
.graph-wrapper {
  width: 350px;
  height: 350px;
  position: relative;
  text-align: cneter;
}

.graph-meter {
  position: absolute;
  left: 50%;
  margin-left: -150px;
  display: block;
  width: 100%;
  height: 100%;
  transform: rotateX(180deg);
}

.graph-figure {
  position: absolute;
  width: 200px;
  bottom: 170px;
  left: 50%;
  margin-left: -75px;
}

.graph-step {
  width: 200px;
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 2px;
}

.graph-remainder {
  display: inline-block;
  width: 200px;
  font-size: 1.5em;
  margin-top: -10px;
}

.arrow {
  width: 16px;
}

.arrow-up {
  transform: rotate(270deg);
}

.arrow-down {
  transform: rotate(90deg);
}
</style>