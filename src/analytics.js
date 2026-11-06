// Analítica propia y anónima (Umami en stats.hudsn.app, hudsn-ops). No guarda nada en el dispositivo:
// el seudónimo de la cuenta vive en memoria (public/stats.js) y se quita al cerrar sesión.
// El id del <script> no puede ser «umami»: el navegador expone los ids como globales y window.umami
// sería la etiqueta, no el tracker. Por eso se mira que track sea una función.
const tracker = () => {
  const umami = window.umami;
  return typeof (umami && umami.track) === 'function' ? umami : undefined;
};

// Si el script no ha cargado aún se espera a su `load`; si está bloqueado, no pasa nada.
export function track(...args) {
  const run = () => {
    try {
      const t = tracker();
      if (t) t.track(...args);
    } catch (e) {
      // La analítica nunca rompe la app.
    }
  };
  if (tracker()) return run();
  const script = document.getElementById('hudsn-stats');
  if (script) script.addEventListener('load', run, { once: true });
}

// 16 primeros hex de sha256("hudsn:mdbgames:" + uid); null sin crypto.subtle (contexto no seguro).
export async function pseudonym(accountId) {
  try {
    const subtle = typeof crypto !== 'undefined' && crypto.subtle;
    if (!subtle) return null;
    const bytes = new TextEncoder().encode('hudsn:mdbgames:' + accountId);
    const digest = await subtle.digest('SHA-256', bytes);
    return Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
      .slice(0, 16);
  } catch (e) {
    return null;
  }
}

// Pasa la promesa sin esperarla: stats.js la resuelve antes de cada envío.
export function identify(accountId) {
  try {
    const fn = window.hudsnStatsIdentify;
    if (typeof fn === 'function') fn(accountId ? pseudonym(accountId) : null);
  } catch (e) {
    // La analítica nunca rompe la app.
  }
}

// Tramos para los datos de los eventos: nunca el valor exacto. Dos clics (actor -> título -> actor) son un salto.
export function hopsBucket(clicks) {
  const saltos = Math.ceil(clicks / 2);
  if (saltos <= 3) return '1-3';
  if (saltos <= 6) return '4-6';
  if (saltos <= 10) return '7-10';
  return '11+';
}

export function timeBucket(seconds) {
  if (seconds < 60) return '<1 min';
  if (seconds < 180) return '1-3 min';
  if (seconds < 600) return '3-10 min';
  return '10+ min';
}
