const fs = require("fs");
const path = require("path");

function load() {
  const win = {};
  // eslint-disable-next-line no-new-func
  new Function("window", fs.readFileSync(path.join(__dirname, "../public/stats.js"), "utf8"))(win);
  return win;
}

// Jest 27 no trae advanceTimersByTimeAsync: avanzamos y dejamos correr las promesas pendientes.
async function avanza(ms) {
  jest.advanceTimersByTime(ms);
  for (let i = 0; i < 10; i++) await Promise.resolve();
}

describe("public/stats.js", () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  test("cambia por :id los identificadores de partida", async () => {
    const win = load();
    win.hudsnStatsIdentify(null);
    expect(await win.hudsnStatsBeforeSend("event", { url: "/game/Xy9AbCdEfGh12" })).toEqual({ url: "/game/:id" });
    expect(await win.hudsnStatsBeforeSend("event", { url: "/profile/123" })).toEqual({ url: "/profile/:id" });
  });

  test("deja las rutas de la app y quita parámetros", async () => {
    const win = load();
    win.hudsnStatsIdentify(null);
    expect(await win.hudsnStatsBeforeSend("event", { url: "https://mdbgames.hudsn.app/newgame?mode=x" })).toEqual({
      url: "https://mdbgames.hudsn.app/newgame",
    });
  });

  test("no resuelve antes de la primera hudsnStatsIdentify", async () => {
    jest.useFakeTimers();
    const win = load();
    const done = jest.fn();
    win.hudsnStatsBeforeSend("event", { url: "/" }).then(done);
    await Promise.resolve();
    await avanza(2999);
    expect(done).not.toHaveBeenCalled();
    win.hudsnStatsIdentify("abc");
    await avanza(0);
    expect(done).toHaveBeenCalledTimes(1);
  });

  test("con una cadena pone payload.id", async () => {
    const win = load();
    win.hudsnStatsIdentify("abc");
    expect((await win.hudsnStatsBeforeSend("event", { url: "/" })).id).toBe("abc");
  });

  test("con null resuelve sin id aunque el payload lo trajera", async () => {
    const win = load();
    win.hudsnStatsIdentify(null);
    const out = await win.hudsnStatsBeforeSend("event", { url: "/", id: "viejo" });
    expect(out).not.toHaveProperty("id");
  });

  test("sin llamada, a los 3000 ms resuelve sin id", async () => {
    jest.useFakeTimers();
    const win = load();
    const p = win.hudsnStatsBeforeSend("event", { url: "/", id: "viejo" });
    await avanza(3000);
    expect(await p).not.toHaveProperty("id");
  });

  test("con una promesa da su valor; rechazada, sin id", async () => {
    const win = load();
    win.hudsnStatsIdentify(Promise.resolve("x"));
    expect((await win.hudsnStatsBeforeSend("event", { url: "/" })).id).toBe("x");
    win.hudsnStatsIdentify(Promise.reject(new Error("no")));
    expect(await win.hudsnStatsBeforeSend("event", { url: "/", id: "y" })).not.toHaveProperty("id");
  });
});
