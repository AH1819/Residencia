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
              href="#"
              class="text-sm font-semibold text-gray-700 hover:text-SecundaryGold focus:text-blue-700"
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

        <p class="mt-6">
          ¿No tienes una cuenta?
          <br />
          <a href="#" class="text-primaryBlue hover:text-SecundaryGold font-semibold">
            Solicita tu cuenta al administrador
          </a>
        </p>

        <p class="text-sm text-gray-500 mt-10">
          &copy; 2023 UNACH - Todos los derechos reversados.
        </p>
      </div>
    </div>
    <div class="bg-blue-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
      <img src="../assets/fondo.jpg" alt="" class="w-full h-full object-cover brightness-75" />
    </div>
  </section>
</template>

<script>
import { login, getPermisos } from '../services/authServices'
import Swal from 'sweetalert2'

export default {
  name: 'Login-auth',
  data() {
    return {
      rfc: '',
      password: '',
      showloading: false,
      show: false
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
        // Guardar permisos en Vuex
        this.$store.dispatch('setToken', user.token)
        this.$store.dispatch('setUser', user.usuario)

        // guardarlos en localStorage,
        localStorage.setItem('token', user.token)
        localStorage.setItem('user', JSON.stringify(user.usuario))

        const permisos = await getPermisos(this.rfc.toUpperCase())
        console.log(permisos)
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
    }
  }
}
</script>
