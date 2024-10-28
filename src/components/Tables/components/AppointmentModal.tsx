import { X, CalendarIcon, Clock } from 'lucide-react';
import { Appointment } from '@/components/Tables/types/types';
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { format, setHours, setMinutes, parse } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type AppointmentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  appointment?: Appointment;
  title: string;
  submitLabel: string;
};

export const AppointmentModal = ({
  isOpen,
  onClose,
  onSubmit,
  appointment,
  title,
  submitLabel,
}: AppointmentModalProps) => {
  const parseAppointmentDate = (dateString?: string) => {
    if (!dateString) return undefined;
    try {
      // Try parsing the custom format first (yyyy-MM-dd hh:mm a)
      if (dateString.includes(' ')) {
        return parse(dateString, 'yyyy-MM-dd hh:mm a', new Date());
      }
      // Fallback to regular date parsing
      return new Date(dateString);
    } catch (e) {
      console.error('Error parsing date:', e);
      return undefined;
    }
  };

  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [date, setDate] = useState<Date | undefined>(
    parseAppointmentDate(appointment?.appointmentDate)
  );
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    appointment?.appointmentDate 
      ? format(parseAppointmentDate(appointment.appointmentDate) || new Date(), "HH:mm")
      : undefined
  );

  // Update date and time when appointment changes
  useEffect(() => {
    if (appointment?.appointmentDate) {
      const parsedDate = parseAppointmentDate(appointment.appointmentDate);
      if (parsedDate) {
        setDate(parsedDate);
        setSelectedTime(format(parsedDate, "HH:mm"));
      }
    }
  }, [appointment]);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsAnimatingOut(false);
    } else if (shouldRender) {
      setIsAnimatingOut(true);
      const timer = setTimeout(() => setShouldRender(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      onClose();
      setShouldRender(false);
    }, 200);
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(timeString);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const getFormattedDateTime = () => {
    if (!date || !selectedTime) return null;
    const [hours, minutes] = selectedTime.split(':').map(Number);
    const datetime = setMinutes(setHours(date, hours), minutes);
    return format(datetime, "yyyy-MM-dd hh:mm a");
  };

  const formatDateForSubmission = (date: Date) => {
    return format(date, "yyyy-MM-dd hh:mm a");
  };

  if (!shouldRender) return null;

  return (
    <div 
      className={`fixed inset-0 bg-black/50 flex items-center justify-center z-[999999] backdrop-blur-sm
        ${isAnimatingOut ? 'animate-[fade-out_200ms_ease-in]' : 'animate-[fade-in_200ms_ease-in]'}`}
    >
      <div 
        className={`relative bg-white dark:bg-boxdark rounded-lg p-6 w-full max-w-md
          ${isAnimatingOut ? 'animate-[slide-down_200ms_ease-in]' : 'animate-[slide-up_200ms_ease-out]'}`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            if (date && selectedTime) {
              const [hours, minutes] = selectedTime.split(':').map(Number);
              const datetime = setMinutes(setHours(date, hours), minutes);
              formData.set('appointmentDate', formatDateForSubmission(datetime));
            }
            onSubmit(formData);
          }}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                defaultValue={appointment?.name}
                className="w-full rounded-lg border border-stroke bg-transparent p-2 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200 dark:border-strokedark"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                defaultValue={appointment?.email}
                className="w-full rounded-lg border border-stroke bg-transparent p-2 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200 dark:border-strokedark"
                required
              />
            </div>

            <div className="space-y-4">
              <div className="relative">
                <label className="block text-sm font-medium mb-1">
                  Appointment Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 z-[9999999]" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium mb-1">
                  Appointment Time
                </label>
                <Select
                  value={selectedTime}
                  onValueChange={setSelectedTime}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a time">
                      {selectedTime ? (
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4" />
                          {format(new Date(`2000-01-01T${selectedTime}`), 'h:mm a')}
                        </div>
                      ) : (
                        <span>Select a time</span>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent position="popper" className="z-[9999999]">
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {format(new Date(`2000-01-01T${time}`), 'h:mm a')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {date && selectedTime && (
                <div className="text-sm text-muted-foreground">
                  Appointment scheduled for: {getFormattedDateTime()}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!date || !selectedTime}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-opacity-90 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;