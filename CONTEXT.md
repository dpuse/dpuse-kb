# dpuse-kb — Project Context

## What this project is

`dpuse-kb` is the documentation source for DPUse — a data positioning workbench. It contains markdown files that are:

1. **Ingested into Cloudflare D1** so the dpuse-app and dpuse-api can retrieve and search them
2. **Chunked and uploaded to a RAG service** (Cloudflare Vectorize via `dpuse-api POST /ai/rag/ingest`) to support the AI chat in the Knowledge Pane

There is no static site. The markdown files are the source of truth; the pipeline moves them into Cloudflare storage where the app can query them.

---

## The three DPUse projects

| Project | Role |
|---|---|
| `dpuse-app` | Vue 3 frontend — the workbench and knowledge pane |
| `dpuse-api` | Cloudflare Workers backend — API, auth, AI chat, RAG, D1 |
| `dpuse-kb` | This project — documentation markdown files and ingestion scripts |

---

## Ingestion pipeline

```
.md files in dpuse-kb
  → npm run ingest (scripts/ingest.ts)
  → reads each file, parses frontmatter + content
  → INSERT INTO D1 docs table
  → POST /ai/rag/ingest → Cloudflare Vectorize (for AI chat RAG)
```

The ingest script lives at `scripts/ingest.ts` and is triggered via `package.json`. It can target local D1 (via `wrangler dev`) or production.

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
    ├── data-positioning.md
    ├── connectors-vs-connections.md
    ├── dimensions-and-events.md
    └── glossary.md
```

---

## Files written so far

- `docs/getting-started/what-is-dpuse.md`
- `docs/getting-started/quick-start.md`
- `docs/getting-started/account-setup.md`
- `docs/concepts/data-positioning.md`
- `docs/concepts/connectors-vs-connections.md`
- `docs/concepts/dimensions-and-events.md`
- `docs/concepts/glossary.md`

---

## Phased build plan

| Phase | Content | Status |
|---|---|---|
| 1 | Concepts + Getting Started | Done |
| 2 | Workbench user guides (one per stage) | Not started |
| 3 | Account + Manage Configs | Not started |
| 4 | API reference | Not started |
| 5 | Ingest script (D1 + RAG pipeline) | Not started |

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
- Describe *what things are* not *where to click* — avoids churn as the UI evolves
- Each file covers one topic and is self-contained (important for RAG chunk quality)
- Split at headings — each H2 section should be semantically focused
- No jargon without definition; link to glossary on first use of a key term
- Cross-link related docs with relative markdown links

**Early-stage strategy:** The project is in active development. Write concepts and overviews at a level of abstraction that is stable. Step-by-step UI guides are the most churn-prone — write those only once a feature stabilises, or write them abstractly and add specifics in a revision pass.

---

## Key DPUse concepts (vocabulary)

| Term | Definition |
|---|---|
| Data Positioning | Moving raw data from source systems through Source → Transform → Visualise layers |
| Connector | Template defining how to integrate with a *type* of data source |
| Connection | A configured live link to a *specific* data source instance |
| Data View | A scoped selection of data from a connection |
| Dimension | A curated business-entity model built from data views |
| Event / Event Query | A time-based occurrence captured from data, linked to dimensions |
| Presentation | A structured space for exploring and documenting data |
| Data App | A packaged application built on top of data models |
| Knowledge Pane | The in-app AI assistant, library, and documentation panel |
| RAG | Retrieval-Augmented Generation — how the AI chat grounds answers in KB content |
