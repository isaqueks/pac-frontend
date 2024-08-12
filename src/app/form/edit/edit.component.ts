import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ICostCenter } from 'src/app/shared/entities/cost-center.entity';
import { IFormComponent, FormComponentType } from 'src/app/shared/entities/form-component.entity';
import { IForm } from 'src/app/shared/entities/form.entity';
import { FormService } from 'src/app/shared/form.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
    form: IForm = {
        id: '',
        title: '',
        costCenterId: '',
        costCenter: null,
        components: []
      };
      formComponents: IFormComponent[] = [];
      formComponentTypes = Object.values(FormComponentType);
      selectedCostCenter: ICostCenter = null;
      isEditMode = false;
    
      constructor(
        private formService: FormService,
        private route: ActivatedRoute,
        private router: Router,
        private snackBar: MatSnackBar
      ) {}
    
      ngOnInit(): void {
        const formId = this.route.snapshot.paramMap.get('id');
        if (formId) {
          this.isEditMode = true;
          this.formService.getById(formId).subscribe((form: IForm) => {
            this.form = form;
            this.selectedCostCenter = form.costCenter;
            this.formComponents = [...form.components]; // Assume que `components` faz parte do objeto `IForm`
          });
        }
      }
    
      addFormComponent(): void {
        this.formComponents.push({
          id: '',
          title: '',
          subtitle: '',
          type: FormComponentType.TEXT,
          required: false,
          formId: this.form.id,
          form: this.form
        });
      }
    
      removeFormComponent(index: number): void {
        this.formComponents.splice(index, 1);
      }
    
      saveForm(): void {
        this.form.costCenterId = this.selectedCostCenter.id;
        this.form.costCenter = this.selectedCostCenter;
    
        if (this.isEditMode) {
          this.formService.update({ ...this.form, components: this.formComponents }).subscribe(() => {
            this.snackBar.open('Formulário atualizado com sucesso', 'Fechar', { duration: 3000 });
            this.router.navigate(['/forms']);
          });
        } else {
          this.formService.create({ ...this.form, components: this.formComponents }).subscribe(() => {
            this.snackBar.open('Formulário criado com sucesso', 'Fechar', { duration: 3000 });
            this.router.navigate(['/forms']);
          });
        }
      }
}
