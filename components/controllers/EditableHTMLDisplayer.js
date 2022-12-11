function expandTextAreaHeight(element)
{
	element.style.height = "auto";
	element.style.height = `${element.scrollHeight}px`;
}

function shareScrollState(element)
{
	element = element.target;

	const sibling = (element.nextElementSibling ?? element.previousElementSibling);
	sibling.scrollLeft = element.scrollLeft;
	sibling.scrollTop = element.scrollTop;
}

function processInput(element)
{
	element = element.target;

	element.value = element.value
		.replace(/\t/g, "    ")
		.replace(/\r\n|\n|\r/g, "\n")
		.replace(/^\n+/g, "");

	element.previousElementSibling.innerHTML = element.value
		.replace(/\t/g, "&nbsp;")
		.replace(/\n/g, "<br>");
}

export default function EditableHTMLDisplayer(props)
{
	return (
		<div className="container sub-container overlay">
			<div
				ref={props.innerRef}
				className="displayer"
				onScroll={shareScrollState}
			/>
			<textarea
				className="editable"
				spellCheck="false"
				onScroll={shareScrollState}
				placeholder="Cole seu CNAB here"
					onInput={(element) => processInput(element)}
			/>
		</div>
	);
}