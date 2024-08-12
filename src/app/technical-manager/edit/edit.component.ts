import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ICostCenter } from 'src/app/shared/entities/cost-center.entity';
import { ITechnicalManager } from 'src/app/shared/entities/technical-maneger.entity';
import { TechnicianManagerService } from 'src/app/shared/technician-manager.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
    managerForm: FormGroup;
    isEditMode = false;
    managerId: string | null = null;
    selectedCostCenter: ICostCenter = null;
  
    constructor(
      private fb: FormBuilder,
      private technicalManagerService: TechnicianManagerService,
      private route: ActivatedRoute,
      private router: Router,
      private snackBar: MatSnackBar
    ) {
      this.managerForm = this.fb.group({
        name: ['', Validators.required],
        phone: [''],
        document: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
      });
    }
  
    ngOnInit(): void {
      const managerId = this.route.snapshot.paramMap.get('id');
      if (managerId) {
        this.isEditMode = true;
        this.managerId = managerId;
        this.technicalManagerService.getById(managerId).subscribe(manager => {
          this.managerForm.patchValue({
            ...manager,
            email: manager.user?.email,
          });
          this.managerForm.get('password')?.disable();
          this.selectedCostCenter = manager.costCenter;
        });
      }
    }
  
    onSubmit(): void {
      if (this.managerForm.invalid) {
        return;
      }
  
      const manager: ITechnicalManager = this.managerForm.value;
      manager.costCenterId = this.selectedCostCenter.id;
      manager.costCenter = this.selectedCostCenter;
  
      if (this.isEditMode) {
        manager.id = this.managerId!;
        this.technicalManagerService.update(manager).subscribe(() => {
          this.snackBar.open('Gerente Técnico atualizado com sucesso', 'Fechar', {
            duration: 3000
          });
          this.router.navigate(['/technical-manager']);
        });
      } else {
        this.technicalManagerService.create(manager).subscribe(() => {
          this.snackBar.open('Gerente Técnico criado com sucesso', 'Fechar', {
            duration: 3000
          });
          this.router.navigate(['/technical-manager']);
        });
      }
    }
}
