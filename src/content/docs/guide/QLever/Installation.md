---
title: "QLever Installation Guide"
description: "Step-by-step guide to install and configure QLever for querying datasets."
---

# How do I get QLever?

## Prerequisites

Before installing QLever, ensure that your system meets the following requirements:

- **Operating System**: Ubuntu (18.04 or later recommended), macOS, or Windows Subsystem for Linux (WSL).
- **Python**: Version 2.7 or higher.
- **Hardware**:
  - **Minimum**: 4 GB RAM, 4 CPU cores
  - **Optional**: Docker (for containerized deployment)

---

Note: QLever generally requires CMake 3.10 or higher.

## Installation Methods

### Option 1: Using Python and Pip (Recommended for local installations)

#### Install QLever

Run the following command in your terminal to install QLever using pip:

```bash
pip install qlever
```

#### Verify the Installation:

Check that QLever was installed successfully:

```bash
qlever --version
```

(This runs QLever on port 7001.)

---

### Option 2: Using Docker (Recommended for Production or Large-Scale Setups)

#### Pull the QLever Docker Image:

```bash
docker pull qlever/qlever
```

#### Run QLever in a Container:

```bash
docker run -d -p 7001:7001 qlever/qlever
```

## Configuration Setup

Once installed, you need to configure QLever to work with your dataset. QLever uses configuration files (`Qleverfile`) to define dataset locations and settings.

### Create a Qleverfile

Use the command below to create a configuration file for a sample dataset (e.g., Wikidata):

```bash
qlever setup-config wikidata
```

### Edit the Configuration:

Open the configuration file and modify it to point to your dataset location and adjust the memory limits as needed:

```bash
nano qlever_config.json
```

## Running QLever

To start the QLever engine after configuration:

### Index the dataset

Indexing is required for QLever to query the dataset efficiently.

```bash
qlever index --config qlever_config.json
```

### Start the QLever Server:

```bash
qlever start --config qlever_config.json
```

## Verifying the Installation:

To verify that QLever is running correctly:

1. Open your browser and navigate to:

```bash
http://localhost:7001
```

2. Execute a test query (e.g., SELECT \* WHERE {?s ?p ?o} LIMIT 10) to verify that the server responds.
