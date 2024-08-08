<template>
  <div
    class="md:w-9/12 lg:w-full bg-white dark:bg-[#2D3748] dark:shadow-gray-950 border-transparent shadow-xl border rounded-lg border-gray-300 p-6 mx-auto"
  >
    <TableModel :data="historial" :columns="columns" :title="'Reporte de Cambios'">
      <template #headers>
        <th>ID</th>
        <th>Usuario</th>
        <th>Tabla afectada</th>
        <th>Valor anterior</th>
        <th>Valor nuevo</th>
        <th>Fecha de cambio</th>
      </template>
    </TableModel>
  </div>
</template>

<script>
import TableModel from '../TableModel.vue'
import apiHistorial from '@/services/apiHistorial'

export default {
  name: 'RegistroActividad-auth',
  components: {
    TableModel
  },
  data() {
    return {
      historial: [],
      columns: [
        { data: 'idhistorial_cambios' },
        { data: 'idusuario' },
        {
          data: 'tabla_afectada'
        },
        {
          data: 'valor_anterior'
        },
        { data: 'valor_nuevo' },
        {
          data: 'fecha_cambio',
          render: (data) => {
            return this.formatDate(data)
          }
        }
      ]
    }
  },
  mounted() {
    this.getHistorial()
  },
  methods: {
    async getHistorial() {
      try {
        const response = await apiHistorial.obtenerHistorial()
        this.historial = response.data
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
    }
  }
}
</script>
