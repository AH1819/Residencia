<template>
  <div
    class="sidebar overflow-y-auto md:w-1/3 lg:w-64 fixed md:top-0 md:left-0 h-screen bg-primaryBlue dark:bg-[#2D3748] z-30 shadow-lg"
    :class="sideBarOpen ? '' : 'hidden'" id="main-nav">
    <div class="mb-4 px-4">
      <!-- home-->
      <router-link to="/home" @click="toggleSidebar()">
        <div class="home w-full h-24 flex items-center pl-4 mr-4 rounded-lg shadow-lg cursor-pointer hover:text-white">
          <img class="h-18 flex" src="../../assets/unach.png" alt="Logo unach 2023" />
        </div>
      </router-link>
      <!-- Administrador -->
      <p class="pl-4 text-sm font-semibold mt-4 mb-1 uppercase text-white tracking-widest border-b border-gray-600"
        v-if="esSuperAdmin()">
        Administrador
      </p>
      <router-link to="/agregarDocente" v-if="esSuperAdmin()" @click="toggleSidebar()">
        <div
          class="w-full flex items-center text-SecundaryGold h-10 pl-4 hover:bg-SecundaryGold rounded-lg cursor-pointer hover:text-white">
          <i class="pi pi-user text-2xl fill-current mr-2"></i>
          <span class="text-white">Usuarios</span>
        </div>
      </router-link>
    </div>
    <div class="mb-4 px-4">
      <!-- ENSEÑANZA -->
      <p class="pl-4 text-sm font-semibold mb-1 uppercase text-white tracking-widest border-b border-gray-600"
        v-if="tienePermiso('Enseñanza') || esAdminDeModulo('Enseñanza')">
        Enseñanza
      </p>
      <router-link to="/ensenanza" v-if="tienePermiso('Enseñanza') || esAdminDeModulo('Enseñanza')"
        @click="toggleSidebar()">
        <div
          class="w-full flex items-center text-SecundaryGold h-10 pl-4 hover:bg-SecundaryGold rounded-lg cursor-pointer hover:text-white">
          <i class="pi pi-folder-open text-2xl fill-current mr-2"></i>
          <span class="text-white">Actividades</span>
        </div>
      </router-link>
      <router-link to="/agregarMateria" v-if="esAdminDeModulo('Enseñanza')" @click="toggleSidebar()">
        <div
          class="w-full flex items-center text-SecundaryGold h-10 pl-4 hover:bg-SecundaryGold rounded-lg cursor-pointer hover:text-white">
          <i class="pi pi-book text-2xl fill-current mr-2"></i>
          <span class="text-white">Materias</span>
        </div>
      </router-link>
      <router-link to="/agregarDocente" v-if="esAdminDeModulo('Enseñanza')" @click="toggleSidebar()">
        <div
          class="w-full flex items-center text-SecundaryGold h-10 pl-4 hover:bg-SecundaryGold rounded-lg cursor-pointer hover:text-white">
          <i class="pi pi-user text-2xl fill-current mr-2"></i>
          <span class="text-white">Docentes</span>
        </div>
      </router-link>
      <router-link to="/asignarMateria" v-if="esAdminDeModulo('Enseñanza')" @click="toggleSidebar()">
        <div
          class="w-full flex items-center text-SecundaryGold h-10 pl-4 hover:bg-SecundaryGold rounded-lg cursor-pointer hover:text-white">
          <i class="pi pi-id-card text-2xl fill-current mr-2"></i>
          <span class="text-white">Asignar Materias</span>
        </div>
      </router-link>
    </div>
    <!-- TUTORIAS -->
    <div class="mb-4 px-4">
      <p class="pl-4 text-sm font-semibold mb-1 uppercase text-white tracking-widest border-b border-gray-600"
        v-if="tienePermiso('Tutorias') || esAdminDeModulo('Tutorias')">
        Tutorias
      </p>
      <router-link to="/tutorias" v-if="tienePermiso('Tutorias')" @click="toggleSidebar()">
        <div
          class="w-full flex items-center text-SecundaryGold h-10 pl-4 hover:bg-SecundaryGold rounded-lg cursor-pointer hover:text-white">
          <i class="pi pi-folder-open text-2xl fill-current mr-2"></i>
          <span class="text-white">Actividades</span>
        </div>
      </router-link>
    </div>
    <div class="mb-4 px-4">
      <p class="pl-4 text-sm font-semibold mb-1 uppercase text-white tracking-widest border-b border-gray-600"
        v-if="tienePermiso('Investigacion')">
        Investigación
      </p>

      <router-link to="/investigacion" v-if="tienePermiso('Investigacion')" @click="toggleSidebar()">
        <div
          class="w-full flex items-center text-SecundaryGold h-10 pl-4 hover:bg-SecundaryGold rounded-lg cursor-pointer hover:text-white">
          <i class="pi pi-folder-open text-2xl fill-current mr-2"></i>
          <span class="text-white">Actividades</span>
        </div>
      </router-link>
      <router-link to="/reportesInvestigacion" v-if="tienePermiso('Investigacion')" @click="toggleSidebar()">
        <div
          class="w-full flex items-center text-SecundaryGold h-10 pl-4 hover:bg-SecundaryGold rounded-lg cursor-pointer hover:text-white">
          <i class="pi pi-book text-2xl fill-current mr-2"></i>
          <span class="text-white">Reportes</span>
        </div>
      </router-link>
    </div>
    <div class="mb-4 px-4">
      <p class="pl-4 text-sm font-semibold mb-1 uppercase text-white tracking-widest border-b border-gray-600"
        v-if="tienePermiso('Secretaria')">
        Secretaria
      </p>
      <router-link to="/secretaria" v-if="tienePermiso('Secretaria')" @click="toggleSidebar()">
        <div
          class="w-full flex items-center text-SecundaryGold h-10 pl-4 hover:bg-SecundaryGold rounded-lg cursor-pointer hover:text-white">
          <i class="pi pi-folder-open text-2xl fill-current mr-2"></i>
          <span class="text-white">Actividades</span>
        </div>
      </router-link>
    </div>
    <div class="mb-4 px-4">
      <p class="pl-4 text-sm font-semibold mb-2 uppercase text-white tracking-widest border-b border-gray-600">
        Modo
      </p>
      <label for="check" class="bg-gray-100 cursor-pointer relative w-32 h-10 rounded-full">
        <input type="checkbox" @change="toggleDarkMode()" id="check" class="border sr-only peer">
        <span
          class="flex items-center justify-center relative w-3/5 h-4/5 bg-gray-900 absolute rounded-full left-1 top-1 peer-checked:bg-gray-600 peer-checked:left-12 transition-all duration-500"><i
            :class="isDarkMode
              ? 'pi pi-moon text-white'
              : 'pi pi-sun text-white'
              "></i></span>
      </label>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "Sidebar",
  computed: {
    ...mapState(["sideBarOpen"]),
    ...mapGetters(["tienePermiso"]),
    esAdminDeModulo() {
      return (modulo) => {
        return (
          this.tienePermiso(`${modulo}-Admin`) ||
          this.tienePermiso("Super-Admin")
        );
      };
    },
  },
  data() {
    return {
      isDarkMode: localStorage.getItem("darkMode") === "true",
    };
  },
  methods: {
    esSuperAdmin() {
      return this.tienePermiso("Super-Admin");
    },
    toggleSidebar() {
      this.$store.dispatch("toggleSidebar");
    },
    toggleDarkMode() {
      console.log("Entra al toggle");
      this.isDarkMode = !this.isDarkMode; // Reactividad
      localStorage.setItem("darkMode", this.isDarkMode);

      if (this.isDarkMode) {
        console.log("entro al dark");
        document.documentElement.classList.add("dark");
      } else {
        console.log("entro al no dark");
        document.documentElement.classList.remove("dark");
      }
    },
  },
};
</script>

<style>
@media screen and (max-width: 767px) {
  .home {
    margin-top: 125px;
  }
}

@media screen and (max-width: 900px) {
  .home {
    margin-top: 110px;
  }
}
</style>