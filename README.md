# Documentation Template

> 🚀 &hairsp; `TODO:`  
> 1. Update information in `project/`.  
> 2. Update title of this README.md to `<Project-Name> Documentation`.  
> 3. Remove this blockquote.  

<a href="/">
  <img src="./project/hero.svg" width="275">
</a>
<br><br>

Official [NFDI4Culture](https://nfdi4culture.de/) documentation project. The documentation application is powered by [Astro](https://astro.build/) + [Starlight](https://starlight.astro.build/).

1. [Click here](#write-documentation) to learn about writing documentation articles.
2. [Click here](#develop-application) to development the documentation application itself.

## 📑 &hairsp; Write Documentation

Common practice, the content is rendered based on [Markdown](https://commonmark.org/). Article files therefore need to state the extension `.md`or `.mdx`.

> 💡 `.mdx` enables use of [Astro](https://docs.astro.build/en/basics/astro-components/) or [React](https://react.dev/learn/your-first-component) components within Markdown, as well as templates.

#### Guide

The technical guide is a comprehensive description of the UI (or API). Articles for the technical guide are supposed to reside in `src/content/docs/guide/**/*.md[x]`.

> 💡 Explore the example articles to see how the docs are rendered.

#### Tutorial

The tutorial is a playful and condensed approach to teach the concepts of the UI (or API). Articles for the tutorial are supposed to reside in `src/content/docs/tutorial/**/*.md[x]`.

#### Assets

Images for use in articles are supposed to reside in `src/content/assets/**/*.{svg|png|jpg}`. They can be referenced from articles using the relative path in the local file system. A good file structure that scales nests the assets analog to the docs Markdown files.

## 💻 &hairsp; Develop Application

The documentation project requires [Node.js](https://nodejs.org) + [NPM](https://www.npmjs.com) (ships together).

> 💡 Upon initial setup, run `npm install`.

#### Scripts

The following scripts help with developing the documentation project itself:

| Command | Description |
| :- | :- |
| 🔧 `npm run start` | Start local development with docs at `localhost:4321`. |
| 📦 `npm run build` | Build production site to `./dist/`. |
| 🔍 `npm run preview` | Preview previously built production site at `localhost:4321`. |

#### Customisation

The `project/` directory groups files that contain information about the actually documented project. Custom Astro or React components for may be defined below `/components`. Custom components should only be used if Markdown concepts do not suffice. To keep a consistent design among different NFDI4Culture project documentations, customisations should be exclusive to adaptions of `project/` directory files. However, extraordinary design requirements may be applied through the stylesheet `src/assets/style.custom.css`.

> 💡 Customisation of `project/` files is usually enough to get started.

#### Deployment

The documentation project application is served directly from the repository via [GitLab Pages](https://docs.gitlab.com/ee/user/project/pages/). The `main` branch contains the current state of the official documentation. Every push to the `main` branch results in a Markdown transpilation to automatically serve the current state.

#### Workflow

1. Create and checkout new branch named after `<scope>/<identifier>`
    - Scope `<docs>` for updates to contents (e.g. `docs/add-installation-article`).
    - Scope `<app>` for updates to application (e.g. `app/adapt-color-scheme`).
2. Run `npm run start`
3. Open `http://localhost:4321/`
4. Develop (site refreshes automatically)
5. Stage, commit and push updates
6. Open merge request to `main`

> 💡 Single branches should not contain both types above stated updates (i.e. either <docs> or <app>).

> 💡 Try only to use word characters and numbers for the branch name `<identifier>`. Do not use slashes in particular.

### Further Reading

- [Starlight Docs](https://starlight.astro.build/)
- [Astro Docs](https://docs.astro.build)
- [NFDI4Culture Knowledge Base](https://nfdi4culture.de/resources/knowledge-base)