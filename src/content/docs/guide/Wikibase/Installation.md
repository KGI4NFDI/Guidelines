---
title: How to Install Wikibase
description: Comprehensive guide to installing Wikibase instances via several methods
---
# Wikibase installation routes

There are 3 routes to creating your own instance of Wikibase: 
- **Cloud hosting**: The easiest route is not to host the instance yourself, but use an instance via the free service provided by Wikimedia Germany – https://www.wikibase.cloud/, this process requires a free account on the platform a few clicks to get you started. Intanceas on the cloud are great for testing ideas and seeing if Wikibase is right for you. However they come with multiple caveats. There are very few custom extensions included in the default installation and users cannot install extensions themselves. There are occasional performance issues in the query and search services, due to ongoing scaling issues with the platform. Additional tools for data upload, visualisation or presentation and not included. 

- **Official Docker Distribution**: You can also install the official Wikibase Suite deployment pipeline maintained by Wikimedia Germany. They provide instructions how to do so here: https://github.com/wmde/wikibase-release-pipeline/blob/main/deploy/README.md However this version of the suite is a generic one and does not take into account specific needs of research communities. 

- **Wikibase4Research**: [Wikibase4Research](https://gitlab.com/nfdi4culture/wikibase4research/wikibase4research) is the Wikibase Suite deployment pipeline recommended by the KGI service. It is developed and maintained in the context of NFDI4Culture. It uses the official Docker distribution from Wikimedia Germany, but bundles it with a whole range of additional extensions and services, such as the RDF, EDTF and Local Media extensions, the OpenRefine reconciliation service, and the Semantic MediaWiki frontend. Everything is customisable, so you can choose which of all the options are useful for your project or not. You can receive additional support and consultation during the monthly [consulting hour](https://kgi.services.base4nfdi.de/consultancy/) of the KGI service. 

# Installing Wikibase4Research

[Wikibase4Research](https://gitlab.com/nfdi4culture/wikibase4research/wikibase4research) is a configurable Docker pipeline for setting up MediaWiki, SemanticMediaWiki, Wikibase, or SemanticWikibase with selected extensions in minutes. It includes a script to manage Docker Compose deployments using predefined presets, simplifying setup, teardown, and management of various configurations.

## Overview

The main script, `wiki.sh`, simplifies the deployment and configuration of Docker services using preset folders containing necessary configuration files. This script supports actions such as setup, removal, and running any Docker Compose command.

## System Configuration

To access your wiki via a local address (e.g., `http://wb.local`) instead of an IP, add these addresses to your hosts file (e.g., `/etc/hosts` on Linux):

```bash
127.0.0.1   wb.local
127.0.0.1   openrefine.local
127.0.0.1   wdqs-frontend.local
```

If you change the server name variable of your wiki in the `.env` file, you may need to update your hosts file accordingly.

## Usage

```bash
./wiki.sh [OPTIONS] PRESET_FOLDER ACTION
```

### Arguments

- `PRESET_FOLDER`: The folder containing your preset configuration files.
- `ACTION`: The action to perform (`setup`, `remove`, or any Docker Compose command).

### Options

- `-p, --project-name NAME`: Specify the Docker Compose project name. If not provided, a default name based on `PRESET_FOLDER` will be used.
- `-h, --help`: Show the help message and exit.

### Actions

- `setup`: Build and start containers using the specified preset. use `up --build` instead of `setup` to see full console output
- `update`: Update your wiki without deleting volumes. Use this to install new extensions on an existing installation.
- `remove`: Stop and remove containers using the specified preset.
- `exportdump`: export a xml dump file of the wiki content (will not include files and user accounts)
- `importdump`: import a xml dump file, this may take long time. Use `mysqldump` for faster import/export
- `mysqldump`: dump the whole wiki database into a sql file (will not include image files, these are mounted in folder wb_resources)
- `importmysqldump`: fast sql import of the database (this will overwrite all data in your wiki db including accounts/passwords)
- `munge`: This will refresh all data of the WDQS by generating an RDF dump of wikibase and import it in WDQS
- `command`: can be used to execute shell commands in the wikibase container (quick ref for longer `docker exec` command)
- `checkuptime`: can be used to to monitor the health of the servers, and send a mail if somethings wrong
- `any`: Any Docker Compose command (e.g., `up`, `down`, `logs`, etc.).

### Examples

```bash
./wiki.sh wikiPresets/myPreset setup
./wiki.sh wikiPresets/myPreset setup -p specificProjectName
./wiki.sh wikiPresets/myPreset remove
./wiki.sh wikiPresets/myPreset logs
./wiki.sh wikiPresets/myPreset mysqldump
./wiki.sh wikiPresets/myPreset importmysqldump
./wiki.sh wikiPresets/myPreset munge
./wiki.sh wikiPresets/myPreset command "php maintenance/runJobs.php"
```

## URLs

You can define your own URLs for each service in the `.env` file.

Note that if you change the server name variable of your wiki in the `.env` file, you may need to update your hosts file accordingly.

This will be the default URL for each service:

| Service                    | Default URL                  | Configuration File                                 | Hosts File Entry                  |
| -------------------------- | ---------------------------- | -------------------------------------------------- | --------------------------------- |
| Wiki                       | `http://wb.local`            | `W4R_SERVER_NAME` in `.env.template`               | `127.0.0.1   wb.local`            |
| Reverse Proxy (Monitoring) | `http://localhost:8091/`     | `W4R_TRAEFIK_WEBCONFIG_PORT` in `.env`             | N/A                               |
| OpenRefine                 | `http://openrefine.local`    | `W4R_OPENREFINE_SERVER_NAME` in `.env.template`    | `127.0.0.1   openrefine.local`    |
| WDQS Frontend              | `http://wdqs-frontend.local` | `W4R_WDQS_FRONTEND_SERVER_NAME` in `.env.template` | `127.0.0.1   wdqs-frontend.local` |

## Predefined Presets

| Preset                    | Description                                                                                                                  | Extensions Installed                                                                                                                                                                                                                                             | Additional Services                                                          |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `mediawiki_plain`         | A pure MediaWiki installation with no additional extensions other than the Tweeki skin.                                      | Tweeki (bootstrap) skin                                                                                                                                                                                                                                          |                                                                              |
| `semanticMediawiki_plain` | A SemanticMediaWiki (SMW) installation for setting up a functional semantic wiki with extended functionality.                | SemanticResultFormats, Maps, PageForms, Arrays, Variables, Loops, ParserFunctions, Tweeki (bootstrap) skin                                                                                                                                                       |                                                                              |
| `wikibase_plain`          | An empty Wikibase installation.                                                                                              | ConfirmAccount, WikibaseRDF, WikibaseEdtf (extended datetime format), WikibaseLocalMedia, WikibaseManifest, Babel, EntitySchema, OAuth, Tweeki (bootstrap) skin                                                                                                                               | Elasticsearch, OpenRefine, Wikibase jobrunner, WDQS (Wikidata query service) |
| `wikibase_nfdi4culture`   | Based on `wikibase_plain`, it uses a custom init Python script to initialize Wikibase with a specific data model.            | Inherits extensions from `wikibase_plain`                                                                                                                                                                                                                        | Inherits services from `wikibase_plain`                                      |
| `semanticWikibase_plain`  | A combined installation of Wikibase and SemanticMediaWiki within one wiki, using SemanticWikibase extension for interaction. | SemanticMediawiki (SMW), SemanticResultFormats, Maps, PageForms, Arrays, Variables, Loops, ParserFunctions, WikibaseEdtf (extended datetime format), WikibaseLocalMedia, WikibaseManifest, Babel, EntitySchema, OAuth, SemanticWikibase, Tweeki (bootstrap) skin | Elasticsearch, OpenRefine, Wikibase jobrunner, WDQS (Wikidata query service) |

## Configuration

All configuration files are project-specific, located under `wikiPresets/presetName/config/`.

### Project Settings (Environment Variables)

| Variable                        | Description                                                    |
| ------------------------------- | -------------------------------------------------------------- |
| `W4R_MW_VERSION`                | MediaWiki version to be installed.                             |
| `W4R_MW_WIKI_NAME`              | Name of the Wiki (will appear as page title).                  |
| `W4R_MW_ADMIN_USER`             | Name of the wiki admin user.                                   |
| `W4R_MW_ADMIN_PASS`             | Password of the wiki admin user.                               |
| `W4R_MW_ADMIN_EMAIL`            | Email address of the wiki admin user.                          |
| `W4R_MW_EMERGENCY_CONTACT`      | Emergency email address to be set in the wiki config.          |
| `W4R_MW_WG_SECRET_KEY`          | Secret key, needed for manually upgrading a running MediaWiki. |
| `W4R_DB_SERVER`                 | Host and port of the database.                                 |
| `W4R_DB_USER`                   | Name of the database user for the wiki.                        |
| `W4R_DB_PASS`                   | Password of the database user.                                 |
| `W4R_DB_NAME`                   | Name of the new database for the wiki.                         |
| `W4R_SERVER_NAME`               | URL under which your wiki will be available.                   |
| `W4R_FULL_SERVER_NAME`          | Server URL including used protocol (default: `http://`).       |
| `W4R_INIT_FOLDER`               | Path to the wikiPreset Folder.                                 |
| `W4R_CUSTOM_INIT_PYTHON_SCRIPT` | Path to a custom Python script to run on wiki setup.           |
| `W4R_COMPOSER_SERVICE_INCLUDE`  | List of Docker services to start.                              |
| `W4R_OPENREFINE_VERSION`        | Version of OpenRefine to install.                              |
| `W4R_OPENREFINE_SERVER_NAME`    | Address under which OpenRefine should be available.            |
| `W4R_WDQS_FRONTEND_SERVER_NAME` | Address of the WDQS frontend.                                  |
| `W4R_REVERSEPROXY_PORT`         | Internal port of the proxy.                                    |
| `W4R_TRAEFIK_WEBCONFIG_PORT`    | Port of the web frontend.                                      |

### Extension Management

Extensions are listed and activated in `wikiPresets/yourProject/config/extensionManagement.json`.

#### `extensionManagement.json`

**"config_files"**
- Activate or deactivate specific configuration files in `config/LocalSettings.d`.

**"extension/composer"** (same for skins/composer)
- Extensions that need to be installed via composer.
- Fields: path, version, maintenance_scripts, active

**"extension/git"** (same for skins/git)
- Extensions that need to be installed via git.
- Fields: path, version, maintenance_scripts, custom_folder, active

### LocalSettings.php

The `LocalSettings.php` is built on setup. Config files in `config/LocalSettings.d` marked as 'active' in `extensionManagement.json` are included in alphabetical order.

### Composer Settings

The file `wikiPresets/yourProject/config/composer.local.json` handles extension dependencies. Include extensions to resolve dependencies automatically. If you add a new extension via git an run into an error about incompatible version, add your extensions composer.json to `composer.local.json` to allow composer handle the dependencies. then `update` your wiki using `wiki.sh`

### Import Content

There are several ways to automatically import data and resources to your wiki project:

#### Custom Init Python Script

The file `config/scripts/custom_init.py` runs after each setup process. The control service must be active in the `.env` file.

#### Default Import Folders

The content in these folders is imported automatically after each setup process
- `fonts`: Custom fonts or resources, accessible via `http://wb.local/resources/`.
- `images/import`: Images imported via the MediaWiki maintenance script.
- `images/copy`: Images available at `http://wb.local/images/`.
- `pages`: Wikipage dumps to import.

#### XML dump import
use `./wiki.sh/<project path> importdump` to import an existing file named `dump.xml` from your project folder. XML dumps take far more time than sql dumps. Consider using `mysqldump` if your wikibase contains more than a few hundred entries.

#### SQL dump import
use `./wiki.sh/<project path> importmysqldump` to import an existing databse sql dump. The sql dump is very fast but will overwrite all your db settings like user accounts and passwords. It contains all db entries of uploaded media files but not the files itself. you need to copy the folder `<your project path>/wb_resources/images/` manually to import the images.

### WDQS

You need to have `prefixes.conf` in your config folder. You should change the URLs in `prefixes.conf` to match your wiki.

### OpenRefine

You need to have `openrefine-manifest.json` in your config folder. You should change the URLs in `openrefine-manifest.json` to match your wiki.

## Contributing

Submit a pull request or open an issue for custom presets or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Howto: Setup a Custom Wiki Project

This process is the current best practise to setup custom projects. It ensures, that your individual project content is handled in a seperate repository and that your working projects are in a seperate folder than the predefined wiki presets.

1. Clone the project:
   ```bash
   git clone https://gitlab.com/nfdi4culture/wikibase4research/wikibase4research.git
   ```

2. Create a project folder :
we suggest to use folder wikiPROJECTS instead of wikiPRESETS for your custom content
   ```bash
   cd wikibase4research
   mkdir -p wikiProjects/myProject
   ```

3. Init a git repo for your project:
   ```bash
   git init wikiProjects/myProject
   ```

4. Copy a matching preset:
   ```bash
   cp -r wikiPresets/wikibase_plain/* wikiProjects/myProject
   ```

   Here we use `wikibase_plain` as an example. You can use any preset that matches your needs.

5. Customize your project:
   - copy `../config/.env.template` to `../config/.env`
   - (important!) make sure to change `W4R_INIT_FOLDER` in .env file to your project folder
   - change custom configurations in `.env` like wiki name, passwords etc.
   - (optional) change extensions in `../config/extensionManagement.json` and `../config/composer.local.json`. Create or change corresponding config files in folder `../config/Localsettings.d`
   - (optional) Add custom fonts to `../fonts`.
   - (optional) Add images to `../images/import`.
   - (optional) Add images to `../images/copy`.
   - (optional) Add wikipage dumps to `../pages`.
   - (optional) Create custom scripts in `../scripts`.

6. Commit your changes:
   ```bash
   cd wikiProjects/myProject
   git add .
   git commit -m "Initial commit"
   ```

7. Create a remote repo and push your changes:
   ```bash
   git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
   git push -u origin master
   ```
8. Now start the project:
   ```bash
   ./wiki.sh wikiProjects/myProject setup
   ```
   Open your browser with url `http://wb.local` (make sure that you have set `wb.local` in your `hosts` file, as described above)

## Errors

1. Have a look at our solved error issues if any match your case: https://gitlab.com/nfdi4culture/wikibase4research/wikibase4research/-/issues/?sort=created_date&state=all&label_name%5B%5D=error&first_page_size=20
2. Report your error to get help
