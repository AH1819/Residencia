<template>
  <div class="sticky top-2 z-40 mx-2 md:mx-4 mb-6 border border-white rounded-lg">
    <div
      class="w-full sm:h-24 md:h-24 lg:h-20 px-4 py-3 bg-SecundaryGold dark:bg-[#2D3748] flex items-center rounded-lg shadow-lg"
    >
      <!-- left navbar -->
      <div class="flex">
        <!-- mobile hamburger -->
        <div class="flex items-center mr-4">
          <button
            class="hover:text-blue-500 hover:border-white focus:outline-none navbar-burger"
            @click="toggleSidebar()"
          >
            <svg
              class="h-5 w-5"
              v-bind:style="{ fill: 'white' }"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
      </div>
      <HeaderModule class="w-full sm:mr-6 md:mr-6 lg:mr-10" />
      <!-- right navbar -->
      <div class="flex items-center relative">
        <button
          class="rounded-full border m-4 w-10 h-10 shadow-lg"
          @click="dropDownOpen = !dropDownOpen"
        >
          <img src="../../assets/profile.svg" />
        </button>
      </div>
    </div>

    <!-- dropdown menu -->
    <div
      class="absolute bg-gray-100 border border-t-0 shadow-xl text-gray-700 rounded-b-lg w-48 top-full right-0 mr-6"
      :class="dropDownOpen ? '' : 'hidden'"
    >
      <button
        @click="cargarUser(), showAccountModal()"
        class="w-full block px-4 py-2 hover:bg-gray-200"
      >
        <i class="pi pi-user mr-4"></i>
        Cuenta
      </button>
      <button @click="handleLogout" class="w-full block px-4 py-2 hover:bg-gray-200">
        <i class="pi pi-sign-out mr-4"></i>
        Cerrar sesion
      </button>
    </div>
    <!-- dropdown menu end -->
    <!-- Modal usuario -->
    <div
      v-if="showModal"
      class="fixed z-50 top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center"
      @click="(showModal = !showModal), (dropDownOpen = !dropDownOpen), resetForm()"
    >
      <div class="w-11/12 md:w-5/12" @click.stop>
        <div class="bg-white dark:bg-[#2D3748] shadow-xl rounded-lg py-2">
          <div class="grid grid-cols-2 gap-4 mb-4 p-2">
            <div class="photo-wrapper">
              <div
                class="border-2 border-gray-200 rounded-full w-32 h-32 mx-auto -mt-16 bg-white shadow-lg"
              >
                <img
                  class="w-32 h-32 rounded-full mx-auto"
                  src="../../assets/profile.svg"
                  alt="User Profile"
                />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <button
                class="shadow-lg text-sm grid dark:text-white border dark:border-white rounded-lg"
                @click="editar = !editar"
              >
                <i class="pi pi-user-edit text-2xl text-green-400 md:mr-2"></i>
                Editar
              </button>
              <button
                class="shadow-lg text-sm grid dark:text-white border dark:border-white rounded-lg"
              >
                <i class="pi pi-user text-2xl text-green-400 md:mr-2"></i>
                Contactar al administrador
              </button>
            </div>
          </div>
          <div class="px-6">
            <form action="">
              <div class="grid grid-cols-2 gap-2">
                <div class="mb-4">
                  <label class="block text-gray-700 dark:text-white text-sm font-bold mb-2"
                    >RFC</label
                  >
                  <input
                    v-model="formUser.rfc"
                    type="text"
                    class="block w-full px-3 py-2 border rounded shadow appearance-none"
                    placeholder="RFC"
                    disabled
                  />
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700 dark:text-white text-sm font-bold mb-2"
                    >Nombre</label
                  >
                  <input
                    v-model="formUser.nombre"
                    type="text"
                    class="capitalize block w-full px-3 py-2 border rounded shadow appearance-none"
                    placeholder="Nombre"
                    :disabled="!editar"
                  />
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700 dark:text-white text-sm font-bold mb-2"
                    >Apellido Paterno</label
                  >
                  <input
                    v-model="formUser.apellido_paterno"
                    type="text"
                    class="capitalize block w-full px-3 py-2 border rounded shadow appearance-none"
                    placeholder="Apellido Paterno"
                    :disabled="!editar"
                  />
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700 dark:text-white text-sm font-bold mb-2"
                    >Apellido Materno</label
                  >
                  <input
                    v-model="formUser.apellido_materno"
                    type="text"
                    class="capitalize block w-full px-3 py-2 border rounded shadow appearance-none"
                    placeholder="Apellido Materno"
                    :disabled="!editar"
                  />
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700 dark:text-white text-sm font-bold mb-2"
                    >Número de Plaza</label
                  >
                  <input
                    v-model="formUser.n_plaza"
                    type="text"
                    class="uppercase block w-full px-3 py-2 border rounded shadow appearance-none"
                    placeholder="Número de Plaza"
                    :disabled="!editar"
                  />
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700 dark:text-white text-sm font-bold mb-2"
                    >Sexo</label
                  >
                  <select
                    id="sexo"
                    v-model="formUser.sexo"
                    class="block w-full px-3 py-2 border rounded shadow appearance-none"
                    :disabled="!editar"
                  >
                    <option value="null">Selecciona un sexo</option>
                    <option value="Hombre">Masculino</option>
                    <option value="Mujer">Femenino</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700 dark:text-white text-sm font-bold mb-2"
                    >Correo</label
                  >
                  <input
                    v-model="formUser.email"
                    type="text"
                    class="block w-full px-3 py-2 border rounded shadow appearance-none"
                    placeholder="Correo"
                    :disabled="!editar"
                  />
                </div>
                <div v-if="editar" class="mb-4">
                  <label class="block text-gray-700 dark:text-white text-sm font-bold mb-2"
                    >Contraseña</label
                  >
                  <div class="flex items-center">
                    <input
                      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="password"
                      v-model="formUser.password"
                      :type="show ? 'password' : 'text'"
                      placeholder="Debe tener al menos 6 caracteres"
                      autocomplete="current-password webauthn"
                    />
                    <span class="py-2 px-2 cursor-pointer dark:text-white" @click="show = !show"
                      ><i
                        :class="show ? 'pi pi-eye' : 'pi pi-eye-slash'"
                        style="font-size: 1.5rem"
                      ></i
                    ></span>
                  </div>
                </div>
              </div>
            </form>
            <div v-if="editar" class="px-4 border-t border-gray-200">
              <div class="grid grid-cols-2 mx-3">
                <button
                  type="button"
                  class="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 m-2"
                  @click="submit()"
                >
                  Guardar
                </button>
                <button
                  class="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 m-2"
                  @click="(showModal = !showModal), (dropDownOpen = !dropDownOpen), resetForm()"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { logout } from '../../services/authServices'
