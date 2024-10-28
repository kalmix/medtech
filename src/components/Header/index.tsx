import { Link } from 'react-router-dom';
import DropdownNotification from './DropdownNotification';
import DropdownUser from './DropdownUser';
import { Search } from 'lucide-react';
import Breadcrumbs from '../Breadcrumbs/Breadcrumb';

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  return (
    <header className="sticky top-0 z-999 flex w-full border-b-2 border-[#E5E7EB] bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <Breadcrumbs />
        
        {/* Mobile Navigation Controls */}
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            aria-controls="sidebar"
            aria-label="Sidebar Toggle"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border-2 bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-0 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!w-full delay-300'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && 'delay-400 !w-full'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!w-full delay-500'
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!h-0 !delay-0'
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!h-0 !delay-200'
                  }`}
                ></span>
              </span>
            </span>
          </button>

          <Link className="block flex-shrink-0 lg:hidden" to="/">
            <img src="https://ucarecdn.com/900656fb-ba44-496c-bcaf-f880a6b85f39/thoothblue.svg" className="w-8 h-8" alt="Logo" />
          </Link>
        </div>

        {/* Center area */}
        <div className="hidden lg:block"></div>

        {/* Right side content */}
        <div className="flex items-center gap-3 2xsm:gap-7">
          {/* Search Form */}
          <div className="hidden sm:block">
            <form action="#" role="search">
              <div className="relative">
                <button className="absolute left-0 top-1/2 -translate-y-1/2" aria-label="Botón de Buscar">
                  <Search size={20} className="ml-2 mr-2"/>
                </button>

                <input
                  type="text"
                  placeholder="Buscar..."
                  className="w-64 border pl-8 pr-4 text-black focus:outline-none dark:text-white bg-dashboardbg p-2 rounded-lg"
                />
              </div>
            </form>
          </div>

          {/* Header Actions Navigation */}
          <nav aria-label="User actions">
            <ul className="flex items-center gap-2 2xsm:gap-4">
              <li>
                <DropdownNotification />
              </li>
              <li>
                <DropdownUser />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;