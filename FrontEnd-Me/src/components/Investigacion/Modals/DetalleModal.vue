<template>
  <!--Modal: Lista de colaboradores-->
  <div v-if="showModal" class="fixed top-0 left-0 w-full h-full z-50 bg-gray-900 bg-opacity-70">
    <div
      class="bg-white dark:bg-[#2D3748] p-5 rounded-lg shadow-lg overflow-hidden mx-auto mt-10 w-11/12 md:w-2/3"
    >
      <div
        class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
      >
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Detalles del proyecto</h3>
        <button
          type="button"
          class="text-gray-400 bg-transparent hover:bg-[#f44336] hover:text-gray-200 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          @click="(project = {}), (collaboratorsData = []), $emit('close')"
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

      <div class="p-3 max-h-96 overflow-y-auto">
        <div class="p-5 border border-[#e0e0e0] rounded-lg shadow-md bg-[#f9f9f9]">
          <div class="flex-1 p-2.5 border border-[#e0e0e0] rounded-lg mr-2.5 mb-5 bg-white">
            <label class="font-semibold block mb-1">ID:</label>
            <span>{{ project.id }}</span>
          </div>
          <div class="flex justify-between mb-5">
            <div class="flex-1 p-2.5 border border-[#e0e0e0] rounded-lg mr-2.5 bg-white">
              <label class="font-semibold block mb-1">Nombre:</label>
              <span>{{ project.nombre }}</span>
            </div>
            <div class="flex-1 p-2.5 border border-[#e0e0e0] rounded-lg mr-2.5 bg-white">
              <label class="font-semibold block mb-1">Ciclo Escolar:</label>
              <span>{{ project.ciclo_escolar }}</span>
            </div>
          </div>
          <div class="flex justify-between mb-5">
            <div class="flex-1 p-2.5 border border-[#e0e0e0] rounded-lg mr-2.5 bg-white">
              <label class="font-semibold block mb-1">Fecha de Inicio:</label>
              <span>{{ formatDate(project.fecha_inicio) }}</span>
            </div>
            <div class="flex-1 p-2.5 border border-[#e0e0e0] rounded-lg mr-2.5 bg-white">
              <label class="font-semibold block mb-1">Fecha de Finalizacion:</label>
              <span>{{ formatDate(project.fecha_final) }}</span>
            </div>
          </div>
          <div class="flex-1 p-2.5 border border-[#e0e0e0] rounded-lg mr-2.5 mb-5 bg-white">
            <label class="font-semibold block mb-1">Linea de Investigacion:</label>
            <span>{{ project.linea_investigacion }}</span>
          </div>
          <div class="flex-1 p-2.5 border border-[#e0e0e0] rounded-lg mr-2.5 mb-5 bg-white">
            <label class="font-semibold block mb-1">Lider del proyecto:</label>
            <span>{{ project.lider_de_proyecto }}</span>
          </div>
          <div class="flex-1 p-2.5 border border-[#e0e0e0] rounded-lg mr-2.5 mb-5 bg-white">
            <label class="font-semibold block mb-1">Status:</label>
            <span
              class="inline-flex items-center text-white rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset"
              :class="{
                'bg-red-500 ring-red-600/10': project.estatus === 0,
                'bg-green-500 ring-green-600/20': project.estatus === 1,
                'bg-amber-500 ring-amber-600/10': project.estatus === 2,
                'bg-blue-500 ring-blue-600/10': project.estatus === 3,
                'bg-gray-500': !project.estatus
              }"
            >
              {{
                project.estatus === 0
                  ? 'Rechazado'
                  : project.estatus === 1
                    ? 'Activo'
                    : project.estatus === 2
                      ? 'En proceso'
                      : project.estatus === 3
                        ? 'Finalizado'
                        : 'Desconocido'
              }}
            </span>
          </div>
          <div class="flex-1 p-2.5 border border-[#e0e0e0] rounded-lg mr-2.5 mb-5 bg-white">
            <label class="font-semibold block mb-1">Recursos Utilizados:</label>
            <span>{{ project.recursos_utilizados }}</span>
          </div>
          <div class="flex-1 p-2.5 border border-[#e0e0e0] rounded-lg mr-2.5 bg-white">
            <label class="font-semibold block mb-1">Tipo de Recurso:</label>
            <span>{{ project.tipo_de_recurso }}</span>
          </div>
        </div>
        <div class="mt-5 p-5 border border-[#e0e0e0] rounded-lg shadow-md bg-[#f9f9f9]">
          <h3 class="mb-4 text-xl font-bold">Colaboradores</h3>
          <template v-if="collaboratorsData.length === 0">
            <div class="text-center">
              <p>No hay colaboradores registrados</p>
            </div>
          </template>
          <template v-else>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div
                v-for="collaborator in collaboratorsData"
                :key="collaborator.id"
                class="p-4 border border-gray-200 rounded-md bg-white"
              >
                <div class="mb-2">
                  <label class="font-semibold">Nombre:</label>
                  <span class="ml-2">{{ collaborator.nombre }}</span>
                </div>
                <div class="mb-2">
                  <label class="font-semibold">Tipo:</label>
                  <span class="ml-2">{{ collaborator.tipo }}</span>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div class="px-4 border-t border-gray-200"></div>
    </div>
  </div>
</template>

<script>
import apiInvestigacion from '@/services/apiInvestigacion'
export default {
  name: 'DetalleModal',
  props: {
    showModal: {
      type: Boolean,
      default: false
    },
    projectData: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['close'],
  data() {
    return {
      project: {},
      collaboratorsData: []
    }
  },
  watch: {
    showModal() {
      if (this.projectData) {
        this.project = this.projectData
        this.colaboradores()
      }
    }
  },
  methods: {
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
    colaboradores() {
      apiInvestigacion
        .obtenerColaboradores(this.projectData.id)
        .then((response) => {
          this.collaboratorsData = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
