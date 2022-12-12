import { useRef } from "react";

import Container from "../components/controllers/Container";
import FieldController from "../components/controllers/FieldController";
import CNABField from "../components/controllers/CNABField";
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

	return (
		<>
			<Container
				title="CNAB Viewer"
				description="Visualize e valide os campos inseridos com base no input do arquivo"
			>
				<FieldController
					title="Campos - Header"
					field={CNABField}
					innerRef={inputHeaderRef}
					srcHandler={renderCbk}
				/>

				<FieldController
					title="Campos - Conteúdo"
					field={CNABField}
					innerRef={inputContentRef}
					srcHandler={renderCbk}
				/>

				<FieldController
					title="Campos - Trailer"
					field={CNABField}
					innerRef={inputTrailerRef}
					srcHandler={renderCbk}
				/>

				<EditableHTMLDisplayer
					innerRef={inputRef}
					srcHandler={renderCbk}
				/>
			</Container>
		</>
	)
}
