<template>
  <div
    class="md:w-9/12 lg:w-full bg-white dark:bg-[#2D3748] dark:shadow-gray-950 border-transparent shadow-xl border rounded-lg border-gray-300 p-6 mx-auto"
  >
    <button
      class="bg-blue-500 text-white px-2 py-2 rounded-md mb-4 mr-4"
      :class="materias.length === 0 ? 'pointer-events-none opacity-50' : 'pointer-events-auto'"
      @click="(isModalOpen = !isModalOpen), (title = 'Registrar Actividad')"
    >
      <span class="pi pi-plus-circle mr-2"></span>Registrar Actividad
    </button>
    <button
      class="bg-blue-500 hover:bg-blue-600 text-white px-2 py-2 rounded-md mb-4"
      :class="
        materias.length === 0
          ? 'pointer-events-none opacity-50'
          : isFilter
            ? 'bg-red-500 hover:bg-red-600'
            : 'pointer-events-auto'
      "
      @click="
        (isFilter = !isFilter),
          (tipoFiltrado.materiaSeleccionada = ''),
          (tipoFiltrado.tipoSeleccionado = ''),
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
      <div class="w-full grid gap-3 md:grid-cols-4">
        <div class="w-full mb-3">
          <label
            class="block uppercase tracking-wide text-gray-900 dark:text-white text-xs font-bold mt-2 mb-2"
            for="materia"
            >Materias</label
          >
          <select
            id="materia"
            v-model="tipoFiltrado.materiaSeleccionada"
            class="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            @change="filtrarActividades()"
          >
            <option value="" selected>Selecciona una materia</option>
            <option v-for="materia in materias" :key="materia.materia" :value="materia.materia">
              {{ materia.nombreMateria }}
            </option>
          </select>
        </div>
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
              (tipoFiltrado.materiaSeleccionada = ''),
                (tipoFiltrado.tipoSeleccionado = ''),
                (isFilter = !isFilter),
                filtrarActividades(),
                (tipoFiltrado.fechaInicio = ''),
                (tipoFiltrado.fechaFin = '')
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
      <div
        class="w-full grid gap-3 grid-cols-2 lg:grid-cols-4 md:px-3"
        :class="tipoFiltrado.materiaSeleccionada ? '' : 'pointer-events-none opacity-50'"
      >
        <div v-for="tipoActividad in tipoActividades" :key="tipoActividad.idtipoActividad">
          <ul class="h-full">
            <li class="flex flex-col h-full">
              <input
                type="radio"
                :id="'Tipo-radio-' + tipoActividad.idtipoActividad"
                name="tipo-radio"
                :value="tipoActividad.idtipoActividad"
                class="hidden peer"
                v-model="tipoFiltrado.tipoSeleccionado"
                @change="filtrarActividades()"
              />
              <label
                :for="'Tipo-radio-' + tipoActividad.idtipoActividad"
                class="bg-white w-full inline-flex items-center justify-between p-3 text-gray-500 border border-gray-400 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 flex-grow"
              >
                <div class="block">
                  <div class="w-full md:font-semibold select-none dark:text-gray-200">
                    {{ tipoActividad.nombretipoAct }}
                  </div>
                </div>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <TableModel
      :data="actividadesFiltradas"
      :columns="columns"
      :titleProp="'Reporte de actividades'"
      :seccionProp="'COOR. DE INGENIERÍA EN DESARROLLO Y TECNOLOGÍAS DE SOFTWARE'"
    >
      <template #headers>
        <th>ID</th>
        <th>Nombre</th>
        <th>Descripción</th>
        <th>Tipo</th>
        <th>Materia</th>
        <th>Ciclo Escolar</th>
        <th>Fecha</th>
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
          <form @submit.prevent="submitForm" id="form-actividad">
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
                placeholder="Ejemplo: Tarea 1"
                v-model="form.nombreActividad"
              />
            </div>
            <div class="grid md:grid-cols-3">
              <div class="w-full px-3">
                <label
                  for="materia-modal"
                  class="block uppercase tracking-wide text-gray-900 dark:text-white text-xs font-bold mt-2 mb-2"
                  >Materia</label
                >
                <select
                  id="materia-modal"
                  class="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  v-model="form.materia"
                >
                  <option value="" selected>Selecciona una materia</option>
                  <option
                    v-for="materia in materias"
                    :key="materia.materia"
                    :value="materia.materia"
                  >
                    {{ materia.nombreMateria }}
                  </option>
                </select>
              </div>
              <div class="w-full px-3">
                <label
                  for="tipoact-modal"
                  class="block uppercase tracking-wide text-gray-900 dark:text-white text-xs font-bold mt-2 mb-2"
                  >Tipo de actividad</label
                >
                <select
                  id="tipoact-modal"
                  class="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  v-model="form.tipoAct"
                >
                  <option value="" selected>Selecciona un tipo</option>
                  <option
                    v-for="tipo in tipoActividades"
                    :key="tipo.idtipoActividad"
                    :value="tipo.idtipoActividad"
                  >
                    {{ tipo.nombretipoAct }}
                  </option>
                </select>
              </div>
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
              form="form-actividad"
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
      :ensenanzaId="form.idActEnsenanza.toString()"
      @close="showEvid = false"
      @cambio-realizado="cargarActividadesTotales()"
    />
  </div>
