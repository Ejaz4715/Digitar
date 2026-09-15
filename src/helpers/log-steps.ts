// src/utils/stepHelper.ts
import { test } from '@playwright/test';

export async function logStep(
  title: string,
  stepFunction: () => Promise<void>
) {
  const testInfo = test.info(); // Gets current running test info automatically

  await test.step(title, async () => {
    testInfo.attachments.push({
      name: 'step',
      contentType: 'application/json',
      body: Buffer.from(JSON.stringify({ title, timestamp: new Date().toISOString() }))
    });
    
    await stepFunction();
  });
}