function dedent(str) {
	const lines = str.split("\n");
	if (lines[0].trim() === "") lines.shift();
	if (lines[lines.length - 1].trim() === "") lines.pop();

	const minIndent = lines
		.filter((line) => line.trim() !== "")
		.reduce((min, line) => {
			const match = line.match(/^[\t ]*/)[0];
			const indent = match.replace(/\t/g, "  ").length;
			return Math.min(min, indent);
		}, Infinity);

	return lines
		.map((line) => {
			const converted = line.replace(/^\t+/, (tabs) => "  ".repeat(tabs.length));
			return converted.slice(minIndent);
		})
		.join("\n");
}
