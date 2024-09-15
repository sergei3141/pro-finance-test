import { useEffect, useState } from 'react';

import { Avatar, Button, Divider, Input, Select, Space } from 'antd';
import {
  CalendarOutlined,
  DeleteOutlined,
  ExportOutlined,
  FileTextOutlined,
  FolderAddOutlined,
  FolderOpenOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { DataType, HeaderProps, FilterProduct } from '../interfaces/interfaces';

import dataProduct from '../DATA.json';
import { formTable } from './Filter';
import '../css/Header.css'

function Header(props: HeaderProps): JSX.Element {

  const [product, setProduct] = useState<FilterProduct>({
    barcode: 0,
    product_name: '',
    product_brand: '',
    priceFrom: 0,
    priceTo: 0
  })
  
  // Сoбирает уникальные брендов для фильтра
  const uniqueBrands = dataProduct
    .map((product) => product.product_brand)
    .filter((brand, index, self) => self.indexOf(brand) === index)
    .map((brand) => ({ text: brand, value: brand }));
  uniqueBrands.unshift({ text: ' ', value: 'Выбрать все' });
  
  useEffect(() => {
    handleSubmit();
  }, []);
  
  const handleSubmit = (): void => {
    const result: DataType[] = formTable(
      dataProduct,
      product.barcode, 
      product.product_name, 
      product.product_brand, 
      product.priceFrom, 
      product.priceTo);

    props.onFormTable(result);
  };
  
  const handleExportSubmit = (): void => {
    props.onFormExport();
  };

  return(
    <>
      <header className="header">
        <div className="header__left">
          <div className="header__user">
            <Avatar icon={<UserOutlined />} size={22} className="header__avatar"/>
            Берсенев С. С
          </div>
          <div className="header__option">
            <CalendarOutlined className="header__icon"/> Тариф до 15.04.2024
          </div>
        </div>
        <div className="header__right">
          <Button className="header__button header__button--logout">Выйти</Button>
          <Button className="header__button header__button--about">О нас ▸</Button>
        </div>
      </header>

      <section>
        <div className="section__header flex-class">
          <h1>Остатки сформированы на 01.04.2023 г.</h1>
          <Button className="section__button">
            <FileTextOutlined />
            Инструкции
          </Button>
        </div>

        <div className="filters flex-class">
          <div className="filter filter--barcode">
            <p className="filter__label">Баркод</p>
            <Input 
              type="number" 
              min="0" 
              placeholder="4376239621367" 
              variant="filled" 
              onChange={(e)=>{setProduct({ ...product, barcode: Number(e.target.value)})}}/>
          </div>

          <div className="filter filter--name">
            <p className="filter__label">Наименование</p>
            <Input 
              placeholder="RedmiNote 8" 
              variant="filled" 
              onChange={(e)=>{setProduct({ ...product, product_name: e.target.value})}}/>
          </div>

          <div className="filter filter--manufacturer">
            <p className="filter__label">Производитель</p>
            <Space.Compact>
              <Select 
                defaultValue="Выбрать все" 
                options={uniqueBrands} 
                className='filter--manufacturer-input'
                style={{height:31, width:'100%'}}
                onChange={(e)=>{setProduct({ ...product, product_brand: e})}}/>
            </Space.Compact>
          </div>

          <div className="filter filter--price">
            <p className="filter__label">Цена</p>
            <Input 
              type="number" 
              min="0" 
              placeholder="От" 
              variant="filled" 
              onChange={(e)=>{setProduct({ ...product, priceFrom: Number(e.target.value)})}}/>
            <Input 
              type="number" 
              min="0" 
              placeholder="До" 
              variant="filled" 
              onChange={(e)=>{setProduct({ ...product, priceTo: Number(e.target.value)})}}/>
          </div>
        </div>

        <div className="actions">
          <Button className="actions__button actions__button--submit" onClick={handleSubmit}>
            Сформировать
          </Button>
          <Button className="actions__button actions__button--export" onClick={handleExportSubmit}>
            <ExportOutlined className="actions__icon" />
            Экспорт
          </Button>
        </div>

        <Divider />

        <div className="section__footer flex-class">
          <div className="footer__left flex-class">
            <div className="footer__item">
              <FolderOpenOutlined /> Загрузить данные из csv
            </div>
            <div className="footer__item">
              <FolderAddOutlined /> Изменить данные
            </div>
          </div>
          <div className="footer__right">
            Очистить  <DeleteOutlined />
          </div>
        </div>

        <Divider />
      </section>
    </>
  )
};

  export default Header