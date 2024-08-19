import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/shared/client.service';
import { defaultErrorHandler } from 'src/app/shared/defaultErrorHandler';
import { IClient } from 'src/app/shared/entities/client.entity';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
    clientForm: FormGroup;
    isEditMode: boolean = false;
    clientId: string | null = null;
  
    constructor(
      private fb: FormBuilder,
      private clientService: ClientService,
      private router: Router,
      private route: ActivatedRoute
    ) {
      this.clientForm = this.fb.group({
        companyName: ['', Validators.required],
        businessName: [''],
        cnpj: ['', Validators.required],
        addressZipCode: [''],
        addressStreet: [''],
        addressNumber: [''],
        addressComplement: [''],
        addressDistrict: [''],
        addressCity: [''],
        addressState: [''],
        email: ['', Validators.email],
        password: ['', Validators.minLength(6)]
      });
    }
  
    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        if (id) {
          this.isEditMode = true;
          this.clientId = id;
          this.clientService.getById(id).subscribe(defaultErrorHandler(client => {
            this.clientForm.patchValue({
                ...client,
                email: client.user?.email
            });
            this.clientForm.get('password')?.disable();
          }));
        }
      });
    }
  
    onSubmit(): void {
      if (this.clientForm.valid) {
        const client: IClient = this.clientForm.value;
        if (this.isEditMode) {
          client.id = this.clientId!;
          this.clientService.update(client).subscribe(defaultErrorHandler(() => {
            this.router.navigate(['/client']);
          }));
        } else {
          this.clientService.create(client).subscribe(defaultErrorHandler(() => {
            this.router.navigate(['/client']);
          }));
        }
      }
    }
}
