// src/components/CalendarGrid.jsx
import React from 'react';

const CalendarGrid = ({monthData, onDateClick}) => {
  return (
    <div className="grid grid-cols-7 gap-[2px] bg-gray-100">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
        <div
          key={day}
          className="calendar-day-header bg-gray-800 text-white p-2 text-center text-sm"
        >
          {day}
        </div>
      ))}

      {monthData.map((day, index) => (
        <div
          key={index}
          className={`calendar-day min-h-[80px] p-2 text-center cursor-pointer
                        ${day ? 'bg-slate-50 hover:bg-blue-200' : 'bg-gray-200'}
                        ${day?.attendance ? `status-${day.attendance}` : ''}
                        ${day?.isWeekend ? 'bg-slate-200 hover:bg-slate-300' : ''}`}
          onClick={() => onDateClick(day)}
        >
          {day ? day.date.getDate() : ''}
        </div>
      ))}
    </div>
  );
};

export default CalendarGrid;
