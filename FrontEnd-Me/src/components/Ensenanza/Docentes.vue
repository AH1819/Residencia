<template>
  <div
    class="md:w-9/12 lg:w-full bg-white dark:bg-[#2D3748] dark:shadow-gray-950 border-transparent shadow-xl border rounded-lg border-gray-300 p-6 mx-auto"
  >
    <button
      @click="(isModalOpen = !isModalOpen), (title = 'Agregar Docente')"
      class="bg-blue-500 text-white px-2 py-2 rounded-md mb-4"
    >
      <span class="pi pi-user-plus mr-2"></span>Agregar Docente
    </button>
    <TableModel :data="dataDocentes" :columns="columnas" :title="'Reporte de actividades PAT'">
      <template #headers>
        <th>RFC</th>
        <th>Nombre</th>
        <th>Apellido Paterno</th>
        <th>Apellido Materno</th>
        <th>N_Plaza</th>
        <th>Status</th>
        <th></th>
      </template>
    </TableModel>
    <!-- Modal -->
    <div v-if="isModalOpen" class="fixed top-0 left-0 w-full h-full z-50 bg-gray-900 bg-opacity-70">
      <div
        class="bg-white dark:bg-[#2D3748] rounded-lg shadow-lg overflow-hidden mx-auto mt-10 w-11/12 md:w-2/3"
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
            @click="(isModalOpen = !isModalOpen), resetForm()"
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
            class="w-full p-2 md:p-4 bg-gray-200 dark:bg-gray-700 grid md:grid-cols-2"
            @submit.prevent="guardarDocente"
            id="formDocente"
          >
            <input type="hidden" v-model="form.editRFC" />
            <div class="w-full px-3 md:mb-4">
              <label class="block text-gray-700 dark:text-white text-sm font-bold mb-2" for="rfc">
                RFC
              </label>
              <input
                v-model="form.rfc"
                id="rfc"
                type="text"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Ej. RFCJ121212ABC"
              />
            </div>
            <div class="w-full px-3 md:mb-4">
              <label
                class="block text-gray-700 dark:text-white text-sm font-bold mb-2"
                for="n_plaza"
              >
                Numero de Plaza
              </label>
              <input
                v-model="form.n_plaza"
                type="text"
                id="n_plaza"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Ej. E036"
              />
            </div>
            <div class="w-full px-3 md:mb-4">
              <label
                class="block text-gray-700 dark:text-white text-sm font-bold mb-2"
                for="password"
              >
                Password
              </label>
              <div class="flex items-center">
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  v-model="form.password"
                  :type="show ? 'password' : 'text'"
                  placeholder="Debe tener al menos 6 caracteres"
                  autocomplete="current-password webauthn"
                />
                <span class="py-2 px-2 cursor-pointer dark:text-white" @click="show = !show"
                  ><i :class="show ? 'pi pi-eye' : 'pi pi-eye-slash'" style="font-size: 1.5rem"></i
                ></span>
              </div>
            </div>
            <div class="w-full px-3 md:mb-4">
              <label class="block text-gray-700 dark:text-white text-sm font-bold mb-2">
                Nombre
              </label>
              <input
                v-model="form.nombre_Doce"
                type="text"
                id="nombre_Doce"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Ej. Juan Jose"
              />
            </div>
            <div class="w-full px-3 md:mb-4">
              <label
                class="block text-gray-700 dark:text-white text-sm font-bold mb-2"
                for="apellido_paterno"
              >
                Apellido Paterno
              </label>
              <input
                v-model="form.apellido_paterno"
                type="text"
                id="apellido_paterno"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Ej. Herrera"
              />
            </div>
            <div class="w-full px-3 md:mb-4">
              <label
                class="block text-gray-700 dark:text-white text-sm font-bold mb-2"
                for="apellido_materno"
              >
                Apellido Materno
              </label>
              <input
                v-model="form.apellido_materno"
                type="text"
                id="apellido_materno"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Ej. Hernandez"
              />
            </div>
            <div class="w-full px-3">
              <label class="block text-gray-700 dark:text-white text-sm font-bold mb-2" for="sexo">
                Sexo
              </label>
              <select
                id="sexo"
                v-model="form.sexo"
                class="block w-full bg-white border border-white rounded py-2 px-3 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option value="null">Selecciona un sexo</option>
                <option value="Hombre">Masculino</option>
                <option value="Mujer">Femenino</option>
                <option value="otro">Otro</option>
              </select>
              <p v-if="!form.sexo || form.sexo === 'null'" class="text-sm text-red-600">
                Por favor, selecciona un sexo
              </p>
            </div>
          </form>
        </div>
        <div class="px-4 py-3 border-t border-gray-200">
          <div class="grid grid-cols-2 mx-3 md:mx-24 md:mt-4">
            <button
              type="submit"
              class="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 m-2"
              form="formDocente"
            >
              Guardar
            </button>
            <button
              class="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 m-2"
              @click="(isModalOpen = !isModalOpen), resetForm()"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableModel from '../TableModel.vue'
