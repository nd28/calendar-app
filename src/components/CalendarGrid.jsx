// src/components/CalendarGrid.jsx
import React from 'react';
import {Card} from '@/components/ui/card.jsx';
import {FileClock} from 'lucide-react';

const CalendarGrid = ({monthData, onDateClick, selectedDate}) => {
  return (
    <div className="grid grid-cols-7 gap-[2px]">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
        <Card
          key={day}
          className="calendar-day-header bg-stone-800 text-white p-2 text-center text-sm"
        >
          {day}
        </Card>
      ))}

      {monthData.map((day, index) => (
        <Card
          key={index}
          className={`calendar-day min-h-[90px] p-2 text-center cursor-pointer
                        ${day ? 'bg-slate-50 dark:bg-slate-700 hover:outline-blue-500 hover:outline-2' : 'bg-transparent border-0 shadow-none'}
                        ${day?.date === selectedDate ? 'outline-blue-500 outline-2' : ''}
                        ${day?.attendance ? `status-${day.attendance}` : ''}
                        ${day?.isWeekend ? 'opacity-50' : ''}`}
          onClick={() => onDateClick(day)}
        >
          {day?.date.getDate()}
          {day?.worklog && <FileClock size={16} strokeWidth={1}/>}
        </Card>
      ))}
    </div>
  );
};

export default CalendarGrid;
