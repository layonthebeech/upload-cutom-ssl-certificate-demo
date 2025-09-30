// godaddy-sync.js
import { readFile } from "node:fs/promises";
import { uploadCert } from "./upload.js";

async function downloadFromGoDaddy() {
  const { certPem, keyPem, caPem } = await fetchGoDaddyCertificate();

  const result = await uploadCert({
    cert: certPem,
    key: keyPem,
    ca: caPem,
  });
  console.log("Synced GoDaddy cert to Vercel:", result);
}

downloadFromGoDaddy().catch((err) => {
  console.error("Failed to sync certificate", err);
  process.exitCode = 1;
});

async function fetchGoDaddyCertificate() {
  // Replace with the actual GoDaddy API flow; return PEM strings.
  return {
    certPem: await readFile("./certificate.crt", "utf8"),
    keyPem: await readFile("./private.key", "utf8"),
    caPem: await readFile("./ca_bundle.crt", "utf8"),
  };
}