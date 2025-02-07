export interface IProductProps {
    id: number;
    name: string;
    description: string;
    category: string;
    quantity: number;
    price: number;
    image?: string;
}


export interface ProductListProps {
    products: IProductProps[];
}
