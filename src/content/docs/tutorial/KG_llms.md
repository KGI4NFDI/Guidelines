---
title: Knowledge Graph Applications with LLMs
description: Examples of integrating Knowledge Graphs with LLMs using Virtuoso, Apache Jena, and other tools.
sidebar:
  order: 3
---

Knowledge Graphs (KGs) combined with Large Language Models (LLMs) offer powerful solutions for data-driven applications.  
This guide showcases practical examples of how to integrate LLMs with Knowledge Graphs using tools like **Virtuoso and Apache Jena**.

The examples use **Llama** (an open-source LLM), but you can also use OpenAI models if you have an API key.

---

## Example 1: Querying Knowledge Graphs with LLMs

<details>

### **Overview**

In this example, we demonstrate how to **query a Virtuoso Knowledge Graph using a Large Language Model (LLM)** to retrieve meaningful insights from structured data.

The key idea is to **bridge the gap between natural language queries and structured data stored in RDF format within Virtuoso**.  
The integration leverages `llama_index`, an interface that connects LLMs to structured data sources like **SPARQL endpoints**.

---

## **Prerequisites**

### **System Requirements**

- **Python 3.x** installed
- **Virtuoso Server** running with SPARQL authentication enabled

### **Required Installations**

#### **1️⃣ Install LlamaIndex and Dependencies**

```bash
pip uninstall llama_index -y  # Remove old versions
pip install git+https://github.com/OpenLinkSoftware/llama_index
```

#### **2️⃣ Install Llama for Local Use**

```bash
pip install llama-cpp-python
```

#### **3️⃣ Set Up Llama Model**

Download a Llama model (e.g., `llama-2-7b.Q4_K_M.gguf`) and place it in your working directory.

#### **4️⃣ Create a Directory for Graph Data Storage**

```bash
mkdir llama_storage_graph
```

---

## **Configuration**

### **SPARQL Endpoint Details**

Update the following connection details in your Python script:

```python
ENDPOINT = 'http://localhost:8890/sparql-auth/'
GRAPH = 'http://purl.org/stuff/guardians'
BASE_URI = 'http://purl.org/stuff/data'
USER = 'dba'
PASSWORD = 'dba'
```

---

## **Full Python Code (`llama_test.py`)**

```python
import os
from llama_index import KnowledgeGraphIndex, ServiceContext
from llama_index.storage.storage_context import StorageContext
from llama_index.graph_stores import SparqlGraphStore
from llama_cpp import Llama

# Load the Llama model
llm = Llama(model_path="llama-2-7b.Q4_K_M.gguf", temperature=0.5)

# Initialize ServiceContext with Llama
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
kg_index = KnowledgeGraphIndex(
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

## **Running the Code**

Execute the script:

```bash
python llama_test.py
```

---

## **Expected Output**

```bash
Ken thinks about his identity, purpose, and the meaning of life, reflecting on his role beyond just being a supporting character.
```

This response is generated based on RDF triples extracted from the Virtuoso knowledge graph.

---

## **Key Concepts**

- **Virtuoso Integration:** The example connects to a Virtuoso SPARQL endpoint for querying RDF data.
- **LLM Query Processing:** The LLM enhances the query with natural language understanding, making it user-friendly.
- **Knowledge Graph Indexing:** The Knowledge Graph Index improves retrieval efficiency by organizing data into meaningful chunks.

</details>

---

## **Example 2: Extracting Triples from Text Using LLMs**

<details>

### **Overview**

This example demonstrates how to **automatically extract structured knowledge from unstructured text**.  
Using **Llama**, we transform plain text into **triples (subject, predicate, object)** suitable for **building Knowledge Graphs**.

---

## **Full Python Code (`kg_generator.py`)**

```python
import os
import csv
from llama_cpp import Llama

# Load Llama model
llm = Llama(model_path="llama-2-7b.Q4_K_M.gguf", temperature=0.5)

def query_llm(prompt):
    response = llm(prompt, max_tokens=200)
    return response["choices"][0]["text"].strip()

# Sample text for extracting entities and relationships
text = """
Barack Obama was born in Hawaii. He was the 44th President of the United States.
Michelle Obama is his wife. They have two daughters, Malia and Sasha.
"""

# Generate extraction prompt
prompt = f"""
Extract entities and relationships from the following text in the form of triples (subject, relation, object):

Text: {text}

Format:
(Subject, Relation, Object)
"""

extracted_triples = query_llm(prompt)

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

## **Running the Code**

Execute the script:

```bash
python kg_generator.py
```

---

## **Expected Output**

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

## **CSV Output**

```csv
        Subject,Predicate,Object
        Barack Obama,was born in,Hawaii
        Barack Obama,was,44th President of the United States
        Michelle Obama,is wife of,Barack Obama
        Barack Obama,has daughters,Malia
        Barack Obama,has daughters,Sasha
```

This file can now be imported into Virtuoso or Apache Jena as part of a knowledge graph.

</details>

---

## **Alternative: Using OpenAI**

If you prefer a cloud-based solution, you can replace **Llama** with **OpenAI** by installing `openai` and setting up an API key:

```bash
pip install openai
export OPENAI_API_KEY=your_openai_api_key_here
```

Modify the code to replace **Llama** with OpenAI’s `gpt-4` model.

---

</details>

## More Examples

Using Virtuoso with LlamaIndex for RAG significantly improves the quality and reliability of LLM-generated content by grounding responses in factual data. This approach is particularly effective for minimizing hallucinations in knowledge-driven applications.
