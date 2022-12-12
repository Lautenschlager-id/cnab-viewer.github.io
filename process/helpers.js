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
