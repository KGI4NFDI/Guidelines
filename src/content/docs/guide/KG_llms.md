---
title: Knowledge Graph Applications with LLMs
description: Examples of integrating Knowledge Graphs with LLMs using Virtuoso, Apache Jena, and other tools.
sidebar:
  order: 3
---

Knowledge Graphs (KGs) combined with Large Language Models (LLMs) offer powerful solutions for data-driven applications. This guide showcases practical examples of how to integrate LLMs with Knowledge Graphs using tools like Virtuoso and Apache Jena.

---

## Example 1: Querying Knowledge Graphs with LLMs

<details>

### Overview

In this example, we demonstrate how to query a Virtuoso Knowledge Graph using a Large Language Model (LLM) to retrieve meaningful insights from structured data. The core idea is to bridge the gap between natural language queries and structured data stored in RDF format within Virtuoso.The integration leverages `llama_index`, an interface that connects LLMs to structured data sources like SPARQL endpoints.

---

## Prerequisites

### System Requirements:

- **Python 3.x** installed.
- **Virtuoso Server** running with SPARQL authentication enabled.

### Required Installations:

1. **Uninstall existing LlamaIndex (if any):**

   ```bash
   pip uninstall llama_index -y
   ```

2. **Install OpenLink's fork of LlamaIndex:**

   ```bash
   pip install git+https://github.com/OpenLinkSoftware/llama_index
   ```

3. **Set OpenAI API Key:**

   ```bash
   export OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Create a directory for graph data storage:**
   ```bash
   mkdir llama_storage_graph
   ```

---

## Configuration

### SPARQL Endpoint Details:

Update the following connection details in your Python script:

```python
ENDPOINT = 'http://localhost:8890/sparql-auth/'
GRAPH = 'http://purl.org/stuff/guardians'
BASE_URI = 'http://purl.org/stuff/data'
USER = 'dba'
PASSWORD = 'dba'
```

### OpenAI API Configuration:

```python
import os
import openai

openai.api_key = os.environ["OPENAI_API_KEY"]
```

---

## Full Python Code (`llama_test.py`)

```python
from llama_index import download_loader
import os
from llama_index import KnowledgeGraphIndex, ServiceContext
from llama_index.storage.storage_context import StorageContext
from llama_index.graph_stores import SparqlGraphStore
from llama_index.llms import OpenAI
from llama_index import load_index_from_storage
import openai

# OpenAI API Key
openai.api_key = os.environ["OPENAI_API_KEY"]

# Initialize LLM
llm = OpenAI(temperature=0, model="text-davinci-002")
service_context = ServiceContext.from_defaults(llm=llm, chunk_size=512)

# Virtuoso SPARQL Endpoint Configuration
ENDPOINT = 'http://localhost:8890/sparql-auth/'
GRAPH = 'http://purl.org/stuff/guardians'
BASE_URI = 'http://purl.org/stuff/data'
USER = 'dba'
PASSWORD = 'dba'

# Connect to Virtuoso SPARQL Graph Store
graph_store = SparqlGraphStore(
    sparql_endpoint=ENDPOINT,
    sparql_graph=GRAPH,
    sparql_base_uri=BASE_URI,
    create_graph=False,
    user_name=USER,
    user_password=PASSWORD,
)

# Load Index from Storage
storage_context = StorageContext.from_defaults(persist_dir='./llama_storage_graph', graph_store=graph_store)
kg_index = load_index_from_storage(
    storage_context=storage_context,
    service_context=service_context,
    max_triplets_per_chunk=10,
    sparql_endpoint=ENDPOINT,
    sparql_graph=GRAPH,
    sparql_base_uri=BASE_URI,
    include_embeddings=True,
    verbose=True,
)

# Query Engine Setup
kg_rag_query_engine = kg_index.as_query_engine(
    include_text=False,
    retriever_mode="keyword",
    response_mode="tree_summarize",
)

# Example Query
response_graph_rag = kg_rag_query_engine.query("In the movie, what does Ken think about?")

