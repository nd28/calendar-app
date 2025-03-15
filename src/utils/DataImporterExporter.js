// src/utils/DataImporterExporter.js
class DataImporterExporter {

  constructor(attendanceManager, worklogManager) {
    this.attendanceManager = attendanceManager;
    this.worklogManager = worklogManager;
  }

  /**
   * Exports all data (attendance and worklogs) to a JSON file
   */
  exportData() {
    try {
      // Fetch all data from localStorage via DataManager
      const attendanceData = this.attendanceManager.getAll();
      const worklogData = this.worklogManager.getAll();

      // Combine data into a single object
      const exportData = {
        attendance: attendanceData,
        worklogs: worklogData,
        exportedAt: new Date().toISOString(),
      };

      // Convert to JSON string
      const dataStr = JSON.stringify(exportData, null, 2);

      // Create a Blob for the file
      const blob = new Blob([dataStr], {type: 'application/json'});

      // Create a temporary URL for the Blob
      const url = URL.createObjectURL(blob);

      // Create a temporary link element to trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = `calendar-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the URL
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting data:', error);
      throw new Error('Failed to export data');
    }
  }

  /**
   * Imports data from a JSON file
   * @param {File} file - The uploaded JSON file
   * @param {boolean} overwrite - Whether to overwrite existing data (true) or merge (false)
   * @returns {Promise} Resolves when import is complete
   */
  importData(file, overwrite = true) {
    return new Promise((resolve, reject) => {
      if (!file || file.type !== 'application/json') {
        reject(new Error('Invalid file type. Please upload a JSON file.'));
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const importedData = JSON.parse(event.target.result);

          // Validate the imported data structure
          if (!importedData.attendance || !importedData.worklogs) {
            throw new Error('Invalid data format');
          }

          // If overwrite is true, clear existing data
          if (overwrite) {
            this.attendanceManager.clear();
            this.worklogManager.clear();
          }

          if (overwrite) {
            this.attendanceManager.replaceData(importedData.attendance);
            this.worklogManager.replaceData(importedData.worklogs);
          } else {
            this.attendanceManager.mergeData(importedData.attendance);
            this.worklogManager.mergeData(importedData.worklogs);
          }
          resolve('Data imported successfully');
        } catch (error) {
          console.error('Error importing data:', error);
          reject(new Error('Failed to import data: ' + error.message));
        }
      };
      reader.onerror = () => {
        reject(new Error('Error reading file'));
      };
      reader.readAsText(file);
    });
  }
}

export default DataImporterExporter;
