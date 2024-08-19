import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { defaultErrorHandler } from 'src/app/shared/defaultErrorHandler';
import { FormComponentType } from 'src/app/shared/entities/form-component.entity';
import { IForm } from 'src/app/shared/entities/form.entity';
import { FormService } from 'src/app/shared/form.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-create-execution',
    templateUrl: './create-execution.component.html',
    styleUrls: ['./create-execution.component.scss']
})
export class CreateExecutionComponent implements OnInit {

    @Input() form: IForm;
    loading = false;
    @Input() values;
    @Input() notes = [];
    @Input() readOnly: boolean = false;
    @Input() showNotes: boolean = false;
    @Input() readOnlyNotes: boolean = false;
    @Input() execId: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private formService: FormService,
        private auth: AuthService
    ) { }

    ngOnInit(): void {
        this.values = this.form.components.map((cp, i) => {
            if (cp.type === FormComponentType.TEXT) {
                return this.values?.[i] || '';
            }
            else if (cp.type === FormComponentType.NUMBER) {
                return this.values?.[i] || 0;
            }
            else if (cp.type === FormComponentType.DATE) {
                return new Date(this.values?.[i] || Date.now());
            }
            else if (cp.type === FormComponentType.CHECKBOX_LIST) {
                return this.values?.[i] ? this.values[i].split(';').map(x => x === 'true') : cp.options.map(() => false);
            }
            else if (cp.type === FormComponentType.RADIO_LIST) {
                return this.values?.[i] || null;
            }

            this.notes[i] = {
                execValueId: this.notes?.[i]?.execValueId,
                value: this.notes?.[i]?.value || ''
            };

            return null;
        });
    }

    submit() {
        console.log(this.values);
        this.loading = true;
        this.auth.getLoggedUser().subscribe(defaultErrorHandler(user => {
            this.formService.execute(this.form.id, user.technician?.id, this.values.map((v, i) => {
                v = Array.isArray(v) ? v.join(';') : v;

                return {
                    formComponentId: this.form.components[i].id,
                    value: v
                }
            })).subscribe(defaultErrorHandler((exec) => {
                this.router.navigate(['/form/view-execution', exec.id]);
                this.loading = false;
            }));
        }));
    }

    submitNotes() {
        this.loading = true;
        let pending = this.notes.filter(n => n.value.trim()).length;

        this.notes.forEach(note => {
            if (!note.value.trim()) {
                return;
            }
            this.formService.setNote(this.execId, note.execValueId, note.value.trim()).subscribe(defaultErrorHandler(() => {
                pending--;
                if (pending === 0) {
                    this.loading = false;
                }
            }));
        });

    }

}
