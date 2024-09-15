import React from 'react';
import {
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
  CloseOutlined,
  WechatOutlined
} from '@ant-design/icons';

import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';

import '../css/Leftbar.css'



type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  { key: '1', icon: <PieChartOutlined />, label: 'Настройки', children: [
    { key: '1.1', label: 'Конфиденциальность' },
    { key: '1.2', label: 'Настроки темы' },
    { key: '1.3', label: 'Управление' }
  ] },
  { key: '2', icon: <DesktopOutlined />, label: 'Внесение данных', children: [
    { key: '2.1', label: 'В формате Exel' },
    { key: '2.2', label: 'В формате .ds' }
  ] },
  { key: '3', icon: <ContainerOutlined />, label: 'Отчёты', children: [
    { key: '3.1', label: 'Составить отчёт' },
    { key: '3.2', label: 'Управление отчётами' },
    { key: '3.3', label: 'Архивы' },
    { key: '3.4', label: 'Черновики' }
  ] },
  { key: '4', icon: <MailOutlined />, label: 'Базы знаний', children: [
    { key: '4.1', label: 'Чтение из базы' },
    { key: '4.2', label: 'Чтение из архива' }
  ]},
];

const Leftbar: React.FC = () => {

  return (
    <div className="leftbar">
      <div className="leftbar__card">
        <div className="leftbar__card-header">
          <div className="leftbar__logo-wrapper">
            <p className="leftbar__logo">ФИН</p>
            <p className="leftbar__title"> Контроль</p>
          </div>
          <Button shape="round" icon={<CloseOutlined />} className="leftbar__card-button">
            Меню
          </Button>
        </div>
        <Menu
          mode="inline"
          theme="dark"
          items={items}
          className="leftbar__menu"
        />
      </div>

      <div className="leftbar__card">
        <div className="leftbar__card-title">
          <p className="leftbar__card-text">
            Техническая поддержка
          </p>
          <div className="leftbar__support-info-wrapper">
            <div className="leftbar__support-info">
              <p className="leftbar__card-shadow-text">Номер поддержки</p>
              <p className="leftbar__card-text">998 (33) 322 48 55</p>
            </div>
            <div className="leftbar__support-info">
              <p className="leftbar__card-shadow-text">Почта поддержки</p>
              <p className="leftbar__card-text">sergei3141@mail.ru</p>
            </div>
          </div>
          <div>
            <p className="leftbar__card-shadow-text">Часы работы</p>
            <p className="leftbar__card-text">ПН - ПТ с 9:00 до 19:00 мск</p>
          </div>
          <ul>
            <li className="leftbar__card-shadow-text">Пользовательское соглашение</li>
            <li className="leftbar__card-shadow-text">Политика конфиденциальности</li>
            <li className="leftbar__card-shadow-text">Юридическая информация</li>
            <li className="leftbar__card-shadow-text">Публтичная оферта</li>
          </ul>
        </div>
      </div>

      <Button type="primary" className="leftbar__contact-button">
        <WechatOutlined />Связаться с нами
      </Button>
    </div>
  );
};

export default Leftbar;