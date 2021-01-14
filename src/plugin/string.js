// 开发插件并不一定要挂载到vue的原型上
// 导致vue原型臃肿, 命名冲突等等(比如两个ui都叫 message)
// 原理就是 provide 和 inject, 依赖注入.

import { provide, inject } from 'vue';

// 这里使用symbol就不会造成变量名的冲突了, 这个命名权交给用户才是真正合理的架构设计
const StoreSymbol = Symbol()

// 注入全局插件
export function provideString(store) {
  provide(StoreSymbol, store)
}

// 局部调用插件
export function useString() {
  const store = inject(StoreSymbol)
  return store
}
