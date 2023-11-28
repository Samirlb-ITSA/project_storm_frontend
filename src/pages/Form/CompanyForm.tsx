import Breadcrumb from '../../components/Breadcrumb';
import { useState } from 'react';
import { apiClient } from '../../js/apiClient';


const CompanyForm = () => {
  const dataRequester = apiClient();
  let Company = {
    name: '',
    email: '',
    cellphone: 0,
    address: '',
    nit: 0,
    status: 1,
  };

  const [formData, setFormData] = useState(Company);
  const { name, email, cellphone, address, nit } =
    formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const rawResponse = await dataRequester('create_company', {
      method: 'POST',
      body: formData,
    });
    const content = await rawResponse.json();
    console.log(content);
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
                      Nombre
                    </label>
                    <input
                      name="name"
                      type="text"
                      defaultValue={name}
                      onChange={onChange}
                      placeholder="Ingrese el nombre de la Empresa"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
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
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Direccion
                    </label>
                    <input
                      name="address"
                      type="text"
                      defaultValue={address}
                      onChange={onChange}
                      placeholder="Ingrese la direccion"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Celular
                    </label>
                    <input
                      name="cellphone"
                      type="number"
                      defaultValue={cellphone}
                      onChange={onChange}
                      placeholder="Ingrese el numero de celular"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>



                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Nit
                  </label>
                  <input
                    name="nit"
                    type="number"
                    defaultValue={nit}
                    onChange={onChange}
                    placeholder="Ingrese el numero del Nit de la empresa"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
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
