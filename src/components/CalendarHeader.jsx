// src/components/CalendarHeader.jsx
import React from 'react';
import {Button} from '@/components/ui/button.jsx';
import {ChevronLeft, ChevronRight} from 'lucide-react';

const CalendarHeader = ({currentDate, onPrevMonth, onNextMonth}) => {
  return (
    <div className="calendar-header flex items-center justify-between mb-4">
      <Button onClick={onPrevMonth} variant="outline">
        <ChevronLeft/>
        Previous
      </Button>
      <h2 className="text-2xl font-semibold">
        {currentDate.toLocaleString('default', {month: 'long'})} {currentDate.getFullYear()}
      </h2>
      <Button onClick={onNextMonth} variant="outline">
        Next
        <ChevronRight/>
      </Button>
    </div>);
};

export default CalendarHeader;
