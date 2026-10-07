const fs = require("fs");
const path = require("path");

function load() {
  const win = {};
  // eslint-disable-next-line no-new-func
  new Function("window", fs.readFileSync(path.join(__dirname, "../public/stats.js"), "utf8"))(win);
  return win.hudsnStatsBeforeSend;
}

describe("public/stats.js", () => {
  const beforeSend = load();

  test("cambia por :id los identificadores de partida", () => {
    expect(beforeSend("event", { url: "/game/Xy9AbCdEfGh12" })).toEqual({ url: "/game/:id" });
    expect(beforeSend("event", { url: "/profile/123" })).toEqual({ url: "/profile/:id" });
  });

  test("deja las rutas de la app y quita parámetros", () => {
    expect(beforeSend("event", { url: "https://mdbgames.hudsn.app/newgame?mode=x" })).toEqual({
      url: "https://mdbgames.hudsn.app/newgame",
    });
  });
});
