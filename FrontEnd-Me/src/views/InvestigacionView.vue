<template>
  <div
    class="md:w-9/12 lg:w-full bg-white dark:bg-[#2D3748] dark:shadow-gray-950 border-transparent shadow-xl border rounded-lg border-gray-300 p-6 mx-auto"
  >
    <button
      @click="
        (isModalOpen = true), (title = 'Registrar Proyecto de Investigacion'), cargarDocentes()
      "
      class="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
    >
      <i class="pi pi-plus"></i>
      Registrar Proyecto
    </button>
    <TableModel
      :data="proyectos"
      :columns="columns"
      :title="'Reporte de Proyectos de Investigacion'"
    >
      <template #headers>
        <th>ID</th>
        <th>Nombre</th>
        <th>Fecha Inicio</th>
        <th>Fecha Fin</th>
        <th>Linea de Investigación</th>
        <th>Lider del proyecto</th>
        <th>Status</th>
        <th>Colaboradores</th>
        <th>Evidencias</th>
        <th>Acciones</th>
      </template>
    </TableModel>
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
            @submit.prevent="submitForm"
            id="formInvestigacion"
          >
            <div class="w-full px-3 md:mb-4">
              <label class="block text-gray-700 dark:text-white text-sm font-bold mb-2">
                Nombre del Proyecto
              </label>
              <input
                v-model="form.nombreProyecto"
                type="text"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Ingrese el nombre del proyecto"
              />
            </div>
            <div class="w-full px-3 md:mb-4">
              <label class="block text-gray-700 dark:text-white text-sm font-bold mb-2">
                Lider del Proyecto
              </label>
              <select
                id="liderProyecto"
                v-model="form.liderProyecto"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Selecciona una opcion</option>
                <option v-for="docente in docentes" :key="docente.rfc" :value="docente.rfc">
                  {{ docente.nombre_Doce + ' - ' + docente.rfc }}
                </option>
              </select>
            </div>
            <div class="w-full px-3 md:mb-4">
              <label class="block text-gray-700 dark:text-white text-sm font-bold mb-2">
                Ciclo Escolar
              </label>
              <select
                id="cicloEscolar"
                v-model="form.cicloEscolar"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Selecciona una opcion</option>
                <option value="Enero - Julio">Enero - Julio</option>
                <option value="Agosto - Diciembre">Agosto - Diciembre</option>
              </select>
            </div>
            <div class="w-full px-3 md:mb-4">
              <label class="block text-gray-700 dark:text-white text-sm font-bold mb-2">
                Recursos Utilizados
              </label>
              <textarea
                v-model="form.recursosUtilizados"
                placeholder="Describe los recursos utilizados en el proyecto"
                rows="1"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div class="w-full px-3 md:mb-4">
              <label class="block text-gray-700 dark:text-white text-sm font-bold mb-2">
                Fecha de Inicio
              </label>
              <input
                v-model="form.fechaInicio"
                type="date"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                @change="validarFecha()"
              />
            </div>
            <div class="w-full px-3 md:mb-4">
              <label class="block text-gray-700 dark:text-white text-sm font-bold mb-2">
                Fecha de Fin
              </label>
              <input
                v-model="form.fechaFin"
                type="date"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                @change="validarFecha()"
              />
            </div>
            <div class="w-full px-3 md:mb-4">
              <label class="block text-gray-700 dark:text-white text-sm font-bold mb-2">
                Linea de Investigación
              </label>
              <input
                v-model="form.lineaInvestigacion"
                type="text"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Ingrese la línea de investigación"
              />
            </div>
            <div class="w-full px-3 md:mb-4">
              <label class="block text-gray-700 dark:text-white text-sm font-bold mb-2">
                Tipo de Financiamiento
              </label>
              <select
                id="tipoRecurso"
                v-model="form.tipoRecurso"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Selecciona una opcion</option>
                <option value="Propio">Propio</option>
                <option value="Financiado">Financiado</option>
              </select>
            </div>
          </form>
        </div>
        <div class="px-4 py-3 border-t border-gray-200">
          <div class="grid grid-cols-2 mx-3 md:mx-24 md:mt-4">
            <button
              type="submit"
              class="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 m-2"
              form="formInvestigacion"
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
  <ColaboradoresModal
    :showModal="showColab"
    :projectId="form.idProyecto.toString()"
    :liderRfc="form.id_lider_proyecto.toString()"
    @close="showColab = false"
    @cambio-realizado="obtenerProyectos()"
  />
  <EvidenciasModal
    :showModal="showEvid"
    :projectId="form.idProyecto.toString()"
    @close="showEvid = false"
    @cambio-realizado="obtenerProyectos()"
  />
  <DetalleModal :showModal="showDetalle" :projectData="proyecto" @close="showDetalle = false" />
