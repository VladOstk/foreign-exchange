import { Component, input, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { ButtonGroupItem } from './models';

@Component({
	selector: 'app-button-group',
	imports: [MatButtonModule, MatButtonToggleModule],
	standalone: true,
	templateUrl: './button-group.component.html',
	styleUrl: './button-group.component.scss',
})
export class ButtonGroupComponent {
	disableRipple = input<boolean>(false);

	items = input.required<ButtonGroupItem[]>();

	activeItem = output<ButtonGroupItem>();

	protected currentActiveItem = signal('');

	protected onButtonClick(item: ButtonGroupItem) {
		this.currentActiveItem.set(item.id);
		this.activeItem.emit(item);
	}
}
