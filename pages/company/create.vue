<template>
  <div>
    <el-alert
      v-for="(errorMessage, key) in errorMessages"
      :key="key"
      :title="errorMessage"
      type="error"
      show-icon
    />
    <el-form ref="form" :model="form" label-position="top">
      <el-form-item label="会社名">
        <el-input v-model="form.name" type="text" />
      </el-form-item>
      <el-form-item label="メールアドレス">
        <el-input v-model="form.email" type="email" />
      </el-form-item>
      <el-form-item label="郵便番号">
        <el-input v-model="form.zip" type="text" />
      </el-form-item>
      <el-form-item label="電話番号">
        <el-input v-model="form.tel" type="text" />
      </el-form-item>
      <el-form-item label="住所">
        <el-input v-model="form.address" type="text" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onCreate">登録する</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        zip: "",
        tel: "",
        address: ""
      }
    }
  },
  computed: {
    errorMessages() {
      return this.$store.state.company.errorMesages
    }
  },
  methods: {
    async onCreate() {
      await this.$store.dispatch("company/createCompany", this.form)
      this.$router.push("/company")
    }
  }
}
</script>
