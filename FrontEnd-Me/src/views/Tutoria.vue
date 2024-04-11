<template>
  <div
    class="md:w-9/12 lg:w-full bg-white dark:bg-[#2D3748] dark:shadow-gray-950 border-transparent shadow-xl border rounded-lg border-gray-300 p-6 mx-auto"
  >
    <button
      class="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 mr-4"
      @click="(isModalOpen = !isModalOpen), (title = 'Registrar Actividad')"
    >
      <i class="pi pi-plus"></i>
      Registrar Actividad
    </button>
    <button
      class="bg-blue-500 hover:bg-blue-600 text-white px-2 py-2 rounded-md mb-4"
      :class="
        actividades.length === 0
          ? 'pointer-events-none opacity-50'
          : isFilter
            ? 'bg-red-500 hover:bg-red-600'
            : 'pointer-events-auto'
      "
      @click="
        (isFilter = !isFilter),
          (tipoFiltrado.fechaInicio = ''),
          (tipoFiltrado.fechaFin = ''),
          filtrarActividades()
      "
    >
      <span class="pi pi-filter mr-2"></span>Filtrar
    </button>
    <div
      v-if="isFilter"
      class="w-full bg-white dark:bg-[#2D3748] border rounded-lg border-gray-500 dark:border-gray-200 p-6 mx-auto"
    >
      <div class="w-full grid gap-3 md:grid-cols-3">
        <div class="w-full mb-3">
          <label
            class="block uppercase tracking-wide text-gray-900 dark:text-white text-xs font-bold mt-2 mb-2"
            for="fechaInicio"
          >
            Fecha Inicio
          </label>
          <input
            type="date"
            id="fechaInicio"
            v-model="tipoFiltrado.fechaInicio"
            @change="filtrarActividades()"
            class="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>
        <div class="w-full mb-3">
          <label
            class="block uppercase tracking-wide text-gray-900 dark:text-white text-xs font-bold mt-2 mb-2"
            for="fechaFin"
          >
            Fecha Fin
          </label>
          <input
            type="date"
            id="fechaFin"
            v-model="tipoFiltrado.fechaFin"
            @change="filtrarActividades()"
            class="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>
        <div class="w-full mb-3">
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-red-600 hover:text-gray-200 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-red-600 dark:hover:text-white"
            @click="
              (isFilter = !isFilter),
                (tipoFiltrado.fechaInicio = ''),
                (tipoFiltrado.fechaFin = ''),
                filtrarActividades()
            "
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
            <span class="sr-only">Reset</span>
          </button>
        </div>
      </div>
    </div>
    <TableModel
      :data="actividadesFiltradas"
      :columns="columns"
      :title="'Reporte de Proyectos de Investigacion'"
    >
      <template #headers>
        <th>No_Actividad</th>
        <th>Nombre</th>
        <th>Descripcion</th>
        <th>Fecha</th>
        <th>Programa Academico</th>
        <th>Evidencias</th>
        <th>Acciones</th>
      </template>
    </TableModel>
    <div v-if="isModalOpen" class="fixed top-0 left-0 w-full h-full z-50 bg-gray-900 bg-opacity-70">
      <div
        class="bg-white dark:bg-[#2D3748] rounded-lg shadow-lg overflow-hidden mx-auto mt-10 w-4/5 md:w-11/12 lg:w-4/6"
      >
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">{{ title }}</h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            @click="resetForm(), (isModalOpen = !isModalOpen)"
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
        <div class="py-1 px-3 max-h-96 overflow-y-auto">
          <form @submit.prevent="submitForm" id="form-tutorias">
            <div class="w-full px-3">
              <label
                for="nombreActividad-modal"
                class="block uppercase tracking-wide text-gray-900 dark:text-white text-xs font-bold mt-2 mb-2"
                >Nombre de la actividad</label
              >
              <input
                id="nombreActividad-modal"
                type="text"
                class="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="Simposio de tutorías"
                v-model="form.nombre"
              />
            </div>
            <div class="grid md:grid-cols-2">
              <div class="w-full px-3">
                <label
                  for="fecha-modal"
                  class="block uppercase tracking-wide text-gray-900 dark:text-white text-xs font-bold mt-2 mb-2"
                  >Fecha</label
                >
                <input
                  id="fecha-modal"
                  type="date"
                  class="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  v-model="form.fecha"
                />
              </div>
              <div class="w-full px-3">
                <label
                  for="materia-modal"
                  class="block uppercase tracking-wide text-gray-900 dark:text-white text-xs font-bold mt-2 mb-2"
                  >Programa academico</label
                >
                <select
                  id="materia-modal"
                  class="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  v-model="form.prog_academico"
                >
                  <option value="" selected>Selecciona una materia</option>
                  <option
                    v-for="praca in programasAcademicos"
                    :key="praca.idprog_academicos"
                    :value="praca.idprog_academicos"
                  >
                    {{ praca.nombreProg }}
                  </option>
                </select>
              </div>
            </div>
            <div class="w-full px-3 mb-4">
              <label
                for="textarea"
                class="block uppercase tracking-wide text-gray-900 dark:text-white text-xs font-bold mt-2 mb-2"
                >Descripcion</label
              >
              <textarea
                id="textarea"
                class="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="Escribe una descripción de la actividad"
                v-model="form.descripcion"
              ></textarea>
            </div>
          </form>
        </div>
        <div class="px-4 py-3 border-t border-gray-200">
          <div class="grid grid-cols-2 mx-6">
            <button
              type="submit"
              class="bg-green-500 text-white p-2 rounded hover:bg-green-600 m-2"
              form="form-tutorias"
            >
              Guardar
            </button>
            <button
              class="bg-red-500 text-white p-2 rounded hover:bg-red-600 m-2"
              @click="resetForm(), (isModalOpen = !isModalOpen)"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
    <EvidenciasModal
      :showModal="showEvid"
      :actividadId="form.id_act.toString()"
      @close="showEvid = false"
      @cambio-realizado="obtenerActividades()"
    />
  </div>
