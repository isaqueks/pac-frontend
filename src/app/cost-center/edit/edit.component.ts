import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/shared/client.service';
import { CostCenterService } from 'src/app/shared/cost-center.service';
import { IClient } from 'src/app/shared/entities/client.entity';
import { ICostCenter } from 'src/app/shared/entities/cost-center.entity';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
    costCenterForm: FormGroup;
  isEditMode = false;

  selectedClient: IClient;

  private editId: string;

  constructor(
    private fb: FormBuilder,
    private costCenterService: CostCenterService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.costCenterForm = this.fb.group({
      companyName: ['', Validators.required],
      businessName: [''],
      cnpj: ['', Validators.required],
      addressZipCode: [''],
      addressStreet: [''],
      addressNumber: [null],
      addressComplement: [''],
      addressDistrict: [''],
      addressCity: [''],
      addressState: [''],
      email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    const costCenterId = this.route.snapshot.paramMap.get('id');
    if (costCenterId) {
      this.isEditMode = true;
        this.editId = costCenterId;
      this.costCenterService.getById(costCenterId).subscribe(costCenter => {
        this.costCenterForm.patchValue({
            ...costCenter,
            email: costCenter.user?.email
        });
        this.selectedClient = costCenter.client;
        this.costCenterForm.get('password').clearValidators();
        this.costCenterForm.get('password').updateValueAndValidity();
      });
    }
    else {
        this.editId = null;
    }
  }

  onSubmit(): void {
    if (this.costCenterForm.invalid) {
      return;
    }

    const costCenter: ICostCenter = this.costCenterForm.value;
    costCenter.clientId = this.selectedClient.id;
    costCenter.client = this.selectedClient;
    costCenter.id = this.editId;

    if (this.isEditMode) {
      costCenter['password'] = costCenter['password'] || undefined;
      this.costCenterService.update(costCenter).subscribe(() => {
        this.snackBar.open('Centro de Custo atualizado com sucesso', 'Fechar', {
          duration: 3000
        });
        this.router.navigate(['/cost-center']);
      });
    } else {
      this.costCenterService.create(costCenter).subscribe(() => {
        this.snackBar.open('Centro de Custo criado com sucesso', 'Fechar', {
          duration: 3000
        });
        this.router.navigate(['/cost-center']);
      });
    }
  }
}
