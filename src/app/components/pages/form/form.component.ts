import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IProvince } from 'src/app/utils/interfaces/province.interface';
import {GeografiaService} from "../../../services/geografia/geografia.service";
import {IProduct} from "../../../utils/interfaces/product.interface";
import {ICity} from "../../../utils/interfaces/city.interface";
import {ProductosService} from "../../../services/negocio/productos.service";
import {RegistroService} from "../../../services/negocio/registro.service";
import {fromEcuador, maxLength, minLength} from "../../../utils/validators/validators";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  reactiveForm: FormGroup = undefined!;

  products: IProduct[] = [];

  provinces: IProvince[] = [];

  cities: ICity[] = [];

  sending: boolean = false;

  isAcepted: boolean = true;

  constructor(
    private geografiaService: GeografiaService,
    private formBuilder: FormBuilder,
    private productosService: ProductosService,
    private registroService: RegistroService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    this.fillProducts();
    this.fillProvinces();
  }

  fillProducts() {
    this.productosService.getProducts().subscribe({
      next: data => {
        this.products = data
      },
      error: error => {
        this.router.navigate(['loader']);
      }
    });
  }

  fillProvinces() {
    this.geografiaService.getProvinces().subscribe({
      next: data => {
        this.provinces = data
      },
      error: error => {
        this.router.navigate(['loader']);
      }
    });
  }

  fillCities() {
    this.geografiaService.getCities(this.reactiveForm.get('provincia')?.value).subscribe({
      next: data => {
        this.cities = data
      },
      error: error => {
        alert(error.message);
      }
    })
  }

  createForm() {
    const formArrayControl = this.formBuilder.array([], [minLength(2), maxLength(4)])
    this.reactiveForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
      lastname: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, fromEcuador()]],
      provincia: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      productos: formArrayControl,
      informacion: [true, [Validators.required]]
    })
  }

  checkProduct(event: any) {
    if (event.currentTarget.checked) {
      this.listProducts.push(this.formBuilder.control(event.target.value));
    } else {
      let index = this.listProducts.value.findIndex((product: string) => product === event.target.value)
      this.listProducts.removeAt(index);
    }
  }

  changeAcepted(event: any) {
    this.isAcepted = !event.currentTarget.checked
  }

  sendRegister() {
    if(this.reactiveForm.invalid) return alert("Revisa el formulario antes de enviarlo - Formulario No valido");
    this.sending = true;
    this.reactiveForm.disable();
    this.registroService.registerPerson(this.reactiveForm.value).subscribe({
      next: data =>{
        this.router.navigate(['/success']);},
        error: error => {
        this.router.navigate(['/error']);
      }
    });
  }

  resetForm() {
    const initialFormValues = {
      name: '',
      lastname: '',
      email: '',
      phone: '',
      provincia: '',
      ciudad: '',
      productos: [],
      informacion: true
    }
    this.reactiveForm.patchValue(initialFormValues)
  }

  get nameValid() {
    return this.reactiveForm.get('name')?.invalid && this.reactiveForm.get('name')?.touched;
  }

  get lastNameValid() {
    return this.reactiveForm.get('lastname')?.invalid && this.reactiveForm.get('lastname')?.touched;
  }

  get emailValid() {
    return this.reactiveForm.get('email')?.invalid && this.reactiveForm.get('email')?.touched;
  }

  get phoneValid() {
    return this.reactiveForm.get('phone')?.invalid && this.reactiveForm.get('phone')?.touched;
  }

  get provinciaValid() {
    return this.reactiveForm.get('provincia')?.invalid && this.reactiveForm.get('provincia')?.touched;
  }

  get ciudadValid() {
    return this.reactiveForm.get('ciudad')?.invalid && this.reactiveForm.get('ciudad')?.touched;
  }

  get productosValid() {
    return this.reactiveForm.get('productos')?.invalid;
  }

  get listProducts() {
    return this.reactiveForm.get('productos') as FormArray;
  }

}
