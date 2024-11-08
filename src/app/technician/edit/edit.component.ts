import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/shared/client.service';
import { CostCenterService } from 'src/app/shared/cost-center.service';
import { defaultErrorHandler } from 'src/app/shared/defaultErrorHandler';
import { IClient } from 'src/app/shared/entities/client.entity';
import { ICostCenter } from 'src/app/shared/entities/cost-center.entity';
import { ITechnician } from 'src/app/shared/entities/techician.entity';
import { IUser } from 'src/app/shared/entities/user.entity';
import { TechnicianService } from 'src/app/shared/technician.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
    technicianForm: FormGroup;
  isEditMode = false;
  technicianId: string | null = null;
  selectedCostCenter: ICostCenter = null;

  constructor(
    private fb: FormBuilder,
    private technicianService: TechnicianService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.technicianForm = this.fb.group({
      name: ['', Validators.required],
      phone: [''],
      document: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {

    const technicianId = this.route.snapshot.paramMap.get('id');
    if (technicianId) {
      this.isEditMode = true;
      this.technicianId = technicianId;
      this.technicianService.getById(technicianId).subscribe(defaultErrorHandler(technician => {
        this.technicianForm.patchValue({
            ...technician,
            email: technician.user?.email,
        });
        this.technicianForm.get('password').clearValidators();
        this.technicianForm.get('password').updateValueAndValidity();
        this.selectedCostCenter = technician.costCenter;
      }));
    }
  }

  onSubmit(): void {
    if (this.technicianForm.invalid) {
      return;
    }

    const technician: ITechnician = this.technicianForm.value;
    technician.costCenterId = this.selectedCostCenter.id;
    technician.costCenter = this.selectedCostCenter;

    if (this.isEditMode) {
      technician.id = this.technicianId!;
      technician['password'] = technician['password'] || undefined;
      this.technicianService.update(technician).subscribe(defaultErrorHandler(() => {
        this.snackBar.open('Técnico atualizado com sucesso', 'Fechar', {
          duration: 3000
        });
        this.router.navigate(['/technician']);
      }));
    } else {
      this.technicianService.create(technician).subscribe(defaultErrorHandler(() => {
        this.snackBar.open('Técnico criado com sucesso', 'Fechar', {
          duration: 3000
        });
        this.router.navigate(['/technician']);
      }));
    }
  }
}
