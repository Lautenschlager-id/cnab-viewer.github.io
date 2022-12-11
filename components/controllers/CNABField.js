import { useRef } from "react";

import CustomTextArea from "../elements/CustomTextArea";

export default function CNABField(props)
{
	const nameRef = useRef();
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
			<select>
				<option>str</option>
				<option>int</option>
			</select>
			<input type="number" />
			<CustomTextArea
				innerRef={valueRef}
				placeholder="*Opcional: Conteúdo"
				width="70%"
			/>
		</div>
	);
}