# Vercel Certificate Uploader

Script for uploading TLS certificate material to the Vercel Certs API using the project- or team-scoped token.

## Prerequisites
- Node.js 18 or newer
- Vercel account with an API access token
- Certificate files: ca, key, cert

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in this directory:
   ```bash
   cp .env.example .env
   ```
   Populate it with the required values (see Environment Variables).
3. Place your certificate files alongside the script or note their absolute paths.

## Environment Variables
- `VERCEL_API_TOKEN` (required) – personal or team token with permission to manage certs.
- `VERCEL_TEAM_ID` (required) – required when the token belongs to a team..

All values are read via `dotenv`, so any variable defined in `.env` is loaded automatically when `upload.js` runs.


The script reads the PEM files, calls `https://api.vercel.com/v8/certs`, and prints the JSON response when the upload succeeds.

## Using From Another Script
Since `upload.js` now exports the `uploadCert` function, you can import it into other workflows. Example: after fetching a certificate via the GoDaddy API, you might save the files and call Vercel like in `godaddy-sync.js`

In this pattern, `uploadCert` is reusable, and you control when and how the certificate files come from GoDaddy (or any other provider).

## Troubleshooting
- **401 Unauthorized** – confirm the token is valid and has the necessary scope.
- **409 Conflict** – Vercel already has a cert matching the supplied data; check the API response for details.

