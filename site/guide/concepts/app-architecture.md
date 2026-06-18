---
title: Application Architecture
section: Concepts
tags: [architecture, workbench, knowledge, session, ai, tools, connect, contextualise, present]
audience: user
---

## Two halves, one platform

DPUse has a dual nature. The application is built as two distinct halves that share the same underlying functionality, but surface it in different ways.

**The Workbench** is a traditional UI — a structured environment where you work through three activities (Connect, Contextualise, Present) to go from raw data sources to actionable presentations.

**The Knowledge component** is a conversational and reference environment — an AI chat assistant and a knowledge base where you can ask questions, get guidance, and accomplish the same tasks as the workbench through natural language.

These two halves are not separate tools bolted together. They share a common functional core. Anything you can do in the workbench, you can do through the AI chat. The difference is only in how that functionality is surfaced:

- In the **Workbench**, functionality is surfaced through a conventional UI — panels, forms, buttons, and structured workflows
- In the **Knowledge chat**, the same functionality is surfaced through **tools** — structured capabilities that the AI can invoke on your behalf, each described in a way the AI understands and can reason about

---

## The Workbench

The Workbench implements the [data positioning](./data-positioning.md) pipeline as three sequential activities:

**Connect** — configure connectors, create connections to data sources, and establish data views that scope the data you want to work with.

**Contextualise** — assemble dimensions (reusable models of business entities) and apply event-based context, so raw data becomes transactions, facts, and measures your business can rely on.

**Present** — surface positioned data in predefined presentations for fast, efficient access. For custom views and data apps, the [Cookbook](/cookbook/) provides recipes that guide you through building with your preferred toolsets.

### Manage Configs

Configuration management — connectors, connections, and contexts — sits outside the three activities as supporting infrastructure. You set up and maintain configuration separately; the workflow activities draw on it.

---

## The Knowledge component

The Knowledge component has two parts:

**AI chat** — a conversational interface where you interact with an AI assistant that has access to the same tools as the workbench. You can ask it to perform data operations, explain concepts, or guide you through any of the three activities. The assistant uses the knowledge base as context for its responses.

**Knowledge search** — a searchable reference to DPUse documentation and knowledge content.

> **Open question:** It is currently unclear whether knowledge search belongs within the Knowledge component or should be positioned differently within the application. This will be resolved as the product evolves.

---

## Session

Session management is the foundation that both halves depend on. A session is established when a user signs up, signs in, or continues an existing authenticated session. Without an active session, neither the Workbench nor the Knowledge component is accessible.

Session capabilities include sign up, sign in, sign out, account management, and session lifecycle handling. Session is not part of either half — it underlies both.

---

## Open questions

> **Open question:** Knowledge management — the process of creating, organising, and maintaining the content that the knowledge base and AI chat draw on — is not yet clearly placed. It may belong in the Workbench (as a managed configuration concern), in the Knowledge component, or as a distinct area with AI tooling in the future. This will be documented once resolved.

---

## Related

- [What is DPUse?](../getting-started/what-is-dpuse.md)
- [Data Positioning](./data-positioning.md)
- [Account Setup](../getting-started/account-setup.md)
