import { useState } from 'react';
import { Link } from 'react-router-dom';
import ClickOutside from '../ClickOutside';
import { User, Settings, LogOut, ChevronDown, ArrowUpRight } from 'lucide-react';

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLinkClick = () => {
    setDropdownOpen(false);
  };

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4 group"
        to="#"
      >
        <span className=" rounded-full">
          <img src="https://ui-avatars.com/api/?name=Demo+User&background=000000&color=fff&size=40&rounded=true" alt="User" className="rounded-full w-14 h-14" />
        </span>

        <ChevronDown 
          size={22} 
          className={`transform transition-transform duration-300 ${
            dropdownOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </Link>

      <div
        className={`absolute right-0 mt-4 w-64 flex-col rounded-xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark transform transition-all duration-300 ease-in-out origin-top ${
          dropdownOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
          <li>
            <Link
              to="#"
              onClick={handleLinkClick}
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-blue-500 lg:text-base transform transition-transform hover:translate-x-1"
            >
              <User size={22} />
              Perfil
            </Link>
          </li>
          <li>
            <Link
              to="#"
              onClick={handleLinkClick}
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-blue-500 lg:text-base transform transition-transform hover:translate-x-1"
            >
              <Settings size={22} />
              Configuraciones
            </Link>
          </li>
          <li>
            <Link
              to="/calendar"
              onClick={handleLinkClick}
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-blue-500 lg:text-base transform transition-transform hover:translate-x-1"
            >
              <ArrowUpRight size={22} />
              Ir a Recepción
            </Link>
          </li>
        </ul>
        <Link to="auth/signin">
          <button 
            onClick={handleLinkClick}
            className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-blue-500 lg:text-base w-full transform transition-transform hover:translate-x-1"
          >
            <LogOut size={22} />
            Cerrar Sesión
          </button>
        </Link>
      </div>
    </ClickOutside>
  );
};

export default DropdownUser;