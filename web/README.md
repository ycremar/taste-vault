# Taste Library web app

A private, persistent viewing and editing layer for Taste Vault. See [the product and data guide](../docs/cloud-library.md).

## Local development

Node.js 22.13+ and npm. From this directory:

```bash
npm ci
npm run build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_empty_stingray.sql
npm run dev
```

Open the loopback URL printed by the server. Apply that migration only once per local database. Local development is a single-person workspace without an application login; bind it to loopback. The tracked hosting manifest contains logical bindings only, with no project identity.

## Hosted deployment

Use the Sites plugin to create a **new owner-private Site** from this folder. Ask it to preserve the DB binding, generate the Worker build, apply the included migration, and publish privately. The plugin supplies a new project ID and provisions storage. Do not use the original author's Site identity or credentials. Keep personal records in the database, outside Git.

Other Cloudflare deployments require you to provision D1, apply the SQL, and add an authentication/authorization boundary. This repo does not provide a secure public multi-tenant deployment. Do not publish the API without an access gate.

## Stack and checks

React + Vinext, Cloudflare Worker + D1, Drizzle migrations. The Sites starter's build integration and component licenses are retained. Run `npx tsc --noEmit` and `npm run build`. Database mutations append revisions; current snapshots can be imported/exported via the UI. Image previews point to remote URLs; there is no binary upload/archive service.

The optional read-only browser WebMCP tool is feature-detected. It is not a hosted MCP server, a scheduler, or an AI model connection. Registration could not be verified in a supported browser during initial authoring.

Additional starter runtime details are in [STARTER.md](STARTER.md).
