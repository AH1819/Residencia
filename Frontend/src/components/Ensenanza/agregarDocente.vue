<template>
  <div class="container mx-auto">
    <div
      class="w-full bg-white dark:bg-[#2D3748] dark:shadow-gray-950 border-transparent shadow-xl border rounded-lg border-gray-300 mb-3">
      <div class="m-3">
        <form @submit.prevent="submitForm" class="w-full mt-5">
          <input type="hidden" v-model="form.editRFC" />
          <div class="flex flex-wrap -mx-3">
            <div class="w-full lg:w-1/3 px-3">
              <span class="block uppercase tracking-wide text-gray-700 dark:text-gray-100 text-xs font-bold mb-2"
                for="rfc">
                RFC:</span>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="rfc" v-model="form.rfc" type="text" placeholder="Ej. RFCJ121212ABC" />
            </div>

            <div class="w-full lg:w-1/3 px-3">
              <span class="block uppercase tracking-wide text-gray-700 dark:text-gray-100 text-xs font-bold mb-2">
                Numero de Plaza:
              </span>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="n_plaza" v-model="form.n_plaza" type="text" placeholder="Ej. E0363040000120" />
            </div>
            <div class="w-full lg:w-1/3 px-3">
              <span
                class="block uppercase tracking-wide text-gray-700 dark:text-gray-100 text-xs font-bold mb-2">Password</span>
              <div class="flex items-center">
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-l py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="password" v-model="form.password" :type="show ? 'password' : 'text'"
                  placeholder="Ej. Debe tener al menos 6 caracteres" />
                <span
                  class="appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded-r py-3 px-2 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  @click="show = !show"><i :class="show ? 'pi pi-eye' : 'pi pi-eye-slash'"
                    style="font-size: 1.5rem"></i></span>
              </div>
            </div>

          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full lg:w-1/3 px-3">
              <span class="block uppercase tracking-wide text-gray-700 dark:text-gray-100 text-xs font-bold mb-2"
                for="nombre_Doce">
                Nombre:
              </span>
              <input
                class="appearance-none block w-full bg-gray-200  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="nombre_Doce" v-model="form.nombre_Doce" type="text" placeholder="Ej. Juan Jose" />
            </div>

            <div class="w-full lg:w-1/3 px-3">
              <span class="block uppercase tracking-wide text-gray-700 dark:text-gray-100 text-xs font-bold mb-2">
                Apellido Paterno:
              </span>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="apellido_paterno" v-model="form.apellido_paterno" type="text" placeholder="Ej. Herrera" />
            </div>
            <div class="w-full lg:w-1/3 px-3">
              <span class="block uppercase tracking-wide text-gray-700 dark:text-gray-100 text-xs font-bold mb-2">
                Apellido Materno:
              </span>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="apellido_materno" v-model="form.apellido_materno" type="text" placeholder="Ej. Hernandez" />
            </div>
          </div>

          <!-- Botón de envío del formulario -->
          <div class="text-center mt-4 space-x-4">
            <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Guardar
            </button>
            <button type="reset" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Limpiar</button>
          </div>
        </form>
      </div>
    </div>
    <!--Separacion-->
    <div
      class="w-full bg-white dark:bg-[#2D3748] dark:shadow-gray-950 border-transparent shadow-xl border rounded-lg border-gray-300 p-6">
      <DataTableComponent :data="dataDocentes" :columns="columns" :dtoptions="dtoptions" class="bg-white">
        <template #headers>
          <th>RFC</th>
          <th>Nombre</th>
          <th>Apellido Paterno</th>
          <th>Apellido Materno</th>
          <th>N_Plaza</th>
          <th>Status</th>
          <th>Acciones</th>
        </template>
      </DataTableComponent>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import HeaderModule from "../HeaderModuleComponent.vue";
import apiEnsenanza from "../../services/apiEnsenanza";
import DataTableComponent from "../Plantillas/DataTableComponent.vue";
import Swal from "sweetalert2";

