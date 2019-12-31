import React from 'react';
import Table from '../../utils/paging';

class Template extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            games: ['', '热血传奇', '传奇世界', '传奇三'],
            fields: [
                {key: 'name', label: '模版名称'},
                {key: 'type', label: '游戏', render: (item) => item.type == 0 ? item.gameName : this.state.games[item.type]},
                {key: 'currencyName', label: '游戏币'},
                {key: 'ratio', label: '兑换比例'},
                {key: 'length', label: '分区个数', render: (item) => item.partitions.length},
                {key: 'id', label: '操作', render: (item) => {
                    return (
                        <div class="btn-group">
                            <a class="btn bg-primary" href="">编辑</a>
                            <a class="btn bg-danger" href="">删除</a>
                        </div>
                    );
                }}
            ]
        }
    }

    componentDidMount() {
        // fetch("/mer/group/list", {
        //     method: "POST"
        // })
    }

    render() {
        return (
            <div>
                {/* <Table items={this.state.data} fields={this.state.fields} /> */}
                <Table url='/mer/template/list' fields={this.state.fields} />
            </div>
        );
    }
}

module.exports = Template;