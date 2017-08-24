//执行多个 mutations 就需要用 action ,可以在这里触发其他的mutations方法
export const increment = ({commit}) => {
  commit('increment')
}
export const decrement = ({commit}) => {
  commit('decrement')
}
