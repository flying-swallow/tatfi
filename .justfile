@_default:
	just --list

[no-exit-message]
[arg('trace', long="trace", pattern='\d+')]
test trace="0":
	zig build test \
		--error-style minimal \
		-freference-trace={{trace}} \
		--summary line

[no-exit-message]
run:
	zig build run \
		--error-style minimal \
		-freference-trace=0 \
		--summary none


commit msg:
	jj commit -m "{{msg}}"


tag tag:
	deno run \
		-R="build.zig.zon,CHANGELOG.md" \
		-W="build.zig.zon,CHANGELOG.md" \
		./scripts/update.ts {{tag}}
	jj bookmark advance main
	jj commit --message 'v{{tag}}'
	jj tag set v{{tag}} --revision @-
