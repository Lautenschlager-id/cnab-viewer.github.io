import { useRef } from "react";

import CustomTextArea from "../elements/CustomTextArea";
import CustomSelect from "../elements/CustomSelect";


export default function CNABField(props)
{
	const nameRef = useRef();
	const typeRef = useRef();
	const valueRef = useRef();

	return (
		<div
			className="flex"
		>
			<CustomTextArea
				innerRef={nameRef}
				placeholder="Descrição | Tipo | Tamanho"
				width="120%"
			/>
			<CustomSelect
				innerRef={typeRef}
				options="String,Number"
			/>
			<input type="number" />
			<CustomTextArea
				innerRef={valueRef}
				placeholder="*Opcional: Conteúdo"
				width="70%"
			/>
		</div>
	);
}