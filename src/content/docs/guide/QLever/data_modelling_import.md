# Data Modelling and Import:
This section focuses on the methods QLever offers to handle RDF datasets, including loading, bulk processing, and using alternative formats like CSV for efficient data management.


## RDF Insert Methods
### Loading RDF Datasets:
QLever supports the ingestion of RDF datasets in various formats, such as Turtle (TTL), RDF/XML, and N-Triples. The process involves:

#### Specifying the Input Format:
Indicate the RDF format in the configuration or command-line argument. 

For example:

```bash
qlever index --input-format ttl dataset.ttl
```

#### Validation and Parsing: 
QLever ensures the integrity of RDF data by validating syntax during ingestion. Adjust parsing parameters, such as locale settings or prefix configurations, to match the dataset specifics​ (https://github.com/ad-freiburg/QLever/blob/master/docs/quickstart.md, https://github.com/ad-freiburg/qlever/discussions/575 ).

### Bulk Loading of RDF Datasets
For large RDF datasets, QLever employs optimized bulk-loading mechanisms:
#### Chunk-based Processing: 
Splits datasets into manageable chunks to process them efficiently without exhausting memory.
#### Partial Vocabulary Construction: 
Creates intermediate vocabularies for segments of data, merging them later to complete the indexing process.
	
Command Example:

```bash
qlever index --config qlever_config.json --dataset large_dataset.nt
```

Here, the configuration file specifies memory and CPU usage limits for the bulk-loading  process​.
	
### CSV File Bulk Loader
In addition to RDF, QLever supports importing data from structured CSV files:
#### Mapping CSV to RDF: 
Define how CSV fields map to RDF predicates and subjects using a configuration file or script.

#### Conversion Tools: 
Use external tools (e.g., Python scripts or custom QLever modules) to preprocess the CSV into a compatible RDF format.

Command Example:

```bash
qlever csv-import --config csv_config.json data.csv
```

This method allows users to quickly integrate tabular data into their RDF ecosystem​
