export default function Container(props)
{
	return (
		<div className={`container ${props.class ?? ''}`}>
			<label className="title">{props.title}</label>
			<label className="description" dangerouslySetInnerHTML={{"__html": props.description}} />
			<br />
			{props.children}
		</div>
	);
}
