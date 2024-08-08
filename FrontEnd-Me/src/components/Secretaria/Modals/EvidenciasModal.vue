<template>
  <!--Modal: Lista de evidencia-->
  <div
    v-if="showModal"
    class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-70 z-50"
  >
    <div class="bg-white dark:bg-[#2D3748] rounded-lg shadow-lg overflow-hidden w-full md:w-2/3">
      <div
        class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
      >
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Lista de evidencias</h3>
        <button
          @click="$emit('close'), (evidencias = []), resetForm()"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
            ></path>
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
      </div>

      <div class="p-4 max-h-96 overflow-y-auto">
        <button
          class="bg-blue-500 text-white px-2 py-2 rounded-md mb-2"
          @click="showAgregarModal = true"
        >
          <span class="pi pi-file-import mr-2"></span>Agregar evidencia
        </button>
        <TableModel
          :data="evidencias"
          :columns="columns"
          :titleProp="'Reporte de Proyectos de Investigacion'"
          :optionsBnt="'ft'"
        >
          <template #headers>
            <th>ID</th>
            <th>Nombre de la evidencia</th>
            <th>Descripcion</th>
            <th>Tipo</th>
            <th>Fecha de modificación</th>
            <th>Acciones</th>
          </template>
        </TableModel>
      </div>

      <div class="px-4 py-3 border-t border-gray-200">
        <button
          @click="$emit('close'), (evidencias = [])"
          class="bg-blue-500 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
  <!--Modal: Agregar evidencia-->
  <div
    v-if="showAgregarModal"
    class="fixed top-0 left-0 w-full h-full z-50 bg-gray-900 bg-opacity-70 flex items-center justify-center"
  >
    <div
      class="bg-white dark:bg-[#2D3748] rounded-lg shadow-lg overflow-hidden mx-auto w-10/12 md:w-2/4"
    >
      <!-- Encabezado del modal para agregar evidencia -->
      <div
        class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
      >
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Agregar evidencia</h3>
        <button
          @click="(showAgregarModal = false), resetForm()"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
          <span class="sr-only">Cerrar modal</span>
        </button>
      </div>

      <!-- Contenido del modal para agregar evidencia -->
      <div class="p-4 max-h-96 overflow-y-auto">
        <form class="w-full" @submit.prevent="submitForm" id="formEvidencia">
          <div class="flex flex-wrap mx-3">
            <div class="w-full px-3 mb-4">
              <label
                class="block uppercase tracking-wide text-gray-700 dark:text-white text-xs font-bold mb-2"
                for="nombreEvidencia"
                >Nombre:</label
              >
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="nombreEvidencia"
                v-model="form.nombreEvidencia"
                type="text"
                placeholder="Nombre de la evidencia"
              />
            </div>
            <div class="w-full px-3 mb-4">
              <label class="block text-gray-700 dark:text-white text-sm font-bold mb-2"
                >Tipo de documento</label
              >
              <select
                v-model="form.tipoDocumento"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option value="" disabled selected>Selecciona una opcion</option>
                <option
                  v-for="opcion in options"
                  :key="opcion.idTipoDocumento"
                  :value="opcion.idTipoDocumento"
                >
                  {{ opcion.descripcion }}
                </option>
              </select>
            </div>
            <div class="w-full px-3 mb-4">
              <label class="block text-gray-700 dark:text-white text-sm font-bold mb-2"
                >Fecha</label
              >
              <input
                v-model="form.fecha"
                type="date"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>
            <div v-if="showFileInput" class="flex px-3 items-center justify-center w-full mb-4">
              <label
                for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Haga clic para cargar</span> o arrastra y suelta
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  class="hidden"
                  @change="handleFileUpload"
                  accept="image/png, image/jpeg, image/jpg, video/mp4, application/pdf"
                />
              </label>
            </div>
            <!-- Visualización del archivo seleccionado -->
            <template v-if="archivo">
              <div
                class="flex justify-center items-center border border-SecundaryGold p-3 rounded-xl text-primaryBlue w-full px-3 mb-5"
              >
                <span class="text-gray-700 dark:text-gray-200 break-all">{{ archivo.name }}</span>
                <span @click="removeFile"
                  ><i class="pi pi-trash text-red-700 mx-1 cursor-pointer ml-5"></i>
                </span>
              </div>
              <!-- Previsualización del archivo (opcional, puedes personalizar según el tipo de archivo) -->
              <template v-if="archivo.type.startsWith('image/')">
                <img :src="archivoURL" class="mb-4" alt="Previsualización" />
              </template>
              <template v-else-if="archivo.type.startsWith('application/pdf')">
                <embed
                  :src="archivoURL + '#toolbar=0'"
                  type="application/pdf"
                  class="w-full h-64 mb-4"
                />
              </template>
            </template>
          </div>
        </form>
      </div>

      <!-- Pie de página del modal para agregar evidencia -->
      <div class="px-4 py-3 border-t border-gray-200">
        <div class="grid grid-cols-2 mx-3 md:mx-24 md:mt-4">
          <button
            type="submit"
            class="bg-blue-600 text-white p-2 rounded hover:bg-blue-900 m-2"
            form="formEvidencia"
          >
            Guardar
          </button>
          <button
            @click="(showAgregarModal = false), resetForm()"
            class="bg-red-500 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-md m-2"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiSecretaria from '@/services/apiSecretaria'
