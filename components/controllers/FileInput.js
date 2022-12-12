import Container from "../Container";

export default function FileInput(props)
{
	const {
		title,
		description,
		fileType,
		onFileUploaded,
		onFileDataValidated
	} = props.fileInputData;

	return (
		<Container
			class="sub-container-no-margin"
			title={title ?? `Carregar especificações de ${props.title}`}
			description={description}
		>
			<input
				type="file"
				accept={fileType}
				onChange={
					async (event) => await onFileUploaded(event,
						props.onFileDataValidated ?? onFileDataValidated)
				}
			/>
			<div className="invalid-message" />
		</Container>
	);
}
