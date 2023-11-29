import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../images/logo/logo.svg';
import SidebarLinkWithSubmenu from './SidebarLinkGroup';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
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

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
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
              {/* <!-- Menu Item Profile --> */}
              <li>
                <NavLink
                  to="/profile"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('profile') && 'bg-graydark dark:bg-meta-4'
                    }`}
                >
                  <svg width="18" height="18" className="fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M9 7.79c2.081 0 3.769-1.63 3.769-3.656C12.769 2.11 11.08.478 9 .478 6.92.478 5.231 2.11 5.231 4.134c0 2.025 1.688 3.657 3.77 3.657zm0-6.018c1.378 0 2.503 1.069 2.503 2.39 0 1.322-1.125 2.391-2.503 2.391-1.378 0-2.503-1.069-2.503-2.39C6.497 2.84 7.622 1.772 9 1.772zM10.828 9.056H7.172c-3.01 0-5.456 2.475-5.456 5.485v2.334c0 .337.281.647.647.647a.636.636 0 00.647-.647v-2.334c0-2.307 1.884-4.22 4.218-4.22h3.628c2.307 0 4.22 1.885 4.22 4.22v2.334c0 .337.28.647.646.647a.636.636 0 00.647-.647v-2.334c-.084-3.01-2.531-5.485-5.54-5.485z"/></svg>
                  Perfil
                </NavLink>
              </li>
              {/* <!-- Menu Item Profile --> */}
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
              {/* <!-- Menu Item Profile --> */}
              
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

              {/* <!-- Menú Ofertas --> */}
              <SidebarLinkWithSubmenu
                title="Menu Ofertas"
                pathname={pathname}
                links={[
                  // { to: '', text: 'Estadisticas' },
                  { to: '/job_offers/create', text: 'Agregar Oferta Laboral' },
                  { to: '/job_offers/list', text: 'Ofertas Laborales' },
                  // { to: 'users/upload', text: 'Importar Empresas' },
                ]}
              />
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;