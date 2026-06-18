---
title: Presenter Plugin — Structure and Development
section: Plugins
tags: [presenter, plugin, development, custom, display, visualisation]
audience: developer
---

> **Stub** — This document is a placeholder. Full content will be added as the presenter plugin API stabilises.

## Overview

A presenter plugin defines how data is rendered and interacted with in DPUse presentations and data apps. Where the data pipeline determines what data is available, a presenter plugin determines how that data is displayed — the visual components, layout options, and interactive behaviours that appear when building or viewing a presentation.

Presenter plugins are loaded dynamically at runtime and registered as available display options within the workbench.

## Topics to be documented

- Presenter plugin interface / contract
- Rendering lifecycle and hooks
- Receiving and consuming dimension and event data
- Defining configuration options exposed to the user
- Implementing interactive behaviours
- Packaging and registration
- Testing a presenter plugin locally
- Publishing a custom presenter plugin

## Related

- [Plugins](../concepts/plugins.md)
- [Explore Presentations — Overview](../workbench/explore-presentations/overview.md)
- [Build Data Apps — Overview](../workbench/build-data-apps/overview.md)
