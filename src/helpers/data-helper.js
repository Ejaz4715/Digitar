'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.DataHelper = void 0;
const fs_1 = __importDefault(require('fs'));
const path_1 = __importDefault(require('path'));
const dataFilePath = path_1.default.resolve(process.cwd(), 'src/data/test-data.json');
class DataHelper {
  /**
   * Reads fresh JSON data from disk
   */
  static readData() {
    const rawData = fs_1.default.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(rawData);
  }
  /**
   * Updates an existing key or creates a new key-value pair in test-data.json
   *
   * @param serviceName - Target service (e.g., 'login', 'booking')
   * @param key - Field key to update or insert
   * @param value - New value to set
   */
  static updateServiceData(serviceName, key, value) {
    const currentData = this.readData();
    // Ensure the services block exists
    if (!currentData.services) {
      currentData.services = {};
    }
    // Ensure the specific service entry exists
    if (!currentData.services[serviceName]) {
      currentData.services[serviceName] = {};
    }
    // Updates value if key exists, or creates a new key-value pair if absent
    currentData.services[serviceName][key] = value;
    // Write updated JSON back to disk with formatted 2-space indentation
    fs_1.default.writeFileSync(dataFilePath, JSON.stringify(currentData, null, 2), 'utf-8');
  }
}
exports.DataHelper = DataHelper;
