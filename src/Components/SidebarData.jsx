import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as BsIcons from 'react-icons/bs';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Recepciones',
    path: '/recepciones',
    icon: <FaIcons.FaWarehouse />,
    cName: 'nav-text'
  },
  {
    title: 'Pedidos',
    path: '/pedidos',
    icon: <FaIcons.FaWarehouse />,
    cName: 'nav-text'
  },
  {
    title: 'Stock',
    path: '/stock',
    icon: <FaIcons.FaWarehouse />,
    cName: 'nav-text'
  },


  {
    title: 'Proveedores',
    path: '/add-prov',
    icon: <FaIcons.FaUserTie />,
    cName: 'nav-text'
  },
  
  {
    title: 'Categorias',
    path: '/add-cat',
    icon: <BsIcons.BsFillCalendarWeekFill />,
    cName: 'nav-text'
  },
  {
    title: 'SubCategorias',
    path: '/add-subcat',
    icon: <BsIcons.BsFillCalendar2WeekFill />,
    cName: 'nav-text'
  },
  {
    title: 'Tipos de Producto',
    path: '/add-tipoProd',
    icon: <FaIcons.FaWarehouse />,
    cName: 'nav-text'
  },
  
  {
    title: 'Deposito',
    path: '/deposito',
    icon: <FaIcons.FaWarehouse />,
    cName: 'nav-text'
  },
   
];