const { Builder, By, Key, until, Options } = require('./config');


const chrome = new Builder()
  .forBrowser('chrome')
  .usingServer('http://localhost:4444/wd/hub')
  .withCapabilities({
    browserName: 'chrome',
    webStorageEnabled: false,
    locationContextEnabled: false,
    screenResolution: '640x480'
  })
  .setChromeOptions(new Options().addArguments([
    '--headless',
    '--fast',
    '--prerender',
    '--fast-start',
    '--no-sandbox',
    '--disable-cache',
    '--use-gpu-in-tests',
    '--disable-icon-ntp',
    '--disk-cache-size=0',
    '--enable-multiprocess',
    '--disable-default-apps',
    '--disable-remote-fonts',
    '--disable-ntp-favicons',
    '--disable-logging-redirect',
    '--aggressive-cache-discard',
    '--disable-bundled-ppapi-flash',
    '--disable-cached-picture-raster',
    '--disable-renderer-accessibility',
    '--disable-offline-load-stale-cache',
    '--use-gpu-memory-buffers-for-capture',
    'proxy=null',
    'pageLoadStrategy=eager',
  ]))
  .build();

jest.setTimeout(90000)

describe.only('t1', () => {
  beforeAll(async () => await chrome.get('https://google.com'));

  it.only('google', async () => {
    await chrome.wait(until.elementLocated(By.name('q')), 0.1)
      .sendKeys('golang');

    await chrome.wait(until
        .elementLocated(By
            .css('li.sbct:first-child'), 0.1))
       .click();

    await chrome.findElement(By.className('LC20lb'))
      .click();

    await chrome.wait(until
      .elementLocated(By
        .css('div.container div.left:nth-child(2) div:nth-child(1) div.buttons > a.run')), 0.2)
      .click();

    await chrome.findElement(By.linkText('Packages'))
      .click();
    
    const actions = chrome.actions();

    await actions
      .sendKeys(Key.PAGE_DOWN)
      .perform();
  });

  afterAll(async done => {
    await done();
    await chrome.quit();
  });
});
