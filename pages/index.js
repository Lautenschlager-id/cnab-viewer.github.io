import { useRef } from "react";

import Container from "../components/Container";
import FieldController from "../components/FieldController";

export default function Index()
{
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
					field={Container} // Mock
					innerRef={inputHeaderRef}
				/>

				<FieldController
					title="Campos - Conteúdo"
					field={Container} // Mock
					innerRef={inputContentRef}
				/>

				<FieldController
					title="Campos - Trailer"
					field={Container} // Mock
					innerRef={inputTrailerRef}
				/>
			</Container>
		</>
	)
}
