<template>
  <div>
    <el-alert
      v-if="this.$store.state.user.listErrorMessage"
      :title="this.$store.state.user.listErrorMessage"
      type="error"
      show-icon
    />
    {{ total }}
    <el-table
      :data="users"
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
            <el-button type="success" @click="handleClickEdit(scope.$index)">編集</el-button>
            <el-button type="danger" @click="handleClickDelete(scope.$index)">削除</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <nuxt-link to="/user">登録する</nuxt-link>
  </div>
</template>

<script>
export default {
  async fetch({ store }) {
    await store.dispatch("user/fetchUsers")
  },
  computed: {
    users() {
      return this.$store.state.user.users
    },
    total() {
      return this.$store.state.user.total
    }
  },
  methods: {
    handleClickEdit(index) {
      this.$router.push("/user/" + index)
    },
    handleClickDelete(index) {
      this.$confirm("削除してよろしいですか", "Warning", {
        confirmButtonText: "はい",
        cancelButtonText: "いいえ",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("user/deleteUser", this.users[index].id)
        })
        .catch(() => {})
    }
  }
}
</script>
