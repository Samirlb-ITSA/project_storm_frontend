import Breadcrumb from '../../components/Breadcrumb';
import { useState, useEffect } from 'react';
import { apiClient } from '../../js/apiClient';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface Faculty {
  name: string;
  facultyid: string;
}

interface Company {
  name: string;
  email: string;
  cellphone: string;
  address: string;
  nit: string;
  status: boolean;
}

const CompanyForm = () => {
  const navigate = useNavigate();
  const dataRequester = apiClient();
  let initialCompany: Company = {
    name: '',
    email: '',
    cellphone: '',
    address: '',
    nit: '',
    status: true,
  };

  const [formData, setFormData] = useState<Company>(initialCompany);
  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [selectedFacultiy, setelectedFacultiy] = useState<string | undefined>();
  const { name, email, cellphone, address, nit } = formData;
  
  useEffect(() => {
    const fetchFaculties = async () => {
      const response = await dataRequester('get_faculties', {
        method: 'GET',
      });
      const result = await response.resultado;
      setFaculties(result);

      if (result === 'Empresa creada') {
        toast.success(String(result));
        navigate("/company/list");
      }

      if (result === 'Error al crear la empresa') {
        toast.error(String(result));
      } 
    };
  
    fetchFaculties();
  }, []);

  const validateField = (name: string, value: string) => {
    let error: string | undefined;
    switch (name) {
      case 'name':
        error = value ? undefined : 'El nombre es obligatorio';
        break;
      case 'email':
        error = value ? (/\S+@\S+\.\S+/.test(value) ? undefined : 'El correo electrónico no es válido') : 'El correo electrónico es obligatorio';
        break;
      case 'cellphone':
        error = value ? (!isNaN(+value) ? undefined : 'El numero de celular no es válido') : 'El numero de celular es obligatorio';
        break;
      case 'address':
        error = value ? undefined : 'La dirección es obligatoria';
        break;
      case 'nit':
        error = value ? (!isNaN(+value) ? undefined : 'El NIT no es válido') : 'El NIT es obligatorio';
        break;
      case 'faculty':
        error = value ? undefined : 'La facultad es obligatoria';
        break;
      default:
        break;
    }
    return error;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    const error = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));

    if (name == 'faculty') {
      setelectedFacultiy(value)
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let newErrors = { ...errors };

    Object.keys(formData).forEach(key => {
      const error = validateField(key, String(formData[key as keyof Company]));
      newErrors[key] = error;
    });

    const error = validateField('faculty', String(faculties));
    newErrors['faculty'] = error;


    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => error === undefined)) {
      const rawResponse = await dataRequester('create_company', {
        method: 'POST',
        body: {
          ...formData,
          facultyid: selectedFacultiy,
      }});
      const result = rawResponse.result;
      console.log(result);

      if (result === 'Empresa creada') {
        toast.success(String(result));
        navigate("companies/list");
      }

      if (result === 'Error al crear la empresa') {
        toast.error(String(result));
      } 
    }
  };

  return (
    <>
      <Breadcrumb pageName="Formulario de la Empresa" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!-- Company Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Crear Empresa
              </h3>
            </div>
            <form onSubmit={onSubmit}>
              <div className="p-6.5">
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Nombre <span className="text-meta-1">*</span>
                    </label>
                    <input
                      name="name"
                      type="text"
                      defaultValue={name}
                      onChange={onChange}
                      placeholder="Ingrese el nombre de la Empresa"
                      className={`w-full rounded border-[1.5px] ${errors.name ? 'border-danger' : 'border-stroke'} bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    />
                    {errors.name && <p className="text-danger">{errors.name}</p>}
                  </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Correo electronico <span className="text-meta-1">*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="Ingrese el correo electronico"
                    defaultValue={email}
                    onChange={onChange}
                    className={`w-full rounded border-[1.5px] ${errors.email ? 'border-danger' : 'border-stroke'} bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                  />
                  {errors.email && <p className="text-danger">{errors.email}</p>}
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Direccion <span className="text-meta-1">*</span>
                    </label>
                    <input
                      name="address"
                      type="text"
                      defaultValue={address}
                      onChange={onChange}
                      placeholder="Ingrese la direccion"
                      className={`w-full rounded border-[1.5px] ${errors.address ? 'border-danger' : 'border-stroke'} bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    />
                    {errors.address && <p className="text-danger">{errors.address}</p>}
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Celular <span className="text-meta-1">*</span>
                    </label>
                    <input
                      name="cellphone"
                      type="text"
                      defaultValue={cellphone}
                      onChange={onChange}
                      placeholder="Ingrese el numero de celular"
                      className={`w-full rounded border-[1.5px] ${errors.cellphone ? 'border-danger' : 'border-stroke'} bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    />
                    {errors.cellphone && <p className="text-danger">{errors.cellphone}</p>}
                  </div>
                </div>
                <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Nit <span className="text-meta-1">*</span>
                    </label>
                    <input
                      name="nit"
                      type="text"
                      defaultValue={nit}
                      onChange={onChange}
                      placeholder="Ingrese el numero del Nit de la empresa"
                      className={`w-full rounded border-[1.5px] ${errors.nit ? 'border-danger' : 'border-stroke'} bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    />
                    {errors.nit && <p className="text-danger">{errors.nit}</p>}
                </div>
                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                  Crear Empresa
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyForm;
