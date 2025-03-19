import React from 'react';
import Utility from '@/utils/Utility';
import {Dialog, DialogContent, DialogHeader, DialogTitle} from '@/components/ui/dialog.jsx';
import {Button} from '@/components/ui/button.jsx';
import {Textarea} from '@/components/ui/textarea.jsx';
import {ToggleGroup, ToggleGroupItem} from '@/components/ui/toggle-group';

const CalendarDetails = ({
  selectedDate,
  onMarkAttendance,
  onAddWorklog,
  onCancel,
  getAttendance,
  getWorklog,
}) => {
  const handleSubmitWorklog = (e) => {
    e.preventDefault();
    const worklog = e.target.worklog.value;
    if (worklog) {
      onAddWorklog(worklog);
      //      e.target.worklog.value = '';
    }
  };

  return (
    <Dialog onOpenChange={onCancel} defaultOpen>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={'text-xl'}>
            {selectedDate.toDateString()}
          </DialogTitle>
        </DialogHeader>
        <div className="attendance-controls mb-4">
          <h4 className="scroll-m-20 text-lg font-semibold tracking-tight2">
            Mark Attendance
          </h4>
          <div className="space-x-2">
            <ToggleGroup
              type="single"
              onValueChange={onMarkAttendance}
              value={getAttendance(selectedDate)}
            >
              <ToggleGroupItem value="present">
                {Utility.capitalize('present')}
              </ToggleGroupItem>
              <ToggleGroupItem value="absent">
                {Utility.capitalize('absent')}
              </ToggleGroupItem>
              <ToggleGroupItem value="leave">
                {Utility.capitalize('leave')}
              </ToggleGroupItem>
            </ToggleGroup>
            {/*<Button onClick={() => onMarkAttendance('present')} variant="default">*/}
            {/*  {Utility.capitalize('present')}*/}
            {/*</Button>*/}
            {/*<Button onClick={() => onMarkAttendance('absent')} variant="destructive">*/}
            {/*  {Utility.capitalize('absent')}*/}
            {/*</Button>*/}
            {/*<Button onClick={() => onMarkAttendance('leave')} variant="secondary">*/}
            {/*  {Utility.capitalize('leave')}*/}
            {/*</Button>*/}
          </div>
        </div>

        <div className="worklog-controls mb-4">
          <h4 className="scroll-m-20 text-lg font-semibold tracking-tight2">
            Add Worklog
          </h4>
          <form onSubmit={handleSubmitWorklog}>
            <Textarea
              name="worklog"
              placeholder="Enter worklog..."
              defaultValue={getWorklog(selectedDate)}
              className="mb-2"
              rows={5}
            />
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
            Worklog:
            <pre className={'text-wrap text-sm'}>
              {getWorklog(selectedDate) || 'No worklog'}
            </pre>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalendarDetails;
