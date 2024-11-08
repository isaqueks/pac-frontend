import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { defaultErrorHandler } from 'src/app/shared/defaultErrorHandler';
import { FormComponentType } from 'src/app/shared/entities/form-component.entity';
import { IForm } from 'src/app/shared/entities/form.entity';
import { ITechnicalManager } from 'src/app/shared/entities/technical-maneger.entity';
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
    @Input() justifications = [];
    @Input() notes = [];
    @Input() readOnly: boolean = false;
    @Input() showNotes: boolean = false;
    @Input() readOnlyNotes: boolean = false;
    @Input() execId: string;

    initialNotes = [];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private formService: FormService,
        private auth: AuthService
    ) { }

    ngOnInit(): void {
        console.log(this.notes)

        const notes = [];

        this.values = this.form.components.map((cp, i) => {

            const index = this.notes.findIndex(n => n.componentId === cp.id);

            notes[i] = {
                execValueId: this.notes?.[index]?.execValueId,
                value: this.notes?.[index]?.value || '',
                techManager: this.notes?.[index]?.techManager,
                accordingly: this.notes?.[index]?.accordingly,
                componentId: this.notes?.[index]?.componentId,
            };

            this.justifications[i] = this.justifications?.[i] || '';

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
            else if (cp.type === FormComponentType.UPLOAD) {
                return (this.values?.[i] || '').split(';').filter(x => x).map(f => {
                    return {
                        name: f.split('/').pop(),
                        url: f
                    }
                })
            }

            return null;
        });

        this.notes = notes;

        this.initialNotes = structuredClone(this.notes);
    }

    notesChanged() {
        return !this.notes.every((note, i) => note.value === this.initialNotes[i].value && note.accordingly == this.initialNotes[i].accordingly);
    }

    submit() {
        console.log(this.values);
        this.loading = true;

        this.auth.getLoggedUser().subscribe(defaultErrorHandler(async user => {

            const values = await Promise.all(this.values.map(async (v, i) => {

                if (this.form.components[i].required && (!v || v.length === 0)) {
                    this.loading = false;
                    Swal.fire('Erro', 'Preencha todos os campos obrigatórios', 'error');
                    throw new Error('Preencha todos os campos obrigatórios');
                }

                if (this.form.components[i].insertJustification && !this.justifications[i]) {
                    this.loading = false;
                    Swal.fire('Erro', 'Justifique todos os campos obrigatórios', 'error');
                    throw new Error('Justifique todos os campos obrigatórios');
                }

                if (v instanceof FileList) {
                    v = await Promise.all(Array.from(v).map(file => {
                        return this.formService.uploadFile(this.form.id, file).toPromise()
                    }))
                }

                v = Array.isArray(v) ? v.join(';') : v;

                return {
                    formComponentId: this.form.components[i].id,
                    justification: this.justifications[i],
                    value: v
                }
            }));

            this.formService.execute(this.form.id, user.technician?.id, values).subscribe(defaultErrorHandler((exec) => {
                this.router.navigate(['/form/view-execution', exec.id]);
                this.loading = false;
            }));
        }));
    }

    submitNotes() {
        this.loading = true;
        let pending = this.notes.filter(n => (n.value||'').trim()).length;

        this.notes.forEach(note => {
            if (!(note.value||'').trim()) {
                return;
            }
            this.formService.setNote(this.execId, note.execValueId, (note.value||'').trim(), note.accordingly).subscribe(defaultErrorHandler(() => {
                pending--;
                if (pending === 0) {
                    this.loading = false;
                    this.router.navigate(['/form']);
                }
            }));
        });

    }


    download(url) {
        // download with fetch
                fetch(url).then(res => res.blob()).then(blob => {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = url.split('/').pop();
            a.click();
        });
    }

}
