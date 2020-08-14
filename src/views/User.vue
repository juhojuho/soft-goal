<template>
  <div>
    <div class="name">안녕하세요, {{ $store.state.userInfo.name }}님</div>
    <div class="week-container">
      <img @click="moveToPreviousWeek" class="arrow arrow-rotate" src="../assets/icon-arrow.png" />
      {{weeks[pickedWeek-1]}} WEEK
      <img
        @click="moveToNextWeek"
        class="arrow"
        src="../assets/icon-arrow.png"
      />
    </div>
    <Date v-for="(e, key, i) in evaluation" :key="key" :date="key" :success="e" :day="days[i]"></Date>
    <div v-if="pickedDate">
      <Graph style="margin-top: 30px"></Graph>
      <div class="info-container">
        <div>{{pickedDateMeta[pickedDate].month}}월 {{pickedDateMeta[pickedDate].date}}일 {{daysKR[pickedDateMeta[pickedDate].day]}}요일 {{ $store.state.userInfo.name }}님의 결과</div>
        <div><b>목표 {{ addComma(pickedDateInfo.goal) }} 걸음 중 {{ addComma(pickedDateInfo.step) }} 걸음 달성</b></div>
        <div v-if="userInfo.type != '0'">(여유분 {{ addComma(pickedDateInfo.goal - pickedDateInfo.subGoal) }} 걸음)</div>
        <br>
        <div v-if="pickedDateInfo.evaluation == 'half'">코치의 미션에 성공했습니다.</div>
        <div v-else-if="pickedDateInfo.evaluation == 'true'">코치의 미션에 성공했습니다.</div>
        <div v-else>코치의 미션에 실패했습니다.</div>
      </div>
    </div>
  </div>
</template>

<script>
import Date from "@/components/Date.vue";
import Graph from "@/components/Graph.vue";

export default {
  data() {
    return {
      days: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
      daysKR: ["일", "월", "화", "수", "목", "금", "토", "일"],
      weeks: [
        "1ST",
        "2ND",
        "3RD",
        "4TH",
        "5TH",
        "6TH",
        "7TH",
        "8TH",
        "9TH",
        "10TH"
      ]
    };
  },
  components: {
    Date,
    Graph
  },
  computed: {
    evaluation() {
      return this.$store.state.evaluation;
    },
    pickedWeek() {
      return this.$store.state.pickedWeek;
    },
    pickedDate() {
      return this.$store.state.pickedDate;
    },
    pickedDateMeta() {
      return this.$store.state.pickedDateMeta;
    },
    pickedDateInfo() {
      return this.$store.state.pickedDateInfo;
    },
    userInfo() {
        return this.$store.state.userInfo;
    }
  },
  methods: {
    moveToPreviousWeek() {
      if (this.pickedWeek != 1) {
        this.$store.dispatch("evaluateGoals", {pickedWeek: this.pickedWeek - 1, isFirstTime: 0});
      }
    },
    moveToNextWeek() {
      this.$store.dispatch("evaluateGoals", {pickedWeek: this.pickedWeek + 1, isFirstTime: 0});
    },
    addComma(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
};
</script>

<style scoped>
.name {
  margin-top: 20px;
  margin-left: 10px;
  font-size: 2em;
  text-align: left;
}

.arrow {
  width: 16px;
}

.arrow-rotate {
  transform: rotate(180deg);
}

.week-container {
  margin-top: 40px;
  font-size: 1.5em;
  margin-bottom: 40px;
}

.info-container {
    margin-top: -100px;
    font-size: 1.2em;
}
</style>