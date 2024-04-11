<template>
  <div
    class="md:w-9/12 lg:w-full bg-white dark:bg-[#2D3748] dark:shadow-gray-950 border-transparent shadow-xl border rounded-lg border-gray-300 p-6 mx-auto"
  >
    <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Tipo de reporte</h3>
    <div
      class="md:w-9/12 lg:w-full bg-white dark:bg-[#2D3748] border rounded-lg border-gray-200 p-6 mx-auto"
    >
      <ul class="grid w-full gap-6 grid-cols-2 lg:grid-cols-4 px-3">
        <li>
          <input
            type="radio"
            id="Status-radio"
            name="tipo-reportes"
            value="status"
            class="hidden peer"
            v-model="tipoReporte"
          />
          <label
            for="Status-radio"
            class="bg-white w-full inline-flex items-center justify-between p-5 text-gray-500 border border-gray-400 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <div class="block">
              <div class="w-full text-lg font-semibold select-none dark:text-gray-200">
                Por estatus<i class="pi pi-sync ml-4"></i>
              </div>
            </div>
          </label>
        </li>
        <li>
          <input
            type="radio"
            id="Fecha-radio"
            name="tipo-reportes"
            value="fecha"
            class="hidden peer"
            v-model="tipoReporte"
          />
          <label
            for="Fecha-radio"
            class="inline-flex items-center justify-between p-5 text-gray-500 bg-white w-full border border-gray-400 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <div class="block">
              <div class="w-full text-lg font-semibold select-none dark:text-gray-200">
                Por fecha<i class="pi pi-calendar ml-4"></i>
              </div>
            </div>
          </label>
        </li>
        <button
          v-if="tipoReporte !== ''"
          type="button"
          class="text-gray-400 bg-transparent hover:bg-red-600 hover:text-gray-200 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-red-600 dark:hover:text-white"
          @click="
            (tipoReporte = ''),
              (status = null),
              (reporteFecha.fechaInicio = null),
              (reporteFecha.fechaFin = null),
              (proyectosFiltrados = proyectos),
              (tipoFecha = null)
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
      </ul>
      <template v-if="tipoReporte === 'status'">
        <div class="mt-6 px-3">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Reporte por estatus
          </h3>
          <div class="grid grid-cols-1 gap-6 lg:grid-cols-4">
            <div class="flex flex-col">
              <label for="status" class="text-gray-700 dark:text-gray-200">Estatus</label>
              <select
                id="status"
                v-model="status"
                class="w-full px-4 py-2 mt-2 text-gray-700 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                @change="filtrarProyectos()"
              >
                <option value="null">Selecciona una opcion</option>
                <option value="1">Activos</option>
                <option value="2">En proceso</option>
                <option value="3">Finalizados</option>
                <option value="0">Rechazados</option>
              </select>
            </div>
          </div>
        </div>
      </template>
      <template v-else-if="tipoReporte === 'fecha'">
        <div class="mt-6 px-3">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Reporte por fecha
          </h3>
          <div class="grid grid-cols-1 gap-6 lg:grid-cols-4">
            <div class="flex flex-col">
              <label for="status" class="text-gray-700 dark:text-gray-200">Tipo de fecha</label>
              <select
                id="status"
                v-model="tipoFecha"
                class="w-full px-4 py-2 mt-2 text-gray-700 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                @change="filtrarProyectos()"
              >
                <option value="null">Selecciona una opcion</option>
                <option value="1">Fecha de registro</option>
                <option value="2">Fecha de inicio</option>
                <option value="3">Fecha de fin</option>
              </select>
            </div>
            <div class="flex flex-col">
              <label for="fecha-inicio" class="text-gray-700 dark:text-gray-200"
                >Fecha de inicio</label
              >
              <input
                type="date"
                id="fecha-inicio"
                v-model="reporteFecha.fechaInicio"
                @change="filtrarProyectos()"
                class="w-full px-4 py-2 mt-2 text-gray-700 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <div class="flex flex-col">
              <label for="fecha-fin" class="text-gray-700 dark:text-gray-200">Fecha de fin</label>
              <input
                type="date"
                id="fecha-fin"
                v-model="reporteFecha.fechaFin"
                @change="filtrarProyectos()"
                class="w-full px-4 py-2 mt-2 text-gray-700 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
          </div>
        </div>
      </template>
    </div>
    <TableModel
      :data="proyectosFiltrados"
      :columns="columns"
      :title="'Reporte de Proyectos de Investigacion'"
      :columnHidden="false"
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
      </template>
    </TableModel>
  </div>
