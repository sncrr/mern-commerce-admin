import { ExclamationTriangle } from "../../../assets/svgs";
import { DialogProps, clearAlert } from "../actions";

export function Confirmation(props: DialogProps) {
  
  const handleConfirm = () => {
    props.onConfirm && props.onConfirm()
    clearAlert();
  }
  const handleCancel = () => {
    props.onCancel && props.onCancel()
    clearAlert();
  }
  return (
    <main className="antialiased">
      <div className="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
        <div className="bg-black opacity-25 w-full h-full absolute z-10 inset-0"></div>
        <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
          <div className="md:flex items-center">
            <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
              <span className="text-red-500">
                <ExclamationTriangle size={24} />
              </span>
            </div>
            <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
              <p className="font-bold">
                {props.title}
              </p>
              <div className="text-sm text-gray-700 mt-1">
                {props.content}
              </div>
            </div>
          </div>
          <div className="text-center md:text-right mt-4 md:flex md:justify-end">
            <button 
              className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
              onClick={handleConfirm}
            >
              Confirm
            </button>
            <button 
              className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}