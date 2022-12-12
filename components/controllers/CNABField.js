import { useRef } from "react";

import CustomTextArea from "../elements/CustomTextArea";
import CustomSelect from "../elements/CustomSelect";
import CustomSelectNumber from "../elements/CustomSelectNumber";

export default function CNABField(props)
{
	const nameRef = useRef();
	const typeRef = useRef();
	const lengthRef = useRef();
	const valueRef = useRef();

	return (
		<div
			className="flex"
		>
			<CustomTextArea
				innerRef={nameRef}
				placeholder="Descrição | Tipo | Tamanho"
				width="120%"
				isCNABField
				srcHandler={props.srcHandler}
			/>
			<CustomSelect
				innerRef={typeRef}
				options="String,Number"
				isCNABField
				srcHandler={props.srcHandler}
			/>
			<CustomSelectNumber
				innerRef={lengthRef}
				type="number"
				min="1"
				max="999"
				isCNABField
				srcHandler={props.srcHandler}
			/>
			<CustomTextArea
				innerRef={valueRef}
				placeholder="*Opcional: Conteúdo"
				width="70%"
				isCNABField
				srcHandler={props.srcHandler}
			/>
		</div>
	);
}