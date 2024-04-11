<template>
  <div class="overflow-x-auto">
    <DataTable :data="localData" :columns="columns" class="dark:text-white" :options="options">
      <thead>
        <tr>
          <slot name="headers"></slot>
        </tr>
      </thead>
    </DataTable>
  </div>
</template>
 
<script>
import DataTable from 'datatables.net-vue3'
import DataTableLib from 'datatables.net'
import 'datatables.net-responsive-dt'
import ButtonsHtml5 from 'datatables.net-buttons/js/buttons.html5'
import print from 'datatables.net-buttons/js/buttons.print'
import pdfmake from 'pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import JsZip from 'jszip'
import logoSuperior from '@/assets/LogoSuperior'
import logoInferior from '@/assets/LogoInferior'

pdfmake.vfs = pdfFonts.pdfMake.vfs
window.JSZip = JsZip

DataTable.use(DataTableLib)
DataTable.use(pdfmake)
DataTable.use(ButtonsHtml5)
DataTable.use(print)

export default {
  components: {
    DataTable
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    optionsBnt: {
      type: String,
      default: 'Blfrtip'
    },
    title: {
      type: String,
      default: 'Reporte'
    },
    columnHidden: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      localData: this.data,
      options: {
        responsive: true,
        autWidth: false,
        dom: this.optionsBnt,
        language: {
          lengthMenu: 'Mostrar _MENU_ registros por página',
          search: '<span class="dark:text-gray-200 mr-2">Buscar</span>',
          zeroRecords: 'No hay registros para mostrar',
          emptyTable: 'No hay datos disponibles en la tabla',
          info: '<span class="dark:text-gray-200 mr-4">Mostrando _START_ de _END_</span>',
          infoFiltered:
            '(<span class="dark:text-gray-200 mr-4">filtrado de _MAX_ registros</span>)',
          paginate: {
            first:
              '<i class="text-black m-2 dark:text-white pi pi-angle-double-left mr-4"></i><span class="dark:text-gray-200 mr-4">Primero</span>',
            previous:
              '<i class="text-black m-2 dark:text-white pi pi-angle-left mr-4"></i><span class="dark:text-gray-200 mr-4">Anterior</span>',
            next: '<span class="dark:text-gray-200 ml-4 mr-4">Siguiente</span><i class="text-black m-2 dark:text-white pi pi-angle-right"></i>',
            last: '<span class="dark:text-gray-200 ml-4">Ultimo<i class="text-black m-2 dark:text-white pi pi-angle-double-right ml-4"></i></span>'
          },
          buttons: {
            copyTitle: 'Copiado al portapapeles',
            copySuccess: {
              _: '%d líneas copiadas',
              1: '1 línea copiada'
            }
          }
        },
        buttons: [
          {
            title: this.title,
            extend: 'excelHtml5',
            text: '<i class="pi pi-file-excel mr-2"></i>Excel',
            className: 'bg-green-500 text-white px-4 py-2 rounded-md mb-4',
            customizeData: (function (component) {
              // Guarda una referencia al contexto del componente de Vue
              return function (xlsx) {
                if (component.columnHidden) {
                  // Excluye la última columna del Excel
                  xlsx.body.forEach((row) => row.pop())

                  // Itera sobre la estructura del encabezado y elimina el objeto con el título "Acciones" si se encuentra
                  xlsx.headerStructure.forEach((subArreglo) => {
                    const indexToRemove = subArreglo.findIndex(
                      (objeto) => objeto.title === 'Acciones'
                    )
                    if (indexToRemove !== -1) {
                      subArreglo.splice(indexToRemove, 1)
                    }
                  })
                }
              }
            })(this)
          },
          {
            title: this.title,
            extend: 'pdfHtml5',
            text: '<i class="pi pi-file-pdf mr-2"></i>PDF',
            className: 'bg-red-500 text-white px-4 py-2 rounded-md mb-4',
            customize: (function (component) {
              // Guarda una referencia al contexto del componente de Vue
              return function (doc) {
                if (component.columnHidden) {
                  // Excluir la última columna del PDF
                  doc.content[1].table.body.forEach((row) => {
                    row.pop()
                  })
                }
                // Añadir margen superior al título
                if (doc.content[0].text) {
                  // Verifica si hay un título
                  doc.content[0].margin = [0, 50, 0, 0] // 50 es el margen superior
                }

                // Añadir margen superior a la tabla para moverla hacia abajo
                if (doc.content[1].table) {
                  // Verifica si hay una tabla
                  doc.content[1].margin = [0, 10, 0, 0] // 70 es el margen superior
                }
                doc['header'] = function () {
                  return {
                    image: logoSuperior,
                    width: 550,
                    alignment: 'center',
                    margin: [0, 25, 0, 25] // Ajusta según necesites
                  }
                }

                doc['footer'] = function () {
                  return {
                    image: logoInferior,
                    width: 550,
                    alignment: 'center',
                    margin: [0, 15, 0, 15] // Ajusta según necesites
                  }
                }
              }
            })(this)
          },
          {
            title: this.title,
            extend: 'print',
            text: '<i class="pi pi-print mr-2"></i>Imprimir',
            className: 'bg-blue-500 text-white px-4 py-2 rounded-md mb-4',
            customize: (function (component) {
              // Guarda una referencia al contexto del componente de Vue
              return function (win) {
                const table = win.document.querySelector('table')
                // Encuentra todas las filas de la tabla
                const rows = table.querySelectorAll('tr')

                if (component.columnHidden) {
                  // Recorre cada fila y elimina la última celda de cada una
                  rows.forEach((row) => {
                    row.style.border = '1px solid #2d3748'
                    const cells = row.querySelectorAll('td, th')
                    if (cells.length > 0) {
                      cells[cells.length - 1].remove() // Elimina la última celda de la fila
                    }
                  })
                }
                // Encuentra la cabecera de la tabla
                const headerRow = table.querySelector('thead tr')

                // Aplica estilos a las celdas de la cabecera
                const headerCells = headerRow.querySelectorAll('th')
                headerCells.forEach((cell) => {
                  //cell.style.background = '#002E63' // Cambia el color de fondo según tus preferencias
                  cell.style.color = 'black' // Cambia el color de fondo según tus preferencias
                  cell.style.border = '1px solid #2d3748' // Puedes añadir más estilos aquí si lo necesitas
                  // Puedes añadir más estilos aquí si lo necesitas
                })
                table.classList.add('compact')
                table.style.fontSize = '12px'

                // Agregar logo superior
                const logoSuperiorElement = win.document.createElement('img')
                logoSuperiorElement.src = logoSuperior
                logoSuperiorElement.style.width = '100%'
                logoSuperiorElement.style.height = 'auto'
                logoSuperiorElement.style.margin = '25px 0 25px 0'
                win.document.body.insertBefore(logoSuperiorElement, win.document.body.firstChild)

                // Agregar logo inferior
                const logoInferiorElement = win.document.createElement('img')
                logoInferiorElement.src = logoInferior
                logoInferiorElement.style.width = '85%'
                logoInferiorElement.style.height = '18px'
                logoInferiorElement.style.margin = '20px 20px 20px 20px'
                win.document.body.appendChild(logoInferiorElement)
              }
            })(this)
          },
          {
            title: this.title,
            extend: 'copy',
            text: '<i class="pi pi-copy mr-2"></i>Copiar',
            className: 'bg-yellow-500 text-white px-4 py-2 rounded-md mb-4',
            exportOptions: {
              columns: (function (component) {
                if (component.columnHidden) {
                  return ':not(:last-child)'
                }
              })(this)
            }
          }
        ]
      }
    }
  },
  watch: {
    data(newData) {
      this.localData = newData
    }
  }
}
</script>
