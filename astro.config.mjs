import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

import config from "./project/config.json";

export default defineConfig({
	outDir: "./project",
	publicDir: "./project",
	integrations: [
		starlight({
			title: config.projectName,
			logo: {
				light: "./project/KGI4NFDI.png",
				dark: "./project/KGI4NFDI.png",
			},
			favicon: "./favicon.svg",
			social: {
				gitlab: config.appUrlGitLab,
				github: config.appUrlGitHub,
				email: config.contactUrl
			},
			sidebar: [
				{
					label: "Guide",
					autogenerate: { directory: "guide" },
				},
				{
					label: "Tutorial",
					autogenerate: { directory: "tutorial" },
				},
			],
			editLink: {
				baseUrl: config.repoUrl,
			},
			customCss: [
				"./project/props.css",
				"./src/assets/style.nfdi4culture.css",
				"./src/assets/style.custom.css",
			],
			head: [
				{
					tag: "script",
					attrs: {
						defer: true,
					},
					content: `
						document.addEventListener("DOMContentLoaded", () => {
							Array.from(document.querySelectorAll(".social-icons a"))
							.forEach((a) => a.setAttribute("target", "_blank"));
						});
					`,
				}
			]
		}),
	],
	site: config.deploySite,
	base: config.deployBase
});
