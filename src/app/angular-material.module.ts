import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  exports: [MatIconModule, MatInputModule, MatTooltipModule],
})
export class AngularMaterialModule {}
