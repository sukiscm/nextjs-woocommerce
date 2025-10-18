// src/components/User/UserRegistration.component.tsx
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useForm, FormProvider } from 'react-hook-form';
import { useRouter } from 'next/router';
import { CREATE_USER } from '../../utils/gql/GQL_MUTATIONS';
import { InputField } from '../Input/InputField.component';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.component';
import Button from '../UI/Button.component';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface IRegistrationData {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const UserRegistration = () => {
  const methods = useForm<IRegistrationData>();
  const [registerUser, { loading }] = useMutation(CREATE_USER);
  const [registrationCompleted, setRegistrationCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: IRegistrationData) => {
    setError(null);
    try {
      const response = await registerUser({
        variables: data,
      });

      const customer = response.data?.registerCustomer?.customer;
      
      if (customer) {
        setRegistrationCompleted(true);
        
        // Redirigir después de 2 segundos
        setTimeout(() => {
          router.push('/iniciar-sesion');
        }, 2000);
      } else {
        throw new Error('Error al crear la cuenta');
      }
    } catch (error: any) {
      console.error('Error de registro:', error);
      
      // Mensajes de error en español
      if (error.message?.includes('email')) {
        setError('Este correo electrónico ya está registrado.');
      } else if (error.message?.includes('username')) {
        setError('Este nombre de usuario ya existe.');
      } else {
        setError('Error al crear la cuenta. Por favor intenta de nuevo.');
      }
    }
  };

  if (registrationCompleted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-light text-accent-9 mb-2">
          ¡Cuenta creada exitosamente!
        </h2>
        <p className="text-accent-6 mb-4">
          Redirigiendo a inicio de sesión...
        </p>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <section>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <InputField
              inputName="firstName"
              inputLabel="Nombre"
              type="text"
              customValidation={{ required: true }}
            />
            <InputField
              inputName="lastName"
              inputLabel="Apellido"
              type="text"
              customValidation={{ required: true }}
            />
          </div>

          <InputField
            inputName="username"
            inputLabel="Nombre de Usuario"
            type="text"
            customValidation={{ required: true }}
          />

          <InputField
            inputName="email"
            inputLabel="Correo Electrónico"
            type="email"
            customValidation={{ required: true }}
          />

          <InputField
            inputName="password"
            inputLabel="Contraseña"
            type="password"
            customValidation={{ required: true, minLength: 6 }}
          />

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="pt-2">
            <Button variant="primary" buttonDisabled={loading} fullWidth>
              {loading ? <LoadingSpinner /> : 'Crear Cuenta'}
            </Button>
          </div>

          <p className="text-xs text-accent-6 text-center">
            Al registrarte, aceptas nuestros{' '}
            <Link href="/terminos" className="text-primary hover:underline">
              Términos y Condiciones
            </Link>
            {' '}y{' '}
            <Link href="/privacidad" className="text-primary hover:underline">
              Política de Privacidad
            </Link>
          </p>
        </form>
      </FormProvider>
    </section>
  );
};

export default UserRegistration;