import { SetStateAction, useState } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
// import enUS from 'date-fns/locale/en-US';
import es from 'date-fns/locale/es';
import {
  Calendar as CalendarIcon,
  Clock,
  Plus,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Calendar as ShadcnCalendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useEffect } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DefaultLayoutReception from '../../layout/DefaultLayoutReception';

const locales = {
  es: es,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { locale: es }),
  getDay,
  locales,
});

interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  name: string;
  color: string;
  notes?: string;
}

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (appointment: Omit<Event, 'id'>) => void;
}

const AppointmentModal = ({
  isOpen,
  onClose,
  onSubmit,
}: AppointmentModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    patientName: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    startTime: '09:00',
    notes: '',
  });

  const [isAnimating, setIsAnimating] = useState(false);

  // Update animation state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(onClose, 200); // Wait for animation to complete
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const [year, month, day] = formData.date.split('-').map(Number);
    const [hours, minutes] = formData.startTime.split(':').map(Number);
    const startDate = new Date(year, month - 1, day, hours, minutes);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

    onSubmit({
      title: formData.title,
      name: formData.patientName,
      start: startDate,
      end: endDate,
      color: '#2563eb',
      notes: formData.notes,
    });

    setFormData({
      title: '',
      patientName: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      startTime: '09:00',
      notes: '',
    });

    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-black transition-all duration-200 z-[9999999] flex items-center justify-center backdrop-blur-sm
        ${isAnimating ? 'bg-opacity-50' : 'bg-opacity-0'}`}
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`transition-all duration-200 transform
          ${isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        <Card className="w-full max-w-lg shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-semibold">Crear Cita</CardTitle>
            <button
              onClick={handleClose}
              className="p-1 hover:bg-gray-100 dark:hover:bg-meta-4 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Tipo de Cita
                </label>
                <input
                  type="text"
                  required
                  className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-meta-4"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Nombre Del Paciente
                </label>
                <div className="flex gap-3 items-center">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      formData.patientName || 'John Doe',
                    )}&background=2563eb&color=fff`}
                    alt="Patient avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <input
                    type="text"
                    required
                    className="flex-1 p-2 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-meta-4"
                    value={formData.patientName}
                    onChange={(e) =>
                      setFormData({ ...formData, patientName: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Fecha
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-meta-4"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                    />
                    <CalendarIcon className="absolute right-2 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Hora</label>
                  <div className="relative">
                    <input
                      type="time"
                      required
                      className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-meta-4"
                      value={formData.startTime}
                      onChange={(e) =>
                        setFormData({ ...formData, startTime: e.target.value })
                      }
                    />
                    <Clock className="absolute right-2 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Notas Adicionales
                </label>
                <textarea
                  className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-meta-4 h-24"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                />
              </div>

              <div className="flex gap-3 justify-end mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-meta-4"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20"
                >
                  Crear Cita
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Limpieza Dental',
      start: new Date(2024, 9, 25, 10, 0),
      end: new Date(2024, 9, 25, 11, 0),
      name: 'Dr. Smith',
      color: '#2563eb',
    },
    {
      id: '2',
      title: 'Chequeo con Jane',
      start: new Date(2024, 9, 1, 14, 0),
      end: new Date(2024, 9, 1, 15, 30),
      name: 'John Doe',
      color: '#3b82f6',
    },
  ]);

  const handleDateChange = (date: SetStateAction<Date>) => {
    setSelectedDate(date);
  };

  const handleCreateAppointment = (appointment: Omit<Event, 'id'>) => {
    const newAppointment: Event = {
      ...appointment,
      id: Math.random().toString(36).substr(2, 9),
    };
    setEvents([...events, newAppointment]);
  };

  const EventComponent = ({ event }: { event: Event }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="w-full h-full">
          <div className="p-1 text-xs">{event.title}</div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="p-2 space-y-2">
            <div className="flex items-center gap-2">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  event.name,
                )}&background=2563eb&color=fff`}
                alt={event.name}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="font-semibold">{event.name}</p>
                <p className="text-sm text-gray-500">{event.title}</p>
              </div>
            </div>
            <div className="text-sm">
              <p>Start: {format(event.start, 'MMM dd, yyyy - h:mm a')}</p>
              <p>End: {format(event.end, 'MMM dd, yyyy - h:mm a')}</p>
            </div>
            {event.notes && (
              <p className="text-sm border-t pt-2">Notes: {event.notes}</p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  const CustomToolbar = (toolbar: any) => {
    const goToBack = () => {
      toolbar.onNavigate('PREV');
    };

    const goToNext = () => {
      toolbar.onNavigate('NEXT');
    };

    const goToToday = () => {
      toolbar.onNavigate('TODAY');
    };

    const label = () => {
      return (
        <span className="text-xs sm:text-lg text-center font  ">
          {toolbar.label}
        </span>
      );
    };

    return (
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
        <div className="items-center sm:flex sm:gap-2 hidden ">
          <button
            onClick={goToBack}
            className="flex items-center gap-1 px-3 py-2 text-sm bg-white dark:bg-meta-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Anterior
          </button>
          <button
            onClick={goToNext}
            className="flex items-center gap-1 px-3 py-2 text-sm bg-white dark:bg-meta-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Siguiente
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={goToToday}
            className="px-3 py-2 text-sm bg-white dark:bg-meta-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Hoy
          </button>
        </div>
        <div className="text-center">{label()}</div>
        <div className="flex gap-2">
          <button
            onClick={() => toolbar.onView('month')}
            className={`px-3 py-2 text-sm rounded-lg transition-colors ${
              toolbar.view === 'month'
                ? 'bg-gray-100 dark:bg-gray-700'
                : 'hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            Mes
          </button>
          <button
            onClick={() => toolbar.onView('week')}
            className={`px-3 py-2 text-sm rounded-lg transition-colors ${
              toolbar.view === 'week'
                ? 'bg-gray-100 dark:bg-gray-700'
                : 'hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            Semana
          </button>
          <button
            onClick={() => toolbar.onView('day')}
            className={`px-3 py-2 text-sm rounded-lg transition-colors ${
              toolbar.view === 'day'
                ? 'bg-gray-100 dark:bg-gray-700'
                : 'hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            Día
          </button>
        </div>
      </div>
    );
  };

  return (
    <DefaultLayoutReception>
      <div className="p-2 sm:p-6 max-w-[100vw] overflow-x-hidden">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4 lg:gap-8">
          {/* Left Sidebar - Full width on mobile, side on desktop */}
          <div className="w-full lg:col-span-3 space-y-4 lg:space-y-6">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
            >
              <Plus className="h-5 w-5" />
              <span>Crear Cita</span>
            </button>

            {/* Mini Calendar - Horizontally scrollable container on mobile */}
            <div className="flex justify-center items-center w-full overflow-x-auto pb-2">
              <Card className="w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px] mx-2 sm:mx-auto overflow-x-auto">
                <CardContent className="pt-4 sm:pt-6">
                  <div className="overflow-x-auto">
                    <ShadcnCalendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && handleDateChange(date)}
                      className="rounded-md ml-2 sm:ml-3"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Appointments - Scrollable on mobile */}
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>Citas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 max-h-[50vh] lg:max-h-none overflow-y-auto">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="p-4 bg-gray-50 dark:bg-meta-4 rounded-xl hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative flex-shrink-0">
                        <img
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                            event.name,
                          )}&background=2563eb&color=fff`}
                          alt={event.name}
                          className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                        />
                        <div
                          className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white"
                          style={{ backgroundColor: event.color }}
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-xs truncate">
                          {event.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {format(event.start, 'MMM dd, yyyy - h:mm a')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Calendar */}
          <div className="w-full lg:col-span-9 overflow-hidden">
            <Card className="overflow-hidden">
              <CardContent className="p-0 sm:p-6">
                <div className="overflow-x-auto">
                  <div className="min-w-[300px] sm:min-w-[800px] lg:min-w-0">
                    <BigCalendar
                      localizer={localizer}
                      events={events}
                      startAccessor="start"
                      endAccessor="end"
                      style={{ height: '600px' }}
                      views={['month', 'week', 'day']}
                      defaultView="month"
                      date={selectedDate}
                      onNavigate={handleDateChange}
                      className="custom-calendar"
                      components={{
                        event: EventComponent,
                        toolbar: CustomToolbar,
                      }}
                      eventPropGetter={(event) => ({
                        style: {
                          backgroundColor: event.color,
                          borderRadius: '8px',
                          border: 'none',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        },
                      })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <AppointmentModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateAppointment}
        />
      </div>
    </DefaultLayoutReception>
  );
};

export default Calendar;
