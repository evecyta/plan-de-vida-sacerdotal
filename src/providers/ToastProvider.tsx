import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import Toast from "@/components/ui/Toast";

type ToastType =
  | "success"
  | "error"
  | "info";

interface ToastState {

  visible: boolean;

  message: string;

  type: ToastType;

}

interface ToastContextValue {

  showToast(
    message: string,
    type?: ToastType
  ): void;

}

const ToastContext =
  createContext<
    ToastContextValue | undefined
  >(undefined);

interface Props {

  children: React.ReactNode;

}

export default function ToastProvider({

  children,

}: Props) {

  const [toast, setToast] =
    useState<ToastState>({

      visible: false,

      message: "",

      type: "success",

    });

  const hideToast =
    useCallback(() => {

      setToast(current => ({

        ...current,

        visible: false,

      }));

    }, []);

  const showToast =
    useCallback(

      (

        message: string,

        type: ToastType = "success"

      ) => {

        setToast({

          visible: true,

          message,

          type,

        });

      },

      []

    );

  const value =
    useMemo(

      () => ({

        showToast,

      }),

      [showToast]

    );

  return (

    <ToastContext.Provider value={value}>

      {children}

      <Toast

        visible={toast.visible}

        message={toast.message}

        type={toast.type}

        onHide={hideToast}

      />

    </ToastContext.Provider>

  );

}

export function useToastContext() {

  const context =
    useContext(ToastContext);

  if (!context) {

    throw new Error(

      "useToastContext debe utilizarse dentro de ToastProvider."

    );

  }

  return context;

}