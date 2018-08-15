<template>
  <div>
    <el-alert
      v-if="this.$store.state.company.listErrorMessage"
      :title="this.$store.state.company.listErrorMessage"
      type="error"
      show-icon
    />
    {{ total }}
    <el-table
      :data="companies"
      style="width: 100%">
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
      <el-table-column>
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="primary" @click="handleClickSetting(scope.$index)">選択</el-button>
            <el-button type="success" @click="handleClickEdit(scope.$index)">編集</el-button>
            <el-button type="danger" @click="handleClickDelete(scope.$index)">削除</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <nuxt-link to="/company">登録する</nuxt-link>
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
    handleClickSetting(index) {
      this.$store.dispatch("setCurrentCompany", this.companies[index])
    },
    handleClickEdit(index) {
      this.$router.push("/company/" + index)
    },
    handleClickDelete(index) {
      this.$confirm("削除してよろしいですか", "Warning", {
        confirmButtonText: "はい",
        cancelButtonText: "いいえ",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch(
            "company/deleteCompany",
            this.companies[index].id
          )
        })
        .catch(() => {})
    }
  }
}
</script>
