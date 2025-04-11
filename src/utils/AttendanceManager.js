// src/utils/AttendanceManager.js
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

  validateData(value) {
    const validStatuses = ['present', 'absent', 'leave'];
    return (
      typeof value === 'string' && validStatuses.includes(value.toLowerCase())
    );
  }
}

export default AttendanceManager;
