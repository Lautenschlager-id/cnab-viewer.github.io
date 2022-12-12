import { useRef } from "react";

import { convertCSVToObject } from "../../process/helpers";

import CustomTextArea from "../elements/CustomTextArea";
import CustomSelect from "../elements/CustomSelect";
import CustomSelectNumber from "../elements/CustomSelectNumber";

export function CNABField(props)
{
	const nameRef = useRef();
	const typeRef = useRef();
	const lengthRef = useRef();
	const valueRef = useRef();

	return (
		<div
			className="flex"
			id={props.fieldId}
		>
			<div
				className="tiny-info"
				dangerouslySetInnerHTML={{"__html": props.position}}
			/>
			<CustomTextArea
				innerRef={nameRef}
				placeholder="Descrição | Tipo | Tamanho"
				width="120%"
				isCNABField
				srcHandler={props.srcHandler}
				value={props.description}
			/>
			<CustomSelect
				innerRef={typeRef}
				options="String,Number"
				isCNABField
				srcHandler={props.srcHandler}
				value={props.type}
			/>
			<CustomSelectNumber
				innerRef={lengthRef}
				type="number"
				min="1"
				max="999"
				isCNABField
				srcHandler={props.srcHandler}
				value={props.length}
			/>
			<CustomTextArea
				innerRef={valueRef}
				placeholder="*Opcional: Conteúdo"
				width="70%"
				isCNABField
				srcHandler={props.srcHandler}
				value={props.constValue}
			/>
		</div>
	);
}

function validateCSVFields({ description, type, length, content })
{
	return description !== undefined
		&& type !== undefined
		&& length !== undefined
		&& content !== undefined;
}

async function onFileUploaded(fiEvent, cbk)
{
	const uploadedFile = fiEvent.target.files[0] || {};

	if (uploadedFile.type != "text/csv")
		return fiEvent.target.nextElementSibling.innerHTML =
			`* Arquivo com tipo inválido: <i>${uploadedFile.type}</i>. O arquivo deve ser <b>.csv</b>.`;

	const content = convertCSVToObject(await uploadedFile.text());

	if (!content.every(validateCSVFields))
		return fiEvent.target.nextElementSibling.innerHTML = "* Campos faltantes no arquivo <b>.csv</b>. "
			+ "Os seguintes campos são obrigatórios:"
			+ "<br><b>description</b>, <b>type</b>, <b>length</b>, <b>content</b>";

	fiEvent.target.nextElementSibling.innerText = '';
	cbk(content);
}

function onFileDataValidated(data, fcProps, fcSetChildren, fcClearChildren, fcAddChildren)
{
	for (let line = 0; line < data.length; line++)
	{
		let content = data[line];
		content = {
			description: content.description,
			type: content.type,
			length: content.length,
			constValue: content.content
		};

		if (line == 0)
			fcClearChildren(fcSetChildren, fcProps, content);
		else
			fcAddChildren(fcSetChildren, fcProps, content);
	}
}

export const FileInputData = {
	onFileUploaded: onFileUploaded,
	onFileDataValidated: onFileDataValidated,
	fileType: ".csv",
	description: "Carregue um arquivo <i>.csv</i> com as especificações do CNAB com os campos:"
		+ "<br><u>description</u>, <u>type</u>, <u>length</u>, <u>content</u>"
};