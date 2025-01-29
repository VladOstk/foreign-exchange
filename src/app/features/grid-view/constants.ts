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
	{ field: 'lastUpdated', flex: 1 },
];
