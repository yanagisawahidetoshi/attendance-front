<template>
  <el-container>
    <el-header>
      <el-menu :default-active="activePageIndex" mode="horizontal">
        <el-menu-item v-if="currentUser.authority === 1" index="1"><nuxt-link to="/companies">会社</nuxt-link></el-menu-item>
        <el-menu-item v-if="currentCompany && currentUser.authority !== 3" index="2"><nuxt-link to="/users">ユーザー</nuxt-link></el-menu-item>
      </el-menu>
    </el-header>
    <el-main><nuxt/></el-main>
  </el-container>
</template>

<script>
export default {
  computed: {
    activePageIndex() {
      return this.$store.state.activePageIndex
    },
    currentUser() {
      return this.$store.state.currentUser
    },
    currentCompany() {
      return this.$store.state.currentCompany
    }
  },
  methods: {
    handleClickAnchor(index) {
      console.log(index)
    }
  }
}
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
