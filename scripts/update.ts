const version = Deno.args[0];
if (!version || !/^\d+\.\d+\.\d+$/.test(version)) {
	console.error("Invalid version. Use: #.#.#");
	Deno.exit(1);
}


const zon = await Deno.readTextFile("build.zig.zon");
await Deno.writeTextFile(
	"build.zig.zon",
	zon.replace(/(\.version\s*=\s*")[^"]*(")/, `$1${version}$2`),
);


const changelog = await Deno.readTextFile("CHANGELOG.md");
const today = new Date().toISOString().split("T")[0];
await Deno.writeTextFile(
	"CHANGELOG.md",
	changelog.replace("## Unreleased", `## Unreleased\n\n## ${version} - ${today}`),
);
