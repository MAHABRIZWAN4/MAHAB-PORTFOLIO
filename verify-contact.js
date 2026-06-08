const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1920, height: 1080 });

  console.log('Navigating to localhost:3001...');
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });

  console.log('Scrolling to contact section...');
  await page.evaluate(() => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  });
  await page.waitForTimeout(1000);

  const screenshotDir = path.join(__dirname, 'verification-screenshots');
  const fs = require('fs');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir);
  }

  console.log('Capturing full contact section...');
  const contactSection = await page.locator('#contact');
  await contactSection.screenshot({ path: path.join(screenshotDir, '1-full-section.png') });

  console.log('Capturing status cards...');
  await page.screenshot({ path: path.join(screenshotDir, '2-status-cards.png'), clip: { x: 0, y: 600, width: 600, height: 300 } });

  console.log('Capturing form inputs (normal state)...');
  await page.screenshot({ path: path.join(screenshotDir, '3-form-normal.png'), clip: { x: 960, y: 600, width: 900, height: 600 } });

  console.log('Focusing first input and capturing glow...');
  await page.locator('input[name="name"]').focus();
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(screenshotDir, '4-form-focused.png'), clip: { x: 960, y: 600, width: 900, height: 150 } });

  console.log('Capturing background pattern...');
  await page.screenshot({ path: path.join(screenshotDir, '5-background.png'), clip: { x: 0, y: 400, width: 1920, height: 400 } });

  console.log('Hovering over GitHub button...');
  await page.locator('a:has-text("GitHub")').hover();
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(screenshotDir, '6-github-hover.png'), clip: { x: 0, y: 900, width: 600, height: 100 } });

  console.log('Hovering over LinkedIn button...');
  await page.locator('a:has-text("LinkedIn")').hover();
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(screenshotDir, '7-linkedin-hover.png'), clip: { x: 0, y: 900, width: 600, height: 100 } });

  console.log('All screenshots captured successfully!');
  console.log(`Screenshots saved to: ${screenshotDir}`);

  await browser.close();
})();
