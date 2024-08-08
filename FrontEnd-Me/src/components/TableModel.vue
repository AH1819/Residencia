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

<style>
@media print {
  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    font-size: 12px;
    border-top: 1px solid #000;
    padding: 10px 0;
  }
}
</style>

<script>
import DataTable from 'datatables.net-vue3'
import DataTableLib from 'datatables.net'
import 'datatables.net-responsive-dt'
import ButtonsHtml5 from 'datatables.net-buttons/js/buttons.html5'
import print from 'datatables.net-buttons/js/buttons.print'
import pdfmake from 'pdfmake'
import JsZip from 'jszip'
import logoSuperior from '@/assets/image'
import logoSuperior2 from '@/assets/image2'

pdfmake.fonts = {
  Roboto: {
    normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
    bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
    italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
    bolditalics:
      'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
  }
}
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
    titleProp: {
      type: String,
      default: 'Reporte',
      required: true
    },
    seccionProp: {
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
      titleReport: this.titleProp,
      titleSeccion: this.seccionProp,
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
            title: this.titleProp,
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
            title: this.titleProp,
            extend: 'pdfHtml5',
            text: '<i class="pi pi-file-pdf mr-2"></i>PDF',
            className: 'bg-red-500 text-white px-4 py-2 rounded-md mb-4',
            customize: (function (component) {
              return function (doc) {
                if (component.columnHidden) {
                  // Excluir la última columna del PDF
                  doc.content[1].table.body.forEach((row) => {
                    row.pop()
                  })
                }
                // Agregar logos y título en la parte superior
                doc.content.unshift({
                  columns: [
                    {
                      image: logoSuperior, // Reemplaza 'logoSuperior1' con el ID de tu logo
                      width: 100,
                      alignment: 'left'
                    },
                    {
                      text:
                        'UNIVERSIDAD AUTÓNOMA DE CHIAPAS\nFACULTAD DE NEGOCIOS C-IV\n' +
                        component.titleSeccion,
                      style: 'headerTitle',
                      alignment: 'center'
                    },
                    {
                      image: logoSuperior2, // Reemplaza 'logoSuperior2' con el ID de tu logo
                      width: 70,
                      alignment: 'right'
                    }
                  ],
                  margin: [0, 0, 0, 10] // Margen inferior para separar del contenido
                })

                // Agregar pie de página con dirección
                doc['footer'] = function () {
                  return {
                    columns: [
                      {
                        text: 'Carretera a Puerto Madero Km. 1.5 | Tapachula, Chiapas, México. C.P. 30700\nwww.negocios.unach.mx | Tel.: 62-5-11-66, 62-5-17-23, 62-6-83-72',
                        fontSize: 10,
                        alignment: 'center',
                        margin: [0, 0, 0, 10]
                      }
                    ],
                    margin: [10, 0]
                  }
                }

                // Estilos
                doc.styles = {
                  headerTitle: {
                    fontSize: 14,
                    bold: true,
                    margin: [0, 0, 0, 10]
                  },
                  tableHeader: {
                    fillColor: '#002E63',
                    color: 'white',
                    bold: true
                  },
                  tableBody: {
                    fillColor: '#EFEFEF'
                  }
                }

                // Aplicar estilos a la tabla
                if (doc.content[1].table) {
                  doc.content[1].table.body.forEach((row, rowIndex) => {
                    row.forEach((cell) => {
                      if (rowIndex === 0) {
                        cell.style = 'tableHeader'
                      } else {
                        cell.style = 'tableBody'
                      }
                    })
                  })
                }
              }
            })(this)
          },
          {
            title: this.titleProp,
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
                logoSuperiorElement.style.width = '150px'
                logoSuperiorElement.style.height = 'auto'
                logoSuperiorElement.style.margin = '25px 0 25px 0'

                // Agregar logo superior2
                const logoSuperiorElement2 = win.document.createElement('img')
                logoSuperiorElement2.src = logoSuperior2
                logoSuperiorElement2.style.width = '100px'
                logoSuperiorElement2.style.height = 'auto'
                logoSuperiorElement2.style.margin = '25px 0 25px 0'

                // Crear el contenedor
                const contenedorElement = win.document.createElement('div')
                contenedorElement.style.display = 'flex'
                contenedorElement.style.alignItems = 'center'
                contenedorElement.style.justifyContent = 'space-between'
                contenedorElement.style.width = '100%' // Asegura que el contenedor ocupe todo el ancho

                // Agregar el logo y el texto a un sub-contenedor para que estén juntos a la izquierda
                const subContenedorElement = win.document.createElement('div')
                subContenedorElement.style.display = 'flex'
                subContenedorElement.style.alignItems = 'center'

                // Agregar el primer logo al sub-contenedor
                subContenedorElement.appendChild(logoSuperiorElement)

                // Crear el texto con saltos de línea
                const textoElement = win.document.createElement('div')
                textoElement.innerHTML = `UNIVERSIDAD AUTÓNOMA DE CHIAPAS<br>FACULTAD DE NEGOCIOS C-IV<br>${component.titleSeccion}`
                textoElement.style.marginLeft = '10px' // Espacio entre la imagen y el texto

                // Agregar el texto al sub-contenedor
                subContenedorElement.appendChild(textoElement)

                // Agregar el sub-contenedor al contenedor principal
                contenedorElement.appendChild(subContenedorElement)

                // Agregar el segundo logo al contenedor principal
                contenedorElement.appendChild(logoSuperiorElement2)

                // Insertar el contenedor en el cuerpo del documento
                win.document.body.insertBefore(contenedorElement, win.document.body.firstChild)

                // Crear el pie de página
                const textoElementDown = win.document.createElement('div')
                textoElementDown.className = 'footer'
                textoElementDown.innerHTML = `Carretera a Puerto Madero Km. 1.5 | Tapachula, Chiapas, México. C.P. 30700 | www.negocios.unach.mx<br>
Tel.: 62-5-11-66, 62-5-17-23, 62-6-83-72`
                textoElementDown.style.marginLeft = '0px'

                // Insertar el pie de página en el cuerpo del documento
                win.document.body.appendChild(textoElementDown)

                /* // Agregar logo inferior
                const logoInferiorElement = win.document.createElement('img')
                logoInferiorElement.src = logoInferior
                logoInferiorElement.style.width = '85%'
                logoInferiorElement.style.height = '18px'
                logoInferiorElement.style.margin = '20px 20px 20px 20px'
                win.document.body.appendChild(logoInferiorElement)*/
              }
            })(this)
          },
          {
            title: this.titleProp,
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
