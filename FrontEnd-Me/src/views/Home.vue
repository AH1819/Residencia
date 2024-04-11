<template>
  <div class="leading-normal tracking-normal" id="main-body">
    <div class="flex-box">
      <Sidebar />

      <div
        class="flex-1 w-full bg-gray-100 dark:bg-darkBackground transition-all"
        id="main-content"
      >
        <Navbar />

        <div class="bg-gray-100 dark:bg-darkBackground mx-5 mb-6 md:mx-2 lg:mx-10 h-full">
          <router-view />
        </div>

        <FooterPage />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Sidebar from '../components/Layouts/sidebar.vue'
import Navbar from '../components/Layouts/navbar.vue'
import FooterPage from '../components/Layouts/footer.vue'

export default {
  name: 'Home-auth',
  computed: {
    ...mapState(['sideBarOpen'])
  },
  components: {
    Sidebar,
    Navbar,
    FooterPage
  }
}
</script>
