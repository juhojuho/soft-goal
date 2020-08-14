import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
//import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
    stepCount: {},
    goalInfo: {},
    pickedDate: 0,
    pickedWeek: 0,
    evaluation: {},
    pickedDateInfo: {},
    pickedDateMeta: {},
    margins: {}
  },
  mutations: {
    setuserInfo(state, val) {
      state.userInfo = val
    },
    setStepCount(state, val) {
      if (val.date) {
        state.stepCount[val.date] = val.count
      }
    },
    setGoalInfo(state, val) {
      state.goalInfo = val
    },
    setPickedDate(state, val) {
      state.pickedDate = val;
    },
    setPickedWeek(state, val) {
      state.pickedWeek = val;
    },
    setEvaluation(state, val) {
      state.evaluation = val;
    },
    setPickedDateInfo(state, val) {
      state.pickedDateInfo = val;
    },
    setPickedDateMeta(state, val) {
      state.pickedDateMeta = val;
    },
    setMargins(state, val) {
      state.margins = val;
    }
  },
  actions: {
    async fetchUserInfo({ commit }, uid) {
      console.log(uid)
      fb.userInfoCollection.where('uid', '==', uid).get().then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          commit('setuserInfo', doc.data())
        })
      })
    },
    async fetchStepCount({ commit }, uid) {
      fb.stepsCollection.where('uid', '==', uid).get().then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          commit('setStepCount', doc.data())
        })
      })
    },
    async fetchGoalInfo({ dispatch, commit }, uid) {
      fb.goalInfoCollection.where('uid', '==', uid).get().then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          commit('setGoalInfo', doc.data());
          fb.marginCollection.get().then((_querySnapshot) => {
            const temp = {}
            _querySnapshot.forEach(function (_doc) {
              temp[_doc.id] = _doc.data()
            });
            console.log(temp)
            commit('setMargins', temp)
            dispatch('evaluateGoals', { pickedWeek: doc.data().goal.length, isFirstTime: 1 })
          })
        })
      })
    },
    async evaluateGoals({ commit, state }, { pickedWeek, isFirstTime }) {
      if (pickedWeek <= state.goalInfo.goal.length) {
        commit('setPickedDateInfo', {});
        commit('setPickedDate', 0);
        const goal = state.goalInfo.goal[pickedWeek - 1]
        const startingDate = state.goalInfo["starting-date"][pickedWeek - 1];
        const thisWeekDate = new Date(2000 + parseInt(startingDate / 10000), (parseInt(startingDate / 100) % 100) - 1, startingDate % 100)
        let last = 0;
        const evaluation = {};
        const meta = {};
        for (let i = 0; i < 7; i++) {
          const nextDate = new Date(thisWeekDate.getTime() + i * 24 * 60 * 60 * 1000)
          const iDate = (nextDate.getFullYear() % 100) * 10000 + (nextDate.getMonth() + 1) * 100 + nextDate.getDate();
          let margin = 0;
          if (state.userInfo.type == '1') {
            console.log(state.margins)
            margin = state.margins.constant.value;
          }
          else if (state.userInfo.type == '2') {
            margin = state.margins.random[iDate];
          }
          const subGoal = goal * (100 - margin) / 100;
          meta[iDate] = {
            month: nextDate.getMonth() + 1,
            date: nextDate.getDate(),
            day: nextDate.getDay()
          }
          if (state.stepCount[iDate]) {
            const step = state.stepCount[iDate];
            if (step >= goal) {
              evaluation[iDate] = 'true';
            } else if (step >= subGoal) {
              evaluation[iDate] = 'half';
            } else {
              evaluation[iDate] = 'false';
            }
            last = iDate;
          } else {
            evaluation[iDate] = 'yet';
          }
        }
        console.log(meta)
        commit('setPickedWeek', pickedWeek)
        commit('setEvaluation', evaluation);
        commit('setPickedDateMeta', meta);
        console.log(isFirstTime)
        if (isFirstTime) {
          console.log('hi')
          this.dispatch('pickDate', last);
        }
      }
    },
    async pickDate({ commit, state }, pickedDate) {
      const goal = state.goalInfo.goal[state.pickedWeek - 1]
      let margin = 0;
      if (state.userInfo.type == '1') {
        margin = state.margins.constant.value;
      }
      else if (state.userInfo.type == '2') {
        margin = state.margins.random[pickedDate];
      }
      const subGoal = goal * (100 - margin) / 100;
      const step = state.stepCount[pickedDate];
      let evaluation = '';
      if (step >= goal) {
        evaluation = 'true';
      } else if (step >= subGoal) {
        evaluation = 'half';
      } else {
        evaluation = 'false';
      }
      console.log(goal, margin, subGoal, step, evaluation)
      commit('setPickedDateInfo', { goal, margin, subGoal, step, evaluation });
      commit('setPickedDate', pickedDate);
    }
  },
  modules: {
  }
})
