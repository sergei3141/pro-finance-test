import React, { useState, useEffect } from 'react';
import type { TableColumnsType, TableProps } from 'antd';
import { Table } from 'antd';

import {MainTableProps, DataType, InputData} from '../interfaces/interfaces'

import dataProduct from '../DATA.json'



const MainTable: React.FC<MainTableProps> = ({ data, onFormTable }) => {

  const [filteredData, setFilteredData] = useState(dataProduct)
  const [totalCount, setTotalCount] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    setFilteredData(dataProduct)
    totalCalc(data)
  }, [])

  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    setFilteredData(extra.currentDataSource)
    onFormTable(extra.currentDataSource)
  };

  // Пересчитывает Итого
  const totalCalc = (data: DataType[]) => {
    let totalPrice: number = 0;
    let totalProductQuantity: number = 0;
  
    // Проверка на пустой массив
    if (!data) {
      data = filteredData;
    }
  
    data.forEach(({ price, product_quantity }) => {
      totalProductQuantity += product_quantity;
      totalPrice += price * product_quantity;
    });
  
    setTotalPrice(totalPrice);
    setTotalCount(totalProductQuantity);
  };

  // Компонента-input с валидацией
  const CustomInput: React.FC<InputData> = (inputData:InputData) => {

    const [inputValue, setInputValue] = useState(inputData.valueFromInput);
    
    const isNumericField = inputData.dataIndex === 'barcode' || inputData.dataIndex === 'price' || inputData.dataIndex === 'product_quantity';
    let input = inputValue;

  // Для полей 'barcode', 'price', 'product_quantity' значение преобразуем в число и убираем буквы, если нужно
    if(isNumericField && typeof inputValue === 'string'){
        const regex = /\D/g;
        input = Number(inputValue.replace(regex, ''))
    }

  // Пробегаемся по данным и изменяем затронутые пользователем поля
    const index = filteredData.findIndex((item: DataType) => {
      return item.id === inputData.record.id
    });

    if (index !== -1) {
      //@ts-ignore TS предполагает, что может придти несуществующий индекс
      filteredData[index][inputData.dataIndex] = input;
   }else{
    const index = data.findIndex((item: DataType) => item.id === inputData.record.id);
      //@ts-ignore TS предполагает, что может придти несуществующий индекс
    data[index][inputData.dataIndex] = input;
   }

    return (
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)} 
        onBlur={(e)=>{setInputValue(e.target.value);totalCalc(data)}}
        type={isNumericField ? 'number' : 'text'}
        min={isNumericField ? 0 : undefined}
      />
    );
  };
  
  // Antd-таблица
  const columns: TableColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Баркод',
      dataIndex: 'barcode',
      key: 'barcode',
      sorter: (a, b) => a.barcode - b.barcode,
      render: (valueFromInput, record) => {
        const dataIndex: string = 'barcode'
        return (<CustomInput valueFromInput={valueFromInput} record={record} dataIndex={dataIndex}/>)
        }
    },
    {
    title: 'Наименование',
    dataIndex: 'product_name',
    sorter: (a, b) => a.product_name.localeCompare(b.product_name),
    render: (valueFromInput, record) => {
      const dataIndex: string = 'product_name'
      return (<CustomInput valueFromInput={valueFromInput} record={record} dataIndex={dataIndex}/>)
      }
    },
    {
    title: 'Производитель',
    dataIndex: 'product_brand',
    sorter: (a, b) => a.product_name.localeCompare(b.product_name),
    render: (valueFromInput, record) => {
      const dataIndex: string = 'product_brand'
      return (<CustomInput valueFromInput={valueFromInput} record={record} dataIndex={dataIndex}/>)
      }
    },
    {
    title: 'Кол-во',
    dataIndex: 'product_quantity',
    sorter: (a, b) => a.product_quantity - b.product_quantity,
    render: (valueFromInput, record) => {
      const dataIndex: string = 'product_quantity'
      return (<CustomInput valueFromInput={valueFromInput} record={record} dataIndex={dataIndex}/>)
      }
    },
    {
    title: 'Цена',
    dataIndex: 'price',
    sorter: (a, b) => a.price - b.price,
    render: (valueFromInput, record) => {
      const dataIndex: string = 'price'
      return (<CustomInput valueFromInput={valueFromInput} record={record} dataIndex={dataIndex}/>)
      }
    },
];


  return(
      <>
        <Table 
          columns={columns} 
          dataSource={data} 
          onChange={onChange}
          scroll={{x: true, y: 800}}
          className='table'
          summary={() => {
            totalCalc(data)
            return (
              <>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0}>
                    <b>Total</b>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={1} />
                  <Table.Summary.Cell index={2} />
                  <Table.Summary.Cell index={3} />
                  <Table.Summary.Cell index={4}>
                    <b>{totalCount}</b>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={5}>
                    <b>{totalPrice}</b>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </>
            );
          }}
        />
    </>
  )
}

export default MainTable;
