export interface IProduct {
    id: string,
    name: string,
    description: string,
    price: number,
    make: string,
    category?: string,
    thumbnail: string,
    images: string[],
}