</template>

<script>
import TableModel from '@/components/TableModel.vue'
import apiTutorias from '@/services/apiTutorias'
import EvidenciasModal from '@/components/Tutoria/Modals/EvidenciasModal.vue'
import Swal from 'sweetalert2'
export default {
  name: 'Tutoria-auth',
  components: {
    TableModel,
    EvidenciasModal
  },
  data() {
    return {
      actividades: [],
      actividadesFiltradas: [],
      form: {
        id_act: '',
        nombre: '',
        fecha: '',
        descripcion: '',
        prog_academico: ''
      },
      programasAcademicos: [],
      isModalOpen: false,
      showEvid: false,
      title: '',
      isFilter: false,
      tipoFiltrado: {
        fechaInicio: '',
        fechaFin: ''
      },
      columns: [
        { data: 'idActTutorias' },
        { data: 'nombreActTutorias' },
        { data: 'descripcionActTutorias' },
        {
          data: 'fechaActTutorias',
          render: (data) => {
            return this.formatDate(data)
          }
        },
        { data: 'nombreProg' },
        {
          data: null,
          title: 'Evidencias',
          render: (data) => {
            return `<div class="w-full flex items-center justify-center">
              <button class="btn-evidencias-actividad-tutoria bg-gray-500 text-white p-2 pt-2 rounded font-medium text-xs" data-id="${data.idActTutorias}">Evidencias(${data.cantidad_evidencias})</button>
                        </div>`
          }
        },
        {
          title: 'Acciones',
          data: null,
          render: (data) => {
            return `<div class="w-full flex items-center justify-center">
                        <button class="btn-editar-actividad-tutoria bg-yellow-500 text-white p-2 rounded mr-2" data-id="${data.idActTutorias}"><i class="pi pi-pencil pointer-events-none"></i></button>
                        <button class="btn-eliminar-actividad-tutoria bg-red-500 text-white  p-2 rounded mr-2" data-id="${data.idActTutorias}"><i class="pi pi-trash pointer-events-none"></i></button>
                        </div>
                      `
          }
        }
      ]
    }
  },
  mounted() {
    this.$store.dispatch('setSelectedOption', 'Programa de Accion Tutorial (PAT)')
    this.obtenerActividades()
    this.getProgramasAcademicos()

    this.$nextTick(() => {
      document.addEventListener('click', (event) => {
        if (event.target.matches('.btn-editar-actividad-tutoria')) {
          const id = parseInt(event.target.getAttribute('data-id'))
          this.cargarDatosParaEditar(id)
        }
      })

      document.addEventListener('click', (event) => {
        if (event.target.matches('.btn-eliminar-actividad-tutoria')) {
          const id = parseInt(event.target.getAttribute('data-id'))
          this.eliminarActividad(id)
        }
      })

      document.addEventListener('click', (event) => {
        if (event.target.matches('.btn-evidencias-actividad-tutoria')) {
          const id = parseInt(event.target.getAttribute('data-id'))
          this.mostrarEvidencias(id)
        }
      })
    })
  },
  methods: {
    obtenerActividades() {
      apiTutorias
        .obtenerActividades()
        .then((response) => {
          this.actividades = response.data
          this.actividadesFiltradas = response.data
        })
        .catch((error) => {
          console.error('Error al obtener las actividades:', error)
        })
    },
    getProgramasAcademicos() {
      apiTutorias
        .buscarProgAcademico()
        .then((response) => {
          this.programasAcademicos = response.data
          console.log('Programas academicos:', this.programasAcademicos)
        })
        .catch((error) => {
          console.error('Error al obtener los programas academicos:', error)
        })
    },
    formatDate(date) {
      const dateObject = new Date(date)
      // Extraer el año, mes y día
      const year = dateObject.getFullYear()
      const month = String(dateObject.getMonth() + 1).padStart(2, '0') // Se agrega +1 porque los meses van de 0 a 11
      const day = String(dateObject.getDate()).padStart(2, '0')

      // Formatear la fecha en el formato deseado (YYYY-MM-DD)
      const formattedDate = `${year}-${month}-${day}`
      return formattedDate
    },
    cargarDatosParaEditar(id) {
      const actividad = this.actividades.find((actividad) => actividad.idActTutorias === id)
      this.form.id_act = actividad.idActTutorias
      this.form.nombre = actividad.nombreActTutorias
      this.form.fecha = this.formatDate(actividad.fechaActTutorias)
      this.form.descripcion = actividad.descripcionActTutorias
      this.form.prog_academico = actividad.prog_academico
      this.isModalOpen = true
      this.title = 'Editar Actividad'
    },
    mostrarEvidencias(id) {
      this.showEvid = true
      this.form.id_act = id
      console.log('Actividad seleccionada:', this.form.id_act)
    },
    filtrarActividades() {
      if (this.tipoFiltrado.fechaInicio && this.tipoFiltrado.fechaFin) {
        this.actividadesFiltradas = this.actividades.filter((actividad) => {
          const fechaActividad = new Date(actividad.fechaActTutorias)
          const fechaInicio = new Date(this.tipoFiltrado.fechaInicio)
          const fechaFin = new Date(this.tipoFiltrado.fechaFin)
          return fechaActividad >= fechaInicio && fechaActividad <= fechaFin
        })
      } else {
        this.actividadesFiltradas = this.actividades
      }
    },
    resetForm() {
      this.form.id_act = ''
      this.form.nombre = ''
      this.form.fecha = ''
      this.form.descripcion = ''
      this.form.prog_academico = ''
    },
    eliminarActividad(id) {
      Swal.fire({
        title: '¿Estás seguro de que deseas eliminar esta actividad?',
        text: 'Si eliminas esta actividad, no podrás recuperarla.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
          apiTutorias
            .eliminarActividad(id)
            .then(() => {
              Swal.fire('Eliminado!', 'El registro fue eliminado correctamente', 'success')
              this.obtenerActividades()
            })
            .catch(() => {
              Swal.fire('Error!', 'Hubo un error eliminando el registro', 'error')
            })
        }
      })
    },
    submitForm() {
      const data = {
        idActTutorias: this.form.id_act,
        nombreActTutorias: this.form.nombre,
        descripcionActTutorias: this.form.descripcion,
        fechaActTutorias: this.form.fecha,
        prog_academico: this.form.prog_academico
      }

      // Verifica si los campos del formulario están vacíos
      if (
        !this.form.nombre ||
        !this.form.fecha ||
        !this.form.descripcion ||
        !this.form.prog_academico
      ) {
        Swal.fire({
          title: 'Datos incompletos',
          text: 'Por favor rellena todos los campos',
          icon: 'warning'
        })
        return
      }

      if (this.form.id_act === null || this.form.id_act === '') {
        apiTutorias
          .insertarActividad(data) // Envía el FormData con el archivo
          .then(() => {
            Swal.fire({
              title: 'Actividad registrada',
              text: 'La actividad se ha registrado exitosamente',
              icon: 'success'
            })
            this.obtenerActividades() // Actualiza la lista de actividades
            this.isModalOpen = false
            this.resetForm()
          })
          .catch(() => {
            Swal.fire({
              title: 'Error',
              text: 'Hubo un error enviando el formulario',
              icon: 'error'
            })
          })
      } else if (this.form.id_act != null || this.form.id_act != '') {
        apiTutorias
          .editarActividad(this.form.id_act, data) // Envía el FormData con el archivo
          .then(() => {
            Swal.fire({
              title: 'Actividad editada',
              text: 'La actividad se ha editado exitosamente',
              icon: 'success'
            })
            this.obtenerActividades() // Actualiza la lista de actividades
            this.isModalOpen = false
            this.resetForm()
          })
          .catch(() => {
            Swal.fire({
              title: 'Error',
              text: 'Hubo un error editando la actividad',
              icon: 'error'
            })
          })
      }
    }
  }
}
</script>
