import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  petForm: any;
  petId: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.petForm = this.formBuilder.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      type: ['', Validators.required],
      furcolor: ['', Validators.required],
      country: ['', Validators.required],
    });

    this.route.queryParams.subscribe((params) => {
      this.petId = params['id'];
    });

    if (this.petId) {
      this.http
        .get(`http://localhost:8080/findPetById/${this.petId}`)
        .subscribe((pet: any) => {
          this.petForm.setValue({
            name: pet.name,
            code: pet.code,
            type: pet.type,
            furcolor: pet.furcolor,
            country: pet.country,
          });
        });
    }
  }

  public onAddPet(form: NgForm) {
    if (this.petId) {
      this.http
        .put(`http://localhost:8080/updatePet/${this.petId}`, form.value)
        .subscribe(() => {
          form.reset();
          this.router.navigate(['/']);
        });
    } else {
      this.http.post('http://localhost:8080/add', form.value).subscribe(() => {
        form.reset();
        this.router.navigate(['/']);
      });
    }
  }
}
