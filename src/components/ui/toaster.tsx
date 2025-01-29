import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import {
  FaCircleXmark,
  FaCircleCheck,
  FaCircleExclamation,
} from "react-icons/fa6";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        fbType,
        title,
        description,
        action,
        ...props
      }) {
        return (
          <Toast key={id} {...props}>
            <div className="flex gap-2">
              {fbType && (
                <div>
                  {fbType === "error" ? (
                    <FaCircleXmark className="h-8 w-8 text-red-500 dark:text-red-600" />
                  ) : fbType === "success" ? (
                    <FaCircleCheck className="h-8 w-8 text-green-500 dark:text-green-600" />
                  ) : fbType === "warning" ? (
                    <FaCircleExclamation className="h-8 w-8 text-amber-500 dark:text-amber-600" />
                  ) : (
                    ""
                  )}
                </div>
              )}
              <span>
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </span>
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
