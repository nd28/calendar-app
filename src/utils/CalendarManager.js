import AttendanceManager from "./AttendanceManager.js";
import WorklogManager from "./WorklogManager.js";
import Utility from "./Utility.js";

class CalendarManager {
  constructor() {
    this.currentDate = new Date();
    this.attendanceManager = new AttendanceManager();
    this.worklogManager = new WorklogManager();
  }

  getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay();
  }

  markAttendance(date, status) {
    this.attendanceManager.markAttendance(date, status)
  }

  addWorklog(date, log) {
    this.worklogManager.addWorklog(date, log);
  }

  getAttendance(date) {
    return this.attendanceManager.getAttenance(date)
  }

  getWorklog(date) {
    return this.worklogManager.getWorklog(date);
  }

  getMonthData(year, month) {
    const daysInMonth = this.getDaysInMonth(year, month);
    const firstDay = this.getFirstDayOfMonth(year, month);
    const monthData = [];

    // Add empty slots for days before the first day of the month
    Utility.rangeWithLambda(0, firstDay - 1, () => monthData.push(null));

    // Add actual days
    Utility.rangeWithLambda(1, daysInMonth, day => {
      const date = new Date(year, month, day)
      monthData.push({
        date,
        worklog: this.getWorklog(date),
        attendance: this.getAttendance(date)
      })
    })

    return monthData;
  }
}

export default CalendarManager