export default {
  components: {
    Multiselect,
    HeaderModule,
    DataTableComponent,
  },
  data() {
    return {
      show: true,
      dataDocentes: [],
      form: {
        rfc: "",
        n_plaza: "",
        password: "",
        nombre_Doce: "",
        apellido_paterno: "",
        apellido_materno: "",
      },
      columns: [
        { data: "rfc" },
        { data: "nombre_Doce" },
        { data: "apellido_paterno" },
        { data: "apellido_materno" },
        { data: "n_plaza" },
        {
          data: "status",
          render: (data, type, row) => {
            if (data === 1) {
              // O cualquier otro número o condición que decidas
              return '<span class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Activo</span>';
            } else {
              return '<span class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">Inactivo</span>';
            }
          },
        },
        {
          title: "Acciones",
          data: null,
          render: (data, type, row) => {
            return `
                          <button class="btn-editar bg-yellow-500 text-white p-2 pt-3 rounded" data-id="${data.rfc}"><i class="pi pi-pencil pointer-events-none"></i></button>
                          <button class="btn-eliminar bg-red-500 text-white  p-2 pt-3  rounded" data-id="${data.rfc}"><i class="pi pi-trash pointer-events-none"></i></button>
                        `;
          },
        },
      ],
      dtoptions: {
        dom: "Bfrtip",
        language: {
          search: "Buscar",
          zeroRecords: "No hay registros para mostrar",
          info: "Mostrando del _START_ al _END_ de _TOTAL_ registros",
          infoFiltered: "(Filtrados de _MAX_ registros)",
          paginate: {
            first: "Primero",
            previous: "Anterior",
            next: "Siguiente",
            last: "Ultimo",
            className: "bg-green-500 mb-10"
          },

        },
        buttons: [
          {
            tittle: "Reporte de actividades PAT",
            extend: "excelHtml5",
            text: "Excel",
            className: "bg-green-500 btn btn-success border-0",
          },
          {
            tittle: "Reporte de actividades PAT",
            extend: "pdfHtml5",
            text: "PDF",
            className: "bg-red-500 btn btn-danger border-0",
            customize: function (doc) {
              // Excluir la última columna del PDF
              doc.content[1].table.body.forEach(row => {
                row.pop();
              });
              // Personalizar el documento PDF aquí
              // Añadir margen superior al título
              if (doc.content[0].text) {
                // Verifica si hay un título
                doc.content[0].margin = [0, 10, 0, 0]; // 50 es el margen superior
              }

              // Añadir margen superior a la tabla para moverla hacia abajo
              if (doc.content[1].table) {
                // Verifica si hay una tabla
                doc.content[1].margin = [0, 10, 0, 0]; // 70 es el margen superior
              }
              doc["header"] = function (currentPage, pageCount, pageSize) {
                return {
                  image: null,
                  width: 550,
                  alignment: "center",
                  margin: [0, 28, 0, 25], // Ajusta según necesites
                };
              };

              doc["footer"] = function (currentPage, pageCount, pageSize) {
                return {
                  image: logoInferior,
                  width: 450,
                  alignment: "center",
                  margin: [0, 10, 0, 10], // Ajusta según necesites
                };
              };
            },
          },

          {
            tittle: "Reporte de actividades PAT",
            extend: "print",
            text: "Imprimir",
            className: "bg-gray-500 btn btn-dark border-0",
          },
          {
            tittle: "Reporte de actividades PAT",
            extend: "copy",
            text: "Copiar Texto",
            className: "bg-slate-300 btn btn-light border-0",
          },
        ],
      },
    };
  },
  mounted() {
    this.$store.dispatch("setSelectedOption", "Enseñanza - Agregar Docente");
    this.obtenerData();
    this.$nextTick(() => {
      document.addEventListener("click", (event) => {
        // Verificar si se hizo clic en el botón de editar
        if (event.target.matches(".btn-editar")) {
          const id = event.target.getAttribute("data-id");
          this.cargarParaEditar(id);
        }

        // Verificar si se hizo clic en el botón de eliminar
        if (event.target.matches(".btn-eliminar")) {
          const id = event.target.getAttribute("data-id");
          this.eliminarMateria(id);
        }
      });
    });
  },
  methods: {
    isValidRFC(rfc) {
      // Ejemplo simple de validación de RFC
      const rfcPattern = /^[A-Z]{3,4}[0-9]{6}[A-Z0-9]{3}$/;
      return rfcPattern.test(rfc);
    },
    obtenerData() {
      apiEnsenanza
        .obtenerDocentes()
        .then((response) => {
          this.dataDocentes = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener las actividades:", error);
        });
    },
    cargarParaEditar(id) {
      const docentes = this.dataDocentes.find((item) => item.rfc == id);
      if (docentes) {
        this.form.editRFC = docentes.rfc;
        this.form.rfc = docentes.rfc;
        this.form.n_plaza = docentes.n_plaza;
        this.form.password = '';
        this.form.nombre_Doce = docentes.nombre_Doce;
        this.form.apellido_paterno = docentes.apellido_paterno;
        this.form.apellido_materno = docentes.apellido_materno;
      }
    },
    eliminarMateria(id) {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          apiEnsenanza
            .eliminarDocente(id) // Asumiendo que tienes un método así en tu API
            .then((res) => {
              Swal.fire(
                "Eliminado",
                "El detalle ha sido eliminado.",
                "success"
              );
              this.obtenerData(); // Actualizar los datos
            })
            .catch((err) => {
              Swal.fire({
                title: "Error",
                text: "Hubo un error al eliminar el detalle",
                icon: "error",
              });
            });
        }
      });
    },
    resetForm() {
      this.form.editRFC = "";
      this.form.rfc = "";
      this.form.n_plaza = "";
      this.form.password = "";
      this.form.nombre_Doce = "";
      this.form.apellido_paterno = "";
      this.form.apellido_materno = "";
    },
    submitForm() {
      console.log(this.isValidRFC(this.form.rfc));
      if (
        !this.form.rfc || !this.isValidRFC(this.form.rfc) ||
        !this.form.n_plaza ||
        !this.form.password ||
        !this.form.nombre_Doce ||
        !this.form.apellido_paterno ||
        !this.form.apellido_materno
      ) {
        Swal.fire({
          title: "Datos incompletos",
          text: "Debes seleccionar los datos",
          icon: "warning",
        });
        return;
      }
      const data = {
        editRFC: this.form.editRFC,
        rfc: this.form.rfc,
        n_plaza: this.form.n_plaza,
        password: this.form.password,
        nombre_Doce: this.form.nombre_Doce,
        apellido_paterno: this.form.apellido_paterno,
        apellido_materno: this.form.apellido_materno,
      };

      let promise;

      if (this.form.editRFC) {
        promise = apiEnsenanza.actualizarDocente(this.form.editRFC, data);
      } else {
        promise = apiEnsenanza.insertarDocente(data);
      }

      promise
        .then((res) => {
          Swal.fire({
            title: "Operación exitosa",
            text: this.form.editRFC
              ? "La materia ha sido editado correctamente"
              : "La materia ha sido asignado correctamente",
            icon: "success",
          });
          this.resetForm();
          this.obtenerData();
        })
        .catch((err) => {
          Swal.fire({
            title: "Error",
            text: "Hubo un error al realizar la operación",
            icon: "error",
          });
          this.resetForm();
        });
    },
  },
};
</script>