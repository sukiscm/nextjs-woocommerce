// src/components/Checkout/CheckoutSteps.component.tsx
import { Check } from 'lucide-react';

interface Step {
  id: number;
  name: string;
  status: 'complete' | 'current' | 'upcoming';
}

const CheckoutSteps = ({ currentStep }: { currentStep: number }) => {
  const steps: Step[] = [
    { id: 1, name: 'Carrito', status: currentStep > 1 ? 'complete' : currentStep === 1 ? 'current' : 'upcoming' },
    { id: 2, name: 'Información de Envío', status: currentStep > 2 ? 'complete' : currentStep === 2 ? 'current' : 'upcoming' },
    { id: 3, name: 'Pago', status: currentStep > 3 ? 'complete' : currentStep === 3 ? 'current' : 'upcoming' },
    { id: 4, name: 'Confirmación', status: currentStep === 4 ? 'complete' : 'upcoming' },
  ];

  return (
    <nav aria-label="Progreso" className="mb-8">
      <ol className="flex items-center justify-between">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className="relative flex-1">
            {step.status === 'complete' ? (
              <div className="group flex items-center w-full">
                <span className="flex items-center px-6 py-4 text-sm font-medium">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary">
                    <Check className="h-6 w-6 text-white" />
                  </span>
                  <span className="ml-4 text-sm font-medium text-primary">{step.name}</span>
                </span>
              </div>
            ) : step.status === 'current' ? (
              <div className="flex items-center px-6 py-4 text-sm font-medium" aria-current="step">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-primary">
                  <span className="text-primary">{step.id}</span>
                </span>
                <span className="ml-4 text-sm font-medium text-primary">{step.name}</span>
              </div>
            ) : (
              <div className="group flex items-center">
                <span className="flex items-center px-6 py-4 text-sm font-medium">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-accent-3">
                    <span className="text-accent-5">{step.id}</span>
                  </span>
                  <span className="ml-4 text-sm font-medium text-accent-5">{step.name}</span>
                </span>
              </div>
            )}

            {stepIdx !== steps.length - 1 && (
              <div className="absolute top-0 right-0 hidden h-full w-5 md:block" aria-hidden="true">
                <svg className="h-full w-full text-accent-3" viewBox="0 0 22 80" fill="none" preserveAspectRatio="none">
                  <path d="M0 -2L20 40L0 82" vectorEffect="non-scaling-stroke" stroke="currentcolor" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default CheckoutSteps;