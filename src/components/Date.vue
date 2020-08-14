<template>
  <div :class="[{picked: isPicked}, dateContainer]" @click="pickDate">
    <div class="center">{{day}}</div>
    <div class="icon-container">
      <img class="star center" v-if="success == 'true'" src="../assets/icon-star.png" />
      <img class="icon center" v-if="success == 'false'" src="../assets/icon-fail.png" />
      <div class="empty center" v-else-if="success == 'yet'"></div>
      <img class="icon center" v-else src="../assets/icon-success.png" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["success", "day", "date"],
  data() {
    return {
      picked: "picked",
      dateContainer: "date-container"
    };
  },
  computed: {
    pickedDate() {
      return this.$store.state.pickedDate;
    },
    isPicked() {
      return this.pickedDate == this.date;
    }
  },
  methods: {
    pickDate() {
      if (this.success != "yet") {
        this.$store.dispatch("pickDate", this.date);
      }
    }
  }
};
</script>

<style scoped>
.center {
  display: block;
  margin-right: auto;
  margin-left: auto;
}

.picked {
  background: rgba(196, 196, 196, 0.4);
  border-radius: 6px;
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

.date-container {
  display: inline-block;
  width: 40px;
  margin-right: 10px;
  text-align: center;
}

.icon-container {
  position: relative;
  height: 55px;
}
</style>