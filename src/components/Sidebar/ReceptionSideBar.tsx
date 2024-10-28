import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Calendar1 as CalendarIcon, LogOut, Ticket, MessageCircle } from 'lucide-react';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const ReceptionSidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    // Logout test
    navigate('/auth/reception/signin');
    console.log('Logging out...');
  };

  return (
    <aside
      ref={sidebar}
      className={`absolute shadow-md left-0 top-0 z-9999 flex h-screen w-80 flex-col overflow-y-hidden bg-white duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/calendar">
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
          aria-label="Sidebar Toggle"
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

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear h-full">
        <nav className="mt-5 py-0 px-4 lg:mt-0 lg:px-6">
          <div className="h-px mb-5 bg-gradient-to-r from-transparent via-blue-500 to-transparent backdrop-blur-md"></div>

          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <NavLink
                  to="/calendar"
                  className={`group rounded-xl relative flex items-center gap-2.5 py-2 px-4 font-medium text-blue-600 transition-all duration-300 ease-in-out hover:bg-blue-100  ${
                    pathname.includes('calendar') &&
                    'bg-gradient-to-l from-[#ACA9FF00] to-blue-100 text-blue-600'
                  }`}
                >
                  <CalendarIcon size={20} />
                  Calendario
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/appointments"
                  className={`group rounded-xl relative flex items-center gap-2.5 py-2 px-4 font-medium text-blue-600 transition-all duration-300 ease-in-out hover:bg-blue-100 ${
                    pathname.includes('appointments') &&
                    'bg-gradient-to-l from-[#ACA9FF00] to-blue-100 text-blue-600'
                  }`}
                >
                  <Ticket size={20} />
                  Citas
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  className={`group rounded-xl relative flex items-center gap-2.5 py-2 px-4 font-medium text-blue-600 transition-all duration-300 ease-in-out hover:bg-blue-100 ${
                    pathname.includes('chats') &&
                    'bg-gradient-to-l from-[#ACA9FF00] to-blue-100 text-blue-600'
                  }`}
                >
                  <MessageCircle size={20} />
                  Chats
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}

        {/* <!-- Profile and Logout Button --> */}
        <div className="mt-auto px-6 pb-6">
          <div className="flex items-center gap-4 rounded-xl py-3 px-4 border border-gray-200">
            <img
              src="https://ui-avatars.com/api/?name=Demo+User&background=000000&color=fff&size=40&rounded=true"
              alt="Profile"
              className="rounded-full w-10 h-10"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium">Demo User</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition-colors"
              >
                <LogOut size={16} />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ReceptionSidebar;