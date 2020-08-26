<template>
  <div>
    <div v-if="!isReported">
      <div class="notice">어제 {{ today.month }}월 {{ today.day }}일 걸음수를 입력해주세요.</div>
      <input type="number" min="0" v-on:input="count=$event.target.value" />
      <div class="error">{{ error }}</div>
      <button @click="uploadStepCount" class="button">확인</button>
    </div>
    <div v-else>
      <div>
        <div class="div-container-80">
          <div v-if="pickedDateInfo.evaluation !== 'false'" class="notice">
            {{ today.month }}월 {{ today.day }}일 미션
            <b>성공</b>
          </div>
          <div v-else class="notice">
            {{ today.month }}월 {{ today.day }}일 미션
            <b>실패</b>
          </div>
        </div>
        <div class="div-container-20">
          <div class="icon-container">
            <img
              class="star center"
              v-if="pickedDateInfo.evaluation == 'true'"
              src="../assets/icon-star.png"
            />
            <img
              class="icon center"
              v-if="pickedDateInfo.evaluation == 'false'"
              src="../assets/icon-fail.png"
            />
            <div class="empty center" v-else-if="pickedDateInfo.evaluation == 'yet'"></div>
            <img class="icon center" v-else src="../assets/icon-success.png" />
          </div>
        </div>
      </div>
      <div style="height: 300px;">
        <div class="div-container-20" style="float: left;">
          <img class="coach-image" src="../assets/coach.jpeg" />
        </div>
        <div class="div-container-80" style="float: right;">
          <div class="message-box">
            <template v-if="pickedDateInfo.evaluation == 'true'">
              <div class="message-text">미션 성공입니다.</div>
              <div class="message-text">오늘도 목표를 향해</div>
              <div class="message-text">힘차게 걸어보세요.</div>
            </template>
            <template v-if="pickedDateInfo.evaluation == 'half'">
              <div class="message-text">미션 성공입니다.</div>
              <div class="message-text">오늘은 좀 더 힘내보세요.</div>
              <div
                class="message-text"
              >{{ addComma(pickedDateInfo.goal - pickedDateInfo.step) }}걸음만 더 걸으면</div>
              <div class="message-text">목표에 도달할 수 있어요.</div>
            </template>
            <template v-if="pickedDateInfo.evaluation == 'false'">
              <div class="message-text">미션 실패입니다.</div>
              <div class="message-text">오늘은 목표 걸음수에</div>
              <div class="message-text">더 열심히 도전해보세요.</div>
            </template>
          </div>
          <div class="message-box">
            <div
              class="message-text"
            >{{ today.month }}월 {{ today.day }}일 {{ $store.state.userInfo.name }}님의 결과</div>
            <div
              class="message-text"
            >{{ addComma(pickedDateInfo.step) }} / {{ addComma(pickedDateInfo.goal) }} 걸음 ({{ addComma(Math.floor(pickedDateInfo.step / pickedDateInfo.goal * 100)) }}%)</div>
            <div
              class="message-text" v-if="$store.state.userInfo.type != '0'"
            >어제의 여유분: {{ addComma(pickedDateInfo.margin * pickedDateInfo.goal / 100) }} 걸음</div>
          </div>
        </div>
      </div>
      <router-link :to="'/user/' + this.$route.params.uid">대시보드로 이동</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      today: "",
      count: 0,
      iDate: "",
      error: "",
    };
  },
  created() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate() - 1;
    this.today = { year, month, day };
    this.iDate =
      (this.today.year % 100) * 10000 + this.today.month * 100 + this.today.day;
    console.log(this.iDate);
  },
  computed: {
    stepCount() {
      return this.$store.state.stepCount;
    },
    isReported() {
      return this.stepCount[this.iDate];
    },
    pickedDateInfo() {
      return this.$store.state.pickedDateInfo;
    },
  },
  methods: {
    uploadStepCount() {
      if (this.count >= 0) {
        this.$store.dispatch("uploadStepCount", {
          uid: this.$route.params.uid,
          count: this.count,
          yesterday: this.today,
        });
        // this.$router.push({ path: `/user/${this.$route.params.uid}` });
      } else {
        this.error = "올바른 걸음수를 입력해주세요.";
      }
    },
    addComma(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>
<style scoped>
.notice {
  margin-top: 25px;
  margin-left: 10px;
  font-size: 1.3em;
  text-align: left;
  margin-bottom: 20px;
}
input {
  width: 50%;
  font-size: 40px;
  background-color: transparent;
  outline: none;
  border: none;
  border-bottom: 1px solid black;
}

.button {
  display: block;
  margin: auto;
  margin-top: 40px;
  text-align: center;
  border-radius: 20px;
  border: 2px solid #6767eb;
  color: #6767eb;
  padding: 8px 25px;
  font-size: 1.2em;
  font-weight: bold;
  background-color: transparent;
}

.error {
  font-size: 1.3em;
  color: red;
}

.div-container-20 {
  display: inline-block;
  width: 19%;
  height: 100%;
}

.div-container-80 {
  display: inline-block;
  width: 79%;
  height: 100%;
}

.coach-image {
  border-radius: 50%;
  width: 90%;
}

.message-box {
  background-color: white;
  border: 2px solid grey;
  text-align: left;
  padding: 20px 15px 20px 15px;
  border-radius: 10px;
  margin-bottom: 15px;
}

.center {
  display: block;
  margin-right: auto;
  margin-left: auto;
}

.icon {
  position: absolute;
  bottom: 0px;
  width: 40px;
  left: 50%;
  margin-left: -20px;
}

.star {
  position: absolute;
  width: 20px;
  top: 0px;
  left: 50%;
  margin-left: -10px;
}

.empty {
  border: 2px solid grey;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  position: absolute;
  bottom: 2px;
  left: 50%;
  margin-left: -15px;
}

.icon-container {
  position: relative;
  height: 55px;
  margin-right: -20px;
  margin-bottom: -3px;
}
</style>
