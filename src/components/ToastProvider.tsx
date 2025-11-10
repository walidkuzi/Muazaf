import { Toaster } from 'sonner';

export default function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: '#191919',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: '#ffffff',
          borderRadius: '12px',
          backdropFilter: 'blur(12px)',
        },
        className: 'toast-custom',
      }}
      richColors
    />
  );
}
