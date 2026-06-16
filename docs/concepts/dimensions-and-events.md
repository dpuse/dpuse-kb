---
title: Dimensions and Events
section: Concepts
tags: [dimension, event, event query, context, data model, transform]
audience: user
---

## Overview

Dimensions and events are the two core structures of the transform layer in DPUse. Together they turn raw data from a source system into a model that reflects how your business actually works.

They are distinct but complementary:

- A **dimension** represents a _thing_ — a stable business entity
- An **event** (or event query) represents _something that happened_ to or involving that thing

## Dimensions

A dimension is a curated model of a business entity built from one or more data views. Where a data view gives you the raw structure of data as it exists in the source system, a dimension gives you a clean, consistent representation of what that data _means_.

For example, a source system might store customer data across three tables with technical field names and internal identifiers. A Customer dimension assembles those fields into a single, well-named model — `customerId`, `fullName`, `region`, `tier` — that can be used consistently across the rest of your data pipeline.

### Why dimensions matter

Dimensions are reusable. Once you build a Product dimension, any presentation or data app that needs product data references that dimension rather than going back to the raw source tables. This means:

- Naming and field definitions are consistent everywhere
- If the underlying source structure changes, you update the dimension once — not every downstream object that references it
- Business logic about what "Product" means lives in one place

### Dimension lifecycle

1. **Build** — map fields from data views into the dimension structure
2. **Configure** — set identifiers, relationships, and any transformation logic
3. **Verify** — confirm the dimension is reading correctly against live data

## Events and event queries

An event represents something that happened at a point in time. In the context of DPUse, events are defined through **event queries** — configurations that capture business occurrences by querying your data for records that meet specific criteria.

For example: "a sale was made" is an event. An event query would define what constitutes a sale — which table to query, which fields indicate a completed transaction, what timestamp to use — and link that occurrence back to the relevant dimensions (the product sold, the customer who bought it, the region it happened in).

### Why events matter

Dimensions alone describe what exists. Events describe what _happened_ and _when_. Together they let you answer questions like:

- How has this customer's behaviour changed over time?
- Which products have seen an increase in transactions this quarter?
- What sequence of events typically precedes a churn?

Without event context, data is a snapshot. With it, data has history and trajectory.

### Event query lifecycle

1. **Define** — specify the data source and the criteria that identify an occurrence of the event
2. **Link** — associate the event with the relevant dimensions
3. **Configure** — set time fields, filters, and any aggregation logic
4. **Verify** — confirm the query is returning the expected events against live data

## How they work together

The typical modelling pattern in DPUse is:

1. Build dimensions to represent your key business entities
2. Define event queries that capture meaningful occurrences involving those entities
3. Use presentations or data apps to explore and visualise both — entity state and event history together

This produces a model that is both structurally clean and temporally rich: you know what the entities are, how they relate to each other, and what has happened to them over time.

## Related

- [Data Positioning](./data-positioning.md)
- [Assemble Dimensions — Overview](../workbench/assemble-dimensions/overview.md)
- [Contextualise Data — Overview](../workbench/contextualise-data/overview.md)
