// upload-cert.js
import "dotenv/config";
import fetch from "node-fetch";


const VERCEL_API_TOKEN = process.env.VERCEL_API_TOKEN;
const TEAM_ID = process.env.VERCEL_TEAM_ID;

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