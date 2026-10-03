---
title: Connectors
section: connectors
---

# Connectors

A connector is a plugin that enables DPUse to communicate with a specific vendor product as a data source. It works like a driver — you install the connector once, then create one or more connections using that connector to represent individual accounts or credentials.

## How connectors work

Each connector implements a standard set of operations for its data source — listing files, retrieving records, streaming data, and so on. Once a connector is installed in your workbench you can create connections against it, then use those connections to build Data Views.

## Connector status

Connectors progress through a lifecycle before reaching general availability:

| Status | Meaning |
| ------ | ------- |
| Pre-Alpha | Early prototype; breaking changes expected |
| Alpha | Functional but incomplete; not suitable for production |
| Beta | Feature-complete; may have known issues |
| Release Candidate | Stable; final validation in progress |
| General Availability | Production-ready |

## Related concepts

- [Connectors vs Connections](/kb/concepts/connectors-vs-connections) — understand the distinction between a connector plugin and a connection config
- [Plugins](/kb/concepts/plugins) — how connectors fit into the broader plugin system

## All Connectors

| Connector | Category |
| --------- | -------- |
| [Application Emulator](/connectors/dpuse-connector-application-emulator) | Application |
| [Connector Template](/connectors/dpuse-connector-template) | File Store |
| [DBnomics](/connectors/dpuse-connector-dbnomics) | Curated Dataset |
| [Dexie.js](/connectors/dpuse-connector-dexie-js) | Database |
| [Dropbox](/connectors/dpuse-connector-dropbox) | File Store |
| [File Store Emulator](/connectors/dpuse-connector-file-store-emulator) | File Store |
| [Google Drive](/connectors/dpuse-connector-google-drive) | File Store |
| [Microsoft OneDrive](/connectors/dpuse-connector-microsoft-onedrive) | File Store |
| [Salesforce](/connectors/dpuse-connector-salesforce) | Application |
| [SAP SuccessFactors](/connectors/dpuse-connector-sap-successfactors) | Application |
