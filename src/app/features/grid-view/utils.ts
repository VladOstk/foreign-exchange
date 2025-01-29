import { ValueFormatterFunc, ValueGetterFunc } from '@ag-grid-community/core';
import { GridViewRowData } from './models';

export const priceFormatter = (price: string) => {
	return parseFloat(price).toFixed(6);
};

export const priceValueFormatter: ValueFormatterFunc = (params) =>
	priceFormatter(params.value);

export const currencyPairValueGetter: ValueGetterFunc = (params) => {
	const fromCode = params.data?.fromCurrencyCode ?? '';
	const toCode = params.data?.toCurrencyCode ?? '';

	return fromCode + toCode;
};

export const lastUpdatedValueFormatter: ValueFormatterFunc<
	GridViewRowData,
	string
> = (params) => {
	const paramsValue = params.value;

	if (typeof paramsValue !== 'string') {
		return '';
	}

	return new Intl.DateTimeFormat('en-US', {
		month: '2-digit',
		day: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: true,
	}).format(new Date(paramsValue));
};
