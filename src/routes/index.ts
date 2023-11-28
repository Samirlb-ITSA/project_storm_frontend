import { lazy } from 'react';
import UploadUsers from '../pages/Dashboard/UploadUsers';

const Calendar = lazy(() => import('../pages/Calendar'));
const Chart = lazy(() => import('../pages/Chart'));
const Dashboard = lazy(() => import('../pages/Dashboard/Home'));
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const UserForm = lazy(() => import('../pages/Form/UserForm'));
const Users = lazy(() => import('../pages/Users/List'));

const CompanyForm = lazy(() => import('../pages/Form/CompanyForm'));
const Company = lazy(() => import('../pages/Companies/List'));

const RolForm = lazy(() => import('../pages/Form/RolForm'));
const Roles = lazy(() => import('../pages/Roles/List'));

const JobOffersForm = lazy(() => import('../pages/Form/JobOffersForm'));
const JobOffers = lazy(() => import('../pages/JobOffers/List'));

const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Tables = lazy(() => import('../pages/Tables'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));

const coreRoutes = [
  {
    path: '/calendar',
    title: 'Calender',
    component: Calendar,
  },

  {
    path: '/dashboard',
    title: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/forms/form-elements',
    title: 'Forms Elements',
    component: FormElements,
  },
  //Users Routes
  {
    path: '/dashboard/users/create',
    title: 'Crear usuario',
    component: UserForm,
  },
  {
    path: '/dashboard/users/list',
    title: 'Lista de usuarios',
    component: Users,
  },
  {
    path: '/dashboard/users/upload',
    title: 'Importar usuarios',
    component: UploadUsers,
  },
  //Companies Routes
  {
    path: '/dashboard/companies/create',
    title: 'Crear Empresa',
    component: CompanyForm,
  },
  {
    path: '/dashboard/companies/list',  
    title: 'Lista de empresas',
    component: Company,
  },
  //Roles Routes
  {
    path: '/dashboard/roles/create',
    title: 'Crear Roles',
    component: RolForm,
  },
  {
    path: '/dashboard/roles/list',  
    title: 'Lista de roles',
    component: Roles,
  },
  //JobOffers Routes
  {
    path: '/dashboard/job_offers/create',
    title: 'Crear Ofertas Laborales',
    component: JobOffersForm,
  },
  {
    path: '/dashboard/job_offers/list',  
    title: 'Lista de Ofertas Laborales',
    component: JobOffers,
  },
  //Other Routes
  {
    path: '/tables',
    title: 'Tables',
    component: Tables,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/chart',
    title: 'Chart',
    component: Chart,
  },
  {
    path: '/ui/alerts',
    title: 'Alerts',
    component: Alerts,
  },
  {
    path: '/ui/buttons',
    title: 'Buttons',
    component: Buttons,
  },
];

const routes = [...coreRoutes];
export default routes;
