import CreateButton from "./_components/create-button";
import NoTask from "./_components/no-task";

const DashboardPage = () => {
  return (
    <div className="h-[100dvh] w-full">
      <div className="px-8 py-4 flex justify-between">
        <h1 className="text-2xl md:text-4xl font-bold">Dashboard</h1>
        <CreateButton />
      </div>
      <NoTask />
    </div>
  );
};

export default DashboardPage;
