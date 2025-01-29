import { type ColDef } from '@ag-grid-community/core';

import { GridViewRowData } from './models';
import {
	currencyPairValueGetter,
	lastUpdatedValueFormatter,
	priceValueFormatter,
} from './utils';

export const gridViewColDefs: ColDef<GridViewRowData>[] = [
	{
		colId: 'currencyPair',
		headerName: 'Currency Pair',
		flex: 1,
		valueGetter: currencyPairValueGetter,
	},
	{
		field: 'bidPrice',
		flex: 1,
		valueFormatter: priceValueFormatter,
	},
	{ field: 'askPrice', flex: 1, valueFormatter: priceValueFormatter },
	{
		field: 'lastUpdated',
		flex: 1,
		valueFormatter: lastUpdatedValueFormatter,
	},
];
