import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
  declarations: [NavbarComponent, TruncatePipe],
  imports: [CommonModule, RouterModule],
  exports: [NavbarComponent, TruncatePipe],
})
export class SharedModule {}
