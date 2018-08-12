export const state = () => ({
  isLoginFaild: false,
  currentUser: {}
})
export const actions = {
  async login(context, params) {
    try {
      const res = await this.$axios.$post("/v1/login", params)
      context.commit("setCurrentUser", res)
      context.commit("setIsLoginFaild", false)
    } catch (e) {
      context.commit("setIsLoginFaild", true)
    }
  }
}

export const mutations = {
  setIsLoginFaild(state, value) {
    state.isLoginFaild = value
  },
  setCurrentUser(state, user) {
    state.currentUser = user
  }
}
