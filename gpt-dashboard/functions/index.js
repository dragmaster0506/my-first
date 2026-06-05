'use strict';

const functions = require('@google-cloud/functions-framework');

// ─── CORS helper ─────────────────────────────────────────────────────────────
function setCors(res) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
}

// ─── Main HTTP entry point ────────────────────────────────────────────────────
functions.http('api', async (req, res) => {
  setCors(res);
  if (req.method === 'OPTIONS') return res.sendStatus(204);

  const path = req.path || '/';

  try {
    if (path === '/openai/usage') return await handleOpenAIUsage(req, res);
    if (path === '/openai/costs') return await handleOpenAICosts(req, res);
    if (path === '/kintone/keys') return await handleKintoneKeys(req, res);
    res.status(404).json({ error: 'Not found', path });
  } catch (err) {
    console.error(err);
    res.status(502).json({ error: err.message });
  }
});

// ─── /openai/usage ───────────────────────────────────────────────────────────
// Proxies GET /v1/organization/usage/completions
// Query params forwarded: start_time, end_time, group_by, limit, page
async function handleOpenAIUsage(req, res) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'OPENAI_API_KEY not configured' });

  const allowed = ['start_time', 'end_time', 'group_by', 'limit', 'page', 'bucket_width'];
  const qs = new URLSearchParams();
  allowed.forEach(k => { if (req.query[k]) qs.set(k, req.query[k]); });

  const url = `https://api.openai.com/v1/organization/usage/completions?${qs}`;
  const upstream = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
  });

  const body = await upstream.json();
  res.status(upstream.status).json(body);
}

// ─── /openai/costs ────────────────────────────────────────────────────────────
// Proxies GET /v1/organization/costs
async function handleOpenAICosts(req, res) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'OPENAI_API_KEY not configured' });

  const allowed = ['start_time', 'end_time', 'bucket_width', 'limit', 'page', 'group_by'];
  const qs = new URLSearchParams();
  allowed.forEach(k => { if (req.query[k]) qs.set(k, req.query[k]); });

  const url = `https://api.openai.com/v1/organization/costs?${qs}`;
  const upstream = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
  });

  const body = await upstream.json();
  res.status(upstream.status).json(body);
}

// ─── /kintone/keys ───────────────────────────────────────────────────────────
// Fetches records from one or more Kintone apps.
// Query params:
//   app   (required) — comma-separated app IDs, e.g. "1,2,3"
//   query — kintone query string (optional)
//   fields — comma-separated field codes (optional)
async function handleKintoneKeys(req, res) {
  const subdomain = process.env.KINTONE_SUBDOMAIN;
  const apiToken  = process.env.KINTONE_API_TOKEN;
  if (!subdomain) return res.status(500).json({ error: 'KINTONE_SUBDOMAIN not configured' });
  if (!apiToken)  return res.status(500).json({ error: 'KINTONE_API_TOKEN not configured' });

  const appParam = req.query.app || '';
  const appIds   = appParam ? appParam.split(',').map(s => s.trim()).filter(Boolean) : [];
  if (appIds.length === 0) return res.status(400).json({ error: 'app query param required (comma-separated IDs)' });

  const results = await Promise.all(appIds.map(appId => fetchKintoneRecords(subdomain, apiToken, appId, req.query)));
  res.json({ apps: results });
}

async function fetchKintoneRecords(subdomain, apiToken, appId, query) {
  const qs = new URLSearchParams({ app: appId });
  if (query.query)  qs.set('query', query.query);
  if (query.fields) qs.set('fields', query.fields);

  const url = `https://${subdomain}.cybozu.com/k/v1/records.json?${qs}`;
  const upstream = await fetch(url, {
    headers: {
      'X-Cybozu-API-Token': apiToken,
      'Content-Type': 'application/json',
    },
  });

  const body = await upstream.json();
  return { appId, status: upstream.status, ...body };
}
