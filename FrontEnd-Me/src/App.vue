<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
  created() {
    const token = localStorage.getItem('token')
    const userData = JSON.parse(localStorage.getItem('user'))
    const permisos = JSON.parse(localStorage.getItem('permisos'))

    if (token && userData) {
      this.$store.dispatch('setToken', token)
      this.$store.dispatch('setUser', userData)
      this.$store.dispatch('setPermisos', permisos)
    }
  },
  mounted() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true'
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
}
</script>
