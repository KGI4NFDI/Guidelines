---
title: Querying in QLever
description: How to install and configure QLever, including pre-built binaries and Docker usage.
---
Querying is a core function in QLever, enabling users to extract and manipulate data stored in RDF formats. QLever supports SPARQL for querying RDF data, providing a powerful and efficient platform for exploring large-scale datasets.

---

## Introduction to SPARQL in QLever

### Overview of SPARQL

SPARQL (SPARQL Protocol and RDF Query Language) is the standard query language for RDF data. QLever’s SPARQL engine allows you to query and manipulate RDF data with high performance, especially when dealing with large datasets.

#### Key Features:
- **Efficiency**: QLever is optimized for fast query execution, especially for large-scale RDF data.
- **Scalability**: It is designed to handle complex queries over very large datasets, offering scalable solutions.
- **Support for Common RDF Operations**: QLever fully supports SPARQL query patterns and provides extensions for enhanced performance.

---
<details>

## Basic SPARQL Query Structure
<details>
A typical SPARQL query consists of several key components:

1. **PREFIX**: Defines shorthand for namespaces to simplify the query.
   ```sparql
   PREFIX ex: <http://example.com/ontology#>
   ```

2. **SELECT**: Specifies the variables to be returned.
   ```sparql
   SELECT ?subject ?predicate ?object
   ```

3. **FROM**: Specifies the graph IRI from which data should be queried.
   ```sparql
   FROM <http://example.com/graph>
   ```

4. **WHERE**: Defines the triple patterns to match in the data.
   ```sparql
   WHERE {
     ?subject ?predicate ?object .
   }
   ```

5. **LIMIT**: Restricts the number of results returned.
   ```sparql
   LIMIT 10
   ```

### Example Query:
```sparql
PREFIX ex: <http://example.com/ontology#>
SELECT ?subject ?predicate ?object
FROM <http://example.com/graph>
WHERE {
  ?subject ex:hasName ?object .
}
LIMIT 10
```

This query retrieves the first 10 subjects and their names from the specified graph.
</details>

---

## Advanced SPARQL Query Techniques
<details>

### Federated SPARQL Queries:
- **Definition**: Enables querying across multiple SPARQL endpoints.
- **Syntax Example**:
   ```sparql
   SELECT *
   WHERE {
     SERVICE <http://dbpedia.org/sparql> {
       ?s ?p ?o .
     }
   }
   ```

   **Use Case**: Useful for integrating external RDF data, such as linking data from DBpedia with your local QLever instance.

### SPARQL with Aggregates:
- **Functions**: COUNT, SUM, AVG, MIN, MAX for aggregating data.
- **Syntax Example**:
   ```sparql
   SELECT (COUNT(?subject) AS ?count)
   WHERE {
     ?subject ?predicate ?object .
   }
   ```

   **Use Case**: To count the number of triples that match certain criteria.

### SPARQL with Filters:
- **FILTER**: Restricts results based on a condition.
- **Syntax Example**:
   ```sparql
   SELECT ?subject ?predicate ?object
   WHERE {
     ?subject ?predicate ?object .
     FILTER(?predicate = ex:hasName)
   }
   ```

   **Use Case**: To filter results based on specific conditions.

### SPARQL CONSTRUCT Queries:
- **Definition**: Generates new RDF triples based on the query.
- **Syntax Example**:
   ```sparql
   CONSTRUCT {
     ?subject ex:relatedTo ?object .
   }
   WHERE {
     ?subject ex:hasName ?name .
     ?object ex:hasName ?name .
   }
   ```

   **Use Case**: To create a new RDF graph based on certain patterns in the existing data.
</details>


## Query Optimization Best Practices

To ensure efficient query execution in QLever, consider the following optimization strategies:
<details>

1. **Use Proper Indexes**: Ensure your RDF data is indexed correctly to speed up query execution.
2. **Query Plan Analysis**: Analyze the query execution plan using QLever's built-in tools to identify bottlenecks.
3. **Graph Partitioning**: Partition large graphs into smaller, manageable subgraphs to improve query performance.
4. **Limit and Offset**: Use `LIMIT` and `OFFSET` strategically to handle large datasets.
5. **Avoid Unnecessary Joins**: Simplify queries by avoiding complex joins unless absolutely necessary.
</details>

---

## Practical Examples
<details>

### Basic Data Retrieval:
Retrieve all people with a specific attribute:
```sparql
SELECT ?person
WHERE {
  ?person ex:hasAttribute "Value" .
}
```

### Combining RDF and SQL Data:
Query data that combines relational tables with RDF graphs:
```sql
SELECT r.name, s.predicate, s.object
FROM relational_table AS r
JOIN (SPARQL
  SELECT ?subject ?predicate ?object
  WHERE {
    ?subject ex:relatedTo ?object .
  }
) AS s ON r.id = s.subject
```

