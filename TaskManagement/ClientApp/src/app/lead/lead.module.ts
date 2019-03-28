import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LeadComponent } from './lead.component';
import { LeadService } from './lead.service';
import { AddEditLeadComponent } from './add-edit-lead/add-edit-lead.component';
import { FormsModule } from '@angular/forms';

export const routes = [
  { path: '', component: LeadComponent, pathMatch: 'full', data: { title: 'Manage Lead' } },
  { path: 'add', component: AddEditLeadComponent, data: { title: 'Add' } },
  { path: 'add/:id', component: AddEditLeadComponent, data: { title: 'Edit' } }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    LeadComponent,
    AddEditLeadComponent
  ],
  providers: [
    LeadService,
  ],
  exports: [
    //LoaderComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LeadModule {
  static routes = routes;
}
