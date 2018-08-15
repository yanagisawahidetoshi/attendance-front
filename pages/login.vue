<template>
  <div>
    <el-alert
      v-if="isFaild"
      title="メールアドレスもしくはパスワードが違います"
      type="error"/>
    <el-form ref="form" :model="form" label-position="top">
      <el-form-item label="メールアドレス">
        <el-input v-model="form.email" type="email" />
      </el-form-item>
      <el-form-item label="パスワード">
        <el-input v-model="form.password" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">ログイン</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      form: {
        email: "",
        password: ""
      }
    }
  },
  computed: {
    isFaild() {
      return this.$store.state.isLoginFaild
    }
  },
  methods: {
    async onSubmit() {
      await this.$store.dispatch("login", this.form)
    }
  }
}
</script>

<style>
</style>
