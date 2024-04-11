<template>
  <div class="leading-normal tracking-normal" id="main-body">
    <div class="flex-box">

      <Sidebar />

      <div class="flex-1 w-full bg-gray-100 dark:bg-darkBackground transition-all"
        :class="sideBarOpen ? 'pl-0 lg:pl-64 overlay' : ''" id="main-content">

        <Navbar />

        <div class="bg-gray-100 dark:bg-darkBackground mx-5 mb-6 md:mx-2 lg:mx-10">
          <router-view />
        </div>

        <Footer />

      </div>
    </div>
  </div>
</template>
  
<script>
import { mapState } from 'vuex'

import Sidebar from '../components/Layouts/sidebar.vue'
import Navbar from '../components/Layouts/navbar.vue'
import Footer from '../components/Layouts/footer.vue'

export default {
  name: 'Home',
  computed: {
    ...mapState(['sideBarOpen'])
  },
  components: {
    Sidebar,
    Navbar,
    Footer
  }
}
</script>