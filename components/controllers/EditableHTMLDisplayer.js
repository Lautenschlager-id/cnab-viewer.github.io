import FileInput from "./FileInput";

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

async function onFileUploaded(fiEvent, cbk)
{
	const uploadedFile = fiEvent.target.files[0] || {};
	cbk(await uploadedFile.text());
}

function onFileDataValidated(data, props)
{
	const textarea = props.innerRef.current.nextElementSibling;
	textarea.value = data;
	processInput(props, { target: textarea });
}

const FileInputData = {
	onFileUploaded: onFileUploaded,
	onFileDataValidated: onFileDataValidated,
	fileType: ".txt,.rem,.ret",
	title: "Ou",
	description: "Carregue um arquivo CNAB",
};

export default function EditableHTMLDisplayer(props)
{
	return (
		<>
			<p align="right">
				<button
					type="action"
					className="red abs bottom-corner top-left"
					onClick={() => onFileDataValidated("", props)}
				>
					x
				</button>
			</p>
			<div id="tooltip" className="tooltip tooltip-unhover" />
			<div className="container sub-container overlay top-right-corner">
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
					placeholder="Cole seu CNAB aqui"
				/>
			</div>
			<FileInput
				fileInputData={FileInputData}
				onFileDataValidated={(data) => onFileDataValidated(data, props)}
			/>
		</>
	);
}
