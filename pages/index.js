import { useRef } from "react";

import Container from "../components/Container";
import FieldController from "../components/controllers/FieldController";
import { CNABField, FileInputData } from "../components/controllers/CNABField";
import EditableHTMLDisplayer from "../components/controllers/EditableHTMLDisplayer";

import CNABHandler from "../process/CNABHandler";

export default function Index()
{
	const inputRef = useRef();

	const inputHeaderRef = useRef();
	const inputContentRef = useRef();
	const inputTrailerRef = useRef();

	const cnab = new CNABHandler(inputRef, inputHeaderRef, inputContentRef, inputTrailerRef);

	const renderCbk = cnab.process.bind(cnab);
	const downloadData = cnab.retrieve.bind(cnab);

	return (
		<>
			<Container
				title="CNAB Viewer"
				description="Visualize e valide os campos inseridos com base no input do arquivo"
			>
				<button onClick={downloadData}>
					Exportar
				</button>

				<FieldController
					title="Campos - Header"
					field={CNABField}
					innerRef={inputHeaderRef}
					srcHandler={renderCbk}
					fileInputData={FileInputData}
					fieldPrefix="h"
				/>
				<FieldController
					title="Campos - Conteúdo"
					field={CNABField}
					innerRef={inputContentRef}
					srcHandler={renderCbk}
					fileInputData={FileInputData}
					fieldPrefix="c"
				/>
				<FieldController
					title="Campos - Trailer"
					field={CNABField}
					innerRef={inputTrailerRef}
					srcHandler={renderCbk}
					fileInputData={FileInputData}
					fieldPrefix="t"
				/>

				<EditableHTMLDisplayer
					innerRef={inputRef}
					srcHandler={renderCbk}
				/>
			</Container>
		</>
	)
}