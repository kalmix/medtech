import AppointmentsTable from '@/components/Tables/AppoinmentsTable';
import DefaultLayoutReception from '@/layout/DefaultLayoutReception';

const Appoinments = () => {
  return (
    <DefaultLayoutReception>
      <h2 className="text-title-md2 font-semibold text-black mb-10">Citas</h2>

      <AppointmentsTable />
    </DefaultLayoutReception>
  );
};

export default Appoinments;
