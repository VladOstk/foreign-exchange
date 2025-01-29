import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { LinkButtonGroupItem } from './models';

@Component({
	selector: 'app-link-button-group',
	imports: [
		MatButtonModule,
		MatButtonToggleModule,
		RouterLink,
		RouterLinkActive,
	],
	standalone: true,
	templateUrl: './link-button-group.component.html',
	styleUrl: './link-button-group.component.scss',
})
export class LinkButtonGroupComponent {
	disableRipple = input<boolean>(false);

	items = input.required<LinkButtonGroupItem[]>();
}
