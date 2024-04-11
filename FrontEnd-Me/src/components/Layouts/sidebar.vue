<template>
  <div
    class="sidebar overflow-y-auto w-full fixed md:top-0 md:left-0 h-screen bg-gray-900 bg-opacity-70 z-50 shadow-lg"
    :class="sideBarOpen ? '' : 'hidden'"
    @click="toggleSidebar()"
  >
    <div
      class="sidebar overflow-y-auto w-56 md:w-56 lg:w-56 fixed md:top-0 md:left-0 h-screen bg-primaryBlue dark:bg-[#2D3748] z-50 shadow-lg"
      :class="sideBarOpen ? '' : 'hidden'"
      @click.stop
    >
      <div class="mb-4 px-4">
        <!-- home-->
        <router-link to="/home" @click="toggleSidebar()">
          <div
            class="home w-full h-24 flex items-center pl-4 mr-4 rounded-lg shadow-lg cursor-pointer hover:text-white"
          >
            <img class="h-18 flex" src="../../assets/unach.png" alt="Logo unach 2023" />
          </div>
        </router-link>
        <!-- Administrador -->
        <p
          class="pl-4 text-sm font-semibold mt-4 mb-1 uppercase text-white tracking-widest border-b border-gray-600"
          v-if="esSuperAdmin()"
        >
          Administrador
        </p>
        <router-link to="/Usuarios" v-if="esSuperAdmin()" @click="toggleSidebar()">
          <div
            class="w-full flex items-center text-SecundaryGold h-10 pl-4 hover:bg-SecundaryGold rounded-lg cursor-pointer hover:text-white"
          >
            <i class="pi pi-user text-2xl fill-current mr-2"></i>
            <span class="text-white">Usuarios</span>
          </div>
        </router-link>
        <router-link to="/registro-actividad" v-if="esSuperAdmin()" @click="toggleSidebar()">
          <div
            class="w-full flex items-center text-SecundaryGold h-10 pl-4 hover:bg-SecundaryGold rounded-lg cursor-pointer hover:text-white"
          >
            <i class="pi pi-book text-2xl fill-current mr-2"></i>
            <span class="text-white">Registros</span>
          </div>
        </router-link>
      </div>
      <div class="mb-4 px-4">
        <!-- ENSEÑANZA -->
        <p
          class="pl-4 text-sm font-semibold mb-1 uppercase text-white tracking-widest border-b border-gray-600"
          v-if="tienePermiso('Enseñanza') || esAdminDeModulo('Enseñanza')"
        >
          Enseñanza
        </p>
        <router-link
          to="/actividades"
          v-if="tienePermiso('Enseñanza') || esAdminDeModulo('Enseñanza')"
          @click="toggleSidebar()"
        >
          <div
            class="w-full flex items-center text-SecundaryGold h-10 pl-4 hover:bg-SecundaryGold rounded-lg cursor-pointer hover:text-white"
          >
            <i class="pi pi-folder-open text-2xl fill-current mr-2"></i>
            <span class="text-white">Actividades</span>
          </div>
        </router-link>
        <router-link to="/materias" v-if="esAdminDeModulo('Enseñanza')" @click="toggleSidebar()">
          <div
            class="w-full flex items-center text-SecundaryGold h-10 pl-4 hover:bg-SecundaryGold rounded-lg cursor-pointer hover:text-white"
          >
            <i class="pi pi-book text-2xl fill-current mr-2"></i>
            <span class="text-white">Materias</span>
          </div>
        </router-link>
        <router-link to="/docentes" v-if="esAdminDeModulo('Enseñanza')" @click="toggleSidebar()">
          <div
            class="w-full flex items-center text-SecundaryGold h-10 pl-4 hover:bg-SecundaryGold rounded-lg cursor-pointer hover:text-white"
          >
            <i class="pi pi-user text-2xl fill-current mr-2"></i>
            <span class="text-white">Docentes</span>
          </div>
        </router-link>
        <router-link to="/asignar" v-if="esAdminDeModulo('Enseñanza')" @click="toggleSidebar()">
          <div
            class="w-full flex items-center text-SecundaryGold h-10 pl-4 hover:bg-SecundaryGold rounded-lg cursor-pointer hover:text-white"
          >
            <i class="pi pi-id-card text-2xl fill-current mr-2"></i>
            <span class="text-white">Asignar Materias</span>
          </div>
        </router-link>
      </div>
      <!-- TUTORIAS -->
      <div class="mb-4 px-4">
        <p
          class="pl-4 text-sm font-semibold mb-1 uppercase text-white tracking-widest border-b border-gray-600"
          v-if="tienePermiso('Tutorias') || esAdminDeModulo('Tutorias')"
        >
          Tutorias
        </p>
        <router-link to="/tutorias" v-if="tienePermiso('Tutorias')" @click="toggleSidebar()">
          <div
            class="w-full flex items-center text-SecundaryGold h-10 pl-4 hover:bg-SecundaryGold rounded-lg cursor-pointer hover:text-white"
          >
            <i class="pi pi-folder-open text-2xl fill-current mr-2"></i>
            <span class="text-white">Actividades</span>
          </div>
        </router-link>
      </div>
      <div class="mb-4 px-4">
        <p
          class="pl-4 text-sm font-semibold mb-1 uppercase text-white tracking-widest border-b border-gray-600"
          v-if="tienePermiso('Investigacion')"
        >
          Investigación
        </p>
        <router-link
          to="/investigacion"
          v-if="tienePermiso('Investigacion')"
          @click="toggleSidebar()"
        >
          <div
            class="w-full flex items-center text-SecundaryGold h-10 pl-4 hover:bg-SecundaryGold rounded-lg cursor-pointer hover:text-white"
          >
            <i class="pi pi-folder-open text-2xl fill-current mr-2"></i>
            <span class="text-white">Actividades</span>
          </div>
        </router-link>
        <router-link to="/reportes" v-if="tienePermiso('Investigacion')" @click="toggleSidebar()">
          <div
            class="w-full flex items-center text-SecundaryGold h-10 pl-4 hover:bg-SecundaryGold rounded-lg cursor-pointer hover:text-white"
          >
            <i class="pi pi-book text-2xl fill-current mr-2"></i>
            <span class="text-white">Reportes</span>
          </div>
        </router-link>
      </div>
      <div class="mb-4 px-4">
        <p
          class="pl-4 text-sm font-semibold mb-1 uppercase text-white tracking-widest border-b border-gray-600"
          v-if="tienePermiso('Secretaria')"
        >
          Secretaria
        </p>
        <router-link to="/secretaria" v-if="tienePermiso('Secretaria')" @click="toggleSidebar()">
          <div
            class="w-full flex items-center text-SecundaryGold h-10 pl-4 hover:bg-SecundaryGold rounded-lg cursor-pointer hover:text-white"
          >
            <i class="pi pi-folder-open text-2xl fill-current mr-2"></i>
            <span class="text-white">Actividades</span>
          </div>
        </router-link>
      </div>
      <div class="mb-4 px-4">
        <p
          class="pl-4 text-sm font-semibold mb-2 uppercase text-white tracking-widest border-b border-gray-600"
        >
          Modo
        </p>
        <label for="check" class="flex items-center relative">
          <input type="checkbox" id="check" class="sr-only peer" @click="toggleDarkMode()" />
          <span
            class="mb-4 flex items-center relative w-28 h-11 bg-gray-900 absolute rounded-full border border-orange-500 top-1 peer-checked:bg-gray-500 dark:peer-checked:pl-16 dark:pl-16 transition-all duration-500"
            ><i
              class="bg-white dark:bg-black w-16 h-10 rounded-full flex items-center justify-center border border-yellow-900 pi pi-sun dark:pi text-xl text-yellow-600 dark:border-gray-900 dark:text-white"
              :class="isDarkMode ? 'pi pi-moon' : ''"
            ></i
          ></span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Sidebar-auth',
  computed: {
    ...mapState(['sideBarOpen']),
    ...mapGetters(['tienePermiso']),
    esAdminDeModulo() {
      return (modulo) => {
        return this.tienePermiso(`${modulo}-Admin`) || this.tienePermiso('Super-Admin')
      }
    }
  },
  data() {
    return {
      isDarkMode: localStorage.getItem('darkMode') === 'true'
    }
  },
  methods: {
    esSuperAdmin() {
      return this.tienePermiso('Super-Admin')
    },
    toggleSidebar() {
      this.$store.dispatch('toggleSidebar')
    },
    toggleDarkMode() {
      console.log('Entra al toggle')
      this.isDarkMode = !this.isDarkMode // Reactividad
      localStorage.setItem('darkMode', this.isDarkMode)

      if (this.isDarkMode) {
        console.log('entro al dark')
        document.documentElement.classList.add('dark')
      } else {
        console.log('entro al no dark')
        document.documentElement.classList.remove('dark')
      }
    }
  }
}
</script>
