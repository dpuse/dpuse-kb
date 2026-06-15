---
title: Connectors and Connections
section: Concepts
tags: [connector, connection, data source, integration]
audience: user
---

## The distinction

The terms **connector** and **connection** are related but refer to different things. Understanding the difference matters because you interact with them at different points in the workbench.

A **connector** is a template — it defines how DPUse integrates with a *type* of data source. It describes the protocol, the authentication method, the data format, and the capabilities that are available when talking to that category of system.

A **connection** is an instance of a connector — a configured, live link to a *specific* data source. It provides the credentials, endpoint, and any instance-specific settings needed to actually talk to one particular system of that type.

## An analogy

Think of a connector as a plug type, and a connection as a specific cable plugged into a specific socket.

The plug type defines the shape and the electrical standard — that's the connector. The cable connecting your device to a particular power outlet in a particular room — that's the connection. You might have many cables (connections) of the same plug type (connector), each going to a different outlet (source system instance).

## Connectors

Connectors are configured at the organisation or platform level. They are not something most end users create — they represent the approved integrations available in your environment. When a new type of data source needs to be integrated, a connector is built or installed to support it.

From the **Manage Configs > Connectors** area of the workbench, you can see which connectors are available and inspect their configuration.

Connectors define:
- The type of system they integrate with (e.g., a relational database, a SaaS API, a file source)
- The authentication methods they support
- The data items and operations they expose

## Connections

Connections are what you create when you want to work with a specific data source. They bind a connector to a real system instance using credentials you supply.

From the **Manage Configs > Connections** area (or the Connection dialog in the workbench toolbar), you can:
- Create a new connection for any available connector type
- View and update existing connections
- Test whether a connection is live

A single connector can have many connections — for example, you might have a PostgreSQL connector with separate connections for a production database, a staging database, and a partner's database.

## How they relate to data views

When you establish a data view, you choose a connection as its source. The data view then uses that connection to fetch and display data from the underlying system.

This layering means:
- Changing the credentials on a connection updates all data views that use it, without requiring those views to be reconfigured
- You can duplicate a data view and point it at a different connection (e.g., staging vs. production) to compare the same data structure across environments

## Related

- [Data Positioning](./data-positioning.md)
- [Establish Data Views — Overview](../workbench/establish-data-views/overview.md)
- [Manage Connectors](../manage-configs/connectors.md)
- [Manage Connections](../manage-configs/connections.md)