# Display the Response
print(str(response_graph_rag))
```

---

## Running the Code

Execute the script in your terminal:

```bash
python llama_test.py
```

---

## Expected Output

When the code is executed, we expect the output to provide an insightful answer extracted from the Knowledge Graph:

```bash
Ken thinks about his identity, purpose, and the meaning of life, reflecting on his role beyond just being a supporting character.
```

This response is generated based on the RDF triples extracted from the Virtuoso knowledge graph.

---

## Key Concepts

- **Virtuoso Integration:** The example connects to a Virtuoso SPARQL endpoint for querying RDF data.
- **LLM Query Processing:** LLM enhances the query with natural language understanding, making it user-friendly.
- **Knowledge Graph Indexing:** The Knowledge Graph Index improves retrieval efficiency by organizing data into meaningful chunks.

---

## Troubleshooting Tips

- **Connection Errors:** Ensure Virtuoso is running and accessible via the specified SPARQL endpoint.
- **Authentication Issues:** Verify that the provided `USER` and `PASSWORD` have the necessary SPARQL access rights.
- **API Key Errors:** Confirm that the OpenAI API key is correctly set in the environment variables.

---

## Expanding the Dataset

You can modify the SPARQL queries to explore more data points. For example:

```python
response_graph_rag = kg_rag_query_engine.query("Who is Barbie?")
print(str(response_graph_rag))
```

### Expected Output:

```bash
Barbie is a character who thinks about becoming human and living in the real world. She also contemplates what it means to be human.
```

 </details>

## Example 2: Extracting Triples from Text Using LLMs

<details>

### Overview

In this example, we showcase how to automatically extract structured knowledge (in the form of triples: subject, relation, object) from unstructured text using a Large Language Model (LLM). The goal is to transform plain text into a format suitable for building knowledge graphs, which can later be queried using SPARQL or integrated with systems like Virtuoso or Apache Jena.

### Full Python Code (`kg_generator.py`)

```python
from openai import OpenAI
import csv

# Set up OpenAI API key
client = OpenAI(api_key="")

# Sample text for extracting entities and relationships
text = """
Barack Obama was born in Hawaii. He was the 44th President of the United States.
Michelle Obama is his wife. They have two daughters, Malia and Sasha.
"""

# Function to extract entities and relationships
def extract_entities_relations(text):
    prompt = f"""
    Extract entities and relationships from the following text in the form of triples (subject, relation, object):

    Text: {text}

    Format:
    (Subject, Relation, Object)
    """

    # Correct ChatCompletion API call using the instantiated client
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are an assistant that extracts entities and relationships from text."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.5,
        max_tokens=200
    )

    return response.choices[0].message.content.strip()

# Extract entities and relationships from the sample text
extracted_triples = extract_entities_relations(text)

# Display the extracted triples
print("Extracted Triples:")
print(extracted_triples)

# Save triples to a CSV file
csv_filename = "extracted_triples.csv"
with open(csv_filename, mode='w', newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    writer.writerow(["Subject", "Predicate", "Object"])  # CSV Header
    for triple in extracted_triples.split('\n'):
        writer.writerow(triple.strip("()").split(", "))

print(f"\nTriples successfully saved to {csv_filename}")
```

---

### Running the Code

Execute the script:

```bash
python kg_generator.py
```

---

### Expected Output

```bash
Extracted Triples:
(Barack Obama, was born in, Hawaii)
(Barack Obama, was, 44th President of the United States)
(Michelle Obama, is wife of, Barack Obama)
(Barack Obama, has daughters, Malia)
(Barack Obama, has daughters, Sasha)

Triples successfully saved to extracted_triples.csv
```

---

### CSV Output

```csv
        Subject,Predicate,Object
        Barack Obama,was born in,Hawaii
        Barack Obama,was,44th President of the United States
        Michelle Obama,is wife of,Barack Obama
        Barack Obama,has daughters,Malia
        Barack Obama,has daughters,Sasha
```

This file can now be imported into Virtuoso or Apache Jena as part of a knowledge graph.

---

</details>

## More Examples

Using Virtuoso with LlamaIndex for RAG significantly improves the quality and reliability of LLM-generated content by grounding responses in factual data. This approach is particularly effective for minimizing hallucinations in knowledge-driven applications.
