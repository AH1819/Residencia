<template>
  <section class="flex flex-col md:flex-row h-screen items-center">
    <div
      class="bg-gray w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center"
    >
      <div class="w-full h-screen">
        <img src="../assets/unachlogo.svg" class="h-40 mx-auto mt-10 fill-current" />
        <div
          class="my-4 mt-2 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300"
        >
          <p
            class="mx-4 mb-0 text-center font-semibold text-slate-600 uppercase tracking-widest text-xl"
          >
            SIGEAA
          </p>
        </div>

        <form class="mt-2" @submit.prevent="login" method="POST">
          <div>
            <label class="block text-gray-700" for="rfc">RFC</label>
            <input
              class="w-full px-2 py-2 uppercase rounded-lg bg-gray-100 border focus:border-SecundaryGold focus:bg-white focus:outline-none"
              autofocus
              type="text"
              placeholder="RFC"
              id="rfc"
              v-model="rfc"
            />
          </div>

          <div class="mt-2">
            <label class="block text-gray-700" for="password">Contraseña</label>
            <div class="flex items-center">
              <input
                class="w-full px-2 py-2 rounded-lg bg-gray-100 border focus:border-SecundaryGold focus:bg-white focus:outline-none"
                id="password"
                v-model="password"
                :type="show ? 'password' : 'text'"
                placeholder="Contraseña"
              />
              <span class="py-2 px-2 cursor-pointer" @click="show = !show"
                ><i :class="show ? 'pi pi-eye' : 'pi pi-eye-slash'" style="font-size: 1.5rem"></i
              ></span>
            </div>
          </div>

          <div class="text-right mt-2">
            <a
              class="text-sm font-semibold text-gray-700 hover:text-SecundaryGold focus:text-blue-700"
              @click="
                (showformRecovery = !showformRecovery),
                  (title = 'Recuperar contraseña'),
                  (formRecovery.asunto = 'Recuperar contraseña')
              "
              >¿Olvidaste tu contraseña?</a
            >
          </div>
          <button
            type="submit"
            class="w-full block bg-primaryBlue hover:bg-blue-800 focus:bg-blue-700 text-white font-semibold rounded-lg px-4 py-2 mt-2"
            @click="showloading = !showloading"
          >
            <svg
              aria-hidden="true"
              role="status"
              class="inline w-6 h-6 me-3 text-white animate-spin"
              :class="{ hidden: !showloading }"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
            Iniciar Sesión
          </button>
        </form>

        <hr class="my-6 border-gray-300 w-full" />

        <p class="text-sm text-gray-500 mt-10">
          &copy; 2023 UNACH - Todos los derechos reversados.
        </p>
      </div>
    </div>
    <div class="bg-blue-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
      <img src="../assets/fondo.jpg" alt="" class="w-full h-full object-cover brightness-75" />
    </div>
    <div
      v-if="showformRecovery"
      class="fixed top-0 left-0 w-full h-full z-50 bg-gray-900 bg-opacity-70"
    >
      <div
        class="bg-white dark:bg-[#2D3748] rounded-lg shadow-lg overflow-hidden mx-auto mt-10 w-2/3 md:w-1/3"
      >
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            {{ title }}
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            @click="(showformRecovery = !showformRecovery), resetForm()"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <div class="py-1 max-h-96 overflow-y-auto">
          <form
            class="w-full p-2 md:p-4 bg-gray-200 dark:bg-gray-700"
            @submit.prevent="submitForm"
            id="formRecovery"
          >
            <div class="w-full px-3 mb-4">
              <label class="block text-gray-700 dark:text-white text-sm font-bold mb-2"
                >Ingrese el rfc del usuario:</label
              >
              <input
                type="text"
                class="uppercase w-full px-3 py-2 rounded-lg bg-gray-100 border focus:border-SecundaryGold focus:bg-white focus:outline-none"
                v-model="formRecovery.rfc"
                placeholder="RFC"
              />
              <button
                type="button"
                class="w-full block bg-green-400 hover:bg-blue-800 focus:bg-blue-700 text-white font-semibold rounded-lg px-4 py-2 mt-2"
                @click="consultarUsuario(), (showloadingRecovery = !showloadingRecovery)"
              >
                <i class="pi pi-search"></i>

                Buscar
                <svg
                  aria-hidden="true"
                  role="status"
                  class="inline w-6 h-6 me-3 text-white animate-spin"
                  :class="{ hidden: !showloadingRecovery }"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C
                    60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
            <template v-if="formRecovery.nombreUser && formRecovery.status != 0">
              <div class="w-full px-3 mb-4">
                <label class="block text-gray-700 dark:text-white text-sm font-bold mb-2"
                  >Nombre:</label
                >
                <input
                  type="text"
                  class="w-full px-3 py-2 rounded-lg bg-gray-100 border focus:border-SecundaryGold focus:bg-white focus:outline-none"
                  v-model="formRecovery.nombreUser"
                  placeholder="Nombre"
                  disabled
                />
              </div>
              <div class="w-full px-3 mb-4">
                <label class="block text-gray-700 dark:text-white text-sm font-bold mb-2"
                  >Apellido:</label
                >
                <input
                  type="text"
                  class="w-full px-3 py-2 rounded-lg bg-gray-100 border focus:border-SecundaryGold focus:bg-white focus:outline-none"
                  v-model="formRecovery.apellidoUser"
                  placeholder="Apellido"
                  disabled
                />
              </div>
              <div class="w-full px-3 mb-4">
                <label class="block text-gray-700 dark:text-white text-sm font-bold mb-2"
                  >Correo:</label
                >
                <input
                  type="text"
                  class="w-full px-3 py-2 rounded-lg bg-gray-100 border focus:border-SecundaryGold focus:bg-white focus:outline-none"
                  v-model="formRecovery.email"
                  placeholder="Correo"
                  disabled
                />
              </div>
            </template>
          </form>
        </div>
        <div
          v-if="formRecovery.nombreUser && formRecovery.status != 0"
          class="px-4 py-3 border-t border-gray-200"
        >
          <div class="grid grid-cols-2 mx-3 md:mx-24 md:mt-4">
            <button
              type="submit"
              class="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 m-2"
              form="formRecovery"
            >
              Enviar
            </button>
            <button
              class="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 m-2"
              @click="(showformRecovery = !showformRecovery), resetForm()"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
      <div
        v-if="statusSend"
        class="fixed top-0 left-0 w-full h-full z-50 bg-gray-900 bg-opacity-70 flex items-center justify-center"
      >
        <div role="status" class="flex flex-col items-center">
          <svg
            aria-hidden="true"
            class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="text-white mt-4">Enviando correo...</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { login, getPermisos, getUser, sendEmail } from '@/services/authServices'
