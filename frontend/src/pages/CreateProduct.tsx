import { useForm, SubmitHandler } from "react-hook-form"
import { ProductFormData, ProductSchema } from "../lib/types/products";
import FormField from "../components/FormField";
import { zodResolver } from "@hookform/resolvers/zod";

const CreateProduct = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProductFormData>({
        resolver: zodResolver(ProductSchema)
    });

    const onSubmit: SubmitHandler<ProductFormData> = (data) => console.log(data);
    // useEffect/useMutation for submitting data

    console.log(errors)

    return (
        <section className="bg-white -900">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 ">Add a new product</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <FormField
                            type="text"
                            placeholder="Bear Brand"
                            name="name"
                            label="Product Name"
                            error={errors.name}
                            register={register}
                            className="sm:col-span-2"
                        />
                        <FormField
                            type="text"
                            label="Brand"
                            placeholder="Nestle"
                            name="brand"
                            error={errors.brand}
                            register={register}
                            className="w-full"
                        />
                        <FormField
                            type="number"
                            label="Price"
                            placeholder="1"
                            name="price"
                            error={errors.price}
                            register={register}
                            className="w-full"
                            valueAsNumber
                        />
                        <FormField
                            type="text"
                            label="Image URL"
                            placeholder="https://image.link.com"
                            name="thumbnail"
                            error={errors.thumbnail}
                            register={register}
                            className="sm:col-span-2"
                        />
                        {/* <div>
                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 ">Category</label>
                            <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 -700 -600 -400  -primary-500 -primary-500">
                                <option selected>Select category</option>
                                <option value="TV">TV/Monitors</option>
                                <option value="PC">PC</option>
                                <option value="GA">Gaming/Console</option>
                                <option value="PH">Phones</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="item-weight" className="block mb-2 text-sm font-medium text-gray-900 ">Item Weight (kg)</label>
                            <input type="number" name="item-weight" id="item-weight" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 -700 -600 -400  -primary-500 -primary-500" placeholder="12" required />
                        </div> */}
                        <div className="sm:col-span-2">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                            <textarea {...register("description", { required: true })} id="description" rows={8} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 -700 -600 -400  -primary-500 -primary-500" placeholder="Your description here"></textarea>
                        </div>
                    </div>
                    <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-500 hover:bg-blue-600 rounded-lg focus:ring-4 focus:ring-primary-200 -primary-900 hover:bg-primary-800">
                        Add product
                    </button>
                </form>
            </div>
        </section>
    )
}

export default CreateProduct