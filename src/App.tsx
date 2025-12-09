import StatsTable from './components/StatsTable';

function App() {
  return (
    <div className="min-h-screen w-full py-10 px-4 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Статистика</h1>
          <p className="text-gray-500 mt-1">Финансовые показатели за текущий период</p>
        </div>
        <StatsTable />
      </div>

    </div>
  );
}

export default App;