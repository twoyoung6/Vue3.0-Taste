import { createStore } from 'vuex'

// 创建 vuex 实例
export default createStore({
  state: {
    name: '牛逼, 你拿到我了',
    age: 24,
    a: '白',
    b: '黑'
  },
  mutations: {
    updateName(state, n) {
      state.name += n
    }
  },
  actions: {
    deferName(store) {
      setTimeout(() => {
        // 必须只有commit可以修改值, 这个设定我比较反对, 可以讨论
        // vuex本身结构就很拖沓, 定义域使用个人都不喜欢
        store.state.name = '牛逼, 你改回来了'
      }, 1000)
    }
  },
  getters: {
    fullName(state) { return `${state.a} - + -${state.b}` }
  },
  modules: {
  }
});
