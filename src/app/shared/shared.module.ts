import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';

import { NavbarComponent } from './navbar/navbar.component';
import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
  declarations: [NavbarComponent, TruncatePipe, LoaderComponent],
  imports: [CommonModule, RouterModule],
  exports: [NavbarComponent, TruncatePipe, LoaderComponent],
})
export class SharedModule {}
