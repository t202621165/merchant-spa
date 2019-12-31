import React from 'react';
import Table from '../../utils/paging';
import {Input} from '../../components/tools';

class Group extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            fields: [
                {key: 'createDate', label: '创建时间'},
                {key: 'name', label: '分组名称'},
                {key: 'length', label: '分区个数', render: (item) => item.partitionGroups.length},
                {key: 'uuid', label: '分组网址', clazz: 'text-l'},
                {key: 'id', label: '操作', render: (item) => {
                    return (
                        <div class="btn-group">
                            <a class="btn bg-primary" href="">编辑</a>
                            <a class="btn bg-primary" href="">充值</a>
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
                <Table url="/mer/group/list" fields={this.state.fields} />
            </div>
        );
    }
}

module.exports = Group;