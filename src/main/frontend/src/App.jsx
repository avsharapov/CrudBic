import React from "react";
import * as api from "./Api.jsx"
import Table from "./Table/index.jsx";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            totalSize: 0,
            needUpdate: false
        };
    }

    componentDidMount() {
        this.getAllItem();
    }

    createItem = () => {

    };
    deleteItem = (id) => {
        api.deleteItem(id).then(() => {
            this.getAllItem();
        }).catch((err) => {
            console.log("Удаление элемента завершилось ошибкой: ", err)
        });
    };
    updateItem = () => {
    };
    getAllItem = () => {
        const data = api.initData();
        data.then((response) => {
                const table = response.data.map(o => {
                    o.pzn = o.pzn != null ? o.pzn.name : "";
                    o.rgn = o.rgn != null ? o.rgn.name + " " + o.rgn.center : "";
                    o.tnp = o.tnp != null ? o.tnp.fullname : "";
                    o.uer = o.uer != null ? o.uer.uername : "";
                    o.dt_izm = o.dt_izm != null ? (new Date(o.dt_izm)).toLocaleDateString() : "";
                    o.date_in = o.date_in != null ? (new Date(o.date_in)).toLocaleDateString() : "";
                    o.date_ch = o.date_ch != null ? (new Date(o.date_ch)).toLocaleDateString() : "";
                    return o;
                });
                this.setState({data: table, totalSize: table.length});
            }
        ).catch((err) => {
            console.log("При получении данных возникла ошибка: ", err)
        });
    };

    render() {
        return (
            <Table
                data={this.state.data} createHandler={this.createItem} deleteHandler={this.deleteItem}
                editHandler={this.updateItem}>
            </Table>
        );
    }
}

export default App;