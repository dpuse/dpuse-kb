---
title: Plugins
section: Concepts
tags: [plugin, connector, presenter, tutorial, extensibility, custom plugin]
audience: user
---

## What plugins are

DPUse is extended through **plugins** — self-contained modules that are dynamically loaded by the application at runtime to add specific capabilities. Rather than building every possible integration and feature directly into the core application, the plugin system allows DPUse to be extended in a structured and consistent way.

Each plugin type has a defined interface that it must implement. DPUse loads the plugin at runtime, calls it through that interface, and the plugin handles the rest — the core application does not need to know the details of any specific integration or feature.

## Plugin types

DPUse currently supports three types of plugin:

| Plugin type | Purpose |
| --- | --- |
| **Connector** | Enables DPUse to communicate with a vendor product as a data source |
| **Presenter** | Defines how data is rendered and displayed in presentations and data apps |
| **Tutorial** | Provides guided, interactive learning experiences within the workbench |

### Connector plugins

Connector plugins are the integration layer between DPUse and external data sources. Each connector plugin targets a specific vendor product — Dropbox, Google Drive, Microsoft OneDrive — and implements the protocol, authentication, and data operations needed to communicate with it.

See [Connectors and Connections](./connectors-vs-connections.md) for a full explanation of how connector plugins and connections work together.

### Presenter plugins

Presenter plugins control how data is rendered in presentations and data apps. They define the visual and interactive components available when building a presentation, allowing different display modes, chart types, or layout behaviours to be added without changing the core workbench.

See [Presenter Plugin — Structure and Development](../plugins/presenter-plugin.md).

### Tutorial plugins

Tutorial plugins provide structured, interactive guidance within the workbench. They can surface contextual instructions, step-by-step walkthroughs, and embedded learning content at the point of need, without requiring users to leave the application.

See [Tutorial Plugin — Structure and Development](../plugins/tutorial-plugin.md).

## Custom plugins

The plugin system is designed to be open. The intent is that developers will be able to build and register their own connector, presenter, and tutorial plugins — extending DPUse to support new data sources, display formats, or learning content without requiring changes to the core platform.

Custom plugin development documentation will be published here as that capability becomes available.

## Related

- [Connectors and Connections](./connectors-vs-connections.md)
- [Connector Plugin — Structure and Development](../plugins/connector-plugin.md)
- [Presenter Plugin — Structure and Development](../plugins/presenter-plugin.md)
- [Tutorial Plugin — Structure and Development](../plugins/tutorial-plugin.md)