### Federated Query Example:
Combine data from QLever with an external SPARQL endpoint like DBpedia:
```sparql
SELECT ?localName ?dbpediaAbstract
WHERE {
  ?localEntity ex:hasName ?localName .
  SERVICE <http://dbpedia.org/sparql> {
    ?dbpediaEntity dbp:abstract ?dbpediaAbstract .
    FILTER(LANG(?dbpediaAbstract) = 'en')
  }
}
```
</details>

</details>

---

## Executing SPARQL Queries in Virtuoso

Once you understand how SPARQL queries work, the next step is to execute them in QLever. QLever provides several interfaces for running SPARQL queries, including the QLever web interface and the command-line interface. Each method is suited to different use cases, so it's important to know how to use each one effectively.

---
<details>

### Using QLever Web Interface

QLever provides a web-based interface where you can run SPARQL queries directly through an intuitive graphical interface.
<details>

#### Step-by-Step Guide:

1. **Accessing the QLever Web Interface:**:  
   Open your web browser and navigate to `http://localhost:9999/sparql`.  
   This will take you to the QLever's SPARQL query execution page.

2. **Writing and Executing SPARQL Queries**:  
   
   - **Enter the Query**:  
     Type your SPARQL query in the query input box. For example:
     ```sparql
        PREFIX ex: <http://example.com/ontology#>
        SELECT ?subject ?predicate ?object
        FROM <http://example.com/graph>
        WHERE {
        ?subject ?predicate ?object .
        }
        LIMIT 10
     ```
   - **Execute the Query**:  
     Click the *Run Query* button to execute the query.
   - **Review the Results**:  
     The results will appear below the query input area. You can view, export, or further manipulate the results as needed.
</details>

---

### Running SPARQL Queries via Command Line (`qlever`)

The command-line interface (`qlever`) is a powerful tool for users who prefer a text-based approach to running SPARQL queries.
<details>

#### Step-by-Step Guide:

1. **Connecting to QLever**:
   Open your terminal or command prompt. 
   Start the QLever service if it's not already running. You can use Docker or run it natively:
   ```bash
   docker run -p 9999:9999 qlever/qlever
   ```
   
2. **Entering and Executing SPARQL Queries**:
   - **Start a Query Session:**:  
     Type or paste your SPARQL query directly in the terminal, such as:
   - **Enter Your SPARQL Query**:  
     Type or paste your SPARQL query, such as:
     ```sparql
        PREFIX ex: <http://example.com/ontology#>
        SELECT ?subject ?predicate ?object
        FROM <http://example.com/graph>
        WHERE {
            ?subject ?predicate ?object .
        }
        LIMIT 10
     ```

   - **Execute the Query**:  
     Press Enter to run the query. The results will be displayed directly in the terminal.


   - **Exiting Command Line Interface**:  
     When finished, exit the terminal session or stop the service using `Ctrl+C`.

</details>

---

### Using QLever’s SPARQL Endpoint

QLever provides a dedicated SPARQL endpoint that can be accessed via a web browser or through programmatic HTTP requests.

<details>

#### Step-by-Step Guide:

1. **Accessing the SPARQL Endpoint**:  
   Open your web browser and go to `http://localhost:8890/sparql`.  
   This interface allows you to write and execute SPARQL queries directly against your QLever instance.

2. **Writing and Running Queries in the Endpoint Interface**:  
   - **Enter Your SPARQL Query**:  
     In the provided text area, type your SPARQL query. For example:
     ```sparql
     PREFIX ex: <http://example.com/ontology#>
     SELECT ?subject ?predicate ?object
     FROM <http://example.com/graph>
     WHERE {
       ?subject ?predicate ?object .
     }
     LIMIT 10
     ```
   - **Select the Output Format**:  
     Choose the desired output format (e.g. JSON, XML) from the dropdown menu.
   - **Run the Query**:  
     Click the *Run Query* button to execute the query. The results will be displayed below the query input area.

3. **Programmatic Access to the SPARQL Endpoint**:  
   - **Construct the Query URL**:  
     You can execute SPARQL queries programmatically by appending the query to the endpoint URL as a parameter. For example:
     ```
     http://localhost:8890/sparql?query=SELECT+%3Fsubject+%3Fpredicate+%3Fobject+WHERE+%7B+%3Fsubject+%3Fpredicate+%3Fobject+%7D+LIMIT+10
     ```
   - **Send HTTP Requests**:  
     Use tools like `curl`, Postman, or your preferred programming language to send HTTP GET or POST requests to the endpoint and retrieve query results.
</details>
</details>

---
