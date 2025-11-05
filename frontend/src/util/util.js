import { ToastContainer, toast } from "react-toastify";

export const handleError = (error) => {
          toast.error(error , {
              position: 'bottom-left'
          })
      }
export const handleSuccess = (message) => {
          toast.success(message , {
              position: 'bottom-left'
          })
      }