import Swal from 'sweetalert2'

export default {
  name: 'Login-auth',
  data() {
    return {
      rfc: '',
      password: '',
      showloading: false,
      show: false,
      showformRecovery: false,
      statusSend: '',
      formRecovery: {
        rfc: '',
        nombreUser: '',
        apellidoUser: '',
        status: '',
        email: '',
        asunto: ''
      },
      showloadingRecovery: false
    }
  },
  methods: {
    isValidRFC(rfc) {
      // Ejemplo simple de validación de RFC
      const rfcPattern = /^[A-Z]{3,4}[0-9]{6}[A-Z0-9]{3}$/
      return rfcPattern.test(rfc)
    },
    async login() {
      const button = document.querySelector('button')
      button.disabled = true
      // Validación: RFC no debe estar vacío y debe ser válido
      if (!this.rfc || !this.isValidRFC(this.rfc.toUpperCase())) {
        Swal.fire({
          position: 'top',
          icon: 'warning',
          title: 'Por favor, introduce un RFC válido.',
          showConfirmButton: false,
          timer: 1000
        })
        this.showloading = !this.showloading
        button.disabled = false
        return
      }

      // Validación: Contraseña no debe estar vacía
      if (!this.password) {
        Swal.fire({
          position: 'top',
          icon: 'warning',
          title: 'Por favor, introduce tu contraseña.',
          showConfirmButton: false,
          timer: 1000
        })
        this.showloading = !this.showloading
        button.disabled = false
        return
      }

      try {
        const user = await login(this.rfc.toUpperCase(), this.password)
        console.log(user)
        // Guardar permisos en Vuex
        this.$store.dispatch('setToken', user.token)
        this.$store.dispatch('setUser', user.usuario)

        // guardarlos en localStorage,
        localStorage.setItem('token', user.token)
        localStorage.setItem('user', JSON.stringify(user.usuario))

        const permisos = await getPermisos(this.rfc.toUpperCase())
        localStorage.setItem('permisos', JSON.stringify(permisos))
        this.$store.dispatch('setPermisos', permisos)

        this.$router.push('/')
      } catch (error) {
        Swal.fire({
          position: 'top',
          icon: 'warning',
          title: 'Hubo un problema al iniciar sesión. Por favor intenta de nuevo.',
          text: 'Si el problema persiste, contacta al administrador.',
          showConfirmButton: false,
          timer: 3000
        })
        this.showloading = !this.showloading
        button.disabled = false
      }
    },
    async consultarUsuario() {
      const button = document.querySelector('button')
      button.disabled = true
      try {
        const user = await getUser(this.formRecovery.rfc.toUpperCase())
        console.log(user)
        this.formRecovery.nombreUser = user.user.nombre_Doce
        this.formRecovery.apellidoUser =
          user.user.apellido_paterno + ' ' + user.user.apellido_materno
        this.formRecovery.email = user.user.email
        this.formRecovery.status = user.user.status
        console.log('form', this.formRecovery)
        if (this.formRecovery.status == 0) {
          Swal.fire({
            position: 'top',
            icon: 'warning',
            title: 'Usuario inactivo.',
            text: 'El usuario se encuentra inactivo, por favor contacta al administrador.',
            showConfirmButton: false,
            timer: 3000
          })
        }
        this.showloadingRecovery = !this.showloadingRecovery
        button.disabled = false
      } catch (error) {
        console.log(error)
        console.log('form error', this.formRecovery)
        Swal.fire({
          position: 'top',
          icon: 'warning',
          title: 'Sin registros.',
          text: 'No se encontro ningun usuario.',
          showConfirmButton: false,
          timer: 3000
        })
        this.showloadingRecovery = !this.showloadingRecovery
        button.disabled = false
      }
    },
    async submitForm() {
      this.statusSend = true
      const button = document.querySelector('button')
      button.disabled = true

      const data = {
        rfc: this.formRecovery.rfc,
        to: this.formRecovery.email,
        subject: this.formRecovery.asunto
      }
      await sendEmail(data)
        .then(() => {
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Correo enviado.',
            text: 'Se ha enviado un correo con la información solicitada.',
            showConfirmButton: false,
            timer: 3000
          })
          this.showformRecovery = !this.showformRecovery
          this.resetForm()
          button.disabled = false
          this.statusSend = false
        })
        .catch((error) => {
          console.log(error)
          Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Error al enviar correo.',
            text: 'Hubo un problema al enviar el correo, por favor intenta de nuevo.',
            showConfirmButton: false,
            timer: 3000
          })
          button.disabled = false
          this.statusSend = false
        })
    },
    resetForm() {
      this.formRecovery.rfc = ''
      this.formRecovery.nombreUser = ''
      this.formRecovery.apellidoUser = ''
      this.formRecovery.email = ''
      this.formRecovery.asunto = ''
      this.formRecovery.status = ''
    }
  }
}
</script>