import HeaderModule from '../HeaderModuleComponent.vue'
import apiEnsenanza from '@/services/apiEnsenanza'
import Swal from 'sweetalert2'

export default {
  name: 'Navbar-auth',
  computed: {
    ...mapState(['sideBarOpen', 'selectedOpcion', 'user', 'permisos'])
  },
  data() {
    return {
      titulo: '',
      isDarkMode: localStorage.getItem('darkMode') === 'true',
      dropDownOpen: false,
      showModal: false,
      show: false,
      editar: false,
      formUser: {
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        rfc: '',
        editRFC: '',
        n_plaza: '',
        sexo: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode // Reactividad
      localStorage.setItem('darkMode', this.isDarkMode)

      if (this.isDarkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    },
    showAccountModal() {
      this.showModal = true
    },
    toggleSidebar() {
      this.$store.dispatch('toggleSidebar')
    },
    handleLogout() {
      logout()
      this.$router.push('/login') // Redirigir al usuario a la página de inicio de sesión después de cerrar sesión.
    },
    cargarUser() {
      console.log(this.user)
      console.log(localStorage.getItem('user'))
      this.formUser = {
        editRFC: this.user.rfc,
        nombre: this.user.nombre_Doce,
        apellido_paterno: this.user.apellido_paterno,
        apellido_materno: this.user.apellido_materno,
        rfc: this.user.rfc,
        n_plaza: this.user.n_plaza != null ? this.user.n_plaza : 'sin numero de plaza',
        sexo: this.user.sexo,
        email: this.user.email
      }
      console.log(this.formUser)
    },
    submit() {
      const data = {
        editRFC: this.formUser.editRFC,
        rfc: this.formUser.rfc,
        nombre_Doce: this.formUser.nombre,
        apellido_paterno: this.formUser.apellido_paterno,
        apellido_materno: this.formUser.apellido_materno,
        n_plaza: this.formUser.n_plaza,
        sexo: this.formUser.sexo,
        email: this.formUser.email,
        password: this.formUser.password
      }
      apiEnsenanza
        .actualizarDocente(data.rfc, data)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Se ha actualizado tu información',
            confirmButtonText: 'Aceptar'
          })
          this.editar = false
          this.resetForm()
          this.actualizarUser()
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: 'No se ha podido actualizar tu información',
            confirmButtonText: 'Aceptar'
          })
        })
    },
    async actualizarUser() {
      try {
        const response = await apiEnsenanza.getUsuarios()

        // Asegúrate de que la respuesta contenga un array de usuarios
        console.log(response)

        // Suponiendo que los usuarios están en response.data
        const usuarios = response.data

        if (Array.isArray(usuarios)) {
          const userUp = usuarios.find((item) => item.rfc === this.user.rfc)
          if (userUp) {
            this.$store.dispatch('setUser', userUp)
            localStorage.setItem('user', JSON.stringify(userUp))
            this.cargarUser()
          } else {
            console.warn('Usuario no encontrado')
          }
        } else {
          console.error('La respuesta no contiene un array de usuarios')
        }
      } catch (error) {
        console.error('Error al obtener los usuarios:', error)
      }
    },
    resetForm() {
      this.formUser.rfc = ''
      this.formUser.nombre = ''
      this.formUser.apellido_paterno = ''
      this.formUser.apellido_materno = ''
      this.formUser.n_plaza = ''
      this.formUser.sexo = ''
      this.formUser.email = ''
      this.formUser.password = ''
      this.editar = false
    }
  },
  components: {
    HeaderModule
  }
}
</script>
