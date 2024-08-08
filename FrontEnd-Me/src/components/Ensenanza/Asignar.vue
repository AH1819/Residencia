<template>
  <div
    class="md:w-9/12 lg:w-full bg-white dark:bg-[#2D3748] dark:shadow-gray-950 border-transparent shadow-xl border rounded-lg border-gray-300 p-6 mx-auto"
  >
    <button
      @click="(isModalOpen = !isModalOpen), (title = 'Asignar Materia')"
      class="bg-blue-500 text-white px-2 py-2 rounded-md mb-4"
    >
      <span class="pi pi-sitemap mr-2"></span>Asignar Materia
    </button>
    <TableModel 
    :data="dataDetalleDocente" 
    :columns="columns" 
    :titleProp="'Reporte de Materias Asignadas'" 
    :seccionProp="'COOR. DE INGENIERÍA EN DESARROLLO Y TECNOLOGÍAS DE SOFTWARE'">
      <template #headers>
        <th>ID</th>
        <th>Docente</th>
        <th>Materia</th>
        <th>Acciones</th>
      </template>
    </TableModel>
    <div v-if="isModalOpen" class="fixed top-0 left-0 w-full h-full z-50 bg-gray-900 bg-opacity-70">
      <div
        class="bg-white dark:bg-[#2D3748] rounded-lg shadow-lg overflow-hidden mx-auto mt-10 w-2/3 md:w-2/6"
      >
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">{{ title }}</h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            @click="resetForm()"
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
          <form @submit.prevent="submitForm" id="form-asig">
            <div class="w-full px-3 mb-4">
              <label class="block text-gray-700 dark:text-white text-sm font-bold mb-2"
                >Docente</label
              >
              <select
                v-model="form.docente"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="" disabled selected>Selecciona un docente</option>
                <option v-for="docente in docentes" :key="docente.rfc" :value="docente.rfc">
                  {{ docente.nombre_Doce + ' - ' + docente.rfc }}
                </option>
              </select>
            </div>
            <div class="w-full px-3 mb-4">
              <label class="block text-gray-700 dark:text-white text-sm font-bold mb-2"
                >Materia</label
              >
              <select
                v-model="form.materias"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="" disabled selected>Selecciona una materia</option>
                <option
                  v-for="materia in materias"
                  :key="materia.idMateria"
                  :value="materia.idMateria"
                >
                  {{ materia.nombreMateria }}
                </option>
              </select>
            </div>
          </form>
        </div>
        <div class="px-4 py-3 border-t border-gray-200">
          <div class="grid grid-cols-2 mx-3">
            <button
              type="submit"
              class="bg-green-500 text-white p-2 rounded hover:bg-green-600 m-2"
              form="form-asig"
            >
              Guardar
            </button>
            <button
              class="bg-red-500 text-white p-2 rounded hover:bg-red-600 m-2"
              @click="resetForm()"
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
import apiEnsenanza from '@/services/apiEnsenanza'
import Swal from 'sweetalert2'
export default {
  name: 'Asignar-auth',
  components: {
    TableModel
  },
  mounted() {
    this.$store.dispatch('setSelectedOption', 'Enseñanza - Asignar Materia')
    this.obtenerData()
    this.obtenerDocentes()
    this.obtenerMaterias()
    this.$nextTick(() => {
      document.addEventListener('click', (event) => {
        // Verificar si se hizo clic en el botón de editar
        if (event.target.matches('.btn-editar-asig')) {
          const id = event.target.getAttribute('data-id')
          this.cargarParaEditar(id)
        }
        // Verificar si se hizo clic en el botón de eliminar
        if (event.target.matches('.btn-eliminar-asig')) {
          const id = event.target.getAttribute('data-id')
          this.eliminar(id)
        }
      })
    })
  },
  data() {
    return {
      dataDetalleDocente: [],
      docentes: [],
      materias: [],
      isModalOpen: false,
      title: '',
      form: {
        id_Det_d: '',
        docente: '',
        materias: ''
      },
      columns: [
        { data: 'id_Det_d' },
        { data: 'nombre_doce' },
        { data: 'nombreMateria' },
        {
          title: 'Acciones',
          data: null,
          render: (data) => {
            return `
            <div class="w-full flex items-center justify-center">
                        <button class="btn-editar-asig bg-yellow-500 text-white p-2 pt-3 rounded mr-2" data-id="${data.id_Det_d}"><i class="pi pi-pencil pointer-events-none"></i></button>
                        <button class="btn-eliminar-asig bg-red-500 text-white  p-2 pt-3  rounded" data-id="${data.id_Det_d}"><i class="pi pi-trash pointer-events-none"></i></button>
                    </div>
                      `
          }
        }
      ]
    }
  },
  methods: {
    obtenerDocentes() {
      apiEnsenanza
        .obtenerDocentes()
        .then((response) => {
          this.docentes = response.data
            .filter((docente) => docente.status === 1)
            .map((docente) => {
              return {
                rfc: docente.rfc,
                nombre_Doce:
                  docente.nombre_Doce +
                  ' ' +
                  docente.apellido_paterno +
                  ' ' +
                  docente.apellido_materno,
                status: docente.status
              }
            })
          if (this.docentes.length == 0) {
            Swal.fire({
              title: 'No hay docentes',
              text: 'No hay docentes registrados en el sistema',
              icon: 'warning'
            })
          }
        })
        .catch((error) => {
          console.error('Error al obtener los docentes:', error)
        })
    },
    obtenerMaterias() {
      apiEnsenanza
        .obtenerMaterias()
        .then((response) => {
          this.materias = response.data
          if (this.materias.length == 0) {
            Swal.fire({
              title: 'No hay materias',
              text: 'No hay materias registradas en el sistema',
              icon: 'warning'
            })
          }
        })
        .catch((error) => {
          console.error('Error al obtener las materias:', error)
        })
    },
    obtenerData() {
      apiEnsenanza
        .obtenerDetalleDocente()
        .then((response) => {
          this.dataDetalleDocente = response.data
        })
        .catch((error) => {
          console.error('Error al obtener las actividades:', error)
        })
    },
    cargarParaEditar(id) {
      const detalleDocente = this.dataDetalleDocente.find((detalle) => detalle.id_Det_d == id)
      console.log(detalleDocente)
      this.form = {
        id_Det_d: detalleDocente.id_Det_d,
        docente: detalleDocente.docente,
        materias: detalleDocente.materia
      }
      console.log(this.form)
      this.isModalOpen = true
      this.title = 'Editar Materia'
    },
    eliminar(id) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          apiEnsenanza
            .eliminarDetalleDocente(id) // Asumiendo que tienes un método así en tu API
            .then(() => {
              Swal.fire('Eliminado', 'El detalle ha sido eliminado.', 'success')
              this.obtenerData() // Actualizar los datos
            })
            .catch(() => {
              Swal.fire({
                title: 'Error',
                text: 'Hubo un error al eliminar el detalle',
                icon: 'error'
              })
            })
        }
      })
    },
    submitForm() {
      if (!this.form.docente || !this.form.materias) {
        Swal.fire({
          title: 'Datos incompletos',
          text: 'Debes seleccionar tanto un docente como una materia',
          icon: 'warning'
        })
        return
      }
      if (
        this.dataDetalleDocente.find(
          (detalle) =>
            detalle.docente == this.form.docente &&
            detalle.materia == this.form.materias &&
            detalle.id_Det_d != this.form.id_Det_d
        )
      ) {
        Swal.fire({
          title: 'Datos duplicados',
          text: 'El docente ya tiene asignada la materia',
          icon: 'warning'
        })
        return
      }
      const data = {
        id_Det_d: this.form.id_Det_d,
        docente: this.form.docente,
        materias: this.form.materias
      }
      let promise

      if (this.form.id_Det_d) {
        promise = apiEnsenanza.editarMateriaDocente(this.form.id_Det_d, data)
      } else {
        promise = apiEnsenanza.asignarMateriaDocente(data)
      }

      promise
        .then(() => {
          Swal.fire({
            title: 'Operación exitosa',
            text: this.form.id_Det_d
              ? 'La materia ha sido editado correctamente'
              : 'La materia ha sido asignado correctamente',
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
        })
    },
    resetForm() {
      this.isModalOpen = false
      this.form.id_Det_d = ''
      this.form.docente = ''
      this.form.materias = ''
    }
  }
}
</script>
