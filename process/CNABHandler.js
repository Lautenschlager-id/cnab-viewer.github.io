import {
	tokenizeUnsafeHTML, escapeTokenizedHTML, tokens
} from "../process/helpers";

class CNABHandler
{
	get cnabContent() { return this._cnabContent.current; }
	set cnabContent(value) { this._cnabContent = value; }

	get headerFields() { return this._headerFields.current; }
	set headerFields(value) { this._headerFields = value; }

	get contentFields() { return this._contentFields.current; }
	set contentFields(value) { this._contentFields = value; }

	get trailerFields() { return this._trailerFields.current; }
	set trailerFields(value) { this._trailerFields = value; }

	constructor(cnabContent, headerFields, contentFields, trailerFields)
	{
		this.cnabContent = cnabContent;

		this.headerFields = headerFields;
		this.contentFields = contentFields;
		this.trailerFields = trailerFields;

		// Cache
		this.retrievedHeaderData = null;
		this.retrievedContentData = null;
		this.retrievedTrailerData = null;

		this.cnabRawContent = null;
		this.cnabLines = null;
	}

	splitCNAB()
	{
		const splitContent = this.cnabRawContent.split("\n");

		return {
			header: [ splitContent.shift() ],
			trailer: [ splitContent.pop() ],
			content: splitContent,
		}
	}

	rebuildCNAB(header, content, trailer)
	{
		header = header[0] ? (header[0] + (content.length > 0 ? "\n" : '')) : '';
		content = content.join("\n");
		trailer = trailer[0] ? `\n${trailer[0]}` : '';

		return escapeTokenizedHTML(`${header}${content}${trailer}`);
	}

	retrieveFieldsData(source)
	{
		const rawFields = source.getElementsByClassName("field");

		const fields = [];
		for (let field = 0; field < rawFields.length; field += 4)
		{
			let newField = fields[fields.length] = {
				name: rawFields[field].value,
				type: rawFields[field + 1].value,
				length: rawFields[field + 2].value * 1,
				value: rawFields[field + 3].value,
			}

			newField.escapedName = tokenizeUnsafeHTML(newField.name);
			newField.escapedValue = tokenizeUnsafeHTML(newField.value);
		}

		return fields;
	}

	highlight(highlight, option, index, chunkValidation, idPrefix)
	{
		return `<div class="highlight ">${highlight}</div>`;
	}

	formatValueByType(chunk, option)
	{
		if (option.value)
		{
			switch(option.type)
			{
				case "string":
					option.escapedValue = option.escapedValue.padEnd(option.length, tokens[" "]);
					break;
				case "number":
					option.escapedValue = option.escapedValue.padStart(option.length, "0");
					if (!/^\d+$/.test(option.escapedValue))
						throw "Valor constante deveria ser um número, mas recebeu uma string";
					break;
			}

			if (option.escapedValue.length != option.length)
				throw `Tamanho do valor constante '${option.escapedValue.length}' não bate com o tamanho '${option.length}' especificado`;
		}
		else
		{
			if (option.type == "number")
				if (!/^\d+$/.test(chunk))
					throw "Valor deveria ser um número, mas recebeu uma string";
		}

		return chunk;
	}

	validateChunk(chunk, option)
	{
		try
		{
			chunk = this.formatValueByType(chunk, option);
		}
		catch (exception)
		{
			return {
				isValid: false,
				error: exception,
			};
		}

		const {
			escapedValue: optEscapedValue,
			length: optLength
		} = option;
		let isValid;

		if (optEscapedValue)
		{
			isValid = optEscapedValue.toUpperCase() === chunk.toUpperCase();
			return {
				isValid: isValid,
				error: (
					!isValid ? `Recebeu valor '${chunk}', mas esperava '${optEscapedValue}'`
					: undefined
				),
			}
		}

		isValid = optLength == chunk.length;
		return {
			isValid: isValid,
			error: (
				!isValid ? `Valor tem tamanho '${chunk.length}', mas esperava '${optLength}'`
				: undefined
			),
		};
	}

	processChunk(chunk, options, idPrefix)
	{
		const newChunk = [];

		let stopProcessing = false;

		for (let line = 0; line < chunk.length; line++)
		{
			let lineContent = chunk[line],
				lineIndex = 0;

			newChunk[line] = lineContent;
			if (!lineContent || lineContent.length == 0 || stopProcessing)
				continue;

			let chunkValidation;
			for (let optionIndex = 0; optionIndex < options.length; optionIndex++)
			{
				let option = options[optionIndex],
					nextLineIndex = lineIndex + option.length;

				let prefix = lineContent.slice(0, lineIndex),
					highlight = lineContent.slice(lineIndex, nextLineIndex),
					suffix = lineContent.slice(nextLineIndex);

				chunkValidation = this.validateChunk(highlight, option);

				let lengthBeforeHighlight = highlight.length;
				highlight = this.highlight(highlight, option, optionIndex + 1, chunkValidation,
					idPrefix);
				lineIndex = nextLineIndex + (highlight.length - lengthBeforeHighlight);

				lineContent = `${prefix}${highlight}${suffix}`;

				if (chunkValidation.error)
					break;
			}

			newChunk[line] = lineContent;

			if (chunkValidation.error)
				stopProcessing = true;
		}

		return newChunk;
	}

	process(_, textareaContent)
	{
		if (textareaContent !== undefined)
		{
			this.cnabRawContent = tokenizeUnsafeHTML(textareaContent);
			this.cnabLines = this.splitCNAB();
		}
		else
		{
			this.retrievedHeaderData = this.retrieveFieldsData(this.headerFields);
			this.retrievedContentData = this.retrieveFieldsData(this.contentFields);
			this.retrievedTrailerData = this.retrieveFieldsData(this.trailerFields);
		}

		if (!(this.cnabLines && this.retrievedHeaderData))
			return;

		const header = this.processChunk(this.cnabLines.header, this.retrievedHeaderData, "h");
		const content = this.processChunk(this.cnabLines.content, this.retrievedContentData, "c");
		const trailer = this.processChunk(this.cnabLines.trailer, this.retrievedTrailerData, "t");

		this.cnabContent.innerHTML = this.rebuildCNAB(header, content, trailer);
	}
}

export default CNABHandler;