</template>

<script>
import TableModel from '@/components/TableModel.vue'
import apiInvestigacion from '@/services/apiInvestigacion'

export default {
  name: 'investigacionReportes',
  components: {
    TableModel
  },
  data() {
    return {
      tipoReporte: '',
      status: null,
      tipoFecha: null,
      reporteFecha: {
        fechaInicio: null,
        fechaFin: null
      },
      proyectos: [],
      proyectosFiltrados: [],
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
          render: (data) => {
            let badgeHTML
            switch (data) {
              case 0: // Rechazado
                badgeHTML =
                  '<span class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-200 border border-red-400">Rechazado</span>'
                break
              case 1: // Activo
                badgeHTML =
                  '<span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-200 border border-green-400">Activo</span>'
                break
              case 2: // En proceso
                badgeHTML =
                  '<span class="bg-amber-100 text-amber-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-amber-900 dark:text-amber-200 border border-amber-400">En proceso</span>'
                break
              case 3: // Finalizado
                badgeHTML =
                  '<span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-200 border border-blue-400">Finalizado</span>'
                break
              default:
                badgeHTML =
                  '<span class="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-900 dark:text-gray-200 border border-gray-400">Desconocido</span>'
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
            <div class="w-full flex items-center justify-center"><span class="bg-blue-100 text-gray-900 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 border border-blue-400">Colaboradores(${data.cantidad_colaboradores})</span></div>
                      `
          }
        },
        {
          title: 'Evidencias',
          data: null,
          render: (data) => {
            return `
            <div class="w-full flex items-center justify-center"><span class="bg-gray-100 text-gray-900 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-200 border border-gray-400">Evidencias(${data.cantidad_evidencias})</span></div>
                      `
          }
        }
      ]
    }
  },
  mounted() {
    this.$store.dispatch('setSelectedOption', 'Investigación - Reportes')
    this.obtenerProyectos()
  },
  methods: {
    async obtenerProyectos() {
      try {
        const { data } = await apiInvestigacion.obtenerProyectos()
        this.proyectos = data
        this.proyectosFiltrados = this.proyectos
        console.log(data)
      } catch (error) {
        console.log(error)
      }
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
    filtrarProyectos() {
      if (this.tipoReporte === 'status') {
        if (this.status === null || this.status === 'null') {
          this.proyectosFiltrados = this.proyectos
          return
        }
        this.proyectosFiltrados = this.proyectos.filter((proyecto) => {
          return proyecto.estatus === parseInt(this.status)
        })
      } else if (this.tipoReporte === 'fecha') {
        if (
          this.reporteFecha.fechaInicio === null ||
          this.reporteFecha.fechaFin === null ||
          this.tipoFecha === null ||
          this.tipoFecha === 'null'
        ) {
          this.proyectosFiltrados = this.proyectos
          return
        }
        if (this.tipoFecha === '1') {
          this.proyectosFiltrados = this.proyectos.filter((proyecto) => {
            return (
              proyecto.fecha_registro >= this.reporteFecha.fechaInicio &&
              proyecto.fecha_registro <= this.reporteFecha.fechaFin
            )
          })
        } else if (this.tipoFecha === '2') {
          this.proyectosFiltrados = this.proyectos.filter((proyecto) => {
            return (
              proyecto.fecha_inicio >= this.reporteFecha.fechaInicio &&
              proyecto.fecha_inicio <= this.reporteFecha.fechaFin
            )
          })
        } else if (this.tipoFecha === '3') {
          this.proyectosFiltrados = this.proyectos.filter((proyecto) => {
            return (
              proyecto.fecha_final >= this.reporteFecha.fechaInicio &&
              proyecto.fecha_final <= this.reporteFecha.fechaFin
            )
          })
        }
      }
    }
  }
}
</script>
