import { useToastContext } from "@/providers/ToastProvider";

export default function useToast() {

  const { showToast } = useToastContext();

  function success(message: string) {
    showToast(message, "success");
  }

  function error(message: string) {
    showToast(message, "error");
  }

  function info(message: string) {
    showToast(message, "info");
  }

  return {
    success,
    error,
    info,
    show: showToast,
  };
}