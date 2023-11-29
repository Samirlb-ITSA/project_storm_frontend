import { useState, useEffect } from 'react';
import { apiClient } from '../../js/apiClient';
import Breadcrumb from '../../components/Breadcrumb';
import Select from 'react-select';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface RoleOption {
  value: string;
  label: string;
}

const UserForm = () => {
  const navigate = useNavigate();
  const dataRequester = apiClient();
  let User: { [key: string]: string | number } = {
    firstname: '',
    lastname: '',
    email: '',
    cellphone: 0,
    address: '',
    password: '',
    status: '',
  };

  const [formData, setFormData] = useState(User);
  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});
  const [selectedRoles, setSelectedRoles] = useState<RoleOption[]>([]);
  const [roles, setRoles] = useState<RoleOption[]>([]); // Declare roles state variable
  const { firstname, lastname, email, cellphone, address, password, status } = formData;
  
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await dataRequester('get_roles', { method: 'GET' });
        const data = await response.resultado;
        console.log(data)
        setRoles(data.map((role: { roleid: string; name: string }) => ({  value: role.roleid, label: role.name } )));
      } catch (error) {
        console.error('Failed to fetch roles:', error);
      }
    };
  
    fetchRoles();
  }, []);

  const validateField = (name: string, value: string | RoleOption[]) => {
    let error: string | undefined;
    switch (name) {
      case 'firstname':
        error = value ? undefined : 'El nombre es obligatorio';
        break;
      case 'lastname':
        error = value ? undefined : 'El apellido es obligatorio';
        break;
      case 'email':
        error = value ? (/\S+@\S+\.\S+/.test(value as string) ? undefined : 'El correo electrónico no es válido') : 'El correo electrónico es obligatorio';
        break;
      case 'password':
        error = value ? undefined : 'La contraseña es obligatoria';
        break;
      case 'cellphone':
        error = value ? undefined : 'El numero de celular es obligatorio';
        error = value ? (!isNaN(+value) ? undefined : 'El numero de celular no es válido') : 'El correo electrónico es obligatorio';
        break;
      case 'address':
        error = value ? undefined : 'La dirección es obligatoria';
        break;
      case 'status':
        error = value ? undefined : 'El estado es obligatorio';
        break;
      case 'roles':
        console.log((value as RoleOption[]).length)
        error = (value as RoleOption[]).length > 0 ? undefined : 'El rol es obligatorio';
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
  };

  const handleRoleChange = (selectedOptions: readonly RoleOption[] | null) => {
    setSelectedRoles(Array.from(selectedOptions || []));
    const error = validateField('roles', selectedOptions as RoleOption[]);
    setErrors((prevErrors) => ({ ...prevErrors, roles: error }));
  };


  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let newErrors = { ...errors };

    Object.keys(formData).forEach(key => {
      const error = validateField(key, String(formData[key]));
      newErrors[key] = error;
    });

    const errorRoles = validateField('roles', selectedRoles);
    newErrors['roles'] = errorRoles;

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => error === undefined)) {
      const rawResponse = await dataRequester('create_user', {
        method: 'POST',
        body: {
          ...formData,
          roles: selectedRoles.map(role => ({
            roleid: role.value,
            name: role.label
          })),
        },
      });
      const result = rawResponse.result;
      console.log(result);

      if (result === 'Usuario creado') {
        toast.success(String(result));
        navigate("users/list");
      }

      if (result === 'Error al crear el usuario') {
        toast.error(String(result));
      } 
    }
  };

  return (
    <>
      <Breadcrumb pageName="Formulario de usuario" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!-- User Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Crear usuario
              </h3>
            </div>
            <form onSubmit={onSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Nombre <span className="text-meta-1">*</span>
                    </label>
                    <input
                      name="firstname"
                      type="text"
                      defaultValue={firstname}
                      onChange={onChange}
                      placeholder="Ingrese nombre de usuario"
                      className={`w-full rounded border-[1.5px] ${errors.firstname ? 'border-danger' : 'border-stroke'} bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    />
                    {errors.firstname && <p className="text-danger">{errors.firstname}</p>}
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Apellido <span className="text-meta-1">*</span>
                    </label>
                    <input
                      name="lastname"
                      type="text"
                      placeholder="Ingrese apellido"
                      defaultValue={lastname}
                      onChange={onChange}
                      className={`w-full rounded border-[1.5px] ${errors.lastname ? 'border-danger' : 'border-stroke'} bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    />
                    {errors.lastname && <p className="text-danger">{errors.lastname}</p>}
                  </div>

                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">

                  <div className="w-full xl:w-1/2">
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

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Contraseña <span className="text-meta-1">*</span>
                    </label>
                    <input
                      name="password"
                      type="password"
                      value={password}
                      onChange={onChange}
                      placeholder="Ingrese la contraseña"
                      className={`w-full rounded border-[1.5px] ${errors.password ? 'border-danger' : 'border-stroke'} bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    />
                    {errors.password && <p className="text-danger">{errors.password}</p>}
                  </div>
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
                
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Rol <span className="text-meta-1">*</span>
                      </label>
                      <Select
                        isMulti
                        name="roles"
                        options={roles}
                        className={`basic-multi-select ${errors.roles ? 'border-danger' : 'border-stroke'}`}
                        classNamePrefix={`select ${errors.status ? 'border-danger' : 'border-stroke'} `}
                        onChange={handleRoleChange}
                        value={selectedRoles}
                        placeholder="Selecciona uno o varios roles"
                        styles={{
                          control: (baseStyles) => ({
                            ...baseStyles,
                            height: 51,
                            borderColor: errors.status ? '#D34053' : '#E2E8F0',
                            borderWidth: "1.5px",
                          }),
                        }}                      />
                      {errors.roles && <p className="text-danger">{errors.roles}</p>}
                    </div>
                  <div className="w-full xl:w-1/2">
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
                </div>

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                  Crear usuario
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserForm;