export const state = () => ({
  companies: null,
  total: 0,
  isCreateSuccess: false,
  errorMesages: null
})
export const actions = {
  async fetchCompanies({ commit, rootState }) {
    try {
      this.$axios.defaults.headers.Authorization =
        rootState.currentUser.access_token
      const res = await this.$axios.$get("/v1/companies")
      commit("setCompanies", res)
    } catch (e) {
      console.log(e)
    }
  },
  async createCompany({ commit, rootState }, params) {
    try {
      this.$axios.defaults.headers.Authorization =
        rootState.currentUser.access_token
      await this.$axios.$post("/v1/companies/create", params)
      commit("createSuccess")
      commit("createFail", null)
    } catch (e) {
      commit("createFail", e.response.data.message)
      throw e
    }
  }
}

export const mutations = {
  setCompanies(state, payload) {
    state.companies = payload.companies
    state.total = payload.total
  },
  createSuccess(state) {
    state.isCreateSuccess = true
  },
  createFail(state, payload) {
    state.errorMesages = payload
  }
}
