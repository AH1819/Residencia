<template>
  <!--Modal: Lista de colaboradores-->
  <div v-if="showModal" class="fixed top-0 left-0 w-full h-full z-50 bg-gray-900 bg-opacity-70">
    <div
      class="bg-white dark:bg-[#2D3748] rounded-lg shadow-lg overflow-hidden mx-auto mt-10 w-11/12 md:w-2/3"
    >
      <div
        class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
      >
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
          Lista de colaboradores <span class="text-xs">(Máximo 5)</span>
        </h3>
        <button
          type="button"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          @click="$emit('close'), (colaboradores = [])"
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

      <div class="p-4 max-h-96 overflow-y-auto">
        <button
          class="bg-blue-500 text-white px-2 py-2 rounded-md mb-2"
          @click="agregarColab(), (titleModal = 'Agregar colaborador')"
        >
          <span class="pi pi-user-plus mr-2"></span>Agregar Colaborador
        </button>
        <TableModel
          :data="colaboradores"
          :columns="columns"
          :title="'Reporte de Proyectos de Investigacion'"
          :optionsBnt="'ft'"
        >
          <template #headers>
            <th>ID</th>
            <th>Nombre del Colaborador</th>
            <th>Tipo de Colaborador</th>
            <th>Acciones</th>
          </template>
        </TableModel>
      </div>

      <div class="px-4 py-3 border-t border-gray-200">
        <button
          @click="$emit('close'), (colaboradores = [])"
          class="bg-blue-500 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>

  <div
    v-if="showModalAgregar"
    class="fixed top-0 left-0 w-full h-full z-50 bg-gray-900 bg-opacity-70"
  >
    <div
      class="bg-white dark:bg-[#2D3748] rounded-lg shadow-lg overflow-hidden mx-auto mt-10 w-10/12 lg:w-1/3"
    >
      <div
        class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
      >
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
          {{ titleModal }}
        </h3>
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

      <div class="p-4 max-h-96 overflow-y-auto">
        <form class="w-full" id="form-colab" @submit.prevent="submitForm">
          <input type="hidden" v-model="form.idColaborador" />
          <input type="hidden" v-model="form.idProyecto" />

          <!-- Tipo de colaborador -->
          <ul class="grid w-full gap-6 grid-cols-2 mb-4 px-3">
            <li>
              <input
                type="radio"
                id="Docente-radio"
                name="tipo-lider"
                value="Docente"
                v-model="form.tipoColaborador"
                class="hidden peer"
              />
              <label
                for="Docente-radio"
                class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div class="block">
                  <div class="w-full text-lg font-semibold select-none">Docente</div>
                </div>
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="Alumno-radio"
                name="tipo-lider"
                value="Alumno"
                v-model="form.tipoColaborador"
                class="hidden peer"
              />
              <label
                for="Alumno-radio"
                class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div class="block">
                  <div class="w-full text-lg font-semibold select-none">Alumno</div>
                </div>
              </label>
            </li>
          </ul>
          <p v-if="!form.tipoColaborador" class="text-sm text-red-600 mb-4 px-3">
            Por favor, selecciona un tipo de colaborador
          </p>
          <template v-if="form.tipoColaborador">
            <div class="w-full px-3 md:mb-4">
              <label
                class="block uppercase tracking-wide text-gray-900 dark:text-white text-xs font-bold mb-2"
                for="nombreColaborador"
              >
                Nombre del Colaborador:
              </label>
              <input
                v-if="form.tipoColaborador === 'Alumno'"
                class="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="nombreColaborador"
                v-model="form.nombreColaborador"
                type="text"
                placeholder="Nombre completo del colaborador"
              />
              <select
                v-else-if="form.tipoColaborador === 'Docente'"
                id="nombreColaborador"
                v-model="form.nombreColaborador"
                class="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option value="">Selecciona una opcion</option>
                <option v-for="docente in docentes" :key="docente.rfc" :value="docente.nombre_Doce">
                  {{ docente.nombre_Doce + ' - ' + docente.rfc }}
                </option>
              </select>
            </div>
          </template>
        </form>
      </div>

      <div class="px-4 py-3 border-t border-gray-200">
        <div class="grid grid-cols-2 mx-3 md:mx-24 md:mt-4">
          <button
            type="submit"
            class="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 m-2"
            form="form-colab"
          >
            Guardar
          </button>
          <button
            class="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 m-2"
            @click="resetForm()"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiInvestigacion from '@/services/apiInvestigacion'
import apiEnsenanza from '@/services/apiEnsenanza'
import Swal from 'sweetalert2'
import TableModel from '@/components/TableModel.vue'

