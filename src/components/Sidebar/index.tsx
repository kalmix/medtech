import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
import { LayoutDashboard, Users, Logs, Zap } from 'lucide-react';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded] = useState(
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

  return (
    <aside
      ref={sidebar}
      id='sidebar'
      className={`absolute shadow-md left-0 top-0 z-9999 flex h-screen w-90 flex-col overflow-y-hidden bg-white duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/">
          <img
            src="https://ucarecdn.com/9268d5db-7224-4fad-abf8-69fa5ce9601f/medtech.png"
            alt="Logo"
            className="pr-4"
          />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-label='Sidebar Toggle'
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-0 px-4 lg:mt-0 lg:px-6">
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              <div className="h-px mb-5 bg-gradient-to-r from-transparent via-blue-500 to-transparent backdrop-blur-md"></div>
              <SidebarLinkGroup activeCondition={pathname === '/'}>
                {() => (
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `group relative flex items-center gap-2.5 rounded-xl px-4 py-2 font-medium duration-300 ease-in-out ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-400 to-blue-700 text-white'
                          : 'text-black hover:bg-blue-50'
                      }`
                    }
                  >
                    <LayoutDashboard size={20} />
                    Dashboard
                  </NavLink>
                )}
              </SidebarLinkGroup>
            </ul>
          </div>

          {/* Separator */}
          <div className="my-6 h-px bg-gray-200 dark:bg-gray-700"></div>

          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              AUDITORIA
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <NavLink
                  to="/providers"
                  className={`group rounded-md relative flex items-center gap-2.5 py-2 px-4 font-medium text-black transition-all duration-300 ease-in-out hover:bg-blue-500 hover:text-white ${
                    pathname.includes('providers') &&
                    'bg-gradient-to-r from-blue-400 to-blue-700 text-white'
                  }`}
                >
                  <Zap size={20} />
                  Servicios de Proveedores
                  <span className="ml-auto bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-xl">
                    25
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/service/clients"
                  className={`group rounded-md relative flex items-center gap-2.5 py-2 px-4 font-medium text-black transition-all duration-300 ease-in-out hover:bg-blue-500 hover:text-white ${
                    pathname.includes('clients') &&
                    'bg-gradient-to-r from-blue-400 to-blue-700 text-white'
                  }`}
                >
                  <Users size={20} />
                  Servicios de Clientes
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/service/logs"
                  className={`group rounded-md relative flex items-center gap-2.5 py-2 px-4 font-medium text-black transition-all duration-300 ease-in-out hover:bg-blue-500 hover:text-white ${
                    pathname.includes('logs') &&
                    'bg-gradient-to-r from-blue-400 to-blue-700 text-white'
                  }`}
                >
                  <Logs size={20} />
                  Service Logs
                  <span className="ml-auto bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-xl">
                    197
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Separator */}
          <div className="h-px bg-gray-200 dark:bg-gray-700"></div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
