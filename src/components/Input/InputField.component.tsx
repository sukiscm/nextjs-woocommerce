// src/components/Input/InputField.component.tsx
import { FieldValues, useFormContext, UseFormRegister } from 'react-hook-form';

interface ICustomValidation {
  required?: boolean;
  minLength?: number;
  pattern?: string;
}

interface IErrors {}

export interface IInputRootObject {
  inputLabel: string;
  inputName: string;
  customValidation: ICustomValidation;
  errors?: IErrors;
  register?: UseFormRegister<FieldValues>;
  type?: string;
}

export const InputField = ({
  customValidation,
  inputLabel,
  inputName,
  type,
}: IInputRootObject) => {
  const { register, formState: { errors } } = useFormContext();
  const error = errors[inputName];

  return (
    <div className="space-y-2">
      <label 
        htmlFor={inputName} 
        className="block text-sm font-medium text-accent-7"
      >
        {inputLabel}
        {customValidation.required && (
          <span className="text-red-500 ml-1">*</span>
        )}
      </label>
      <input
        className={`
          w-full px-4 py-2.5 text-sm
          bg-white border rounded-lg
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-violet/20 focus:border-violet
          disabled:bg-accent-1 disabled:cursor-not-allowed
          ${error 
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
            : 'border-accent-2'
          }
        `}
        id={inputName}
        placeholder={inputLabel}
        type={type ?? 'text'}
        {...customValidation}
        {...register(inputName, {
          required: customValidation.required ? `${inputLabel} es requerido` : false,
          minLength: customValidation.minLength ? {
            value: customValidation.minLength,
            message: `Mínimo ${customValidation.minLength} caracteres`
          } : undefined,
        })}
      />
      {error && (
        <p className="text-xs text-red-600 mt-1">
          {error.message as string}
        </p>
      )}
    </div>
  );
};