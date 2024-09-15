interface Product {
    id: number;
    barcode: number;
    product_brand: string;
    product_name: string;
    product_quantity: number;
    price: number;
}

export const formTable = (
    data: Product[],
    barcode?: number,
    model?: string,
    brand?: string,
    priceFrom?: number,
    priceTo?: number
): Product[] => {
    return data
        .filter(
            (product) =>
                (!barcode || product.barcode.toString().includes(barcode.toString())) &&
                (!model || product.product_name.toLowerCase().includes(model.toLowerCase())) &&
                (!brand || (brand === "Выбрать все" || product.product_brand.toLowerCase().includes(brand.toLowerCase()))) &&
                (!priceFrom || product.price >= priceFrom) &&
                (!priceTo || product.price <= priceTo)
        )
        .sort((a, b) => {
            return a.price - b.price;
        });
};