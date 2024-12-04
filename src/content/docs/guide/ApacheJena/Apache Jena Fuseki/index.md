---
title: Overview
description: An introduction to Apache Jena and its key features.
---

# What is Apache Fuseki?

Apache Fuseki is a SPARQL server that allows you to host RDF datasets and make them accessible via SPARQL queries over HTTP. It’s useful for creating web-accessible endpoints for your RDF data, enabling multiple users or systems to query and interact with your data remotely.

---

## Why Do I Need Apache Fuseki?

Fuseki is essential when you need to serve RDF data over the web or a network. It’s designed to provide a robust, transactional storage layer and a user-friendly interface for managing datasets and running SPARQL queries.

---

## Key Features of Apache Fuseki

- **SPARQL 1.1 Support**: Full support for querying (SELECT, CONSTRUCT, ASK, DESCRIBE) and SPARQL Update.
- **HTTP Interface**: Exposes SPARQL endpoints for remote querying and data management via RESTful APIs.
- **Dataset Management**: Manages multiple RDF datasets, allowing public or restricted access.
- **Persistence**: Uses **TDB** for scalable, persistent RDF data storage.
- **Authentication & Access Control**: Supports user authentication and role-based permissions.
- **SPARQL Logging**: Logs queries and updates for monitoring and analysis.
- **Federated Queries**: Enables queries across multiple SPARQL endpoints.
- **Configurable & Extensible**: Easily configurable and extendable to suit various use cases.

---
