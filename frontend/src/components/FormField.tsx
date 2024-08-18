import { FormFieldProps } from "../lib/types/products";
import { cn } from "../lib/utils";

const FormField: React.FC<FormFieldProps> = ({
    className,
    type,
    label,
    placeholder,
    name,
    register,
    error,
    valueAsNumber,
}) => (
    <>
        <div className={cn("w-full", className)}>
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
            <input {...register(name, { valueAsNumber })}
                type={type}
                placeholder={placeholder}
                name={name}
                id={name}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
            {error && <span className="text-xs text-red-500 mt-2">{error.message}</span>}
            {/* <div className="text-xs text-red-500 mt-2">Product name is required</div> */}
        </div>
    </>
);
export default FormField;