import Swal from 'sweetalert2'
import TableModel from '@/components/TableModel.vue'
export default {
  name: 'EvidenciasModal',
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
    }
  },
  emits: ['close', 'cambio-realizado'],
  data() {
    return {
      evidencias: [],
      showAgregarModal: false,
      showFileInput: true,
      options: [],
      form: {
        idEvidencia: '',
        idProyecto: '',
        nombreEvidencia: '',
        tipoDocumento: '',
        fecha: ''
      },
      archivo: null,
      archivoURL: null,
      columns: [
        { data: 'idDocumento' },
        { data: 'nombreDoc' },
        { data: 'descripcion' },
        {
          data: null,
          render: (data) => {
            const extension = data.urlDocumento.split('.').pop().toLowerCase()
            let icono = 'file'
            if (extension === 'pdf') {
              icono = 'file-pdf'
            } else if (extension === 'jpg' || extension === 'png' || extension === 'jpeg') {
              icono = 'image'
            } else {
              icono = 'exclamation-triangle'
              return `<div class="w-full flex items-center justify-center text-red-500">
                <i class="pi pi-exclamation-triangle mr-2"></i>
                Documento no encontrado
              </div>`
            }

            return `<div class="w-full flex items-center justify-center">
              <i class="pi pi-${icono} mr-2"></i>
              ${extension.toUpperCase()}
            </div>`
          }
        },
        {
          data: 'fecha',
          render: (data) => {
            if (!data || data === '0000-00-00 00:00:00') {
              return 'Fecha no válida'
            }

            const dateObject = new Date(data)

            // Verificar si el objeto Date es válido
            if (isNaN(dateObject.getTime())) {
              return 'Fecha no válida'
            }

            // Extraer el año, mes y día
            const year = dateObject.getFullYear()
            const month = String(dateObject.getMonth() + 1).padStart(2, '0') // Se agrega +1 porque los meses van de 0 a 11
            const day = String(dateObject.getDate()).padStart(2, '0')

            // Formatear la fecha en el formato deseado (YYYY-MM-DD)
            const formattedDate = `${year}-${month}-${day}`
            return formattedDate
          }
        },
        {
          title: 'Acciones',
          data: null,
          render: (data) => {
            return `
            <div class="w-full flex items-center justify-center">
                        <button title="Editar Registro" class="btn-editar-evidencia bg-yellow-500 text-white p-2 pt-3 rounded mr-2" data-id="${data.idDocumento}"><i class="pi pi-pencil pointer-events-none"></i></button>
                        <a href="http://localhost:3000${data.urlDocumento}" target="_blank"><button class="bg-green-500 text-whit text-white p-2 pt-2 rounded mr-2"><i class="pi pi-eye pointer-events-none"></i></button></a>
                        <button class="btn-eliminar-evidencia bg-red-500 text-white p-2 pt-2 rounded" data-id="${data.idDocumento}"><i class="pi pi-trash pointer-events-none"></i></button>
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
          this.obtenerData()
          this.form.idProyecto = this.projectId
        })
      }
    }
  },
  mounted() {
    this.buscarTipoDoc()
    this.$nextTick(() => {
      document.addEventListener('click', (event) => {
        // Verificar si se hizo clic en el botón de eliminar
        if (event.target.matches('.btn-eliminar-evidencia')) {
          const id = event.target.getAttribute('data-id')
          this.eliminarEvidencia(id)
        }
        // Verificar si se hizo clic en el botón de editar
        if (event.target.matches('.btn-editar-evidencia')) {
          const id = event.target.getAttribute('data-id')
          this.cargarEvidencia(id)
        }
      })
    })
  },
  methods: {
    obtenerData() {
      console.log('IdProject:', this.projectId)
      apiSecretaria
        .obtenerDocumentos(this.projectId)
        .then((response) => {
          this.evidencias = response.data
          console.log('Evidencias:', this.evidencias)
        })
        .catch((error) => {
          console.error('Error al obtener las evidencias:', error)
        })
    },
    async buscarTipoDoc() {
      try {
        const response = await apiSecretaria.getTipoDoc()
        this.options = response.data
        console.log('Tipo de documentos:', this.options)
      } catch (error) {
        console.error('Error al encontrar tipo de documentos:', error)
      }
    },
    handleFileUpload(event) {
      const file = event.target.files[0]
      const acceptedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf']

      if (!acceptedTypes.includes(file.type)) {
        // Mostrar un mensaje de advertencia usando SweetAlert u otra librería similar
        Swal.fire({
          title: 'Tipo de archivo no permitido',
          text: 'Solo se permiten archivos de imagen (PNG, JPG, JPEG) y PDF.',
          icon: 'warning'
        })
        return
      }
      if (file) {
        this.archivo = file
        this.archivoURL = URL.createObjectURL(file)
        if (this.form.nombreEvidencia === '') {
          this.form.nombreEvidencia = file.name.split('.').slice(0, -1).join('.')
        }
        this.showFileInput = false
      }
    },
    removeFile() {
      this.archivo = null
      this.archivoURL = null
      this.form.nombreEvidencia = ''
      this.showFileInput = true
      // Limpiar el input de tipo file
      const input = this.$refs.evidenciasInput
      if (input) {
        input.value = null
      }
    },
    resetForm() {
      this.form.idEvidencia = ''
      this.form.nombreEvidencia = ''
      this.archivo = null
      this.archivoURL = null
      this.showFileInput = true
    },
    cargarEvidencia(id) {
      // Buscar la evidencia con el id dado
      const evidencia = this.evidencias.find((ev) => ev.idDocumento == id)

      console.log('Evidencia a editar:', evidencia)

      if (!evidencia) {
        console.error('No se pudo encontrar la evidencia para editar')
        Swal.fire('Error', 'No se pudo encontrar la evidencia para editar.', 'error')
        return
      }

      // Asignar los datos de la evidencia al formulario
      this.form.idEvidencia = evidencia.idDocumento
      this.form.nombreEvidencia = evidencia.nombreDoc
      this.form.tipoDocumento = this.options.find(
        (tipo) => tipo.descripcion === evidencia.descripcion
      ).idTipoDocumento
      this.form.fecha = this.formatDate(evidencia.fecha)
      const url = `http://localhost:3000${evidencia.urlDocumento}`
      fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
          // Crear un objeto de archivo con el blob y un nombre de archivo
          const nombreArchivo = url.substring(url.lastIndexOf('/') + 1)
          const archivo = new File([blob], nombreArchivo, { type: blob.type })

          this.archivo = archivo
          this.archivoURL = URL.createObjectURL(archivo)
          this.showFileInput = false
        })
        .catch((error) => {
          console.error('Error al obtener el archivo:', error)
        })
      this.showAgregarModal = true
      console.log(this.form)
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
    submitForm() {
      console.log('Formulario:', this.form)
      console.log('Archivo:', this.archivo)
      if (this.archivo) {
        const formData = new FormData()
        formData.append('idDocumento', this.form.idEvidencia)
        formData.append('idUsuario', this.form.idProyecto)
        formData.append('nombreDoc', this.form.nombreEvidencia)
        formData.append('idTipoDocumento', this.form.tipoDocumento)
        formData.append('fecha', this.form.fecha)
        formData.append('evidencias', this.archivo)
        let promise
        if (!this.form.idEvidencia) {
          console.log('Entro a insertar')
          promise = apiSecretaria.insertarDocumentos(formData)
        } else {
          console.log('Entro a actualizar')
          promise = apiSecretaria.actualizarDocumentos(this.form.idEvidencia, formData)
        }

        promise
          .then(() => {
            const message = !this.form.idEvidencia
              ? 'Documento insertado correctamente'
              : 'Documento actualizado correctamente'
            Swal.fire({
              title: this.form.idEvidencia ? 'Actividad actualizada' : 'Actividad insertada',
              text: message,
              icon: 'success'
            })
            this.resetForm()
            this.obtenerData()
            this.$emit('cambio-realizado')
            this.showAgregarModal = false
          })
          .catch(() => {
            Swal.fire({
              title: 'Error',
              text:
                'Hubo un error al ' +
                (this.form.idEvidencia ? 'actualizar' : 'insertar') +
                ' la actividad',
              icon: 'error'
            })
          })
      } else {
        Swal.fire('Error', 'Debe seleccionar un archivo para la evidencia.', 'error')
      }
    },
    eliminarEvidencia(id) {
      Swal.fire({
        title: '¿Estás seguro de eliminar la evidencia?',
        text: 'No podrás revertir esta acción',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          apiSecretaria
            .eliminarDocumentos(id)
            .then(() => {
              Swal.fire('Eliminado', 'La evidencia ha sido eliminada.', 'success')
              this.obtenerData()
              this.$emit('cambio-realizado')
            })
            .catch((err) => {
              console.error(err)
              Swal.fire('Error', 'Error al eliminar la evidencia.', 'error')
            })
        }
      })
    }
  }
}
</script>
