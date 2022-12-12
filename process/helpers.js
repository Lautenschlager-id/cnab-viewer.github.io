export const tokens = {
	"&": "\x00",
	"<": "\x01",
	">": "\x02",
	"\"": "\x03",
	"'": "\x04",
	" ": "\x05",
};

export function escapeUnsafeHTML(str)
{
	return str?
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;")
		.replace(/ /g, "&nbsp;")
		.replace(/\n/g, "<br>");
}

export function tokenizeUnsafeHTML(str)
{
	return str?
		.replace(/&/g, "\x00")
		.replace(/</g, "\x01")
		.replace(/>/g, "\x02")
		.replace(/"/g, "\x03")
		.replace(/'/g, "\x04")
		.replace(/ /g, "\x05");
}

export function escapeTokenizedHTML(str)
{
	return str?
		.replace(/\x00/g, "&amp;")
		.replace(/\x01/g, "&lt;")
		.replace(/\x02/g, "&gt;")
		.replace(/\x03/g, "&quot;")
		.replace(/\x04/g, "&#039;")
		.replace(/\x05/g, "&nbsp;")
		.replace(/\n/g, "<br>");
}


export function convertCSVToObject(content)
{
	const firstLine = content.split("\n", 1)[0];
	const totalCommas = firstLine.split(",").length - 1;
	const totalSemicolons = firstLine.split(",").length - 1;
	const delimiter = totalCommas > totalSemicolons ? "," : ";";

	const data = [ ];

	const lines = content
		.replace(/\r\n|\r|\n/g, "\n")
		.split("\n");
	const fields = lines[0].split(delimiter);

	for (let line = 1; line < lines.length; line++)
	{
		let lineContent = lines[line];

		if (!lineContent)
			continue;

		lineContent = lineContent.split(delimiter);

		let obj = { };
		for (let field = 0; field < fields.length; field++)
			obj[fields[field]] = lineContent[field];

		data[data.length] = obj;
	}

	return data;
}

export function downloadTmpFile(fileName, data)
{
	const element = document.createElement("a");
	element.setAttribute("href", `data:text/plain;charset=utf-8,${encodeURIComponent(data)}`);
	element.setAttribute("download", fileName);

	element.style.display = "none";
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}