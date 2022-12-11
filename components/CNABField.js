export default function CNABField(props)
{
	return (
		<div
			className="flex"
		>
			<textarea />
			<select>
				<option>str</option>
				<option>int</option>
			</select>
			<input type="number" />
			<textarea />
		</div>
	);
}