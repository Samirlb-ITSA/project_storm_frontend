import Breadcrumb from '../../components/Breadcrumb';
import { useState, useEffect } from 'react';
import { apiClient } from '../../js/apiClient';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface Faculty {
  name: string;
  facultyid: string;
}

interface CareerIn {
  name: string;
  status: boolean;
  facultyid: string;
}

const CareerForm = () => {
  const navigate = useNavigate();
  const dataRequester = apiClient();
  let initialCareer: CareerIn = {
    name: '',
    status: true,
    facultyid: '',
  };

  const [formData, setFormData] = useState<CareerIn>(initialCareer);
  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const { name, status, facultyid } = formData;
  
  useEffect(() => {
    const fetchFaculties = async () => {
      const response = await dataRequester('get_faculties', {
        method: 'GET',
      });
      const content = await response.resultado;
      setFaculties(content);
    };
  
    fetchFaculties();
  }, []);

  const validateField = (name: string, value: string) => {
    let error: string | undefined;
    switch (name) {
      case 'name':
        error = value ? undefined : 'El nombre es obligatorio';
        break;
      case 'facultyid':
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
      [name]: name === 'status' ? value === 'true' : value,
    }));
    const error = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };
  
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let newErrors = { ...errors };

    Object.keys(formData).forEach(key => {
      const error = validateField(key, String(formData[key as keyof CareerIn]));
      newErrors[key] = error;
    });

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => error === undefined)) {
      const rawResponse = await dataRequester('create_career', {
        method: 'POST',
        body: formData,
      });
      const result = rawResponse.result;
      console.log(result);

      if (result === 'Carrera creada') {
        toast.success(String(result));
        navigate("careers/list");
      }

      if (result === 'Error al crear la carrera') {
        toast.error(String(result));
      } 
    }
  };

  return (
    <>
      <Breadcrumb pageName="Formulario de la Carrera" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!-- Career Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Crear Carrera
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
                    placeholder="Ingrese el nombre de la Carrera"
                    className={`w-full rounded border-[1.5px] ${errors.name ? 'border-danger' : 'border-stroke'} bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                  />
                  {errors.name && <p className="text-danger">{errors.name}</p>}
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Facultad <span className="text-meta-1">*</span>
                  </label>
                  <select
                    name="facultyid"
                    onChange={onChange}
                    className={`relative z-20 w-full rounded border-[1.5px] ${errors.faculty ? 'border-danger' : 'border-stroke'} appearance-none bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    >
                    <option value="">Seleccione una facultad</option>
                    {faculties.map((faculty) => (
                      <option key={faculty.facultyid} value={faculty.facultyid}>
                        {faculty.name}
                      </option>
                    ))}
                  </select>
                  {errors.faculty && <p className="text-danger">{errors.faculty}</p>}
                </div>


                <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                        Estado <span className="text-meta-1">*</span>
                    </label>
                    <select
                        name="status"
                        onChange={onChange}
                        className={`relative z-20 w-full rounded border-[1.5px] ${errors.status ? 'border-danger' : 'border-stroke'} appearance-none bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                        >
                        <option value="">Seleccione el estado</option>
                        <option value="true">Activo</option>
                        <option value="false">Inactivo</option>
                    </select>
                    {errors.status && <p className="text-danger">{errors.status}</p>}
                </div>
                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                  Crear Carrera
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CareerForm;