</template>

<script>
import apiEnsenanza from '@/services/apiEnsenanza'
import TableModel from '@/components/TableModel.vue'
import EvidenciasModal from '@/components/Ensenanza/Modals/EvidenciasModal.vue'
import Swal from 'sweetalert2'

export default {
  name: 'Actividades-auth',
  components: {
    TableModel,
    EvidenciasModal
  },
  data() {
    return {
      // data
      materias: [],
      tipoFiltrado: {
        materiaSeleccionada: '',
        tipoSeleccionado: '',
        fechaInicio: '',
        fechaFin: ''
      },
      tipoActividades: [],
      actividadesTotales: [],
      actividadesFiltradas: [],
      isModalOpen: false,
      showEvid: false,
      isFilter: false,
      title: '',
      form: {
        idActEnsenanza: '',
        nombreActividad: '',
        materia: '',
        tipoAct: '',
        fecha: '',
        descripcion: ''
      },
      columns: [
        { data: 'idActEnsenanza' },
        { data: 'nombreAct' },
        { data: 'descripcionAct' },
        { data: 'nombretipoAct' },
        { data: 'nombreMateria' },
        { data: 'cicloEscolar' },
        {
          data: 'fecha',
          render: (data) => {
            return this.formatDate(data)
          }
        },
        {
          data: null,
          render: (data) => {
            return `
            <div class="w-full flex items-center justify-center">
              <button class="btn-evidencias-actividad bg-gray-500 text-white p-2 pt-2 rounded font-medium text-xs" data-id="${data.idActEnsenanza}">Evidencias(${data.cantidad_evidencias})</button>
                        </div>`
          }
        },
        {
          title: 'Acciones',
          data: null,
          render: (data) => {
            return `
            <div class="w-full flex items-center justify-center">
                          <button class="btn-editar-actividad bg-yellow-500 text-white p-2 pt-3 rounded mr-2" data-id="${data.idActEnsenanza}"><i class="pi pi-pencil pointer-events-none"></i></button>
                          <button class="btn-eliminar-actividad bg-red-500 text-white  p-2 pt-3  rounded mr-2" data-id="${data.idActEnsenanza}"><i class="pi pi-trash pointer-events-none"></i></button>
                        </div>`
          }
        }
      ]
    }
  },
  mounted() {
    this.$store.dispatch('setSelectedOption', 'Enseñanza - Actividades')
    const userData = JSON.parse(localStorage.getItem('user'))
    this.fetchMateriasByRFC(userData.rfc)
    this.TiposActividades()
    this.cargarActividadesTotales()
    document.addEventListener('click', (event) => {
      // Verificar si se hizo clic en el botón de editar
      if (event.target.matches('.btn-editar-actividad')) {
        const id = event.target.getAttribute('data-id')
        this.cargarParaEditar(id)
      }

      // Verificar si se hizo clic en el botón de eliminar
      if (event.target.matches('.btn-eliminar-actividad')) {
        const id = event.target.getAttribute('data-id')
        this.eliminarActividad(id)
      }

      // Verificar si se hizo clic en el botón de evidencias
      if (event.target.matches('.btn-evidencias-actividad')) {
        const id = event.target.getAttribute('data-id')
        this.mostrarDetalleEvidencias(id)
      }
    })
  },
  methods: {
    fetchMateriasByRFC(rfc) {
      apiEnsenanza
        .buscarMaterias(rfc) // Debes tener un método similar en tu servicio API
        .then((res) => {
          this.materias = res.data
          if (this.materias.length === 0) {
            Swal.fire({
              title: 'No hay materias asignadas',
              text: 'No cuentas con materias asignadas a tu cuenta, por favor contacta al administrador',
              icon: 'warning'
            })
          }
        })
        .catch((err) => {
          console.log('Error al buscar materias', err)
        })
    },
    TiposActividades() {
      apiEnsenanza
        .buscarTipoActividad() // Debes tener un método similar en tu servicio API
        .then((res) => {
          this.tipoActividades = res.data
        })
        .catch((err) => {
          console.log('Error al buscar tipos de actividades', err)
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
    cargarActividadesTotales() {
      apiEnsenanza.obtenerActividades().then((response) => {
        const idsMaterias = this.materias.map((materia) => materia.materia)
        console.log(response.data)
        this.actividadesTotales = response.data.filter((actividad) =>
          idsMaterias.includes(actividad.idMateria)
        )
        this.actividadesFiltradas = this.actividadesTotales
      })
    },
    cargarParaEditar(id) {
      console.log(id)
      const actividad = this.actividadesTotales.find((actividad) => actividad.idActEnsenanza == id)
      console.log(this.actividadesTotales)
      console.log(actividad)
      if (actividad) {
        this.form = {
          idActEnsenanza: actividad.idActEnsenanza,
          nombreActividad: actividad.nombreAct,
          materia: actividad.idMateria,
          tipoAct: actividad.idtipoActividad,
          fecha: this.formatDate(actividad.fecha),
          descripcion: actividad.descripcionAct
        }
        this.title = 'Editar Actividad'
        this.isModalOpen = true
      }
    },
    filtrarActividades() {
      console.log(this.columns)
      if (this.tipoFiltrado.materiaSeleccionada && this.tipoFiltrado.tipoSeleccionado) {
        this.actividadesFiltradas = this.actividadesTotales.filter(
          (actividad) =>
            actividad.idMateria === this.tipoFiltrado.materiaSeleccionada &&
            actividad.idtipoActividad === this.tipoFiltrado.tipoSeleccionado
        )
        if (!this.actividadesFiltradas.length) {
          this.actividadesFiltradas = []
        }
      } else if (this.tipoFiltrado.materiaSeleccionada) {
        this.actividadesFiltradas = this.actividadesTotales.filter(
          (actividad) => actividad.idMateria === this.tipoFiltrado.materiaSeleccionada
        )
      } else {
        this.actividadesFiltradas = this.actividadesTotales
        this.tipoFiltrado.materiaSeleccionada = ''
        this.tipoFiltrado.tipoSeleccionado = ''
      }

      if (this.tipoFiltrado.fechaInicio && this.tipoFiltrado.fechaFin) {
        this.actividadesFiltradas = this.actividadesFiltradas.filter((actividad) => {
          const fechaActividad = new Date(actividad.fecha)
          const fechaInicio = new Date(this.tipoFiltrado.fechaInicio)
          const fechaFin = new Date(this.tipoFiltrado.fechaFin)

          return fechaActividad >= fechaInicio && fechaActividad <= fechaFin
        })
        console.log(this.actividadesFiltradas)
      }
    },
    submitForm() {
      // Lógica para enviar el formulario
      const data = {
        idActEnsenanza: this.form.idActEnsenanza,
        nombreAct: this.form.nombreActividad,
        fecha: this.form.fecha,
        descripcionAct: this.form.descripcion,
        tipoAct: this.form.tipoAct,
        idMateria: this.form.materia
      }

      console.log(data)

      if (
        !this.form.nombreActividad ||
        !this.form.fecha ||
        !this.form.descripcion ||
        !this.form.tipoAct ||
        !this.form.materia
      ) {
        Swal.fire({
          title: 'Datos incompletos',
          text: 'Todos los campos son obligatorios',
          icon: 'warning'
        })
        return
      }

      let promise // Almacenará la promesa del API, para insertar o actualizar
      if (!this.form.idActEnsenanza) {
        promise = apiEnsenanza.insertarActividad(data)
      } else {
        promise = apiEnsenanza.actualizarActividad(this.form.idActEnsenanza, data)
      }

      promise
        .then(() => {
          const message = this.form.idActEnsenanza
            ? 'La actividad se ha actualizado correctamente'
            : 'La actividad se ha insertado correctamente'

          Swal.fire({
            title: this.form.idActEnsenanza ? 'Actividad actualizada' : 'Actividad insertada',
            text: message,
            icon: 'success'
          })

          this.resetForm()
          this.cargarActividadesTotales()
          this.isModalOpen = false
        })
        .catch(() => {
          Swal.fire({
            title: 'Error',
            text:
              'Hubo un error al ' +
              (this.form.idActEnsenanza ? 'actualizar' : 'insertar') +
              ' la actividad',
            icon: 'error'
          })
        })
    },
    eliminarActividad(id) {
      Swal.fire({
        title: '¿Estás seguro de eliminar la actividad?',
        text: 'Esta acción no se puede revertir',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          apiEnsenanza
            .eliminarActividad(id)
            .then(() => {
              Swal.fire('Actividad eliminada', 'La actividad se eliminó correctamente', 'success')
              this.cargarActividadesTotales()
            })
            .catch((error) => {
              console.error('Error al eliminar la actividad:', error)
              Swal.fire(
                'Error al eliminar la actividad',
                'Ocurrió un error al eliminar la actividad',
                'error'
              )
            })
        }
      })
    },
    mostrarDetalleEvidencias(id) {
      this.form.idActEnsenanza = id
      this.showEvid = true
    },
    resetForm() {
      this.form.nombreActividad = ''
      this.form.materia = ''
      this.form.tipoact = ''
      this.form.fecha = ''
      this.form.descripcion = ''
    }
  }
}
</script>
