---
title: Connectors and Connections
section: Concepts
tags: [connector, connection, plugin, vendor, product, data source]
audience: user
---

Connectors are one type of DPUse plugin. For an overview of the plugin system, see [Plugins](./plugins.md).

---

## Vendors and products

Before explaining connector plugins, it helps to understand how DPUse thinks about external data sources.

A **vendor** is an organisation that provides one or more data products — for example, Dropbox, Google, or Microsoft.

A **product** is a specific service offered by a vendor that holds or exposes data — for example:

| Vendor    | Product            |
| --------- | ------------------ |
| Dropbox   | Dropbox            |
| Google    | Google Drive       |
| Microsoft | Microsoft OneDrive |

Connector plugins connect DPUse to a specific **product** from a specific **vendor**. There is one connector plugin per product — a Dropbox connector, a Google Drive connector, a Microsoft OneDrive connector, and so on.

---

## Connector plugins

A connector plugin is a dynamically loaded module that DPUse loads at runtime to enable communication with a particular vendor product. It functions like a driver — in the same way a database driver implements the protocol for talking to a specific database engine, a connector plugin implements everything needed to talk to a specific vendor product: the authentication flow, the API protocol, the data structures the product exposes, and the operations DPUse can perform against it.

The plugin itself does not hold any account-specific credentials. It provides the capability to communicate with a product; a connection provides the parameters the plugin needs to open a channel.

Not all connector plugins require authentication. Some — such as the Application Emulator and File Store Emulator — connect to local or simulated data sources that have no concept of accounts or credentials. These plugins still require a connection, but that connection holds no credentials and there is only ever one of them per plugin.

Connector plugins are installed and managed at the platform level. They are not something individual users create — they represent the set of vendor products your DPUse environment has been set up to support. From the **Manage Configs > Connectors** area of the workbench you can see which connector plugins are available.

---

## Connections

A **connection** is the stored configuration that a connector plugin uses to open a live channel to a data source. What that configuration contains depends on the plugin:

- For plugins that connect to external vendor products, the connection holds credentials and account identifiers — the information needed to authenticate with a specific account
- For plugins that connect to local or simulated sources (such as emulators), the connection holds only the minimal configuration needed to identify the plugin — no credentials are required

When DPUse needs to access data, it loads the relevant connector plugin and supplies it with the connection configuration. The plugin uses that configuration to open a live communication channel. The connection itself is the stored config; the plugin is what knows how to use it.

**Authenticated connectors** can have any number of connections — one per account. For example, a single Dropbox connector plugin could support two connections:

- **Personal Dropbox** — credentials for your personal Dropbox account
- **Work Dropbox** — credentials for your work Dropbox account

Both connections use the same plugin. What differs is the account they are configured for.

**Unauthenticated connectors** support exactly one connection per plugin, since there are no accounts to differentiate. The Application Emulator and File Store Emulator are examples of this type.

You create and manage connections from the **Manage Configs > Connections** area, or from the Connection dialog in the workbench toolbar.

---

## How they relate to data views

When you establish a data view, you choose a connection as its source. The data view uses that connection — and therefore the underlying connector plugin — to fetch and display data from the product.

This means:

- Updating the credentials on a connection applies to all data views using it, without reconfiguring those views
- You can create multiple connections for the same product account if you need to manage credentials separately across different parts of your workspace

---

## Related

- [Plugins](./plugins.md)
- [Connector Plugin — Structure and Development](../plugins/connector-plugin.md)
- [Data Positioning](./data-positioning.md)
- [Establish Data Views — Overview](../workbench/establish-data-views/overview.md)
- [Manage Connectors](../manage-configs/connectors.md)
- [Manage Connections](../manage-configs/connections.md)
