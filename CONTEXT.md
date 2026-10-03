# dpuse-kb — Project Context

## What this project is

`dpuse-kb` is the documentation source for DPUse — a data positioning workbench. It contains markdown files that are:

1. **Written to Cloudflare KV** (the `KB` namespace) so dpuse-api can serve them to the app
2. **Uploaded to Cloudflare AI Search** to support the AI chat in the Knowledge component
3. **Built into the public site** at [www.dpuse.app](https://www.dpuse.app), a VitePress site in `site/`

The markdown files in `docs/` are the source of truth. Connector pages in `docs/connectors/` are generated from the live connector list by `scripts/connectorsFetch.ts`.

---

## The three DPUse projects

| Project     | Role                                                              |
| ----------- | ----------------------------------------------------------------- |
| `dpuse-app` | Vue 3 frontend — the workbench and knowledge component            |
| `dpuse-api` | Cloudflare Workers backend — API, auth, AI chat, RAG, D1          |
| `dpuse-kb`  | This project — documentation markdown files and ingestion scripts |

---

## Ingestion pipeline

```
.md files in docs/
  → scripts/cloudflareAISearchKVIngest.ts
  → reads each file, parses frontmatter + content
  → uploads each file to Cloudflare AI Search (skipped with --kv-only)
  → writes each doc to KV as docs/<slug>, plus a sorted nav/index
```

`npm run cloudflareAISearchKVIngest` runs the full ingest locally, with secrets from 1Password. Releases run the KV-only ingest
and deploy the site from the `publish.yml` workflow, through the `deploy` script.

---

## DPUse application architecture

DPUse has a dual nature — two halves sharing a common functional core, plus a session layer that underpins both.

### The Workbench (half 1)

A traditional UI implementing a **five-step data positioning workflow**:

1. Establish Data Views
2. Assemble Dimensions
3. Contextualise Data
4. Explore Presentations
5. Build Data Apps

**Manage Configs** (connectors, connections, contexts) sits outside the five-step workflow as supporting infrastructure — not a workflow step.

### The Knowledge component (half 2)

- **AI chat** — conversational assistant that can perform the same operations as the Workbench, surfaced through AI tools and their descriptions rather than UI
- **Knowledge search** — searchable access to documentation content

**Key architectural point:** The two halves share the same underlying functionality. In the Workbench it is surfaced through UI; in the AI chat it is surfaced through tools. Anything a user can do in the Workbench, they can do through the AI chat.

### Session (shared foundation)

Sign-up, sign-in, sign-out, and account management. Required by both halves. Not part of either.

### Open questions (document with placeholders, do not resolve prematurely)

- Where does **knowledge search** belong — in the Knowledge component, or elsewhere?
- Where does **knowledge management** belong — Workbench config concern, Knowledge component, or a future AI-tooled area?

---

## Plugin system

DPUse is extended through dynamically loaded **plugins**. Three types:

| Plugin type   | Purpose                                                                                |
| ------------- | -------------------------------------------------------------------------------------- |
| **Connector** | Enables communication with a vendor product as a data source. Functions like a driver. |
| **Presenter** | Defines how data is rendered in presentations and data apps                            |
| **Tutorial**  | Provides interactive guided learning within the workbench                              |

Custom plugin development is a planned future capability.

### Connectors, vendors, products

- **Vendor** — an organisation providing data products (e.g. Dropbox, Google, Microsoft)
- **Product** — a specific service by a vendor (e.g. Google Drive, Microsoft OneDrive)
- **Connector plugin** — one per product; implements the protocol/auth for that product (driver model)
- **Connection** — stored config (credentials, account identifiers) used by the plugin to open a live channel
    - Authenticated connectors: multiple connections per plugin (one per account)
    - Unauthenticated connectors (e.g. Application Emulator, File Store Emulator): exactly one connection per plugin, no credentials required

---

## Documentation structure

```
docs/
├── getting-started/
│   ├── what-is-dpuse.md
│   ├── quick-start.md
│   └── account-setup.md
├── workbench/
│   ├── overview.md
│   ├── establish-data-views/
│   ├── assemble-dimensions/
│   ├── contextualise-data/
│   ├── explore-presentations/
│   └── build-data-apps/
├── manage-configs/
│   ├── overview.md
│   ├── connectors.md
│   ├── connections.md
│   └── contexts.md
├── knowledge-pane/
│   ├── overview.md
│   ├── chat.md
│   └── library.md
├── plugins/
│   ├── connector-plugin.md   ← stub
│   ├── presenter-plugin.md   ← stub
│   └── tutorial-plugin.md    ← stub
├── account/
│   ├── authentication.md
│   ├── subscription.md
│   └── tokens-and-access.md
├── api/
│   ├── overview.md
│   ├── authentication.md
│   ├── endpoints/
│   └── websockets.md
└── concepts/
    ├── app-architecture.md
    ├── data-positioning.md
    ├── connectors-vs-connections.md
    ├── dimensions-and-events.md
    ├── plugins.md
    └── glossary.md
```

---

## Files written so far

- `docs/getting-started/what-is-dpuse.md`
- `docs/getting-started/quick-start.md`
- `docs/getting-started/account-setup.md`
- `docs/concepts/app-architecture.md`
- `docs/concepts/data-positioning.md`
- `docs/concepts/connectors-vs-connections.md`
- `docs/concepts/dimensions-and-events.md`
- `docs/concepts/plugins.md`
- `docs/concepts/glossary.md`
- `docs/plugins/connector-plugin.md` (stub)
- `docs/plugins/presenter-plugin.md` (stub)
- `docs/plugins/tutorial-plugin.md` (stub)

---

## Phased build plan

| Phase | Content                               | Status      |
| ----- | ------------------------------------- | ----------- |
| 1     | Concepts + Getting Started            | Done        |
| 2     | Workbench user guides (one per stage) | Not started |
| 3     | Account + Manage Configs              | Not started |
| 4     | API reference                         | Not started |
| 5     | Ingest script (D1 + RAG pipeline)     | Not started |

---

## Writing guidelines

Each `.md` file uses this frontmatter:

```yaml
---
title:
section:
tags: []
audience: user | developer | admin
---
```

**Style rules:**

- Second person ("you"), active voice
- Describe _what things are_ not _where to click_ — avoids churn as the UI evolves
- Each file covers one topic and is self-contained (important for RAG chunk quality)
- Split at headings — each H2 section should be semantically focused
- No jargon without definition; link to glossary on first use of a key term
- Cross-link related docs with relative markdown links
- Use `> **Open question:**` blockquotes for unresolved architectural decisions — do not resolve them prematurely

**Early-stage strategy:** The project is in active development. Write concepts and overviews at a level of abstraction that is stable. Step-by-step UI guides are the most churn-prone — write those only once a feature stabilises, or write them abstractly and add specifics in a revision pass.

---

## Key DPUse concepts (vocabulary)

| Term                | Definition                                                                                         |
| ------------------- | -------------------------------------------------------------------------------------------------- |
| Data Positioning    | Moving raw data from source systems through Source → Transform → Visualise layers                  |
| Plugin              | A dynamically loaded module that extends DPUse capabilities at runtime                             |
| Connector plugin    | A plugin that functions as a driver for a specific vendor product                                  |
| Connection          | Stored config (credentials, account identifiers) used by a connector plugin to open a live channel |
| Vendor              | An organisation providing data products (e.g. Dropbox, Google, Microsoft)                          |
| Product             | A specific data service from a vendor (e.g. Google Drive, Microsoft OneDrive)                      |
| Data View           | A scoped selection of data from a connection                                                       |
| Dimension           | A curated business-entity model built from data views                                              |
| Event / Event Query | A time-based occurrence captured from data, linked to dimensions                                   |
| Presentation        | A structured space for exploring and documenting data                                              |
| Data App            | A packaged application built on top of data models                                                 |
| Knowledge component | The AI chat + knowledge search half of DPUse                                                       |
| RAG                 | Retrieval-Augmented Generation — how the AI chat grounds answers in KB content                     |
| Tool (AI)           | A structured capability the AI chat can invoke — the AI-surface equivalent of a UI action          |