</template>

<script>
import TableModel from '@/components/TableModel.vue'
import apiInvestigacion from '@/services/apiInvestigacion'
import apiEnsenanza from '@/services/apiEnsenanza'
import ColaboradoresModal from '@/components/Investigacion/Modals/ColaboradoresModal.vue'
import EvidenciasModal from '@/components/Investigacion/Modals/EvidenciasModal.vue'
import DetalleModal from '@/components/Investigacion/Modals/DetalleModal.vue'
import Swal from 'sweetalert2'

export default {
  components: {
    TableModel,
    ColaboradoresModal,
    EvidenciasModal,
    DetalleModal
  },
  data() {
    return {
      proyectos: [],
      docentes: [
        {
          rfc: '',
          nombre_Doce: '',
          status: 0
        }
      ],
      isModalOpen: false,
      title: '',
      form: {
        idProyecto: '',
        nombreProyecto: '',
        cicloEscolar: '',
        fechaInicio: '',
        fechaFin: '',
        lineaInvestigacion: '',
        liderProyecto: '',
        id_lider_proyecto: '',
        recursosUtilizados: '',
        tipoRecurso: ''
      },
      showColab: false,
      showEvid: false,
      showDetalle: false,
      projectId: '',
      proyecto: null,
      columns: [
        { data: 'id' },
        { data: 'nombre' },
        {
          data: 'fecha_inicio',
          render: (data) => {
            return this.formatDate(data)
          }
        },
        {
          data: 'fecha_final',
          render: (data) => {
            return this.formatDate(data)
          }
        },
        { data: 'linea_investigacion' },
        { data: 'nombre_lider' },
        {
          data: 'estatus',
          render: (data, type, row) => {
            let badgeHTML
            switch (data) {
              case 0: // Rechazado
                badgeHTML = `<button class="btn-status-inv inline-flex items-center rounded-md bg-red-500 px-2 py-2 text-xs font-medium text-white ring-1 ring-inset ring-red-600/10" data-id="${row.id}"><i class="pi pi-sync mr-2"></i>Rechazado</button>`
                break
              case 1: // Activo
                badgeHTML = `<button class="btn-status-inv inline-flex items-center rounded-md bg-green-500 px-2 py-2 text-xs font-medium text-white ring-1 ring-inset ring-green-600/10" data-id="${row.id}"><i class="pi pi-sync mr-2"></i>Activo</button>`
                break
              case 2: // En proceso
                badgeHTML = `<button class="btn-status-inv inline-flex items-center rounded-md bg-amber-500 px-2 py-2 text-xs font-medium text-white ring-1 ring-inset ring-amber-600/10" data-id="${row.id}"><i class="pi pi-sync mr-2"></i>En proceso</button>`
                break
              case 3: // Finalizado
                badgeHTML = `<button class="btn-status-inv inline-flex items-center rounded-md bg-blue-500 px-2 py-2 text-xs font-medium text-white ring-1 ring-inset ring-blue-600/10" data-id="${row.id}"><i class="pi pi-sync mr-2"></i>Finalizado</button>`
                break
              default:
                badgeHTML = `<button class="btn-status-inv inline-flex items-center rounded-md bg-gray-500 px-2 py-2 text-xs font-medium text-white ring-1 ring-inset ring-gray-600/10" data-id="${row.id}"><i class="pi pi-sync mr-2"></i>Desconocido</button>`
            }
            // Devuelve el badge y el botón en una fila de flexbox
            return `<div class="w-full flex items-center justify-center">${badgeHTML}</div>`
          }
        },

        {
          title: 'Colaboradores',
          data: null,
          render: (data) => {
            return `
            <div class="w-full flex items-center justify-center"><button class="btn-colaboradores bg-blue-500 text-white p-2 pt-2 rounded font-medium text-xs" data-id="${data.id}">Colaboradores(${data.cantidad_colaboradores})</button></div>
                      `
          }
        },
        {
          title: 'Evidencias',
          data: null,
          render: (data) => {
            return `
            <div class="w-full flex items-center justify-center"><button class="btn-evidencias bg-gray-500 text-white p-2 pt-2 rounded font-medium text-xs" data-id="${data.id}">Evidencias(${data.cantidad_evidencias})</button></div>
                      `
          }
        },
        {
          title: 'Acciones',
          data: null,
          render: (data) => {
            return `
            <div class="w-full flex items-center justify-center"><button class="btn-editar-proyecto bg-yellow-500 text-white p-2 rounded mr-2" data-id="${data.id}"><i class="pi pi-pencil pointer-events-none"></i></button>
                        <button class="btn-detalle-proyecto bg-blue-500 text-white p-2 rounded" data-id="${data.id}"><i class="pi pi-info-circle pointer-events-none"></i></button></div>
                      `
          }
        }
      ]
    }
  },
  mounted() {
    this.$store.dispatch('setSelectedOption', 'Coordinacion de Investigación')
    this.obtenerProyectos()

    this.$nextTick(() => {
      document.addEventListener('click', (event) => {
        // Verificar si se hizo clic en el botón de detalle
        if (event.target.matches('.btn-colaboradores')) {
          const id = event.target.getAttribute('data-id')
          this.mostrarDetalleColaboradores(id)
        }
      })

      document.addEventListener('click', (event) => {
        // Verificar si se hizo clic en el botón de detalle
        if (event.target.matches('.btn-evidencias')) {
          const id = event.target.getAttribute('data-id')
          this.mostrarDetalleEvidencias(id)
        }
      })

      document.addEventListener('click', (event) => {
        if (event.target.matches('.btn-detalle-proyecto')) {
          const id = parseInt(event.target.getAttribute('data-id'))
          this.mostrarDetalleProyecto(id)
        }
      })

      document.addEventListener('click', (event) => {
        if (event.target.matches('.btn-editar-proyecto')) {
          const id = parseInt(event.target.getAttribute('data-id'))
          this.cargarDatosParaEditar(id)
          this.cargarDocentes()
        }
      })

      document.addEventListener('click', (event) => {
        if (event.target.matches('.btn-status-inv')) {
          const id = parseInt(event.target.getAttribute('data-id'))
          this.cambiarStatus(id)
        }
      })
    })
  },
  methods: {
    obtenerProyectos() {
      apiInvestigacion
        .obtenerProyectos()
        .then((response) => {
          this.proyectos = response.data
        })
        .catch((error) => {
          console.error('Error al obtener los proyectos:', error)
        })
    },
    cambiarStatus(id) {
      Swal.fire({
        title: 'Actualizar Estatus del Proyecto',
        showDenyButton: true,
        showCancelButton: true,
        showCloseButton: true,
        confirmButtonColor: '#5CB85C',
        denyButtonColor: '#EF4444',
        cancelButtonColor: '#3B82F6',
        confirmButtonText: 'Aceptar',
        denyButtonText: 'Rechazar',
        cancelButtonText: 'Finalizar'
      }).then((result) => {
        let action = null

        if (result.isConfirmed) {
          action = 2
        } else if (result.isDenied) {
          action = 0
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          action = 3
        } else if (result.dismiss === Swal.DismissReason.close) {
          action = null
        }

        if (action !== null) {
          const data = {
            idProyecto: id,
            status: action
          }

          apiInvestigacion
            .editarProyecto(data.idProyecto, data)
            .then(() => {
              Swal.fire({
                title: `Status Actualizado`,
                text: `El estado del proyecto ha sido cambiado.`,
                icon: 'success'
              })
              this.obtenerProyectos()
            })
            .catch(() => {
              Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al actualizar el proyecto.',
                icon: 'error'
              })
            })
        }
      })
    },
    cargarDocentes() {
      apiEnsenanza
        .obtenerDocentes()
        .then((response) => {
          console.log(response.data)
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
        })
        .catch((error) => {
          console.error('Error al obtener los docentes:', error)
        })
    },
    mostrarDetalleColaboradores(id) {
      console.log(this.proyectos)
      this.form.idProyecto = id
      this.form.id_lider_proyecto = this.proyectos.find((p) => p.id == id).id_lider_proyecto
      this.showColab = true
    },
    mostrarDetalleEvidencias(id) {
      this.form.idProyecto = id
      this.showEvid = true
    },
    mostrarDetalleProyecto(id) {
      this.proyecto = this.proyectos.find((p) => p.id === id)
      this.showDetalle = true
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
    validarFecha() {
      console.log('Validando fecha')
      if (this.form.fechaInicio === '' || this.form.fechaFin === '') {
        return
      }

      const fechaInicioDate = new Date(this.form.fechaInicio)
      const fechaFinDate = new Date(this.form.fechaFin)

      if (fechaInicioDate > fechaFinDate) {
        Swal.fire({
          title: 'Error',
          text: 'La fecha de fin debe ser posterior a la fecha de inicio.',
          icon: 'error'
        })
        this.form.fechaFin = ''
        return
      }
      return
    },
    cargarDatosParaEditar(id) {
      const proyecto = this.proyectos.find((p) => p.id === id)

      this.form.idProyecto = proyecto.id
      this.form.nombreProyecto = proyecto.nombre
      this.form.cicloEscolar = proyecto.ciclo_escolar
      this.form.fechaInicio = this.formatDate(proyecto.fecha_inicio)
      this.form.fechaFin = this.formatDate(proyecto.fecha_final)
      this.form.lineaInvestigacion = proyecto.linea_investigacion
      this.form.liderProyecto = proyecto.id_lider_proyecto
      this.form.recursosUtilizados = proyecto.recursos_utilizados
      this.form.tipoRecurso = proyecto.tipo_de_recurso
      this.isModalOpen = true
      this.title = 'Editar Proyecto de Investigacion'
    },
    submitForm() {
      if (
        this.form.nombreProyecto === '' ||
        this.form.cicloEscolar === '' ||
        this.form.fechaInicio === '' ||
        this.form.fechaFin === '' ||
        this.form.lineaInvestigacion === '' ||
        this.form.liderProyecto === '' ||
        this.form.recursosUtilizados === '' ||
        this.form.tipoRecurso === ''
      ) {
        Swal.fire({
          title: 'Campos vacíos',
          text: 'Por favor, llena todos los campos.',
          icon: 'warning'
        })
        return
      }
      const data = {
        idProyecto: this.form.idProyecto,
        nombreProyecto: this.form.nombreProyecto,
        cicloEscolar: this.form.cicloEscolar,
        fechaInicio: this.form.fechaInicio,
        fechaFin: this.form.fechaFin,
        lineaInvestigacion: this.form.lineaInvestigacion,
        liderProyecto: this.form.liderProyecto,
        recursosUtilizados: this.form.recursosUtilizados,
        tipoRecurso: this.form.tipoRecurso
      }

      if (this.form.idProyecto === '') {
        apiInvestigacion
          .insertarProyecto(data)
          .then(() => {
            Swal.fire({
              title: 'Proyecto registrado',
              text: 'El proyecto ha sido registrado exitosamente.',
              icon: 'success'
            })
            this.obtenerProyectos()
            this.isModalOpen = false
            this.resetForm()
          })
          .catch(() => {
            Swal.fire({
              title: 'Error',
              text: 'Hubo un problema al registrar el proyecto.',
              icon: 'error'
            })
          })
      } else {
        apiInvestigacion
          .editarProyecto(this.form.idProyecto, data)
          .then(() => {
            Swal.fire({
              title: 'Proyecto actualizado',
              text: 'El proyecto ha sido actualizado exitosamente.',
              icon: 'success'
            })
            this.obtenerProyectos()
            this.isModalOpen = false
            this.resetForm()
          })
          .catch(() => {
            Swal.fire({
              title: 'Error',
              text: 'Hubo un problema al actualizar el proyecto.',
              icon: 'error'
            })
          })
      }
    },
    resetForm() {
      this.form.idProyecto = ''
      this.form.nombreProyecto = ''
      this.form.cicloEscolar = ''
      this.form.fechaInicio = ''
      this.form.fechaFin = ''
      this.form.lineaInvestigacion = ''
      this.form.liderProyecto = ''
      this.form.recursosUtilizados = ''
      this.form.tipoRecurso = ''
      this.title = ''
      this.docentes = []
    }
  }
}
</script>
