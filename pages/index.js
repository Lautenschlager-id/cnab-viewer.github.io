import { useRef } from "react";

import Container from "../components/controllers/Container";
import FieldController from "../components/controllers/FieldController";
import CNABField from "../components/controllers/CNABField";
import EditableHTMLDisplayer from "../components/controllers/EditableHTMLDisplayer";

export default function Index()
{
	const inputRef = useRef();

	const inputHeaderRef = useRef();
	const inputContentRef = useRef();
	const inputTrailerRef = useRef();

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
				/>

				<FieldController
					title="Campos - Conteúdo"
					field={CNABField}
					innerRef={inputContentRef}
				/>

				<FieldController
					title="Campos - Trailer"
					field={CNABField}
					innerRef={inputTrailerRef}
				/>

				<EditableHTMLDisplayer
					innerRef={inputRef}
				/>
			</Container>
		</>
	)
}
