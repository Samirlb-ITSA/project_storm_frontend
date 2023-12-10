import { useState, useEffect } from 'react';
import { apiClient } from '../../js/apiClient';
import Breadcrumb from '../../components/Breadcrumb';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface Company {
  companyid: string;
  name: string;
}

interface JobOfferIn {
  offerid: string;
  name: string;
  workday: string;
  status: string;
  companyid: string;
}

const JobOfferForm = () => {
  const navigate = useNavigate();
  const apiService = apiClient();
  let initialJobOffer: JobOfferIn = {
    offerid: '',
    name: '',
    workday: '',
    status: '',
    companyid: '',
  };

  const [formData, setFormData] = useState<JobOfferIn>(initialJobOffer);
  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});
  const [companies, setCompanies] = useState<Company[]>([]);
  const { offerid, name, workday, status, companyid } = formData;
  
  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await apiService('get_companies', {
        method: 'GET',
      });
      const content = await response.resultado;
      setCompanies(content);
    };
  
    fetchCompanies();
  }, []);

  const validateField = (name: string, value: string) => {
    let error: string | undefined;
    switch (name) {
        case 'name':
            error = value ? undefined : 'El nombre es obligatorio';
        break;
        case 'workday':
            error = value ? undefined : 'El horario de trabajo es obligatorio';
        break;
        case 'companyid':
            error = value ? undefined : 'La empresa es obligatoria';
        break;
        case 'status':
            error = value ? undefined : 'El estado es obligatorio';
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
      [name]: name === 'status' ? value === 'true' : value,
    }));
    const error = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };
  
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let newErrors = { ...errors };

    Object.keys(formData).forEach(key => {
      const error = validateField(key, String(formData[key as keyof JobOfferIn]));
      newErrors[key] = error;
    });

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => error === undefined)) {
      const rawResponse = await apiService('create_job_offer', {
        method: 'POST',
        body: formData,
      });
      const result = rawResponse.result;
      console.log(result);

      if (result === 'Oferta de trabajo creada') {
        toast.success(String(result));
        navigate("job_offers/list");
      }

      if (result === 'Error al crear la oferta de trabajo') {
        toast.error(String(result));
      } 
    }
  };

  return (
    <>
      <Breadcrumb pageName="Formulario de la Oferta de Trabajo" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!-- JobOffer Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Crear Oferta de Trabajo
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
                    placeholder="Ingrese el nombre de la Oferta de Trabajo"
                    className={`w-full rounded border-[1.5px] ${errors.name ? 'border-danger' : 'border-stroke'} bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                  />
                  {errors.name && <p className="text-danger">{errors.name}</p>}
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Horario de Trabajo <span className="text-meta-1">*</span>
                  </label>
                  <input
                    name="workday"
                    type="text"
                    defaultValue={workday}
                    onChange={onChange}
                    placeholder="Ingrese el horario de trabajo"
                    className={`w-full rounded border-[1.5px] ${errors.workday ? 'border-danger' : 'border-stroke'} bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                  />
                  {errors.workday && <p className="text-danger">{errors.workday}</p>}
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Empresa <span className="text-meta-1">*</span>
                  </label>
                  <select
                    name="companyid"
                    onChange={onChange}
                    className={`relative z-20 w-full rounded border-[1.5px] ${errors.companyid ? 'border-danger' : 'border-stroke'} appearance-none bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    >
                    <option value="">Seleccione una empresa</option>
                    {companies.map((company) => (
                      <option key={company.companyid} value={company.companyid}>
                        {company.name}
                      </option>
                    ))}
                  </select>
                  {errors.companyid && <p className="text-danger">{errors.companyid}</p>}
                </div>

                <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Estado <span className="text-meta-1">*</span>
                    </label>
                    <select
                      name="status"
                      defaultValue={status}
                      onChange={onChange}
                      className={`relative z-20 w-full rounded border-[1.5px] ${errors.status ? 'border-danger' : 'border-stroke'} appearance-none bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    >
                      <option value="">Seleccione un estado</option>
                      <option value="true">Activo</option>
                      <option value="false">Desabilitado</option>
                    </select>
                    {errors.status && <p className="text-danger">{errors.status}</p>}
                </div>
                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                  Crear Oferta de Trabajo
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobOfferForm;