import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [RegisterComponent],
  imports: [CommonModule, RegisterRoutingModule, MatButtonModule],
})
export class RegisterModule {}
