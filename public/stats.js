/*
 * Limpieza de direcciones para la analítica propia (Umami, hudsn-ops). Umami llama a esta función
 * antes de cada envío (data-before-send="hudsnStatsBeforeSend"): cambia por ":id" los segmentos de
 * la ruta que parecen identificadores (UUID, números, cadenas de 12 o más caracteres con algún
 * dígito) y quita parámetros y "#", en la dirección y en la procedencia. Se carga antes que el
 * script de Umami para que la primera visita ya salga limpia.
 */
(function () {
  var ID = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}|\d+|(?=[A-Za-z0-9_-]*\d)[A-Za-z0-9_-]{12,})$/i;
  function clean(url) {
    var m = /^([a-z][a-z0-9+.-]*:\/\/[^/?#]*)?([^?#]*)/i.exec(String(url));
    var path = m[2]
      .split("/")
      .map(function (s) { return ID.test(s) ? ":id" : s; })
      .join("/");
    return (m[1] || "") + (path || "/");
  }
  // Identidad de la cuenta (seudónimo): la app la fija con hudsnStatsIdentify. La primera llamada
  // abre la espera; hasta entonces los envíos aguardan, como mucho 3000 ms, y salen anónimos.
  var identity = null;
  var release = null;
  var gate = new Promise(function (resolve) { release = resolve; });
  var timer = setTimeout(function () { release(); }, 3000);
  window.hudsnStatsIdentify = function (value) {
    identity = value;
    clearTimeout(timer);
    release();
  };
  window.hudsnStatsBeforeSend = async function (type, payload) {
    await gate;
    var id = null;
    try { id = await identity; } catch (e) { id = null; }
    if (payload) {
      if (typeof id === "string" && id) payload.id = id;
      else delete payload.id;
      if (payload.url) payload.url = clean(payload.url);
      if (payload.referrer) payload.referrer = clean(payload.referrer);
    }
    return payload;
  };
})();
