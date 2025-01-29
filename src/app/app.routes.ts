import { Route, Routes } from '@angular/router';

export const cardRoutePath = 'card';
export const cardRoute: Route = {
	path: cardRoutePath,
	title: 'Card',
	loadComponent: () =>
		import('./features/card-view/card-view.component').then(
			(m) => m.CardViewComponent,
		),
};

export const gridRoutePath = 'grid';
export const gridRoute: Route = {
	path: gridRoutePath,
	title: 'Grid',
	loadComponent: () =>
		import('./features/grid-view/grid-view.component').then(
			(m) => m.GridViewComponent,
		),
};

export const routes: Routes = [
	{ path: '', redirectTo: 'card', pathMatch: 'full' },
	cardRoute,
	gridRoute,
	{
		path: '**',
		loadComponent: () =>
			import(
				'./shared/components/page-not-found/page-not-found.component'
			).then((m) => m.PageNotFoundComponent),
	},
];
