const { Builder, By, until, Options } = require('./config');

const firefox =  new Builder()
.forBrowser('firefox')
.usingServer('http://192.168.10.94:4444/wd/hub')
.withCapabilities({
  browserName: 'firefox',
  webStorageEnabled: false,
  locationContextEnabled: false,
  screenResolution: '1280x720'
})
.build();

const chrome = new Builder()
  .forBrowser('chrome')
  .usingServer('http://192.168.10.94:4444/wd/hub')
  .withCapabilities({
    browserName: 'chrome',
    webStorageEnabled: false,
    locationContextEnabled: false,
    screenResolution: '1280x720'
  })
  .setChromeOptions(new Options().addArguments([
     '--fast',
    '--fast-start',
    '--disable-gpu',
    '--disable-cache',
    '--disable-icon-ntp',
    '--disk-cache-size=0',
    '--disable-ntp-favicons',
    '--disable-logging-redirect',
    '--aggressive-cache-discard',
    '--disable-bundled-ppapi-flash',
    '--disable-cached-picture-raster',
    '--disable-offline-load-stale-cache',
    'proxy=null',
    'pageLoadStrategy=eager',
  ]))
  .build();

describe('t1', () => {
  beforeAll(async () => {
    await jest.setTimeout(200000);
    await chrome.get('https://google.com');
    await firefox.get('https://www.seleniumeasy.com/test/basic-radiobutton-demo.html');
  });

  it('google', async () => {
    await chrome.wait(until
      .elementLocated(By.name('q')), 5)
      .sendKeys('golang');

    await chrome.wait(until
        .elementLocated(By
            .css('li.sbct:first-child'), 5))
       .click();

    await chrome.findElement(By.className('LC20lb'))
      .click();

    await chrome.findElement(By.tagName('select'))
      .click();

    await chrome.findElement(By
      .css('option[value="peano.go"]'))
      .click();

    await chrome.findElement(By.tagName('body'))
      .click();

    await chrome.wait(until
      .elementLocated(By
        .css('div.container div.left:nth-child(2) div:nth-child(1) div.buttons > a.run')), 5)
      .click();
  });

  it('t2', async () => {
    await firefox.findElement(By.css('input[value="Male"]'))
      .click();

    await firefox.findElement(By.id('buttoncheck')).click();
    await until.elementTextContains(firefox
      .findElement(By
        .className('radiobutton')), 'Radio button is Not checked');

    await firefox.findElement(By
      .css('div.panel.panel-default:nth-child(5) div.panel-body > button.btn.btn-default:nth-child(5)'))
      .click();
  });

  afterAll( async done => {
    await done();
    await chrome.quit();
    await firefox.quit();
  });
});
