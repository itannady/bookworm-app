import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { LoaderComponent } from './loader/loader.component';

import { NavbarComponent } from './navbar/navbar.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { ProgressBarComponent } from './progress/progress-bar/progress-bar.component';
import { ProgressModalComponent } from './progress/progress-modal/progress-modal.component';

@NgModule({
  declarations: [
    NavbarComponent,
    TruncatePipe,
    LoaderComponent,
    ProgressBarComponent,
    ProgressModalComponent,
    FooterComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule, MatIconModule],
  exports: [
    NavbarComponent,
    TruncatePipe,
    LoaderComponent,
    ProgressBarComponent,
    ProgressModalComponent,
    FooterComponent,
  ],
})
export class SharedModule {}
