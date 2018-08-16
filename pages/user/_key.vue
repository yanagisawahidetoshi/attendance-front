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
      <el-form-item label="名前">
        <el-input v-model="form.name" type="text" />
      </el-form-item>
      <el-form-item label="メールアドレス">
        <el-input v-model="form.email" type="email" />
      </el-form-item>
      <el-form-item label="権限">
        <el-select v-model="form.authority" placeholder="権限">
          <el-option
            v-for="authority in authorities"
            :key="authority.value"
            :label="authority.label"
            :value="authority.value"/>
        </el-select>
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
          authority: null
        }
      }
    }
    return {
      form: Object.assign({}, store.state.user.users[params.key])
    }
  },
  data() {
    return {
      authorities: [
        {
          value: 2,
          label: "管理者"
        },
        {
          value: 3,
          label: "通常"
        }
      ]
    }
  },
  computed: {
    errorMessages() {
      return this.$store.state.user.createErrorMesages
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
        await this.$store.dispatch("user/editUser", this.form)
      } else {
        await this.$store.dispatch("user/createUser", this.form)
      }
      this.$router.push("/users")
    }
  }
}
</script>
