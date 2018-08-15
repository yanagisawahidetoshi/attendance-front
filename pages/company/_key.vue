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
        <el-button type="primary" @click="onSubmit">{{ submitText }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  asyncData({ params, store }) {
    if (params.key === undefined) {
      return {
        form: {
          id: null,
          name: null,
          email: null,
          zip: null,
          tel: null,
          address: null
        }
      }
    }
    return {
      form: Object.assign({}, store.state.company.companies[params.key])
    }
  },
  computed: {
    errorMessages() {
      return this.$store.state.company.errorMesages
    },
    submitText() {
      if (this.form.id) {
        return "更新する"
      } else {
        return "登録する"
      }
    }
  },
  methods: {
    async onSubmit() {
      if (this.form.id) {
        await this.$store.dispatch("company/editCompany", this.form)
      } else {
        await this.$store.dispatch("company/createCompany", this.form)
      }
      this.$router.push("/companies")
    }
  }
}
</script>
