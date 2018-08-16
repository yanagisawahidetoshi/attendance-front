export const state = () => ({
  isLoginFaild: false,
  currentUser: null,
  currentCompany: null,
  activePageIndex: ""
})

export const actions = {
  async login({ commit }, params) {
    try {
      const res = await this.$axios.$post("/v1/login", params)
      commit("setCurrentUser", res)
      commit("setIsLoginFaild", false)
      this.$router.push("/companies")
    } catch (e) {
      commit("setIsLoginFaild", true)
    }
  },
  setCurrentCompany({ commit }, company) {
    commit("setCurrentCompany", company)
  }
}

export const mutations = {
  setIsLoginFaild(state, value) {
    state.isLoginFaild = value
  },
  setCurrentUser(state, user) {
    state.currentUser = user
  },
  setCurrentCompany(state, payload) {
    state.currentCompany = payload
  }
}
