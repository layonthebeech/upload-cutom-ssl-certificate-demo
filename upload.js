// upload-cert.js
import "dotenv/config";
import fetch from "node-fetch";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const VERCEL_API_TOKEN = process.env.VERCEL_API_TOKEN;
const TEAM_ID = process.env.VERCEL_TEAM_ID;

async function loadFile(path, label) {
  if (!path) {
    throw new Error(`Missing file path for ${label}`);
  }

  try {
    return await readFile(path, "utf8");
  } catch (err) {
    throw new Error(`Failed to read ${label} at ${path}: ${err.message}`);
  }
}

export async function uploadCert({ cert, key, ca }) {
  const qs = new URLSearchParams({ teamId: TEAM_ID });
  const url = `https://api.vercel.com/v8/certs?${qs.toString()}`;

  const resp = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${VERCEL_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cert, key, ca }),
  });

  if (!resp.ok) {
    throw new Error(`Vercel API failed: ${resp.status} ${await resp.text()}`);
  }
  return resp.json();
}

const isMain = process.argv[1] === fileURLToPath(import.meta.url);

// Example usage when run directly
if (isMain) {
  (async () => {
    const certPath = process.env.CERT_FILE || "./certificate.crt";
    const keyPath = process.env.KEY_FILE || "./private.key";
    const caPath = process.env.CA_FILE || "./ca_bundle.crt";

    const cert = await loadFile(certPath, "certificate (.crt)");
    const key = await loadFile(keyPath, "private key (.key)");
    const ca = caPath ? await loadFile(caPath, "CA bundle") : undefined;

    const result = await uploadCert({ cert, key, ca });
    console.log("Uploaded cert:", result);
  })();
}
