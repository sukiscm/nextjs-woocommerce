// src/components/User/UserLogin.component.tsx
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { login } from '../../utils/auth';
import { InputField } from '../Input/InputField.component';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.component';
import Button from '../UI/Button.component';
import { useRouter } from 'next/router';

interface ILoginData {
  username: string;
  password: string;
}

const UserLogin = () => {
  const methods = useForm<ILoginData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: ILoginData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await login(data.username, data.password);
      if (result.success) {
        // Redirigir a mi cuenta
        window.location.href = '/mi-cuenta';
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Ocurrió un error desconocido.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            inputName="username"
            inputLabel="Usuario o Correo Electrónico"
            type="text"
            customValidation={{ required: true }}
          />
          <InputField
            inputName="password"
            inputLabel="Contraseña"
            type="password"
            customValidation={{ required: true }}
          />

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <Button variant="primary" buttonDisabled={loading} fullWidth>
            {loading ? <LoadingSpinner /> : 'Iniciar Sesión'}
          </Button>
        </form>
      </FormProvider>
    </section>
  );
};

export default UserLogin;