import { Component, inject } from '@angular/core';
import { type Module } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

import { GridComponent } from '../../shared/components/grid/grid.component';

import { GridViewService } from './grid-view.service';
import { gridViewColDefs } from './constants';

@Component({
	selector: 'app-grid-view',
	standalone: true,
	imports: [GridComponent],
	templateUrl: './grid-view.component.html',
	styleUrl: './grid-view.component.scss',
})
export class GridViewComponent {
	protected readonly gridViewColDefs = gridViewColDefs;

	protected gridViewService = inject(GridViewService);

	protected modules: Module[] = [ClientSideRowModelModule];
}
