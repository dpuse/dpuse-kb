---
title: Application Architecture
section: Concepts
tags: [architecture, workbench, knowledge, session, ai, tools, dual surface]
audience: user
---

## Two halves, one platform

DPUse has a dual nature. The application is built as two distinct halves that share the same underlying functionality, but surface it in different ways.

**The Workbench** is a traditional UI — a structured environment where you work through a five-step workflow to connect to data, build models, and produce outputs.

**The Knowledge component** is a conversational and reference environment — an AI chat assistant and a knowledge base, where you can ask questions, get guidance, and accomplish the same tasks as the workbench through natural language.

These two halves are not separate tools bolted together. They share a common functional core. Anything you can do in the workbench, you can do through the AI chat. The difference is only in how that functionality is surfaced:

- In the **Workbench**, functionality is surfaced through a conventional UI — panels, forms, buttons, and structured workflows
- In the **Knowledge chat**, the same functionality is surfaced through **tools** — structured capabilities that the AI can invoke on your behalf, each described in a way the AI understands and can reason about

This means the AI assistant is not just answering questions about your data — it has direct access to the same operations the workbench provides, and can perform them for you through conversation.

---

## The Workbench

The Workbench implements the data positioning workflow as five sequential steps:

1. **Establish Data Views** — connect to source systems and select the data to work with
2. **Assemble Dimensions** — build curated, business-meaningful models from that raw data
3. **Contextualise Data** — add event-based context so data has history and trajectory
4. **Explore Presentations** — view, document, and share positioned data
5. **Build Data Apps** — package insights into applications for internal or customer use

These five steps correspond to the [data positioning](./data-positioning.md) pipeline: Source → Transform → Visualise.

### Manage Configs

Configuration management — connectors, connections, and contexts — sits outside the five-step workflow. It is the supporting infrastructure that the workflow depends on, not a step within it. You set up and maintain configuration separately, and the workflow steps draw on it.

---

## The Knowledge component

The Knowledge component has two parts:

**AI chat** — A conversational interface where you interact with an AI assistant that has access to the same tools as the workbench. You can ask it to perform data operations, explain concepts, or guide you through the workflow. The assistant uses the knowledge base as context for its responses.

**Knowledge search** — A searchable reference to DPUse documentation and knowledge content.

> **Open question:** It is currently unclear whether knowledge search belongs within the Knowledge component or should be positioned differently within the application. This will be resolved as the product evolves.

---

## Session

Session management is the foundation that both halves depend on. A session is established when a user signs up, signs in, or continues an existing authenticated session. Without an active session, neither the Workbench nor the Knowledge component is accessible.

Session capabilities include:
- Sign up, sign in, and sign out
- Account management (personal details, subscription, tokens, preferences)
- Session lifecycle and multi-session management

Session is not part of either half — it underlies both.

---

## Open questions

> **Open question:** Knowledge management — the process of creating, organising, and maintaining the content that the knowledge base and AI chat draw on — is not yet clearly placed. It may belong in the Workbench (as a managed configuration concern), in the Knowledge component, or as a distinct area with AI tooling in the future. This will be documented once resolved.

---

## Related

- [What is DPUse?](../getting-started/what-is-dpuse.md)
- [Data Positioning](./data-positioning.md)
- [Knowledge Pane](../knowledge-pane/overview.md)
- [Account Setup](../getting-started/account-setup.md)
