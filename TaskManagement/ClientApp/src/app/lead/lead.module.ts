import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LeadComponent } from './lead.component';
import { LeadService } from './lead.service';
import { AddEditLeadComponent } from './add-edit-lead/add-edit-lead.component';

export const routes = [
  { path: '', component: LeadComponent, pathMatch: 'full', data: { title: 'Manage Lead' } },
  { path: 'add/:id', component: AddEditLeadComponent, pathMatch: 'full', data: { title: 'Invoice Information' } }
];

@NgModule({
  imports: [
    CommonModule,
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
