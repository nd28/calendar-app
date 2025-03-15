import DataManager from '@/utils/DataManager.js';

class AttendanceManager extends DataManager {
  constructor() {
    super('attendenaceData');
  }

  markAttendance(date, status) {
    this.setData(date, status);
  }

  getAttenance(date) {
    return this.getData(date);
  }
}

export default AttendanceManager;
