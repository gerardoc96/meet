/**
 * @jest-environment node
 */

import puppeteer from "puppeteer";

describe('show/hide event details', () => {
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:5173/');
    await page.waitForSelector('.event');
  });

  afterAll(() => {
    browser.close();
  });

  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });

  test('User can expand an event to see details', async () => {
    await page.click('.event .details-btn');
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeDefined();
  });

  test('User can collapse an event to hide details', async () => {
    await page.click('.event .details-btn');
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });
});

describe("filter events by city", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      //slowMo: 50,
    });
    page = await browser.newPage();
  });

  beforeEach(async () => {
    await page.goto("http://localhost:5173/");
    await page.waitForSelector(".event");
    await page.waitForSelector("#city-search .city");
  });

  afterAll(async () => {
    await browser.close();
  });

  test("When user hasn’t searched for a city, show upcoming events from all cities.", async () => {
    const events = await page.$$(".event");
    expect(events.length).toBe(32);
  });

  test("User should see a list of suggestions when they search for a city.", async () => {
    const cityInput = "#city-search .city";
    const suggestionItems = "#city-search .suggestions li";

    await page.click(cityInput);
    await page.type(cityInput, "Berlin", { delay: 100 });

    await page.waitForSelector(suggestionItems);

    const suggestions = await page.$$(suggestionItems);

    expect(suggestions.length).toBeGreaterThanOrEqual(2);
  });

  test("User can select a city from the suggested list.", async () => {
    const cityInput = "#city-search .city";
    const suggestionItems = "#city-search .suggestions li";

    await page.click(cityInput);
    await page.type(cityInput, "Berlin", { delay: 100 });
    await page.waitForSelector(suggestionItems);

    await page.click(`${suggestionItems}:first-child`);

    const selectedValue = await page.$eval(
      cityInput,
      el => el.value
    );
    expect(selectedValue).toBe("Berlin, Germany");

    const filteredEvents = await page.$$(".event");
    expect(filteredEvents.length).toBe(17);
  });
});