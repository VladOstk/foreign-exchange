import { type ColDef } from '@ag-grid-community/core';

import { GridViewRowData } from './models';

export const gridViewColDefs: ColDef<GridViewRowData>[] = [
	{
		colId: 'currencyPair',
		headerName: 'Currency Pair',
		flex: 1,
		valueGetter: (params) => {
			const fromCode = params.data?.fromCurrencyCode ?? '';
			const toCode = params.data?.toCurrencyCode ?? '';

			return fromCode + toCode;
		},
	},
	{ field: 'bidPrice', flex: 1 },
	{ field: 'askPrice', flex: 1 },
	{
		field: 'lastUpdated',
		flex: 1,
		valueFormatter: (params) => {
			return new Intl.DateTimeFormat('en-US', {
				month: '2-digit',
				day: '2-digit',
				year: 'numeric',
				hour: '2-digit',
				minute: '2-digit',
				hour12: true,
			}).format(new Date(params.value));
		},
	},
];