export default {
  name: 'ColaboradoresModal',
  components: {
    TableModel
  },
  props: {
    showModal: {
      type: Boolean,
      default: false
    },
    projectId: {
      type: String,
      required: true
    },
    liderRfc: {
      type: String,
      required: true
    }
  },
  emits: ['close', 'cambio-realizado'],
  data() {
    return {
      colaboradores: [],
      showModalAgregar: false,
      titleModal: null,
      maxColaboradores: 5,
      docentes: [],
      form: {
        idColaborador: '',
        idProyecto: '',
        nombreColaborador: '',
        tipoColaborador: ''
      },
      columns: [
        { data: 'id_colaborador' },
        { data: 'nombre' },
        { data: 'tipo' },
        {
          title: 'Acciones',
          data: null,
          render: (data) => {
            return `
            <div class="w-full flex items-center justify-center">
                        <button class="btn-editar-colaborador bg-yellow-500 text-white p-2 pt-2 rounded mr-2" data-id="${data.id_colaborador}"><i class="pi pi-pencil pointer-events-none"></i></button>
                        <button class="btn-eliminar-colaborador bg-red-500 text-white  p-2 pt-2  rounded" data-id="${data.id_colaborador}"><i class="pi pi-trash pointer-events-none"></i></button>
                    </div>
                      `
          }
        }
      ]
    }
  },
  watch: {
    showModal(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.obtenerColaboradores()
          this.form.idProyecto = this.projectId
          this.cargarDocentes()
        })
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      document.addEventListener('click', (event) => {
        // Verificar si se hizo clic en el botón de editar
        if (event.target.matches('.btn-editar-colaborador')) {
          const id = event.target.getAttribute('data-id')
          this.cargarParaEditar(id)
        }

        // Verificar si se hizo clic en el botón de eliminar
        if (event.target.matches('.btn-eliminar-colaborador')) {
          const id = event.target.getAttribute('data-id')
          this.eliminarColaborador(id)
        }
      })
    })
  },
  methods: {
    obtenerColaboradores() {
      apiInvestigacion
        .obtenerColaboradores(this.projectId)
        .then((response) => {
          this.colaboradores = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    cargarDocentes() {
      apiEnsenanza
        .obtenerDocentes()
        .then((response) => {
          this.docentes = response.data
            .filter((docente) => docente.status === 1 && docente.rfc !== this.liderRfc)
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
        })
        .catch((error) => {
          console.log(error)
        })
    },
    agregarColab() {
      // Verifica si ya se alcanzó el límite de colaboradores
      if (this.colaboradores.length >= this.maxColaboradores) {
        Swal.fire({
          title: 'Límite alcanzado',
          text: `No puedes agregar más de ${this.maxColaboradores} colaboradores.`,
          icon: 'warning'
        })
        return
      }
      this.showModalAgregar = true
    },
    cargarParaEditar(id) {
      this.titleModal = 'Editar colaborador'
      const colaborador = this.colaboradores.find((item) => item.id_colaborador == id)
      if (colaborador) {
        this.form.idColaborador = colaborador.id_colaborador
        this.form.nombreColaborador = colaborador.nombre
        this.form.tipoColaborador = colaborador.tipo
        this.showModalAgregar = true
      }
    },
    resetForm() {
      this.form.idColaborador = ''
      this.form.nombreColaborador = ''
      this.form.tipoColaborador = ''
      this.showModalAgregar = false
    },
    submitForm() {
      const data = {
        idColaborador: this.form.idColaborador,
        idProyecto: this.form.idProyecto,
        nombreColaborador: this.form.nombreColaborador,
        tipoColaborador: this.form.tipoColaborador
      }
      // Verifica si los campos del formulario están vacíos
      if (!this.form.nombreColaborador || !this.form.tipoColaborador || !this.form.idProyecto) {
        Swal.fire({
          title: 'Datos incompletos',
          text: 'Por favor rellena todos los campos',
          icon: 'warning'
        })
        return
      }

      if (this.form.idColaborador === null || this.form.idColaborador === '') {
        apiInvestigacion
          .insertarColaborador(data)
          .then(() => {
            Swal.fire({
              title: 'Colaborador agregado',
              text: 'El colaborador se ha agregado exitosamente',
              icon: 'success'
            })
            this.resetForm()
            this.obtenerColaboradores()
            this.$emit('cambio-realizado')
          })
          .catch((error) => {
            console.log(error)
            Swal.fire({
              title: 'Error',
              text: 'Hubo un error enviando el formulario',
              icon: 'error'
            })
          })
      } else if (this.form.idColaborador != null || this.form.idColaborador != '') {
        apiInvestigacion
          .editarColaborador(this.form.idColaborador, data)
          .then(() => {
            Swal.fire({
              title: 'Colaborador actualizado',
              text: 'El colaborador se ha actualizado exitosamente',
              icon: 'success'
            })
            this.resetForm()
            this.obtenerColaboradores()
          })
          .catch(() => {
            Swal.fire({
              title: 'Error',
              text: 'Hubo en error al actualizar al colaborador ',
              icon: 'error'
            })
          })
      }
    },
    eliminarColaborador(id) {
      Swal.fire({
        title: '¿Estás seguro de que deseas quitar este colaborador del proyecto?',
        text: 'Si quitas este colaborador, no podrás recuperarlo.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
          apiInvestigacion
            .eliminarColaborador(id)
            .then(() => {
              Swal.fire('Eliminado!', 'El registro fue eliminado correctamente', 'success')
              this.obtenerColaboradores()
              this.$emit('cambio-realizado')
            })
            .catch(() => {
              Swal.fire('Error!', 'Hubo un error eliminando el registro', 'error')
            })
        }
      })
    }
  }
}
</script>
