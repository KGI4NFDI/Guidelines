---
title: Overview
description: An introduction to Wikibase and its key features
---

# What is Wikibase?
Wikibase and Wikidata are two related software packages from the Wikimedia family of applications. They allow the storage and management of Linked Open Data (LOD), besides featuring other common characteristics of wikis, such as collaboration and version control features. [Wikidata](https://www.wikidata.org/) is the public-facing instance of the software – a type of Wikipedia for structured data; it is maintained by Wikimedia Germany. Wikibase is the open source software environment built to run Wikidata.
 
Crucially, Wikibase can be deployed independently from Wikidata (and Wikimedia) and can be customized to suit the needs of individual data domains and data repositories. The [Wikibase4Research](https://nfdi4culture.de/services/details/wikibase4research.html) service, developed by NFDI4Culture, provides such customised Wikibase instances for the needs of researchers across the NFDI community.

# Why do we need Wikibase?

Thanks to many of the features already developed for Wikidata, Wikibase is already more than a single tool, it can instead be considered an umbrella of end-to-end services for the “LOD”-ification of research data, especially in domains or idividual projects which had to engaged with knowledge graphs or semantic web technologies yet. Thanks to the user-friendly interface which would be familiar to any researcher already using Wikidata, Wikibase can help lower the learning curve to getting started with LOD compared to other existing knowledge graph tools.

# Key Features of Qlever

- **A graphical user interface (GUI)**: Allowing granular read/write controls, in addition to  collaborative and version control features;
- **A triplestore, editable down to the triple statement level**: Thanks to the requirements of Wikidata to serve as a verifiable source and secondary database, every triple statement can be edited and enriched with qualifying statements and references to external sources – all achievable via the GUI;
- **A SPARQL endpoint**: The SPARQL endpoint had a configurable GUI and a set of default data visualisations, including timelines, graphs, charts and more; 
- **An API** for read/write programmatic access;
- **A wide range of script libraries** (PyWikibot, WikidataIntegrator), as well as additional user-friendly tools (QuickStatements, Cradle, OpenRefine reconciliation service), for data import/export;
- **Large, global community of open source developers and maintainers**: a community that extends beyond the needs of Wikidata and works towards the sustained development of Wikibase-specific extensions and related services (e.g. [Wikibase Community User Group](https://meta.wikimedia.org/wiki/Wikibase_Community_User_Group#:~:text=The%20Wikibase%20Community%20User%20Group,also%20to%20create%20new%20ones.), [Wikibase Stakeholder Group](https://wbstakeholder.group/)).
