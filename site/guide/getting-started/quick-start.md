---
title: Quick Start
section: Getting Started
tags: [setup, workflow, first steps]
audience: user
---

## Overview

This guide walks you through the core DPUse workflow end to end. By the end you will have connected to a data source, built a basic data model, and explored your data — which is the foundation everything else builds on.

## Before you begin

You need a DPUse account. If you don't have one yet, see [Account Setup](./account-setup.md).

## Step 1 — Set up a connector

A **connector** is a template that defines how DPUse integrates with a type of data source. Before you can connect to any data, you need to confirm that the right connector is configured.

1. Open the Workbench and navigate to **Manage Configs > Connectors**.
2. Check whether a connector exists for your data source type.
3. If not, contact your administrator — connectors are set up at the organisation level.

> See [Connectors and Connections](../concepts/connectors-vs-connections.md) for the distinction between connectors and connections.

## Step 2 — Create a connection

A **connection** is a live link from a connector to a specific data source instance — for example, a particular database or a specific account in a SaaS platform.

1. Navigate to **Manage Configs > Connections** (or use the Connection dialog in the Workbench toolbar).
2. Select the connector type you want to use.
3. Provide the credentials and configuration required for your specific source.
4. Save and verify the connection.

## Step 3 — Establish a Data View

A **data view** is a window into a connected data source. It lets you select which data objects you want to work with and inspect their content.

1. Navigate to **Establish Data Views** in the Workbench.
2. Create a new data view and select the connection you just set up.
3. Browse the available data items and select what you need.
4. Use the **Audit Content** step to confirm the data looks correct.
5. Use **Investigate** to explore the raw data before modelling it.

## Step 4 — Assemble a Dimension

A **dimension** is a curated data model — a clean, structured representation of a business entity (like a customer, a product, or a transaction) built from one or more data views.

1. Navigate to **Assemble Dimensions**.
2. Create a new dimension and give it a descriptive name.
3. Map fields from your data view into the dimension structure.
4. Configure and verify the dimension to confirm it is reading correctly.

## Step 5 — Explore a Presentation

A **presentation** is how you view and document your data. It can range from a simple data exploration space to a structured document with charts, tables, and narrative.

1. Navigate to **Explore Presentations**.
2. Open or create a presentation connected to your dimension.
3. Explore the data, add structure, and document your findings.

## What's next

- Add event context with [Contextualise Data](../workbench/contextualise-data/overview.md)
- Build something shareable with [Build Data Apps](../workbench/build-data-apps/overview.md)
- Ask the AI assistant questions about your data in the [Knowledge Pane](../knowledge-pane/chat.md)
