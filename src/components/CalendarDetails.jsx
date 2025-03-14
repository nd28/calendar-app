import React from 'react';
import Utility from '@/utils/Utility';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card.jsx';
import {Button} from '@/components/ui/button.jsx';
import {Textarea} from '@/components/ui/textarea.jsx';

const CalendarDetails = ({
                           selectedDate,
                           onMarkAttendance,
                           onAddWorklog,
                           getAttendance,
                           getWorklog,
                         }) => {
  const handleSubmitWorklog = (e) => {
    e.preventDefault();
    const worklog = e.target.worklog.value;
    if (worklog) {
      onAddWorklog(worklog);
      e.target.worklog.value = '';
    }
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>{selectedDate.toDateString()}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="attendance-controls mb-4">
          <h4 className="text-lg font-semibold mb-2">Mark Attendance</h4>
          <div className="space-x-2">
            <Button onClick={() => onMarkAttendance('present')} variant="default">
              {Utility.capitalize('present')}
            </Button>
            <Button onClick={() => onMarkAttendance('absent')} variant="destructive">
              {Utility.capitalize('absent')}
            </Button>
            <Button onClick={() => onMarkAttendance('leave')} variant="secondary">
              {Utility.capitalize('leave')}
            </Button>
          </div>
        </div>

        <div className="worklog-controls mb-4">
          <h4 className="text-lg font-semibold mb-2">Add Worklog</h4>
          <form onSubmit={handleSubmitWorklog}>
            <Textarea name="worklog" placeholder="Enter worklog..." className="mb-2"/>
            <Button type="submit">Add Worklog</Button>
          </form>
        </div>

        <div className="day-details">
          <h4 className="text-lg font-semibold mb-2">Details</h4>
          <p className="text-sm">
            Attendance:{' '}
            {Utility.capitalize(getAttendance(selectedDate)) || 'Not marked'}
          </p>
          <p className="text-sm">
            Worklog: {getWorklog(selectedDate) || 'No worklog'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarDetails;
