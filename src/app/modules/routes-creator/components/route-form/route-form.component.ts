import {
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Optional,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouteDialogResult } from 'src/app/models/route-dialog-result.enum';
import { IRoute } from 'src/app/models/route.model';

@Component({
  selector: 'app-route-form',
  templateUrl: './route-form.component.html',
  styleUrls: ['./route-form.component.scss'],
})
export class RouteFormComponent implements OnInit {
  @Output() submit = new EventEmitter<IRoute>();
  destination: 'create' | 'edit' = 'create';
  routeForm!: FormGroup;
  masks = [
    '0.0.0.0',
    '255.0.0.0',
    '255.255.0.0',
    '255.255.255.0',
    '255.255.255.255',
  ];
  interfaces = ['ISP', 'Guest', 'Home', 'VPN'];

  get addressControl() {
    return this.routeForm?.controls.address;
  }

  get maskControl() {
    return this.routeForm?.controls.mask;
  }

  get gatewayControl() {
    return this.routeForm?.controls.gateway;
  }

  get interfaceControl() {
    return this.routeForm?.controls.interface;
  }

  constructor(
    private fb: FormBuilder,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    public data: { route: IRoute; destination: 'create' | 'edit' },
    @Optional() private dialogRef: MatDialogRef<RouteFormComponent>
  ) {}

  ngOnInit(): void {
    this.routeForm = this.fb.group({
      address: [null, [Validators.required, this.ipValidator()]],
      mask: [null, Validators.required],
      gateway: [null, [Validators.required, this.ipValidator()]],
      interface: [null, Validators.required],
    });

    if (this.data) {
      const { route, destination } = this.data;
      this.destination = destination;
      this.routeForm.patchValue({
        address: route.address,
        mask: route.mask,
        gateway: route.gateway,
        interface: route.interface,
      });
      this.routeForm.updateValueAndValidity();
    }
  }

  onSubmit(event: Event): void {
    event.stopPropagation();
    this.submit.emit(this.routeForm.value);
  }

  onRemoveButtonClick(): void {
    this.dialogRef.close({ result: RouteDialogResult.Remove });
  }

  onEditButtonClick(): void {
    this.dialogRef.close({
      result: RouteDialogResult.Edit,
      data: this.routeForm.value,
    });
  }

  onCancelButtonClick(): void {
    this.dialogRef.close({ result: RouteDialogResult.Cancel });
  }

  getErrorMessage(control: AbstractControl): string {
    if (control.hasError('required')) {
      return 'Поле обязательно для заполнения';
    }
    if (control.hasError('wrongIp')) {
      return 'IP-адрес задан некорректно';
    }
    return '';
  }

  private ipValidator(): ValidatorFn {
    const IP_CHUNKS_COUNT = 4;
    const IP_MIN_CHUNK_VALUE = 0;
    const IP_MAX_CHUNK_VALUE = 255;
    const error = { wrongIp: true };

    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value === null) {
        return null;
      }

      const parts = value.split(/\.|\//g);
      if (parts.length !== IP_CHUNKS_COUNT) {
        return error;
      }

      for (let i = 0; i < parts.length; i++) {
        if (!parts[i] || !parts[i].match(/^[\.0-9]*$/)) {
          return error;
        }

        const parsedChunk = parseInt(parts[i]);
        if (
          parsedChunk < IP_MIN_CHUNK_VALUE ||
          parsedChunk > IP_MAX_CHUNK_VALUE
        ) {
          return error;
        }
      }
      return null;
    };
  }
}
