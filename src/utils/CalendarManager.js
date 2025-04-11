import AttendanceManager from '@/utils/AttendanceManager.js';
import WorklogManager from '@/utils/WorklogManager.js';
import Utility from '@/utils/Utility.js';
import DataImporterExporter from '@/utils/DataImporterExporter.js';

class CalendarManager {
  constructor() {
    this.currentDate = new Date();
    this.attendanceManager = new AttendanceManager();
    this.worklogManager = new WorklogManager();
    this.dataImporterExporter = new DataImporterExporter(
      this.attendanceManager,
      this.worklogManager,
    );
  }

  getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay();
  }

  markAttendance(date, status) {
    this.attendanceManager.markAttendance(date, status);
  }

  addWorklog(date, log) {
    this.worklogManager.addWorklog(date, log);
  }

  getAttendance(date) {
    return this.attendanceManager.getAttenance(date);
  }

  getWorklog(date) {
    return this.worklogManager.getWorklog(date);
  }

  getMonthData(year, month) {
    const daysInMonth = this.getDaysInMonth(year, month);
    const firstDay = this.getFirstDayOfMonth(year, month);
    const monthData = [];

    // Add empty slots for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      monthData.push(null);
    }

    // Add actual days
    Utility.rangeWithLambda(1, daysInMonth, (day) => {
      const date = new Date(year, month, day);
      // Ensure time part is zeroed out for consistent comparisons/keys if needed elsewhere
      date.setHours(0, 0, 0, 0);
      const isWeekend = date.getDay() === 0 || date.getDay() === 6; // Sunday or Saturday
      monthData.push({
        date,
        worklog: this.getWorklog(date),
        attendance: this.getAttendance(date),
        isWeekend,
      });
    });

    return monthData;
  }

  getAttendanceSummary(year, month) {
    const daysInMonth = this.getDaysInMonth(year, month);
    let presentDays = 0;
    let absentDays = 0;
    let leaveDays = 0;

    Utility.rangeWithLambda(1, daysInMonth, (day) => {
      const date = new Date(year, month, day);
      const status = this.getAttendance(date);
      if (status === 'present') presentDays++;
      else if (status === 'absent') absentDays++;
      else if (status === 'leave') leaveDays++;
    });

    return { presentDays, absentDays, leaveDays };
  }

  exportData() {
    this.dataImporterExporter.exportData();
  }

  importData(file, overwrite = true) {
    return this.dataImporterExporter.importData(file, overwrite);
  }
}

export default CalendarManager;
