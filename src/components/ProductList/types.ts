export interface IProductProps {
    id: number;
    name: string;
    description: string;
    category: string;
    quantity: number;
    unit: string;
    image?: string;
}


export interface ProductListProps {
    products: IProductProps[];
}
