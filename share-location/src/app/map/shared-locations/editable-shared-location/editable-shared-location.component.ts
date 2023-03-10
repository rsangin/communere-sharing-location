import { ShareLocationService } from '../../../shared/services/share-location.service';
import { CreateSharedLocationRequest } from './../../../shared/models/create-shared-location-request';
import { UpdateSharedLocationRequest } from './../../../shared/models/update-shared-location-request';
import { Component, Input, OnChanges, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LocationPosition } from './../../../shared/models/location-position';
import { SharedLocation } from './../../../shared/models/shared-location';

@Component({
  selector: 'app-editable-shared-location',
  templateUrl: './editable-shared-location.component.html',
  styleUrls: [
    './editable-shared-location.component.scss',
    '../shared-location/shared-location.component.scss',
  ],
})
export class EditableSharedLocationComponent implements OnChanges {
  @Input()
  public sharedLocation?: SharedLocation;

  @Input()
  public position!: LocationPosition;

  @Output()
  public submitted = new EventEmitter<void>();

  public colors: string[] = [
    '#00d1be',
    '#b3f0e6',
    '#f6b5aa',
    '#ffba80',
    '#fff0cd',
  ];

  public formGroup = this.formBuilder.nonNullable.group({
    name: this.formBuilder.nonNullable.control('', [Validators.required]),
    position: this.formBuilder.nonNullable.control<LocationPosition>(
      { lat: 0, lon: 0 },
      [Validators.required]
    ),
    type: this.formBuilder.nonNullable.control('', [Validators.required]),
    logo: this.formBuilder.nonNullable.control(''),
    color: this.formBuilder.nonNullable.control(this.colors[0], [
      Validators.required,
    ]),
  });

  public constructor(
    private formBuilder: FormBuilder,
    private service: ShareLocationService
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['sharedLocation']?.currentValue) {
      this.formGroup.patchValue(changes['sharedLocation'].currentValue);
    }

    if (changes['position']?.currentValue) {
      this.formGroup.patchValue({ position: this.position });
    }
  }

  public changeColor(color: string): void {
    this.formGroup.patchValue({ color });
  }

  public async fileChanged(event: any): Promise<void> {
    console.log(event);

    const base64 = await this.convertToBase64(event.target.files[0]);
    this.formGroup.patchValue({ logo: base64 });
  }

  private convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  public submit(): void {
    if (this.sharedLocation?.id) {
      const request =
        this.formGroup.getRawValue() as UpdateSharedLocationRequest;
      request.id = this.sharedLocation.id;

      this.update(request);
    } else {
      const request = this.formGroup.getRawValue();
      this.create(request);
    }

    this.submitted.emit();
  }

  private update(request: UpdateSharedLocationRequest): void {
    this.service.update(request);
  }

  private create(request: CreateSharedLocationRequest): void {
    this.service.create(request);
  }
}
