<template>
  <div>
    <div v-if="!isReported">
      <div class="notice">어제 {{ today.month }}월 {{ today.day }}일 걸음수를 입력해주세요.</div>
      <input type="number" min="0" v-on:input="count=$event.target.value" />
      <div class="error">{{ error }}</div>
      <button @click="uploadStepCount" class="button">확인</button>
    </div>
    <div v-else>
      <div class="notice">이미 어제 {{ today.month }}월 {{ today.day }}일 걸음수를 보고했습니다.</div>
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
      error: ""
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
    }
  },
  methods: {
    uploadStepCount() {
      if (this.count >= 0) {
        this.$store.dispatch("uploadStepCount", {
          uid: this.$route.params.uid,
          count: this.count,
          yesterday: this.today
        });
        this.$router.push({ path: `/user/${this.$route.params.uid}` });
      } else {
          this.error = "올바른 걸음수를 입력해주세요."
      }
    }
  }
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
</style>
