export interface DataType {
  id: number;
  barcode: number;
  product_brand: string;
  product_name: string;
  product_quantity: number;
  price: number;
}

export interface FilterProduct {
  barcode: number;
  product_brand: string;
  product_name: string;
  priceFrom: number;
  priceTo: number;
}

export interface MainTableProps {
  data: DataType[];
  onFormTable: (params: DataType[]) => void; 
}

export interface InputData {
  valueFromInput: string | number;
  dataIndex: 'barcode' | 'price' | 'product_quantity' | string;
  record: { id: number };
}

export interface HeaderProps {
  onFormTable: (result: DataType[]) => void;
  onFormExport: () => void;
}