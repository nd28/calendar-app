import DataManager from "./DataManager.js";

class WorklogManager extends DataManager {
    constructor() {
        super('worklogData')
    }

    addWorklog(date, log) {
        this.setData(date, log)
    }

    getWorklog(date) {
        return this.getData(date)
    }
}

export default WorklogManager;