---
title: Data Positioning
section: Concepts
tags: [data positioning, pipeline, connect, contextualise, present]
audience: user
---

## What data positioning means

Data positioning is the process of moving data from where it is created to where it can be used — and shaping it at each step so that it becomes progressively more meaningful.

Raw data in a source system (a database, a SaaS platform, an API) is rarely in the form you need it. It reflects the structure of the system that created it, not the questions you want to ask. Data positioning is the work of bridging that gap: connecting to the source, selecting what matters, contextualising it into business concepts, and making it visible and actionable.

DPUse is built around this process. The workbench implements the positioning journey as three sequential activities — Connect, Contextualise, Present — and the Knowledge component's AI chat can perform the same operations through conversation.

## The three activities

### Connect

The Connect activity is where you establish what data you have access to and what you want to work with. This involves:

- Configuring **connectors** — plugins that enable DPUse to communicate with a specific type of data source
- Creating **connections** — live links to specific source system instances (accounts, credentials)
- Establishing **data views** — scoped selections of data from a connection, ready to inspect and model

The output of Connect is clean, accessible, auditable raw data.

### Contextualise

The Contextualise activity is where raw data becomes something meaningful. It involves two distinct steps:

- **Assembling dimensions** — building stable, reusable models of business entities (customers, products, transactions) from one or more data views
- **Contextualising data** — enriching those models with event-based logic that captures what happened, when, and what it means

The output of Contextualise is structured data that reflects your business reality rather than any source system's structure. Transactions, facts, and measures can be derived and compared consistently across the organisation.

### Present

The Present activity is where positioned data is put to use. It includes:

- **Presentations** — predefined views for exploring, documenting, and sharing data in a fast, efficient way
- **Custom builds** — the [Cookbook](/cookbook/) provides recipes for building custom presentations and data apps using your preferred toolsets, for cases where predefined presentations don't cover what you need

The output of Present is something a person or system can act on.

## Why this structure matters

Keeping Connect, Contextualise, and Present as separate concerns means:

- **Changes at the source don't cascade unpredictably** — if a connector changes, you update the connection and data view without having to rebuild your dimensions or presentations
- **Dimensions are reusable** — once you've modelled a customer dimension, any presentation or data app can reference it
- **Context is composable** — event logic can be applied across different dimensions without duplicating work

This separation also makes the data pipeline easier to audit, debug, and explain to stakeholders who need to understand where a number came from.

## Related

- [What is DPUse?](../getting-started/what-is-dpuse.md)
- [Application Architecture](./app-architecture.md)
- [Connectors and Connections](./connectors-vs-connections.md)
- [Dimensions and Events](./dimensions-and-events.md)
