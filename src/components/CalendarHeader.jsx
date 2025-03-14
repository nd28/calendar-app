// src/components/CalendarHeader.jsx
import React from 'react';
import {Button} from '@/components/ui/button.jsx';

const CalendarHeader = ({currentDate, onPrevMonth, onNextMonth}) => {
  return (
    <div className="calendar-header flex items-center justify-between mb-4">
      <Button onClick={onPrevMonth} variant="outline">
        Previous
      </Button>
      <h2 className="text-2xl font-semibold">
        {currentDate.toLocaleString('default', {month: 'long'})} {currentDate.getFullYear()}
      </h2>
      <Button onClick={onNextMonth} variant="outline">
        Next
      </Button>
    </div>);
};

export default CalendarHeader;
