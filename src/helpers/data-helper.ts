import fs from 'fs';
import path from 'path';
import type { Page } from '@playwright/test';

const dataFilePath = path.resolve(process.cwd(), 'src/data/test-data.json');
const apiResponseDirectory = path.resolve(process.cwd(), 'src/data/APIResponse');

export class DataHelper {
  /**
   * Reads fresh JSON data from disk
   */
  static readData(): any {
    const rawData = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(rawData);
  }

  /**
   * Updates an existing key or creates a new key-value pair in test-data.json
   *
   * @param serviceName - Target service (e.g., 'login', 'booking')
   * @param key - Field key to update or insert
   * @param value - New value to set
   */
  static updateServiceData(serviceName: string, key: string, value: any): void {
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
    fs.writeFileSync(dataFilePath, JSON.stringify(currentData, null, 2), 'utf-8');
  }

  /**
   * Record web browser HTML logs
   * Capture the API based on the request number number - extract EJAR reference and write to json file in a specified service and key.
   * @param page - page
   * @param requestNumber - Request number coming from DIGITAR
   */
  static async recordReferenceResponse(page: Page, requestNumber: string): Promise<void> {
    const response = await page.waitForResponse(
      async (candidate) => {
        const contentType = candidate.headers()['content-type'] ?? '';
        if (!candidate.ok() || !['xhr', 'fetch'].includes(candidate.request().resourceType()) || !contentType.includes('json')) {
          return false;
        }

        return this.findReference(await candidate.json()) !== undefined;
      },
      { timeout: 30_000 }
    );
    const responseBody: unknown = await response.json();

    const currentData = this.readData();
    const rentalBehaviorData = currentData.services?.['rental-behavior'];
    if (!rentalBehaviorData || String(rentalBehaviorData.requestNumber) !== requestNumber) {
      throw new Error(`Request number "${requestNumber}" was not found in rental-behavior test data.`);
    }

    fs.mkdirSync(apiResponseDirectory, { recursive: true });
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const safeRequestNumber = requestNumber.replace(/[^a-zA-Z0-9_-]/g, '_');
    const responseFilePath = path.join(apiResponseDirectory, `${timestamp}-${safeRequestNumber}.json`);
    fs.writeFileSync(responseFilePath, JSON.stringify(responseBody, null, 2), 'utf-8');

    let reference: string | undefined;
    try {
      const savedResponse: unknown = JSON.parse(fs.readFileSync(responseFilePath, 'utf-8'));
      reference = this.findReference(savedResponse);
    } finally {
      fs.unlinkSync(responseFilePath);
    }

    if (!reference) {
      throw new Error(`The API response for request "${requestNumber}" did not contain a reference.`);
    }

    rentalBehaviorData.ejarReference = reference;
    fs.writeFileSync(dataFilePath, JSON.stringify(currentData, null, 2), 'utf-8');
  }

  private static findReference(value: unknown): string | undefined {
    if (Array.isArray(value)) {
      for (const item of value) {
        const reference = this.findReference(item);
        if (reference) {
          return reference;
        }
      }
      return undefined;
    }

    if (!value || typeof value !== 'object') {
      return undefined;
    }

    for (const [key, item] of Object.entries(value)) {
      if (key === 'reference' && (typeof item === 'string' || typeof item === 'number') && String(item).trim()) {
        return String(item);
      }

      const reference = this.findReference(item);
      if (reference) {
        return reference;
      }
    }
    return undefined;
  }
}
