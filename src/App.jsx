import './App.css';
import Calendar from '@/components/Calendar.jsx';
import {ModeToggle} from '@/components/ModeToggle.jsx';
import {ThemeProvider} from '@/components/ThemeProvider.jsx';
import {useEffect, useState} from 'react';

const App = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="calendar-app-ui-theme">
      <div className="min-h-screen flex flex-col items-center p-4">
        <div className={'flex gap-2 items-center'}>
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
            v1.0.0
          </code>
          <ModeToggle />
        </div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
          Attendance & Worklog Calendar
        </h1>
        {isOffline && (
          <p className="text-yellow-600 mb-4">
            You are offline. Data is still accessible locally.
          </p>
        )}
        <Calendar />
      </div>
    </ThemeProvider>
  );
};

export default App;