import apiEnsenanza from '../../services/apiEnsenanza'
import Swal from 'sweetalert2'

export default {
  name: 'AgregarDocente',
  components: {
    TableModel
  },
  data() {
    return {
      title: null,
      isModalOpen: false,
      show: true,
      form: {
        rfc: '',
        n_plaza: '',
        password: '',
        nombre_Doce: '',
        apellido_paterno: '',
        apellido_materno: '',
        sexo: null
      },
      dataDocentes: [],
      columnas: [
        { data: 'rfc' },
        { data: 'nombre_Doce' },
        { data: 'apellido_paterno' },
        { data: 'apellido_materno' },
        { data: 'n_plaza' },
        {
          title: 'Status',
          data: null,
          render: (data) => {
            return data.status === 1
              ? `<div class="w-full flex items-center justify-center"><button class="btn-status-doce inline-flex items-center rounded-md bg-green-500 px-2 py-2 text-xs font-medium text-white ring-1 ring-inset ring-green-600/10" data-id="${data.rfc}"><i class="pi pi-sync mr-2"></i>Activo</button></div>`
              : `<div class="w-full flex items-center justify-center"><button class="btn-status-doce inline-flex items-center rounded-md bg-red-500 px-2 py-2 text-xs font-medium text-white ring-1 ring-inset ring-red-600/10" data-id="${data.rfc}"><i class="pi pi-sync mr-2"></i>Inactivo</button></div>`
          }
        },
        {
          title: 'Acciones',
          data: null,
          render: (data) => {
            return `
            <div class="w-full flex items-center justify-center">
              <button class="btn-editar bg-yellow-500 text-white p-2 pt-3 rounded-lg mr-2" data-id="${data.rfc}"><i class="pi pi-pencil pointer-events-none"></i></button>
            </div>
            `
          }
        }
      ]
    }
  },
  mounted() {
    this.$store.dispatch('setSelectedOption', 'Enseñanza - Agregar Docente')
    this.obtenerData()
    document.addEventListener('click', this.handleClick)
  },
  beforeUnmount() {
    // Elimina el controlador de eventos de clic cuando el componente se destruye
    document.removeEventListener('click', this.handleClick)
  },
  methods: {
    handleClick(event) {
      // Verificar si se hizo clic en el botón de editar
      if (event.target.matches('.btn-editar')) {
        const id = event.target.getAttribute('data-id')
        this.cargarParaEditar(id)
        this.isModalOpen = !this.isModalOpen
      }

      // Verificar si se hizo clic en el botón de status
      if (event.target.matches('.btn-status-doce')) {
        const id = event.target.getAttribute('data-id')
        const status = this.dataDocentes.find((item) => item.rfc == id).status
        this.cambiarStatus(id, status)
      }
    },
    isValidRFC(rfc) {
      // Ejemplo simple de validación de RFC
      const rfcPattern = /^[A-Z]{3,4}[0-9]{6}[A-Z0-9]{3}$/

      return rfcPattern.test(rfc.toUpperCase())
    },
    obtenerData() {
      apiEnsenanza
        .obtenerDocentes()
        .then((response) => {
          this.dataDocentes = response.data
        })
        .catch((error) => {
          console.error('Error al obtener los registros:', error)
        })
    },
    cargarParaEditar(id) {
      this.title = 'Editar Docente'
      const docentes = this.dataDocentes.find((item) => item.rfc == id)
      if (docentes) {
        this.form.editRFC = docentes.rfc
        this.form.rfc = docentes.rfc
        this.form.n_plaza = docentes.n_plaza
        this.form.password = ''
        this.form.nombre_Doce = docentes.nombre_Doce
        this.form.apellido_paterno = docentes.apellido_paterno
        this.form.apellido_materno = docentes.apellido_materno
        this.form.sexo = docentes.sexo
      }
    },
    guardarDocente() {
      if (this.form.sexo === 'null') {
        console.log('sexo', this.form.sexo)
      }
      if (
        !this.form.rfc ||
        !this.isValidRFC(this.form.rfc) ||
        !this.form.n_plaza ||
        !this.form.nombre_Doce ||
        !this.form.apellido_paterno ||
        !this.form.apellido_materno ||
        !this.form.sexo ||
        this.form.sexo === 'null'
      ) {
        Swal.fire({
          title: 'Datos incompletos',
          text: 'Debes ingresar todos los datos',
          icon: 'warning'
        })
        return
      }
      const data = {
        editRFC: this.form.editRFC,
        rfc: this.form.rfc.toUpperCase(),
        n_plaza: this.form.n_plaza,
        password: this.form.password,
        nombre_Doce: this.form.nombre_Doce,
        apellido_paterno: this.form.apellido_paterno,
        apellido_materno: this.form.apellido_materno,
        sexo: this.form.sexo
      }

      let promise

      if (this.form.editRFC) {
        promise = apiEnsenanza.actualizarDocente(this.form.editRFC, data)
      } else {
        if (this.form.password.length < 6) {
          Swal.fire({
            title: 'Contraseña corta',
            text: 'La contraseña debe tener al menos 6 caracteres',
            icon: 'warning'
          })
          return
        }
        const validrfc = this.dataDocentes.find((item) => item.rfc == this.form.rfc)
        if (validrfc) {
          Swal.fire({
            title: 'RFC ya registrado',
            text: 'El RFC ya se encuentra registrado',
            icon: 'warning'
          })
          return
        }
        promise = apiEnsenanza.insertarDocente(data)
      }

      promise
        .then(() => {
          Swal.fire({
            title: 'Operación exitosa',
            text: this.form.editRFC
              ? 'El docente ha sido editado correctamente'
              : 'El docente ha sido asignado correctamente',
            icon: 'success'
          })
          this.resetForm()
          this.obtenerData()
        })
        .catch(() => {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error al realizar la operación',
            icon: 'error'
          })
          this.resetForm()
        })
    },
    cambiarStatus(id, status) {
      Swal.fire({
        title: '¿Estas seguro?',
        text: '¡Esta opcion puede afectar los inicios de sesion!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, cambiar'
      }).then((result) => {
        if (result.isConfirmed) {
          const data = {
            rfc: id,
            status: status === 1 ? 0 : 1
          }
          apiEnsenanza
            .actualizarDocente(data.rfc, data)
            .then(() => {
              Swal.fire({
                title: `Status Actualizado`,
                text: `El estado del docente ha sido cambiado.`,
                icon: 'success'
              })
              this.obtenerData()
            })
            .catch(() => {
              Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al actualizar el docente.',
                icon: 'error'
              })
            })
        }
      })
    },
    resetForm() {
      this.form.editRFC = ''
      this.form.rfc = ''
      this.form.n_plaza = ''
      this.form.password = ''
      this.form.nombre_Doce = ''
      this.form.apellido_paterno = ''
      this.form.apellido_materno = ''
      this.form.sexo = null
      this.isModalOpen = false
      this.isModalPermisos = false
    }
  }
}
</script>
