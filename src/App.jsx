import './App.css';
import Calendar from '@/components/Calendar.jsx';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-4xl font-bold mb-6">Attendance & Worklog Calendar</h1>
      <Calendar/>
    </div>
  );
};

export default App;
