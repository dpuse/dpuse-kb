---
title: What is DPUse?
section: Getting Started
tags: [overview, introduction, data positioning]
audience: user
---

## What DPUse is

DPUse is a data workbench and AI assistant in one application. It gives you a single environment to connect to your data sources, shape that data into something meaningful, and explore or act on it — through a structured UI, through natural language, or both.

The platform is built around a concept called **data positioning**: the idea that raw data, wherever it lives, needs to be moved and shaped before it becomes useful. DPUse structures that journey into a consistent pipeline that you control.

## What problem it solves

Most organisations have data scattered across multiple systems — CRMs, databases, SaaS platforms, internal APIs. Getting a clear picture of what that data means, how it relates, and how to act on it typically requires a mix of custom scripts, ETL tools, dashboards, and manual effort spread across several teams.

DPUse consolidates that work into one place. You define where your data comes from, what it means, and how you want to see it — then DPUse handles the connections, transformations, and presentation.

## How it's organised

DPUse has two halves and a shared foundation. For a deeper explanation of how they fit together, see [Application Architecture](../concepts/app-architecture.md).

### The Workbench

The Workbench is a traditional UI environment built around a five-step data positioning workflow:

1. **Establish Data Views** — connect to source systems and select the data you want to work with
2. **Assemble Dimensions** — build curated, business-meaningful models from that raw data
3. **Contextualise Data** — layer in event-based context so your data tells a story over time
4. **Explore Presentations** — view, document, and share your data in a structured way
5. **Build Data Apps** — package insights into applications for internal or customer use

Configuration management (connectors, connections, contexts) is available separately through **Manage Configs** and supports the workflow without being a step within it.

### The Knowledge component

The Knowledge component gives you two ways to get help and work with DPUse:

- **AI chat** — a conversational assistant that can answer questions and perform the same operations as the Workbench, through natural language
- **Knowledge search** — searchable access to DPUse documentation and reference content

The AI chat is not just a help tool — it has direct access to the same underlying capabilities as the Workbench. Anything you can do through the Workbench UI, you can do through the chat.

### Session

Sign-up, sign-in, and account management sit outside both halves as a shared foundation. A session is required to access either the Workbench or the Knowledge component.

## Who it's for

DPUse is designed for people who work with data professionally — analysts, data engineers, product managers, and developers — particularly in organisations that need to combine and make sense of data from multiple sources. You don't need to be a software engineer to use the workbench, but familiarity with data concepts (tables, schemas, relationships) will help.

## Related

- [Application Architecture](../concepts/app-architecture.md)
- [Quick Start](./quick-start.md)
- [Account Setup](./account-setup.md)
- [Data Positioning](../concepts/data-positioning.md)
