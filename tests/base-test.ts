import { test as base } from '@playwright/test'
import fs from 'fs' // built in node module for file system access

// Extend base test by providing this interceptor function
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend({
  page: async ({ page }, use, testInfo) => {
    page.on('console', (msg) => {
      fs.mkdirSync(testInfo.outputDir, { recursive: true }) // create directory if it doesn't exist

      fs.writeFileSync(
        testInfo.outputDir + '/console.log', // file path
        msg.text() + '\r\n', // file content
        {
          flag: 'a', // write mode (append to file)
        }
      )
    })

    page.on('pageerror', (error) => {
      fs.mkdirSync(testInfo.outputDir, { recursive: true }) // create directory if it doesn't exist

      fs.writeFileSync(
        testInfo.outputDir + '/error.log', // file path
        error.message + '\r\n', // file content
        {
          flag: 'a', // write mode (append to file)
        }
      )
    })

    await use(page) // it's critical to call use() to pass the fixture to the test
  },
})

export { expect } from '@playwright/test'
