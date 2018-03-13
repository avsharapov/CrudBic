import {selectFilter, textFilter} from "react-bootstrap-table2-filter";

export const initialState = {
    data: [],
    additionalData: {
        'pzn': {},
        'rgn': {},
        'uer': {},
        'tnp': {}
    },
    totalSize: 0,
    page: 1,
    sizePerPage: 10,
    viewData: [],
    rowSelected: {rowIndex: null, itemId: null},
    modalIsVisible: false,
    modalType: '',
    columnConfigs: [{
        dataField: 'id',
        text: 'ID',
        sort: true,
        hidden: true
    }, {
        dataField: 'real',
        text: 'REAL',
        sort: true,
        type: 's',
        title: () => 'Код контроля допустимости проведения расчётных операций',
        headerTitle: () => 'Код контроля допустимости проведения расчётных операций'
    }, {
        dataField: 'pzn',
        text: 'PZN',
        sort: true,
        type: 'o',
        title: () => 'Код типа участника расчётов',
        headerTitle: () => 'Код типа участника расчётов'
    }, {
        dataField: 'uer',
        text: 'UER',
        sort: true,
        type: 'o',
        title: () => 'Код типа участника (полльзователя) системы электронных расчётов',
        headerTitle: () => 'Код типа участника (полльзователя) системы электронных расчётов'
    }, {
        dataField: 'rgn',
        text: 'RGN',
        sort: true,
        type: 'o',
        title: () => 'Код территории Российской федерации',
        headerTitle: () => 'Код территории Российской федерации'
    }, {
        dataField: 'ind',
        text: 'IND',
        sort: true,
        type: 's',
        title: () => 'Индекс',
        headerTitle: () => 'Индекс'
    }, {
        dataField: 'tnp',
        text: 'TNP',
        sort: true,
        type: 'o',
        title: () => 'Код типа населенного пункта',
        headerTitle: () => 'Код типа населенного пункта'
    }, {
        dataField: 'nnp',
        text: 'NNP',
        sort: true,
        type: 's',
        title: () => 'Населённый пункт',
        headerTitle: () => 'Населённый пункт'
    }, {
        dataField: 'adr',
        text: 'ADR',
        sort: true,
        type: 's',
        title: () => 'Адрес',
        headerTitle: () => 'Адрес'
    }, {
        dataField: 'rkc',
        text: 'RKC',
        sort: true,
        type: 's',
        title: () => 'БИК РКЦ(ГРКЦ)',
        headerTitle: () => 'БИК РКЦ(ГРКЦ)'
    }, {
        dataField: 'namep',
        text: 'NAMEP',
        sort: true,
        type: 's',
        title: () => 'Наименование участника расчётов',
        headerTitle: () => 'Наименование участника расчётов'
    }, {
        dataField: 'newnum',
        text: 'NEWNUM',
        sort: true,
        type: 's',
        title: () => 'Банковский идентификационный код (БИК)',
        headerTitle: () => 'Банковский идентификационный код (БИК)'
    }, {
        dataField: 'telef',
        text: 'TELEF',
        sort: true,
        type: 's',
        title: () => 'Телефон',
        headerTitle: () => 'Телефон'
    }, {
        dataField: 'regn',
        text: 'REGN',
        sort: true,
        type: 's',
        title: () => 'Регистрационный номер',
        headerTitle: () => 'Регистрационный номер'
    }, {
        dataField: 'okpo',
        text: 'OKPO',
        sort: true,
        type: 's',
        title: () => 'Код ОКПО',
        headerTitle: () => 'Код ОКПО'
    }, {
        dataField: 'dt_izm',
        text: 'DT_IZM',
        sort: true,
        type: 'd',
        title: () => 'Дата последнего изменения записи',
        headerTitle: () => 'Дата последнего изменения записи'
    }, {
        dataField: 'ksnp',
        text: 'KSNP',
        sort: true,
        type: 's',
        title: () => 'Номер счёта',
        headerTitle: () => 'Номер счёта'
    }, {
        dataField: 'date_in',
        text: 'DATE_IN',
        sort: true,
        type: 'd',
        title: () => 'Дата включения информации об участнике расчётов в ЭБД',
        headerTitle: () => 'Дата включения информации об участнике расчётов в ЭБД'
    }, {
        dataField: 'date_ch',
        text: 'DATE_CH',
        sort: true,
        type: 'd',
        title: () => 'Дата контроля',
        headerTitle: () => 'Дата контроля'
    }]
};