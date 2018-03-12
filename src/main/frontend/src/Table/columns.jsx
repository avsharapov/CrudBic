import React from 'react';
import {textFilter} from 'react-bootstrap-table2-filter';


const headerOnFilterFormatter = (column, colIndex, {sortElement, filterElement}) => (
    <div style={{display: 'flex', flexDirection: 'column-reverse'}}>
        {filterElement}
        {column.text}
        {sortElement}
    </div>
);

export const ColumnsConfig = [{
    dataField: 'id',
    text: 'ID',
    sort: true,
    headerFormatter: headerOnFilterFormatter,
    hidden: true
}, {
    dataField: 'real',
    text: 'REAL',
    sort: true,
    headerFormatter: headerOnFilterFormatter,
    /*    title: 'Код контроля допустимости проведения расчётных операций'*/
}, {
    dataField: 'pzn',
    text: 'PZN',
    filter: textFilter({placeholder: '...'}),
    headerFormatter: headerOnFilterFormatter,
    sort: true,
    /*    title: 'Код типа участника расчётов'*/
}, {
    dataField: 'uer',
    text: 'UER',
    sort: true,
    headerFormatter: headerOnFilterFormatter,
    /*    title: 'Код типа участника (полльзователя) системы электронных расчётов'*/
}, {
    dataField: 'rgn',
    text: 'RGN',
    filter: textFilter({placeholder: '...'}),
    headerFormatter: headerOnFilterFormatter,
    sort: true,
    /*    title: 'Код территории Российской федерации'*/
}, {
    dataField: 'ind',
    text: 'IND',
    sort: true,
    headerFormatter: headerOnFilterFormatter,
    /*    title: 'Индекс'*/
}, {
    dataField: 'tnp',
    text: 'TNP',
    sort: true,
    headerFormatter: headerOnFilterFormatter,
    /*    title: 'Код типа населенного пункта'*/
}, {
    dataField: 'nnp',
    text: 'NNP',
    sort: true,
    headerFormatter: headerOnFilterFormatter,
    /*    title: 'Населённый пункт'*/
}, {
    dataField: 'adr',
    text: 'ADR',
    sort: true,
    headerFormatter: headerOnFilterFormatter,
    /*    title: 'Адрес'*/
}, {
    dataField: 'rkc',
    text: 'RKC',
    sort: true,
    headerFormatter: headerOnFilterFormatter,
    /*    title: 'БИК РКЦ(ГРКЦ)'*/
}, {
    dataField: 'namep',
    text: 'NAMEP',
    sort: true,
    headerFormatter: headerOnFilterFormatter,
    /*    title: 'Наименование участника расчётов'*/
}, {
    dataField: 'newnum',
    text: 'NEWNUM',
    filter: textFilter({placeholder: '...'}),
    headerFormatter: headerOnFilterFormatter,
    sort: true,
    /*    title: 'Банковский идентификационный код (БИК)'*/
}, {
    dataField: 'telef',
    text: 'TELEF',
    sort: true,
    headerFormatter: headerOnFilterFormatter,
    /*    title: 'Телефон'*/
}, {
    dataField: 'regn',
    text: 'REGN',
    sort: true,
    headerFormatter: headerOnFilterFormatter,
    /*    title: 'Регистрационный номер'*/
}, {
    dataField: 'okpo',
    text: 'OKPO',
    sort: true,
    headerFormatter: headerOnFilterFormatter,
    /*    title: 'Код ОКПО'*/
}, {
    dataField: 'dt_izm',
    text: 'DT_IZM',
    sort: true,
    headerFormatter: headerOnFilterFormatter,
    /*    title: 'Дата последнего изменения записи'*/
}, {
    dataField: 'ksnp',
    text: 'KSNP',
    sort: true,
    headerFormatter: headerOnFilterFormatter,
    /*    title: 'Номер счёта'*/
}, {
    dataField: 'date_in',
    text: 'DATE_IN',
    sort: true,
    headerFormatter: headerOnFilterFormatter,
    /*    title: 'Дата включения информации об участнике расчётов в ЭБД'*/
}, {
    dataField: 'date_ch',
    text: 'DATE_CH',
    sort: true,
    headerFormatter: headerOnFilterFormatter,
    /*    title: 'Дата контроля'*/
}];