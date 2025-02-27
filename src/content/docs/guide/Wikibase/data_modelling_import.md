---
title: Data Modelling and Import
description: Guide to using and importaing the Wikibase4Research data model
---

#Data modeling in Wikibase

Wikibase follows the [data modeling principles of Wikidata](https://www.wikidata.org/wiki/Wikidata:Data_model). A freshly installed Wikibase instance does not contain any classes or properties. Everything has to be created from scratch. Users can do so by manually creating items and properties to fit their requirements, or by uploading a pre-formated ontology file using Python scripts and/or services such as [WikidataIntegrator](https://github.com/SuLab/WikidataIntegrator). With the Wikibase4Research installation pipeline, we include an upload script and the option to reuse directly or customize a purpose-designed [data model]( https://gitlab.com/nfdi4culture/wikibase4research/auxiliary-service-repositories/wikibase-model). Developed in the context of NFDI4Culture, this data model offers humanities and culture scholars to document and organize their research objects and findings.

##Introduction to the Generic Wikibase Model for cultural objects

Designed specifically for cultural research, this model builds upon [CIDOC-CRM]( https://cidoc-crm.org/), an internationally recognized standard for cultural heritage documentation. By leveraging CIDOC-CRM, the model ensures compatibility with global standards, facilitating integration and collaboration across projects and institutions.

This data model provides a foundational base that can be expanded and adapted to suit specific research needs. Its broad applicability makes it suitable for documenting almost any type of cultural object, offering a balance between standardization and customization.

###Key Features of the Data Model
- **CIDOC-CRM Compliance**: Based on a global standard for cultural heritage, ensuring compatibility and interoperability.
- **Multilinguality**: The model currently covers German and English, but more languages can be added.
-**Ready-to-Use**: The model can be loaded directly into your own Wikibase instance, providing an immediate foundation for your research data.

##Detailed Overview of the Data Model

The data model is designed with a modular approach, focusing on cultural heritage objects and their relationships. Below is a detailed breakdown of its key components:

####Cultural Heritage Objects
- Represented as **Human-made objects**.
- Most information about these objects is captured through **Events** (e.g., creation, modification, discovery).
###Iconographic Concepts
Objects can depict specific **Iconographic concepts**, providing insights into symbolic or thematic content.

####Collections
Objects can belong to one or more **Collections**, enabling group-level categorization and analysis.

####Media Items
Linked to objects as representations, such as 2D images or 3D scans.
•	Each **Media Item** can include: 
o	- **Annotations**: Enriching the media with additional details.
o	- **File Format**: Specifying the technical format of the file.
o	- **Software**: Indicating the tools used to create or modify the media.
####Related Entities
•	- **Places**: Geographical locations relevant to objects or events.
•	- **Humans** and Organizations**: Individuals or groups associated with the object (e.g., creators, owners).
•	- **Bibliographic Works**: References to related literature or documentation.
####Types
•	- **Style**, **Function**, and **Material** of the objects can also be described.

The model focuses on providing basic properties and identifiers for these classes, allowing researchers to capture essential data while offering the freedom to extend as needed.

###Technical Implementation
The data model is available as a downloadable .ttl (Turtle) [file](https://gitlab.com/nfdi4culture/wikibase4research/auxiliary-service-repositories/wikibase-model/-/blob/main/wikibase_generic_model.ttl?ref_type=heads), which can be easily imported into Wikibase instances. Here’s how you can set it up:
1.	**Using [the Docker Pipeline](https://gitlab.com/nfdi4culture/wikibase4research/wikibase4research) **:
- The data model can be easily loaded into any Wikibase instance created with the Docker container provided in the Wikibase4Research GitLab repository.
- Follow the instructions in the repository to deploy your Wikibase and run the provided script for data model integration.
2.	**Compatibility with Other Wikibase Instances**:
- If using a different Wikibase setup, ensure that the required extensions are installed: 
  - [EDTF](https://github.com/ProfessionalWiki/WikibaseEdtf): For handling Extended Date/Time Format.
  - [LocalMedia](https://github.com/ProfessionalWiki/WikibaseLocalMedia): For managing and linking media files within the Wikibase.
- Alternatively, you can modify the .ttl file to adapt the properties for your specific instance.
- Use the [script](https://gitlab.com/nfdi4culture/wikibase4research/auxiliary-service-repositories/wikibase-model/-/blob/main/scripts/ttl2wb.py) from the data model GitLab repository for upload.

##Adapting the Data Model
After successful import, researchers can:
- **Add Properties**: Add to the existing properties to align with the specific requirements of your Wikibase instance.
- **Extend Classes**: Introduce new classes, subclasses or named individuals (i.e. controlled vocabulary terms) to represent additional concepts or relationships.

For more extensive changes, we recommend modifying the model prior to importing it into Wikibase. To facilitate this process, we provide:
- **A [CSV Template](https://gitlab.com/nfdi4culture/wikibase4research/auxiliary-service-repositories/wikibase-model/-/blob/main/wikibase_generic_model.csv)**: Define your changes in a structured CSV format.
- **[Conversion Script](https://gitlab.com/nfdi4culture/wikibase4research/auxiliary-service-repositories/wikibase-model/-/blob/main/scripts/csv2ttl.py)**: Use the script to convert the CSV into a .ttl file. It is crucial to maintain the specified column names and value structures to ensure the script functions correctly.

Alternatively, you can directly edit the .ttl file if you are familiar with RDF syntax. 