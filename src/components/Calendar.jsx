import {useEffect, useState} from 'react';
import '@/components/Calendar.css';
import CalendarManager from '@/utils/CalendarManager.js';
import CalendarHeader from '@/components/CalendarHeader.jsx';
import CalendarGrid from '@/components/CalendarGrid.jsx';
import CalendarDetails from '@/components/CalendarDetails.jsx';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card.jsx';
import DataImportExport from '@/components/DataImportExport.jsx';

const Calendar = () => {
  const [calendarManager] = useState(new CalendarManager());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [monthData, setMonthData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    updateCalendar();
  }, [currentDate]);

  const updateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const newMonthData = calendarManager.getMonthData(year, month);
    setMonthData(newMonthData);
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateClick = (day) => {
    if (day) {
      setSelectedDate(day.date);
    }
  };

  const handleMarkAttendance = (status) => {
    if (selectedDate) {
      calendarManager.markAttendance(selectedDate, status);
      updateCalendar();
    }
  };

  const handleAddWorklog = (worklog) => {
    if (selectedDate) {
      calendarManager.addWorklog(selectedDate, worklog);
      updateCalendar();
    }
  };

  // Optional: Add attendance summary
  const {presentDays, absentDays, leaveDays} = calendarManager.getAttendanceSummary(
    currentDate.getFullYear(),
    currentDate.getMonth(),
  );

  return (
    <div className={'calender-container w-full max-w-xl'}>
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />

      <DataImportExport
        calendarManager={calendarManager}
        onImportSuccess={updateCalendar}
      />

      <Card className="attendance-summary mb-4">
        <CardHeader>
          <CardTitle>Monthly Attendance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Present: {presentDays}</p>
          <p>Absent: {absentDays}</p>
          <p>Leave: {leaveDays}</p>
        </CardContent>
      </Card>

      <CalendarGrid monthData={monthData} onDateClick={handleDateClick}/>

      {selectedDate && (
        <CalendarDetails
          selectedDate={selectedDate}
          onMarkAttendance={handleMarkAttendance}
          onAddWorklog={handleAddWorklog}
          getAttendance={calendarManager.getAttendance.bind(calendarManager)}
          getWorklog={calendarManager.getWorklog.bind(calendarManager)}
        />
      )}
    </div>
  );
};

export default Calendar;
