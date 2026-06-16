---
title: Data Positioning
section: Concepts
tags: [data positioning, pipeline, architecture, source, transform, visualise]
audience: user
---

## What data positioning means

Data positioning is the process of moving data from where it is created to where it can be used — and shaping it at each step so that it becomes progressively more meaningful.

Raw data in a source system (a database, a SaaS platform, an API) is rarely in the form you need it. It reflects the structure of the system that created it, not the questions you want to ask. Data positioning is the work of bridging that gap: connecting to the source, selecting what matters, modelling it into business concepts, adding context, and finally making it visible and actionable.

DPUse is built around this process. The Workbench implements the positioning journey as a five-step workflow; the Knowledge component's AI chat can perform the same operations through conversation. Both surfaces share the same underlying pipeline.

## The three layers

DPUse organises the data positioning journey into three layers:

### Source

The source layer is where you establish what data you have access to and what you want to work with. This involves:

- Configuring **connectors** — the integrations that let DPUse communicate with a data source type
- Creating **connections** — live links to specific source system instances
- Establishing **data views** — scoped selections of data from a connection, ready to inspect and model

The output of the source layer is clean, accessible, auditable raw data.

### Transform

The transform layer is where raw data becomes something meaningful. It involves two distinct activities:

- **Assembling dimensions** — building stable, reusable models of business entities (customers, products, transactions) from one or more data views
- **Contextualising data** — enriching those models with event-based logic that captures what happened, when, and what it means

The output of the transform layer is structured, contextualised data that reflects your business reality rather than the source system's structure.

### Visualise

The visualise layer is where positioned data is put to use. It includes:

- **Presentations** — spaces for exploring, documenting, and sharing data
- **Data apps** — packaged applications built on top of your data models, suitable for internal use or customer-facing deployment

The output of the visualise layer is something a person or system can act on.

## Why this structure matters

The three-layer structure is deliberate. Keeping source, transform, and visualise concerns separate means:

- **Changes at the source don't cascade unpredictably** — if a connector changes, you update the connection and data view without having to rebuild your dimensions or presentations
- **Dimensions are reusable** — once you've modelled a "Customer" dimension, any presentation or data app can reference it
- **Context is composable** — event queries can be applied across different dimensions without duplicating logic

This separation also makes the data pipeline easier to audit, debug, and explain to stakeholders who need to understand where a number came from.

## Related

- [What is DPUse?](../getting-started/what-is-dpuse.md)
- [Application Architecture](./app-architecture.md)
- [Connectors and Connections](./connectors-vs-connections.md)
- [Dimensions and Events](./dimensions-and-events.md)
