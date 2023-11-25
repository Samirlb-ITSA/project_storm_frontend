import Breadcrumb from '../../components/Breadcrumb';
import { useState } from 'react';
import { apiClient } from '../../js/apiClient';


const RolForm = () => {
  const dataRequester = apiClient();
  let Rol = {
    name: '',
  };

  const [formData, setFormData] = useState(Rol);
  const { name } =
    formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const rawResponse = await dataRequester('create_role', {
      method: 'POST',
      body: formData,
    });
    const content = await rawResponse.json();
    console.log(content);
  };

  return (
    <>
      <Breadcrumb pageName="Formulario de usuario" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!-- Rol Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Crear usuario
              </h3>
            </div>
            <form onSubmit={onSubmit}>
              <div className="p-6.5">
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Nombre
                    </label>
                    <input
                      name="name"
                      type="text"
                      defaultValue={name}
                      onChange={onChange}
                      placeholder="Ingrese nombre de usuario"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                </div>


                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                  Crear Rol
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RolForm;
