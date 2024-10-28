import { useState } from 'react';
import ClickOutside from '../ClickOutside';
import { Bell } from 'lucide-react';

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);
  const notificationCount = 4;

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <nav aria-label="Notifications">
        <ul className="flex items-center list-none m-0 p-0">
          <li className="relative">
            <button
              onClick={() => {
                setNotifying(false);
                setDropdownOpen(!dropdownOpen);
              }}
              className="relative flex h-8.5 w-8.5 items-center justify-center border-[0.5px] border-none"
              aria-label={`${notificationCount} notifications`}
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
            >
              {notifying && notificationCount > 0 && (
                <span className="absolute -top-2 -right-2 z-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-500 text-xs font-medium">
                  {notificationCount}
                  <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-blue-100 opacity-75"></span>
                </span>
              )}
              <Bell size={22} className="text-bluemain" aria-hidden="true" />
            </button>

            {/* Dropdown Menu */}
            <div
              className={`absolute -right-27 mt-2.5 flex h-90 w-75 flex-col rounded-xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80 transform transition-all duration-300 ease-in-out origin-top ${
                dropdownOpen 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
              }`}
              role="region"
              aria-label="Notifications dropdown"
            >
              <h2 className="px-4.5 py-3 text-sm font-medium text-bodydark2 border-b border-stroke">
                Notificaciones
              </h2>

              <ul className="flex h-auto flex-col overflow-y-auto list-none m-0 p-0" role="list">
                <li>
                  <a
                    className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                    href="#"
                  >
                    <p className="text-sm">
                      <span className="text-black dark:text-white">
                        Endodoncia programada
                      </span>{' '}
                      El paciente Juan Perez tiene una endodoncia programada para el 12 de mayo.
                    </p>
                    <time className="text-xs">12 May, 2025</time>
                  </a>
                </li>
                <li>
                  <a
                    className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                    href="#"
                  >
                    <p className="text-sm">
                      <span className="text-black dark:text-white">
                        Blanqueamiento dental
                      </span>{' '}
                      La paciente Maria Rodriguez tiene una cita para blanqueamiento dental el 24 de febrero.
                    </p>
                    <time className="text-xs">24 Feb, 2025</time>
                  </a>
                </li>
                <li>
                  <a
                    className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                    href="#"
                  >
                    <p className="text-sm">
                      <span className="text-black dark:text-white">
                        Cita de emergencia
                      </span>{' '}
                      El paciente Carlos Perez tiene una cita de emergencia para el 4 de enero.
                    </p>
                    <time className="text-xs">04 Jan, 2025</time>
                  </a>
                </li>
                <li>
                  <a
                    className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                    href="#"
                  >
                    <p className="text-sm">
                      <span className="text-black dark:text-white">
                        Servicio de limpieza
                      </span>{' '}
                      La paciente Ana Maria tiene una cita para limpieza dental el 1 de diciembre.
                    </p>
                    <time className="text-xs">01 Dec, 2024</time>
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    </ClickOutside>
  );
};

export default DropdownNotification;