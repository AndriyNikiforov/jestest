const { Builder, By, until, Options } = require('./config');

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
    '--fast',
    '--no-sandbox',
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

jest.setTimeout(200000);

describe('t1', () => {
  beforeAll(async () => await chrome.get('https://google.com'));

  it('google', async () => {
    await chrome.findElement(By.name('q'))
      .sendKeys('golang');

    await chrome.wait(until
        .elementLocated(By
            .css('li.sbct:first-child'), 0.1))
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
        .css('div.container div.left:nth-child(2) div:nth-child(1) div.buttons > a.run')), 0.1)
      .click();
  });

  it('t2', async () => {
    await chrome.get('https://www.seleniumeasy.com/test/basic-radiobutton-demo.html');
    await chrome.findElement(By.css('input[value="Male"]'))
      .click();

    await chrome.findElement(By.id('buttoncheck')).click();
    await until.elementTextContains(chrome
      .findElement(By
        .className('radiobutton')), 'Radio button is Not checked');

    await chrome.findElement(By
      .css('div.panel.panel-default:nth-child(5) div.panel-body > button.btn.btn-default:nth-child(5)'))
      .click();
  });

  afterAll( async done => {
    await done();
    await chrome.quit();
  });
});
