import { createStore } from 'vuex'

// 创建 vuex 实例
export default createStore({
  state: {
    name: '🐮🐽, 你拿到我了',
    age: 24,
    a: '白',
    b: '黑'
  },
  mutations: {
    updateName(state, n) {
      state.name += n
    },
  },
  // 异步 状态变更函数
  actions: {
    deferName(store) {
      setTimeout(() => {
        store.state.name = '🐮🐽，你改回来了。'
      }, 1000)
    }
  },
  // 静态状态
  getters: {
    fullName(state) { return `${state.a} - + -${state.b}` }
  },
  modules: {
  }
});
