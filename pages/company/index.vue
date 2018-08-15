<template>
  <div>
    {{ total }}
    <el-table
      :data="companies"
      highlight-current-row
      style="width: 100%"
      @current-change="handleCurrentChange">
      <el-table-column
        prop="id"
        label="ID"
        width="80"/>
      <el-table-column
        prop="name"
        label="名前"/>
      <el-table-column
        prop="created_at"
        label="登録日"/>
    </el-table>
    <nuxt-link to="/company/create">登録する</nuxt-link>
  </div>
</template>

<script>
export default {
  async fetch({ store }) {
    await store.dispatch("company/fetchCompanies")
  },
  computed: {
    companies() {
      return this.$store.state.company.companies
    },
    total() {
      return this.$store.state.company.total
    }
  },
  methods: {
    handleCurrentChange(row) {
      this.$store.dispatch("setCurrentCompany", row)
    }
  }
}
</script>
