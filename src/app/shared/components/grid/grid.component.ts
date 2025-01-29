import { Component, effect, input } from '@angular/core';
import { AgGridAngular } from '@ag-grid-community/angular';
import {
	type ColDef,
	ModuleRegistry,
	type Module,
} from '@ag-grid-community/core';
import { themeAlpine } from '@ag-grid-community/theming';

@Component({
	selector: 'app-grid',
	standalone: true,
	imports: [AgGridAngular],
	templateUrl: './grid.component.html',
	styleUrl: './grid.component.scss',
})
export class GridComponent<TRowData = unknown> {
	colDefs = input.required<ColDef<TRowData>[]>();

	rowData = input<TRowData[]>([]);
	modules = input<Module[]>([]);

	protected readonly theme = themeAlpine;

	constructor() {
		effect(() => {
			const modules = this.modules();

			ModuleRegistry.registerModules(modules);
		});
	}
}
