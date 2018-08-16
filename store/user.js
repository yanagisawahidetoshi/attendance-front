export const state = () => ({
  users: null,
  page: 0,
  isCreateSuccess: false,
  listErrorMessage: null,
  createErrorMesages: null
})
export const actions = {
  async fetchUsers({ commit, rootState }) {
    try {
      this.$axios.defaults.headers.Authorization =
        rootState.currentUser.access_token
      const params = { company_id: rootState.currentCompany.id }
      const res = await this.$axios.$get("/v1/users", { params })
      commit("setUsers", res)
    } catch (e) {
      commit("setListErrorMessage", e.response.data.message)
    }
  },
  async createUser({ commit, rootState }, params) {
    try {
      params.company_id = rootState.currentCompany.id
      this.$axios.defaults.headers.Authorization =
        rootState.currentUser.access_token
      await this.$axios.$post("/v1/users", params)
      commit("createSuccess")
      commit("createFail", null)
    } catch (e) {
      const errors = e.response.data.exception.split(",")
      errors.shift()
      commit("createFail", errors)
      throw e
    }
  },
  async editUser({ commit, rootState }, params) {
    try {
      this.$axios.defaults.headers.Authorization =
        rootState.currentUser.access_token
      await this.$axios.$put("/v1/users/update", params)
      commit("createSuccess")
      commit("createFail", null)
    } catch (e) {
      commit("createFail", e.response.data.message)
      throw e
    }
  },
  async deleteUser({ commit, rootState }, id) {
    try {
      const params = { id: id, company_id: rootState.currentCompany.id }
      this.$axios.defaults.headers.Authorization =
        rootState.currentUser.access_token
      await this.$axios.$delete("/v1/users/delete", { params })
      commit("deleteUser", id)
    } catch (e) {
      throw e
    }
  }
}

export const mutations = {
  setUsers(state, payload) {
    state.users = payload.users
    state.page = payload.total
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
  deleteUser(state, id) {
    const index = state.users.findIndex(user => {
      return user.id === id
    })
    state.users.splice(index, 1)
  }
}
