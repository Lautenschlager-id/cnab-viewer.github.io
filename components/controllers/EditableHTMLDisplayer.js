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

function processInput(props, element)
{
	element = element.target;

	element.value = element.value
		.replace(/\t/g, "    ")
		.replace(/\r\n|\n|\r/g, "\n")
		.replace(/^\n+/g, "");

	expandTextAreaHeight(element);

	element.parentElement.previousElementSibling
		.classList.replace("tooltip-hover", "tooltip-unhover");

	// Updates text and adds highlighting
	props.srcHandler(null, element.value);
}

export default function EditableHTMLDisplayer(props)
{
	return (
		<>
			<div id="tooltip" className="tooltip tooltip-unhover" />
			<div className="container sub-container overlay">
				<div
					ref={props.innerRef}
					className="displayer"
					onScroll={shareScrollState}
				/>
				<textarea
					className="editable"
					spellCheck="false"
					onInput={(element) => processInput(props, element)}
					onScroll={shareScrollState}
					placeholder="Cole seu CNAB here"
				/>
			</div>
		</>
	);
}