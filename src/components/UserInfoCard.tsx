const UserInfoCard = ({ name = "Demo User", role = "Admin" }) => {
  const initials = name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="mb-5 bg-white rounded-xl border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-6 py-4 flex items-center gap-4">
        <div className="flex-shrink-0">
          <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center">
            <span className="text-white text-xl font-normal">{initials}</span>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-black dark:text-white">
            {name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {role}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;