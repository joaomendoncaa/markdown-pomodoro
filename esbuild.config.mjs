import esbuild from "esbuild";
import process from "process";
import builtins from "builtin-modules";
import { sassPlugin } from "esbuild-sass-plugin";
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';

const prod = (process.argv[2] === "production");

const context = await esbuild.context({
	entryPoints: ["src/main.ts", "src/styles.scss"],
	bundle: true,
	metafile: true,
	external: [
		"obsidian",
		"electron",
		"@codemirror/autocomplete",
		"@codemirror/collab",
		"@codemirror/commands",
		"@codemirror/language",
		"@codemirror/lint",
		"@codemirror/search",
		"@codemirror/state",
		"@codemirror/view",
		"@lezer/common",
		"@lezer/highlight",
		"@lezer/lr",
		...builtins],
	format: "cjs",
	target: "es2018",
	logLevel: "info",
	outdir: './',
	sourcemap: prod ? false : "inline",
	treeShaking: true,
	plugins: [
		sassPlugin({
			async transform(source) {
				const { css } = await postcss([autoprefixer]).process(source, { from: undefined });
				return css;
			},
		}),
	],
});

if (prod) {
	await context.rebuild();

	process.exit(0);
} else {
	await context.watch();
}