export const state = () => ({
  companies: null,
  total: 0,
  isCreateSuccess: false,
  listErrorMessage: null,
  createErrorMesages: null
})
export const actions = {
  async fetchCompanies({ commit, rootState }) {
    try {
      this.$axios.defaults.headers.Authorization =
        rootState.currentUser.access_token
      const res = await this.$axios.$get("/v1/companies")
      commit("setCompanies", res)
    } catch (e) {
      commit("setListErrorMessage", e.response.data.message)
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
  },
  async editCompany({ commit, rootState }, params) {
    try {
      this.$axios.defaults.headers.Authorization =
        rootState.currentUser.access_token
      await this.$axios.$put("/v1/companies/update", params)
      commit("createSuccess")
      commit("createFail", null)
    } catch (e) {
      commit("createFail", e.response.data.message)
      throw e
    }
  },
  async deleteCompany({ commit, rootState }, id) {
    try {
      const params = { id: id }
      this.$axios.defaults.headers.Authorization =
        rootState.currentUser.access_token
      await this.$axios.$delete("/v1/companies/delete", { params })
      commit("deleteCompany", id)
    } catch (e) {
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
    state.createErrorMesages = payload
  },
  setListErrorMessage(state, payload) {
    state.listErrorMessage = payload
  },
  deleteCompany(state, id) {
    const index = state.companies.findIndex(company => {
      return company.id === id
    })
    state.companies.splice(index, 1)
  }
}
