<template>
  <div
    class="md:w-9/12 lg:w-full bg-white dark:bg-[#2D3748] dark:shadow-gray-950 border-transparent shadow-xl border rounded-lg border-gray-300 p-6 mx-auto"
  >
    <button
      class="bg-blue-500 text-white px-2 py-2 rounded-md mb-4"
      @click="(showModal = !showModal), (titleModal = 'Agregar materia')"
    >
      <span class="pi pi-book mr-2"></span>Agregar Materia
    </button>
    <TableModel
      :data="dataMaterias"
      :columns="columns"
      :titleProp="'Reporte de Registro de Materias'"
      :seccionProp="'COOR. DE INGENIERÍA EN DESARROLLO Y TECNOLOGÍAS DE SOFTWARE'"
    >
      <template #headers>
        <th>ID</th>
        <th>Nombre</th>
        <th>Semestre</th>
        <th>Grupo</th>
        <th>Programa Academico</th>
        <th>Acciones</th>
      </template>
    </TableModel>
    <!-- Modal -->
    <div v-if="showModal" class="fixed top-0 left-0 w-full h-full z-50 bg-gray-900 bg-opacity-70">
      <div
        class="bg-white dark:bg-[#2D3748] rounded-lg shadow-lg overflow-hidden mx-auto mt-10 w-10/12 md:w-3/5"
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
            @click="(showModal = !showModal), limpiarForm()"
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
          <form @submit.prevent="submitForm" class="w-full px-3 md:mb-4" id="form-materia">
            <div class="w-full mb-4">
              <label
                class="block text-gray-700 dark:text-white text-sm font-bold mb-2"
                for="nombreMateria"
              >
                Nombre de la materia
              </label>
              <input
                v-model="form.nombreMateria"
                id="nombreMateria"
                type="text"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Ej. Programación"
              />
            </div>
            <div class="w-full md:flex">
              <div class="w-full md:w-2/5 md:pr-2 mb-4">
                <label
                  class="block text-gray-700 dark:text-white text-sm font-bold mb-2"
                  for="semestre"
                >
                  Semestre
                </label>
                <select
                  v-model="form.semestre"
                  id="semestre"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="" disabled selected>Seleccione un semestre</option>
                  <option
                    v-for="semestre in semestre"
                    :key="semestre.is_SG"
                    :value="semestre.is_SG"
                  >
                    {{ semestre.nombresemestre }}
                  </option>
                </select>
              </div>
              <div class="w-full md:pl-2 mb-4">
                <label
                  class="block text-gray-700 dark:text-white text-sm font-bold mb-2"
                  for="programa-academico"
                >
                  Programa academico
                </label>
                <select
                  v-model="form.prog_academicos"
                  id="programa-academico"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="" disabled selected>Seleccione un programa academico</option>
                  <option
                    v-for="prog in prog_academicos"
                    :key="prog.idprog_academicos"
                    :value="prog.idprog_academicos"
                  >
                    {{ prog.nombreProg }}
                  </option>
                </select>
              </div>
            </div>
          </form>
        </div>

        <div class="px-4 py-3 border-t border-gray-200">
          <div class="grid grid-cols-2 mx-3 md:mx-24 md:mt-4">
            <button
              type="submit"
              class="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 m-2"
              form="form-materia"
            >
              Guardar
            </button>
            <button
              class="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 m-2"
              @click="(showModal = !showModal), limpiarForm()"
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
import TableModel from '@/components/TableModel.vue'
import apiEnsenanza from '@/services/apiEnsenanza'
import Swal from 'sweetalert2'
export default {
  name: 'Materias-auth',
  components: {
    TableModel
  },
  mounted() {
    this.$store.dispatch('setSelectedOption', 'Enseñanza - Materias')
    this.obtenerData()
    this.$nextTick(() => {
      document.addEventListener('click', (event) => {
        // Verificar si se hizo clic en el botón de editar
        if (event.target.matches('.btn-editar-materia')) {
          const id = event.target.getAttribute('data-id')
          this.cargarParaEditar(id)
        }
      })
    })
  },
  data() {
    return {
      showModal: false,
      titleModal: '',
      dataMaterias: [],
      semestre: [],
      prog_academicos: [],
      form: {
        idMateria: '',
        nombreMateria: '',
        semestre: '',
        prog_academicos: ''
      },
      columns: [
        { data: 'idMateria' },
        { data: 'nombreMateria' },
        { data: 'nombresemestre' },
        { data: 'grupo' },
        { data: 'nombreProg' },
        {
          title: 'Acciones',
          data: null,
          render: (data) => {
            return `<div class="w-full flex items-center justify-center">
                        <button class="btn-editar-materia bg-yellow-500 text-white p-2 pt-2 rounded mr-2" data-id="${data.idMateria}"><i class="pi pi-pencil pointer-events-none"></i></button>
                    </div>`
          }
        }
      ]
    }
  },
  created() {
    this.fetchSemestre()
    this.fetchProg()
  },
  methods: {
    obtenerData() {
      apiEnsenanza
        .obtenerMaterias()
        .then((response) => {
          this.dataMaterias = response.data
          console.log(this.dataMaterias)
        })
        .catch((error) => {
          console.error('Error al obtener las actividades:', error)
        })
    },
    fetchSemestre() {
      apiEnsenanza
        .getSemestre()
        .then((response) => {
          this.semestre = response.data.map((semestre) => ({
            ...semestre,
            nombresemestre: `${semestre.semestre} - ${semestre.grupo}`
          }))
        })
        .catch((error) => {
          console.error('Error al obtener los semestres:', error)
        })
    },
    fetchProg() {
      apiEnsenanza
        .getProg()
        .then((response) => {
          this.prog_academicos = response.data
        })
        .catch((error) => {
          console.error('Error al obtener los programas academicos:', error)
        })
    },
    cargarParaEditar(id) {
      console.log(id)
      const materia = this.dataMaterias.find((item) => item.idMateria == id)
      if (materia) {
        this.showModal = true
        this.titleModal = 'Editar materia'
        console.log(materia)
        this.form.idMateria = materia.idMateria
        this.form.nombreMateria = materia.nombreMateria
        this.form.semestre = materia.semestre
        this.form.prog_academicos = materia.prog_academico
      }
    },
    limpiarForm() {
      this.form.idMateria = ''
      this.form.nombreMateria = ''
      this.form.semestre = ''
      this.form.prog_academicos = ''
      this.showModal = false
    },
    submitForm() {
      if (!this.form.nombreMateria || !this.form.semestre || !this.form.prog_academicos) {
        Swal.fire({
          title: 'Datos incompletos',
          text: 'Debes seleccionar los datos',
          icon: 'warning'
        })
        return
      }
      const data = {
        idMateria: this.form.idMateria,
        nombreMateria: this.form.nombreMateria,
        semestre: this.form.semestre,
        prog_academicos: this.form.prog_academicos
      }

      let promise

      if (this.form.idMateria) {
        console.log('Actualizar')
        console.log(data)
        promise = apiEnsenanza.actualizarMateria(this.form.idMateria, data)
      } else {
        promise = apiEnsenanza.insertarMateria(data)
      }

      promise
        .then(() => {
          Swal.fire({
            title: 'Operación exitosa',
            text: this.form.idMateria
              ? 'La materia ha sido editado correctamente'
              : 'La materia ha sido asignado correctamente',
            icon: 'success'
          })
          this.limpiarForm()
          this.obtenerData()
        })
        .catch(() => {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error al realizar la operación',
            icon: 'error'
          })
          this.limpiarForm()
        })
    }
  }
}
</script>
