<template>
  <div
    class="md:w-9/12 lg:w-full bg-white dark:bg-[#2D3748] dark:shadow-gray-950 border-transparent shadow-xl border rounded-lg border-gray-300 p-6 mx-auto"
  >
    <TableModel
      :data="docentes"
      :columns="columns"
      :titleProp="'Reporte de Documentación Docente'"
      :seccionProp="'SECRETARÍA ACADÉMICA'"
      :columnHidden="false"
    >
      <template #headers>
        <th>RFC</th>
        <th>Nombre</th>
        <th>N° de plaza</th>
        <th>Fecha de registro</th>
        <th>Documentos</th>
      </template>
    </TableModel>
  </div>
  <EvidenciasModal
    :showModal="showEvid"
    :projectId="form.idDocente.toString()"
    @close="showEvid = false"
    @cambio-realizado="getDocentes()"
  />
</template>

<script>
import apiSecretaria from '@/services/apiSecretaria'
import TableModel from '@/components/TableModel.vue'
import EvidenciasModal from '@/components/Secretaria/Modals/EvidenciasModal.vue'
export default {
  name: 'Secretaria-auth',
  components: {
    TableModel,
    EvidenciasModal
  },
  data() {
    return {
      showEvid: false,
      form: {
        idDocente: ''
      },
      docentes: [],
      columns: [
        { data: 'rfc' },
        {
          title: 'nombre',
          data: null,
          render: (data) => `${data.nombre_Doce} ${data.apellido_paterno} ${data.apellido_materno}`
        },
        { data: 'n_plaza' },
        {
          data: 'fecha_creacion',
          render: (data) => {
            return this.formatDate(data)
          }
        },
        {
          data: null,
          render: (data) => {
            return `<div class="w-full flex items-center justify-center"><button class="btn-documentos bg-gray-500 text-white p-2 pt-2 rounded font-medium text-xs" data-id="${data.rfc}">documentos(${data.cantidad_evidencias})</button></div>
                      `
          }
        }
      ]
    }
  },
  mounted() {
    this.$store.dispatch('setSelectedOption', 'Documentacion Docente')
    this.getDocentes()

    this.$nextTick(() => {
      document.addEventListener('click', (event) => {
        // Verificar si se hizo clic en el botón de detalle
        if (event.target.matches('.btn-documentos')) {
          const id = event.target.getAttribute('data-id')
          this.mostrarDetalleEvidencias(id)
        }
      })
    })
  },
  methods: {
    async getDocentes() {
      const response = await apiSecretaria.obtenerSecretaria()
      this.docentes = response.data
      console.log(this.docentes)
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
    mostrarDetalleEvidencias(id) {
      this.form.idDocente = id
      this.showEvid = true
    }
  }
}
</script>
