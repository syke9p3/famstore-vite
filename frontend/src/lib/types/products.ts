import { FieldError, UseFormRegister } from "react-hook-form";
import { z, ZodType } from "zod";

export type Product = {
    id: string,
    name: string,
    description: string,
    price: number,
    brand: string,
    category?: string,
    thumbnail: string,
    images: string[],
}


export type ProductFormData = {
    id?: string
    name: string
    brand: string
    description: string
    price: number
    thumbnail: string
}


export type FormFieldProps = {
    className?: string;
    type: string;
    label: string;
    placeholder: string;
    name: ValidFieldNames;
    register: UseFormRegister<ProductFormData>;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
};

export type ValidFieldNames =
    | "id"
    | "name"
    | "brand"
    | "description"
    | "price"
    | "thumbnail";


export const ProductSchema: ZodType<ProductFormData> = z
    .object({
        // id: z.string({
        // }),
        name: z.string({
            required_error: "Name is required",
            invalid_type_error: "Name should be a string",
        }).trim().min(1, { message: "Name is required" }),
        brand: z.string(),
        description: z.string(),
        price: z.number({
            required_error: "Price is required",
            invalid_type_error: "Price must be a number between 1-9998",
            message: "Price is required"
        })
            .min(1, { message: "Price must be a value between 1 - 9999" })
            .max(9999),
        thumbnail: z.string()
        //     .trim().min(1, { message: "Image URL is required" }),
        // .url()
    })
