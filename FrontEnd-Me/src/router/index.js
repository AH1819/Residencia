import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import ModulosView from '../views/ModulosView.vue'
import NotFound from '../views/404.vue'
import NoPermisos from '../views/noPermisos.vue'
import Docentes from '../components/Ensenanza/Docentes.vue'
import Materias from '@/components/Ensenanza/Materias.vue'
import Usuarios from '../components/Admin/Usuarios.vue'
import InvestigacionView from '../views/InvestigacionView.vue'
import investigacionReportes from '@/components/Investigacion/Reportes/investigacionReportes.vue'
import RegistroActividad from '@/components/Admin/RegistroActividad.vue'
import Asignar from '@/components/Ensenanza/Asignar.vue'
import Actividades from '@/components/Ensenanza/Actividades.vue'
import Tutoria from '@/views/Tutoria.vue'
import Secretaria from '@/views/Secretaria.vue'

const routes = [
  {
    path: '/',
    component: Home,
    meta: { requiresAuth: true }, // Aquí
    children: [
      { path: '', redirect: { name: 'home' } },
      {
        path: 'home',
        name: 'home',
        component: ModulosView,
        meta: { title: 'Sistema de Gestión de Actividades' }
      },
      {
        path: '/docentes',
        name: 'Docentes',
        component: Docentes,
        meta: {
          title: 'Docentes',
          requiredPermission: 'Enseñanza-Admin'
        }
      },
      {
        path: '/usuarios',
        name: 'Usuarios',
        component: Usuarios,
        meta: {
          title: 'Usuarios',
          requiredPermission: 'Super-Admin'
        }
      },
      {
        path: '/registro-actividad',
        name: 'RegistroActividad',
        component: RegistroActividad,
        meta: {
          title: 'Registro de Actividades',
          requiredPermission: 'Super-Admin'
        }
      },
      {
        path: '/investigacion',
        name: 'Investigacion',
        component: InvestigacionView,
        meta: {
          title: 'Coordinacion de Investigacion',
          requiredPermission: 'Investigacion'
        }
      },
      {
        path: '/reportes',
        name: 'InvestigacionReportes',
        component: investigacionReportes,
        meta: {
          title: 'Reportes de Investigacion',
          requiredPermission: 'Investigacion'
        }
      },
      {
        path: '/materias',
        name: 'Materias',
        component: Materias,
        meta: {
          title: 'Materias',
          requiredPermission: 'Enseñanza-Admin'
        }
      },
      {
        path: '/asignar',
        name: 'Asignar',
        component: Asignar,
        meta: {
          title: 'Asignar materia',
          requiredPermission: 'Enseñanza-Admin'
        }
      },
      {
        path: '/actividades',
        name: 'Actividades',
        component: Actividades,
        meta: {
          title: 'Actividades',
          requiredPermission: 'Enseñanza'
        }
      },
      {
        path: 'tutorias',
        name: 'Tutorias',
        component: Tutoria,
        meta: { title: 'Tutorias', requiredPermission: 'Tutorias' }
      },
      {
        path: '/secretaria',
        name: 'Secretaria',
        component: Secretaria,
        meta: { title: 'Secretaria Academica' }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: 'SIGEA' }
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound,
    meta: { title: '404 Not Found' }
  },
  {
    path: '/no-permisos',
    name: 'NoPermisos',
    component: NoPermisos,
    meta: { title: 'No Tienes Permisos' }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'NotFound' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

function isAuthenticated() {
  return !!localStorage.getItem('user')
}

function hasPermission(requiredPermission) {
  const userPermissionsObject = JSON.parse(localStorage.getItem('permisos'))

  if (
    !userPermissionsObject ||
    !userPermissionsObject.data ||
    !Array.isArray(userPermissionsObject.data.permisos)
  ) {
    return false // Si no es un array o no existe, directamente retornamos false.
  }

  const userPermissions = userPermissionsObject.data.permisos

  // Si es superadmin, permite el acceso a cualquier ruta
  if (userPermissions.some((permission) => permission.Permiso === 'Super-Admin')) {
    return true
  }

  return userPermissions.some((permission) => permission.Permiso === requiredPermission)
}

router.beforeEach((to, from, next) => {
  // Set the document title based on route metadata
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = 'Mi aplicación Vue'
  }

  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated()) {
    next('/Login')
    return
  }

  if (to.path.toLowerCase() === '/login' && isAuthenticated()) {
    next('/home')
    return
  }

  const requiredPermission = to.meta.requiredPermission
  if (requiredPermission && !hasPermission(requiredPermission)) {
    next('/no-permisos')
    return
  }

  next()
})

export default router
