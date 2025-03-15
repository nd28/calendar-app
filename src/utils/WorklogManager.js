import DataManager from '@/utils/DataManager.js';

class WorklogManager extends DataManager {
  constructor() {
    super('worklogData');
  }

  addWorklog(date, log) {
    this.setData(date, log);
  }

  getWorklog(date) {
    return this.getData(date);
  }

  validateData(value) {
    return typeof value === 'string' && value.trim().length > 0;
  }
}

export default WorklogManager;
