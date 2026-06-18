---
title: Glossary
section: Concepts
tags: [glossary, terminology, definitions]
audience: user
---

This glossary defines the terms used throughout DPUse documentation. Where a concept has a dedicated page, the entry links to it.

---

## C

**Config**
A stored configuration object in DPUse. Configs represent the settings and definitions for entities like connections, connectors, data views, dimensions, event queries, and presenters. Configs are managed through the API and persisted in real time.

**Connection**
The stored configuration that a connector plugin uses to open a live channel to a data source. For authenticated connectors (those that require an account), the connection holds credentials and account identifiers — and one connector plugin can have multiple connections, one per account. For unauthenticated connectors (such as emulators), the connection holds only minimal configuration with no credentials, and only one connection per plugin is needed.

See [Connectors and Connections](./connectors-vs-connections.md).

**Connector**
A template that defines how DPUse integrates with a type of data source. It specifies the protocol, authentication method, data format, and available operations for a category of system. Connectors are configured at the platform or organisation level.

See [Connectors and Connections](./connectors-vs-connections.md).

**Context**
A configuration that supplies additional business logic or reference data to the data positioning pipeline. Contexts are used in the Contextualise Data stage to enrich dimensions with information that does not come directly from the source system.

**Contextualise Data**
The workbench stage where you add event-based context to your data models. See [Contextualise Data](../workbench/contextualise-data/overview.md).

---

## D

**Data App**
A packaged application built on top of DPUse data models — typically a presentation or dashboard — intended for use by internal teams or external customers. Data apps are built in the Build Data Apps stage of the workbench.

**Data Positioning**
The overarching concept behind DPUse: the process of moving raw data from source systems through structured transformation stages until it is in a form that can be acted on. See [Data Positioning](./data-positioning.md).

**Data View**
A scoped selection of data from a connection. A data view specifies which data items (tables, objects, endpoints) you want to work with from a particular source, and provides tools to audit and investigate that data before modelling it. Data views are established in the Establish Data Views stage.

**Dimension**
A curated data model representing a business entity, built from one or more data views. Dimensions abstract away the raw structure of source data and provide a clean, reusable representation of concepts like Customer, Product, or Transaction.

See [Dimensions and Events](./dimensions-and-events.md).

---

## E

**Engine**
The DPUse engine is the compute layer that executes connector logic, processes data views, and evaluates dimensions and event queries. It runs as a background worker loaded by the workbench at runtime.

**Event**
Something that happened at a point in time, captured by an event query. Events add temporal context to dimensions, enabling analysis of what occurred, when, and in relation to which entities.

See [Dimensions and Events](./dimensions-and-events.md).

**Event Query**
A configuration that defines how to identify and capture occurrences of a business event from your data. An event query specifies the source data to query, the criteria for what constitutes the event, the timestamp to use, and the dimensions the event relates to.

---

## K

**Knowledge Pane**
The right-hand panel in the DPUse interface, containing the AI chat assistant, documentation library, and application information. The Knowledge Pane can be viewed alongside the Workbench or independently.

---

## P

**Presentation**
A structured space for exploring and documenting data from your models. Presentations can contain data tables, charts, narrative text, and other content built from dimensions and event queries.

**Presenter**
A configuration that defines how data is displayed in a presentation or data app. Presenters control the visual and structural representation of your data models.

---

## R

**RAG (Retrieval-Augmented Generation)**
The technique used by DPUse's AI chat to ground its responses in accurate, up-to-date information. When you ask the assistant a question, it retrieves relevant content from the knowledge base before generating a response — rather than relying solely on what the underlying language model was trained on.

---

## S

**Session**
An authenticated period of use within DPUse. A session begins when you sign in and is maintained by a token that refreshes automatically. You can view and manage active sessions from your account settings.

**Source Layer**
The first of three layers in the DPUse data positioning pipeline, concerned with establishing access to data: connectors, connections, and data views. See [Data Positioning](./data-positioning.md).

---

## T

**Token**
An authentication credential used by DPUse. Session tokens maintain your signed-in state. Personal access tokens can be generated for use with the DPUse API or external integrations. Data service tokens are used when connecting to partner data sources.

**Transform Layer**
The second of three layers in the data positioning pipeline, where raw data is shaped into business models: assembling dimensions and contextualising data with events. See [Data Positioning](./data-positioning.md).

---

## V

**Visualise Layer**
The third of three layers in the data positioning pipeline, where positioned data is explored and deployed: presentations and data apps. See [Data Positioning](./data-positioning.md).

---

## W

**Workbench**
The primary working environment in DPUse, where you build and manage your data positioning pipeline. The Workbench is organised into six stages: Establish Data Views, Assemble Dimensions, Contextualise Data, Explore Presentations, Build Data Apps, and Manage Configs.
