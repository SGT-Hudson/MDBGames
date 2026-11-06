import { webcrypto } from "crypto";
import { TextEncoder } from "util";
import { track, identify, pseudonym, hopsBucket, timeBucket } from "./analytics";

describe("analytics", () => {
  const realCrypto = global.crypto;
  const realEncoder = global.TextEncoder;

  beforeEach(() => {
    Object.defineProperty(global, "crypto", { value: webcrypto, configurable: true });
    global.TextEncoder = TextEncoder;
  });

  afterEach(() => {
    Object.defineProperty(global, "crypto", { value: realCrypto, configurable: true });
    global.TextEncoder = realEncoder;
    delete window.umami;
    delete window.hudsnStatsIdentify;
    document.body.innerHTML = "";
  });

  test("pseudonym da el vector de prueba", async () => {
    expect(await pseudonym("Xk3pQ9rT2vLmN8wYz1aBcDeFgH12")).toBe("459bef74248fc918");
  });

  test("pseudonym sin crypto.subtle da null", async () => {
    Object.defineProperty(global, "crypto", { value: {}, configurable: true });
    expect(await pseudonym("uid")).toBeNull();
  });

  test("identify con uid pasa una promesa con el seudónimo", async () => {
    window.hudsnStatsIdentify = jest.fn();
    identify("Xk3pQ9rT2vLmN8wYz1aBcDeFgH12");
    const arg = window.hudsnStatsIdentify.mock.calls[0][0];
    expect(await arg).toBe("459bef74248fc918");
  });

  test("identify(null) pasa null", () => {
    window.hudsnStatsIdentify = jest.fn();
    identify(null);
    expect(window.hudsnStatsIdentify).toHaveBeenCalledWith(null);
  });

  test("identify sin hudsnStatsIdentify no lanza", () => {
    expect(() => identify("uid")).not.toThrow();
    expect(() => identify(null)).not.toThrow();
  });

  test("track sin umami ni script no lanza", () => {
    expect(() => track("x")).not.toThrow();
  });

  test("track llama a umami.track con los argumentos", () => {
    window.umami = { track: jest.fn() };
    track("x", { a: "b" });
    expect(window.umami.track).toHaveBeenCalledWith("x", { a: "b" });
  });

  test("track espera al load del script", () => {
    const script = document.createElement("script");
    script.id = "hudsn-stats";
    document.body.appendChild(script);
    track("x");
    window.umami = { track: jest.fn() };
    expect(window.umami.track).not.toHaveBeenCalled();
    script.dispatchEvent(new Event("load"));
    expect(window.umami.track).toHaveBeenCalledTimes(1);
  });

  test("track no propaga si umami.track lanza", () => {
    window.umami = { track: () => { throw new Error("boom"); } };
    expect(() => track("x")).not.toThrow();
  });
});

describe("tramos", () => {
  test.each([
    [2, "1-3"],
    [6, "1-3"],
    [8, "4-6"],
    [12, "4-6"],
    [14, "7-10"],
    [20, "7-10"],
    [22, "11+"],
  ])("hopsBucket(%i clics) = %s", (clicks, tramo) => {
    expect(hopsBucket(clicks)).toBe(tramo);
  });

  test.each([
    [0, "<1 min"],
    [59, "<1 min"],
    [60, "1-3 min"],
    [179, "1-3 min"],
    [180, "3-10 min"],
    [599, "3-10 min"],
    [600, "10+ min"],
  ])("timeBucket(%is) = %s", (segundos, tramo) => {
    expect(timeBucket(segundos)).toBe(tramo);
  });
});
