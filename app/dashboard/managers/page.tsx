import ManagerCards from "./_components/ManagerCards";

const ManagersPage = async () => {
  return (
    <main className="h-[calc(100vh-104px)] w-full overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
      <ManagerCards />
    </main>
  );
};

export default ManagersPage;
