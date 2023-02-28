import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {GeografiaService} from "../../../services/geografia/geografia.service";
import {ProductosService} from "../../../services/negocio/productos.service";
import {RegistroService} from "../../../services/negocio/registro.service";
import {ValidationService} from "../../../services/validators/validation.service";
import {of} from "rxjs";

interface FormEvaluation {
  name: string,
  lastname: string,
  email: string,
  phone: string,
  provincia: string,
  ciudad: string,
  productos: Array<any>,
  informacion: boolean
}
describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  const GeografiaServiceMock = {
    getProvinces: jest.fn(() => {
      return of([])
    }),
    getCities: jest.fn(() => {
      return of([])
    }),
    handleError: jest.fn()
  }

  const ProductosServiceMock = {
    getProducts: jest.fn(() => {
      return of([])
    }),
    handleError: jest.fn()
  }
  const RegistroServiceMock = {
    registerPerson: jest.fn(() => {
      return of([])
    }),
    handleError: jest.fn()
  }

  const initialFormValues: FormEvaluation = {
    name: '',
    lastname: '',
    email: '',
    phone: '',
    provincia: '',
    ciudad: '',
    productos: [],
    informacion: true
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormComponent ],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers:[
        {
          provide: GeografiaService,
          useValue: GeografiaServiceMock
        },
        {
          provide: ProductosService,
          useValue: ProductosServiceMock
        },
        {
          provide: RegistroService,
          useValue: RegistroServiceMock
        },
        {
          provide: ValidationService,
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Check initial state of the form', () => {
    const form = component.reactiveForm
    expect(form.value).toEqual(initialFormValues)
  })

  it("Check invalid form when information isn't checked", () => {
    const form = component.reactiveForm
    const mockFormValues: FormEvaluation = {
      name: 'Marco',
      ciudad: 'QUITO',
      email: 'marco@gmail.com',
      lastname: 'Perez',
      informacion: false,
      phone: '0995239403',
      productos: ['Producto 1','Producto 1'],
      provincia: 'PICHINCHA'
    }
    form.patchValue(mockFormValues)
    expect(form.status).toEqual('INVALID')
  })

  it('Check new form when reset button is clicked', () => {
    const form = component.reactiveForm
    const mockFormValues: FormEvaluation = {
      name: 'Marco',
      ciudad: 'QUITO',
      email: 'marco@gmail.com',
      lastname: 'Perez',
      informacion: false,
      phone: '0995239403',
      productos: ['Producto 1','Producto 1'],
      provincia: 'PICHINCHA'
    }
    form.patchValue(mockFormValues)
    component.resetForm()
    expect(form.value).toEqual(initialFormValues)
  })

  it('Check successful submit form state', () => {
    const form = component.reactiveForm
    const mockFormValues: FormEvaluation = {
      name: 'Marco',
      ciudad: 'QUITO',
      email: 'marco@gmail.com',
      lastname: 'Perez',
      informacion: false,
      phone: '0995239403',
      productos: ['Producto 1','Producto 1'],
      provincia: 'PICHINCHA'
    }
    form.patchValue(mockFormValues)
    console.log(form.value)
    component.sendRegister();

  })
});
