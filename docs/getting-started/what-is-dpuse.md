---
title: What is DPUse?
section: Getting Started
tags: [overview, introduction, connect, contextualise, present, cookbook]
audience: user
---

## What DPUse is

DPUse is a data workbench and AI assistant in one application. It gives you a single environment to connect to your data sources, contextualise that data into meaningful entities and events, and present the results — through a structured UI, through natural language, or both.

The platform is built around three core activities: Connect, Contextualise, and Present.

## The three activities

### Connect

You connect DPUse to your data sources using **connectors** — plugins that know how to communicate with a specific vendor product (a database, a SaaS platform, a file store). Each connector can have one or more **connections** representing individual accounts or credentials. From a connection you create **data views**: scoped selections of data, ready to inspect and work with.

See the [Connectors](/connectors/) section for a full list of available connectors.

### Contextualise

Raw data reflects the structure of the system it came from, not the questions you want to ask. The Contextualise step transforms your data views into a common set of reusable **entities and events** — customers, products, transactions, facts, measures — that reflect your business reality.

This involves two activities:

- **Assembling dimensions** — building stable, reusable models of business entities from one or more data views
- **Contextualising data** — enriching those models with event-based logic that captures what happened, when, and what it means

The result is structured, comparable data that any presentation or app can draw from.

### Present

Positioned data is surfaced through **presentations** — predefined views designed for fast, efficient access to the insights you need. Presentations are built on top of your contextualised entities and events, so they always reflect the latest positioned data.

## The Cookbook

Beyond predefined presentations, DPUse includes a **Cookbook** — a library of recipes for building custom presentations and data apps using your preferred toolsets. Each recipe is a standalone guide that may include step-by-step instructions, code, or both. Use the Cookbook when you need something tailored that predefined presentations don't cover.

See the [Cookbook](/cookbook/) section to browse available recipes.

## The Knowledge component

DPUse also includes a Knowledge component that gives you two additional ways to work:

- **AI chat** — a conversational assistant that can answer questions and perform the same Connect, Contextualise, and Present operations as the workbench, through natural language
- **Knowledge search** — searchable access to DPUse documentation and reference content

The AI chat is not just a help tool. It has direct access to the same underlying capabilities as the workbench. Anything you can do through the UI, you can do through the chat.

## Who it's for

DPUse is designed for people who work with data professionally — analysts, data engineers, product managers, and developers — particularly in organisations that need to combine and make sense of data from multiple sources. You don't need to be a software engineer to use the workbench, but familiarity with data concepts (tables, schemas, relationships) will help.

## Related

- [Quick Start](./quick-start.md)
- [Account Setup](./account-setup.md)
- [Connectors](/connectors/)
- [Cookbook](/cookbook/)
