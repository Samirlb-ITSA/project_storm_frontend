import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../images/logo/logo.svg';
import SidebarLinkWithSubmenu from './SidebarLinkGroup';
import { jwtDecode } from 'jwt-decode';
import useAuthStore from '../stores/AuthStore';
interface Role {
  roleid: string
  name: string
}

interface Token {
  id: string
  first_name: string
  last_name: string
  roles: [Role]
  exp: number
}

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const session = useAuthStore((state) => state.session);
  let token: Token | null = null;
  let isAdmin = false
  let isGraduate = false
  let isProfessor = false
  if (typeof session === 'string') {
    token = jwtDecode<Token>(session);
    isAdmin = token.roles.some(role => role.name === 'Admin');
    isGraduate = token.roles.some(role => role.name === 'Graduate');
    isProfessor = token.roles.some(role => role.name === 'Teacher');
  }
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  // Check role

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="">
          <h2>Project Storm</h2>
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          {/* ... SVG del botón ... */}
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item List Job Offers --> */}
              <li>
                <NavLink
                  to="/job-offers"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('job-offers') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}
                >
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"  className="fill-current" width="20" height="20" viewBox="0 0 440 534"><path d="M58.4 9.9C48.8 12.2 38.9 20.4 34.2 30l-2.7 5.5v459l2.7 5.5c4.8 9.5 12.3 16.1 21.9 19.1C62 520.9 67.7 521 223 521s161-.1 166.9-1.9c9.6-3 17.1-9.6 21.9-19.1l2.7-5.5v-459l-2.7-5.5c-4.8-9.5-12.3-16.1-21.9-19.1C384.1 9.1 379 9 261.5 9c-67.3 0-123.1.3-124 .6-.8.4-2.3 2-3.1 3.6-1.3 2.5-1.3 3.5-.3 5.9.6 1.7 2 3.4 3 3.9 1.1.6 47.6 1 123.9 1 133.7 0 125.8-.3 132.4 5.8 1.6 1.5 3.7 4.5 4.7 6.7 1.8 3.9 1.9 12.1 1.9 228.5s-.1 224.6-1.9 228.5c-2.3 4.9-6.4 8.9-11.3 10.9-3.3 1.4-21.4 1.6-163.8 1.6s-160.5-.2-163.8-1.6c-4.9-2-9-6-11.3-10.9-1.8-3.9-1.9-12.1-1.9-228.3 0-246.1-.4-227.9 5.8-234.6 5.8-6.1 8.1-6.6 36.5-6.6h25.8l2.4-2.5c3.2-3.1 3.2-6.9 0-10L114.1 9l-26.3.1c-14.5.1-27.7.4-29.4.8z"/><path d="M97 48.6c-20.6 5.6-31.5 26.8-23.9 46.9 3 8.1 11.2 16.3 19.4 19.5 13.1 5.1 26.9 2.4 37.3-7.4 14.3-13.4 14.4-36.7.2-50-5.7-5.3-10.7-8-17.8-9.5-6.6-1.4-8.4-1.3-15.2.5zm18 16.3c4.9 2.5 9.7 9.2 10.5 14.4 1 6.5-1 12.2-5.9 17.1-12.8 12.8-33.7 4.2-33.7-13.9 0-15.3 15.4-24.7 29.1-17.6zM271.5 49.5l-2.5 2.4v60.2l2.5 2.4c2.3 2.4 2.9 2.5 16.3 2.5 12.6 0 14.2-.2 16.6-2.1 3.4-2.7 3.6-7.7.3-10.7-2-1.9-3.5-2.2-11.6-2.2h-9.2l.3-6.3.3-6.2 8.6-.3c9.8-.3 12.2-1.8 12.2-7.3 0-5.4-3-7.2-12.8-7.7l-8.5-.5V62h9.3c8.5 0 9.6-.2 11.5-2.3 3.1-3.3 2.9-8-.4-10.6-2.4-1.9-4-2.1-16.6-2.1-13.4 0-14 .1-16.3 2.5zM331.2 49.3c-2.2 2.3-2.2 2.9-2.2 32.8v30.6l2.3 2.1c2.9 2.7 6.7 2.8 9.8.3 2.1-1.7 2.4-2.9 2.7-10.4l.4-8.5 8.1 9.1c9.9 11.1 10.5 11.6 13.7 11.7 5.5 0 9.3-5.7 6.9-10.3-.7-1.2-4.1-5.4-7.6-9.4-6-6.7-7.1-9.3-3.9-9.3 1.7 0 8.3-6.4 10-9.8 3.8-7.5 2.6-16.5-3.2-23.3-5.6-6.5-9.6-7.9-23.3-7.9-10.8 0-11.7.2-13.7 2.3zm25.3 15.2c3.1 3 3.1 4.7.2 8.1-1.8 2.1-3.5 2.8-7.5 3.2l-5.2.5V62h5c4.1 0 5.6.5 7.5 2.5zM162 50c-1.9 1.9-2 3.3-2 32.5s.1 30.6 2 32.5c3 3 8.3 2.7 10.9-.6 1.8-2.3 2.1-4.1 2.1-14V89h8c6.7 0 8.3-.3 10-2 2.5-2.5 2.6-7.1.2-10-1.6-2-3.1-2.4-10-2.8l-8.2-.5V63h6.9c10.9 0 15.1-2.3 15.1-8.2 0-1.4-.9-3.4-2-4.6-2-2.1-3-2.2-16.5-2.2-13.2 0-14.7.2-16.5 2zM218.4 50.1c-1.8 2-1.9 4-1.9 32.4s.1 30.4 1.9 32.4c2.6 2.9 8.6 2.9 11.2 0 1.6-1.8 2-4 2.3-14l.3-11.9h7.9c6.8 0 8.1-.3 9.9-2.2 1.1-1.2 2-3.3 2-4.7-.1-5.5-4.6-8.1-14.1-8.1H232V63.2l8.6-.3c7.9-.4 8.7-.6 11-3.2 2.9-3.4 3-5.6.3-9.1-2-2.6-2-2.6-16.8-2.6-13.8 0-14.9.1-16.7 2.1zM74 146c-1.1 1.1-2 3.3-2 4.9 0 7 8.1 10 12.7 4.7 2.8-3.3 2.9-5.6.2-9-2.6-3.3-7.9-3.6-10.9-.6zM101.5 146c-2.4 2.6-2.2 7.8.5 10.4l2.1 2.1h268.1l1.9-2.4c2.3-2.8 2.4-6.9.3-9.9l-1.5-2.2H238.1c-133.5 0-134.8 0-136.6 2zM74.2 186.3c-3.1 3.3-2.9 8 .4 10.6 5 3.9 10.8 1.6 12-4.6 1.3-6.7-7.7-11-12.4-6zM102.7 185.2c-3.8 3-3.8 9.5.1 12.4 1.4 1.1 26.7 1.3 134.8 1.4h133.1l2.7-2.1c3.4-2.7 3.6-7.7.3-10.7l-2.3-2.2H237.9c-105.3 0-133.9.3-135.2 1.2zM76.3 225c-2.6 1.1-4.3 4-4.3 7.4 0 6.3 8.9 9 12.9 4 2.8-3.6 2.6-6-.8-9.5-3.1-3.1-4.2-3.3-7.8-1.9zM104.5 224.9c-4.8 2-6.3 8.4-2.9 12.2 1.7 1.8 5.3 1.9 136.1 1.9 133 0 134.3 0 136.3-2 2.7-2.7 2.6-8.1-.1-10.6-2.1-1.8-5.9-1.9-134.8-2.1-72.9-.1-133.5.2-134.6.6zM74.2 267.3c-4.9 5.2-.6 13.6 6.3 12.3 3.8-.8 5.3-2.3 6.1-6.3 1.3-6.7-7.7-11-12.4-6zM102 267c-3.3 3.3-3 7.5.6 10.7l2.5 2.3h265.6l2.7-2.1c3.3-2.6 3.6-7.9.6-10.9-2-2-3.3-2-136-2s-134 0-136 2zM74.6 307.1c-3.3 2.6-3.6 7.9-.6 10.9s8.3 2.7 10.9-.6c2.4-3 2.6-4.3 1-7.7-1.1-2.4-4.7-4.7-7.3-4.7-.7 0-2.5.9-4 2.1zM102.4 307.3c-3.4 3-3.6 8.3-.3 10.9 2 1.7 6.4 1.8 63 1.8 59.6 0 60.9 0 62.9-2 3-3 2.7-8.3-.6-10.9-2.6-2.1-3.5-2.1-62.5-2.1h-59.8l-2.7 2.3zM309.3 307c-2.9 1.2-4.3 4-4.3 8.9v4.1h-4.2c-8.3.1-17.1 5.8-20.8 13.7-2.5 5.4-3.7 16.8-2.6 25.5 1.5 12.1 10.6 21.3 22 22.5l5.6.6V414h-3.5c-4.7 0-8.2-3.5-9.1-9-.7-4-4.1-8-7-8-2.7 0-6.2 2.3-7.3 4.7-1.8 3.8.3 12.4 4.2 17.6 4 5.3 12.4 9.7 18.4 9.7 4.2 0 4.3.1 4.3 3.2.1 6.2 5.2 9.6 10.6 7.3 3.4-1.4 4.4-3.2 4.4-7.6 0-2.7.2-2.9 4.3-2.9 5.7 0 13.6-3.9 17.6-8.6 4.8-5.8 6.4-12.8 5.9-24.9-.4-8.7-.8-10.8-3.3-15.3-1.5-2.9-4.4-6.4-6.3-7.8-3.7-2.9-10.9-5.4-15.4-5.4H320v-32h2.5c6.1 0 10.5 4.9 10.5 11.6 0 6.4 9.3 8.6 13.3 3.2 1.9-2.5 2-3.3.9-9-2.1-11.5-10.8-19.7-21.7-20.6l-5.5-.4v-4.3c0-6.8-5.1-10.8-10.7-8.5zm-4.3 44v16h-3c-1.9 0-4.2-1.1-6.2-2.9-3.2-2.8-3.3-3.3-3.6-11.4-.6-12.4 2.4-17.4 10.1-17.6l2.7-.1v16zm24.2 33.9c3 2.6 3.3 3.5 3.6 10 .8 13.2-2.1 19.1-9.3 19.1H320v-32h3c1.9 0 4.2 1.1 6.2 2.9zM74 348c-2.8 2.8-2.6 7.5.5 10.5 1.3 1.4 3.1 2.5 3.9 2.5 2.8 0 6.4-2.2 7.5-4.7 1.6-3.4 1.4-4.7-1-7.7-2.6-3.3-7.9-3.6-10.9-.6zM102.1 347.8c-3.3 2.6-3.1 7.9.3 10.9l2.7 2.3h59.8c59 0 59.9 0 62.5-2.1 3.3-2.6 3.6-7.9.6-10.9-2-2-3.3-2-62.9-2-56.6 0-61 .1-63 1.8zM74.6 388.1c-3.4 2.7-3.6 7.7-.3 10.7 3.1 3 7.2 2.8 10.4-.4 2-2 2.4-3.1 1.9-5.7-1.2-6.2-7-8.5-12-4.6zM102.6 388.2c-3.6 3.3-3.9 7.5-.6 10.8 2 2 3.3 2 63 2s61 0 63-2c3-3 2.7-8.3-.6-10.9-2.6-2.1-3.5-2.1-62.5-2.1h-59.8l-2.5 2.2zM74 429c-4 4-1.6 11.2 4.2 12.6 2.2.5 3.3 0 5.8-2.4 3.5-3.6 3.8-6 .9-9.6-2.6-3.3-7.9-3.6-10.9-.6zM101.6 428.9c-2.5 2.7-2.4 7.8.3 10.4l2.2 2.2h60.8c58.5 0 61-.1 63-1.9 2.7-2.5 2.9-8.6.3-10.9-1.7-1.5-7.5-1.7-63.4-1.7-59.1 0-61.6.1-63.2 1.9zM74.6 469.1c-3.6 2.8-3.6 8 0 10.8 2.5 2 3.9 2.1 26.1 2.1h23.4l2.4-2.5c1.4-1.3 2.5-3.6 2.5-5s-1.1-3.7-2.5-5l-2.4-2.5h-23.4c-22.2 0-23.6.1-26.1 2.1zM314.6 469.1c-3.4 2.7-3.6 7.7-.3 10.7 2.3 2.1 3.1 2.2 25.9 2.2 21.5 0 23.8-.2 25.9-1.9 3.2-2.6 3.2-8.6 0-11.2-2.1-1.7-4.3-1.9-25.6-1.9-22 0-23.4.1-25.9 2.1z"/></svg>
                  Ofertas Laborales
                </NavLink>
              </li>

              {/* <!-- Menu Item Profile --> */}
              <li>
                <NavLink
                  to="/profile"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('profile') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <svg width="18" height="18" className="fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M9 7.79c2.081 0 3.769-1.63 3.769-3.656C12.769 2.11 11.08.478 9 .478 6.92.478 5.231 2.11 5.231 4.134c0 2.025 1.688 3.657 3.77 3.657zm0-6.018c1.378 0 2.503 1.069 2.503 2.39 0 1.322-1.125 2.391-2.503 2.391-1.378 0-2.503-1.069-2.503-2.39C6.497 2.84 7.622 1.772 9 1.772zM10.828 9.056H7.172c-3.01 0-5.456 2.475-5.456 5.485v2.334c0 .337.281.647.647.647a.636.636 0 00.647-.647v-2.334c0-2.307 1.884-4.22 4.218-4.22h3.628c2.307 0 4.22 1.885 4.22 4.22v2.334c0 .337.28.647.646.647a.636.636 0 00.647-.647v-2.334c-.084-3.01-2.531-5.485-5.54-5.485z"/></svg>
                  Perfil
                </NavLink>
              </li>
              {/* <!-- Menu Item Profile --> */}
              {isAdmin && (
                <li>
                  <NavLink
                    to="/dashboard"
                    className={`group gap-1 relative flex items-center rounded-sm py-2 pl-3 pr-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('dashboard') && 'bg-graydark dark:bg-meta-4'
                      }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="fill-current"  width="29" height="24" viewBox="0 0 28 24"><path d="M18.29 4.09v.492h1.241l-.836.86c-.465.472-1.097 1.113-1.414 1.425l-.578.563-.965-.489-.965-.496-1.933 1.977-1.938 1.98-.933-.48c-.848-.43-.942-.473-1.004-.434-.04.028-.969.735-2.067 1.575l-1.996 1.53.293.395.29.395 1.812-1.39 1.812-1.388.993.508.996.508 1.933-1.976 1.938-1.98.965.495.968.492 1.653-1.68 1.656-1.679.016 1.266h.968V3.594H18.29zm0 0M17.29 13.977v4.453h-.966v-6.926h-2.906v6.926h-.965v-4.946H9.547v4.946h-.965v-2.97H5.676v2.97h-1v.988h16.52v-.988h-1V9.527h-2.907zm1.937.496v3.957h-.97v-7.914h.97zm-3.872.988v2.969h-.968v-5.934h.968zm-3.87.988v1.98h-.97v-3.956h.97zm-3.872.992v.989h-.968v-1.98h.968zm0 0"/></svg>
                    Estadisticas
                  </NavLink>
                </li>
              )}
              {/* <!-- Menu Item Profile --> */}
              
              {isAdmin && (
                <>
                  {/* <!-- Menú Usuarios --> */}
                  <SidebarLinkWithSubmenu
                    title="Menu usuarios"
                    pathname={pathname}
                    links={[
                      { to: '/users/create', text: 'Agregar usuario' },
                      { to: '/users/list', text: 'Usuarios' },
                      { to: '/users/upload', text: 'Importar Usuarios' },
                    ]}
                  />

                  {/* <!-- Menú Empresas --> */}
                  <SidebarLinkWithSubmenu
                    title="Menu Empresas"
                    pathname={pathname}
                    links={[
                      // { to: '', text: 'Estadisticas' },
                      { to: '/companies/create', text: 'Agregar Empresa' },
                      { to: '/companies/list', text: 'Empresas' },
                      // { to: 'users/upload', text: 'Importar Empresas' },
                    ]}
                  />

                  {/* <!-- Menú Rol --> */}
                  <SidebarLinkWithSubmenu
                    title="Menu Roles"
                    pathname={pathname}
                    links={[
                      // { to: '', text: 'Estadisticas' },
                      { to: '/roles/create', text: 'Agregar Rol' },
                      { to: '/roles/list', text: 'Roles' },
                      // { to: 'users/upload', text: 'Importar Rol' },
                    ]}
                  />
                </>
              )}

              {(isAdmin || isGraduate || isProfessor) && (
                <>
                  {/* <!-- Menú Ofertas --> */}
                  <SidebarLinkWithSubmenu
                    title="Menu Ofertas"
                    pathname={pathname}
                    links={[
                      // { to: '', text: 'Estadisticas' },
                      ...(isAdmin || isProfessor ? [{ to: '/job_offers/create', text: 'Agregar Oferta Laboral' }] : []),
                      { to: '/job_offers/list', text: 'Ofertas Laborales' },
                      // { to: 'users/upload', text: 'Importar Empresas' },
                    ]}
                  />
                </>
              )}

              {isAdmin && (
                <>
                  {/* <!-- Menú Carreras --> */}
                  <SidebarLinkWithSubmenu
                    title="Menu Carreras"
                    pathname={pathname}
                    links={[
                      { to: '/careers/create', text: 'Agregar Carrera' },
                      { to: '/careers/list', text: 'Carreras' },
                    ]}
                  />
                </>
              )}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;