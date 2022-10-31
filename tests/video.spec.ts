declare const player: any

const { test, expect } = require('./base-test')

test.only('Play/Pause', async ({ page }) => {
  await page.goto('/')

  const video = await page.$('video')

  await page.evaluate(() => player.play())

  let currentVideoState = await video.evaluate((element) => element.paused)
  expect(currentVideoState).toBeFalsy()

  await page.evaluate(() => player.pause())

  currentVideoState = await video.evaluate((element) => element.paused)
  expect(currentVideoState).toBeTruthy()
})
