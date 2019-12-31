import React from 'react';
import Table from '../../utils/paging';
import {Input, Selector, CheckBox, FormGroup} from '../../components/tools';
import {groupList, templateList} from '../../api/api';

class Partition extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            fields: [
                {key: 'id',render: (item, index) => <CheckBox id={'p-' + (isNaN(index) ? 'all' : index)} name={item?'id':''} value={item?item.id:''}/>},
                {key: 'sort', label: '排序', render: (item) => <Input type="text" value={item.sort} style={{width: 45,height: 25,lineHeight: '23px\0'}}/>},
                {key: 'name', label: '名称', render: (item) => item.name},
                {key: 'currencyName', label: '游戏币'},
                {key: 'serverIp', label: '服务器'},
                {key: 'scriptPath', label: '路径'},
                {key: 'id', label: '操作', render: (item) => {
                    return (
                        <div class="btn-group">
                            <a class="btn bg-primary" href="">充值</a>
                            <a class="btn bg-primary" href="">检测</a>
                            <a class="btn bg-primary" href="">编辑</a>
                            <a class="btn bg-primary" href="">加载</a>
                            <a class="btn bg-primary" href="">克隆</a>
                            <a class="btn bg-primary" href="">补发</a>
                            <a class="btn bg-danger" href="">删除</a>
                        </div>
                    );
                }}
            ],
            groups: [],
            templates: []
        }
    }

    componentDidMount() {
        groupList(data => {
            this.setState({
                groups: data
            });
        });
        templateList(data => {
            this.setState({
                templates: data
            });
        });
    }

    render() {
        return (
            <div>
                <div class="col-xs-3 pl-0">
                    <FormGroup id="group" title="所属分组">
                        <Selector name="product.id" items={this.state.groups} t-f="name" v-f="id"/>
                    </FormGroup>
                </div>
                <div class="col-xs-3 pr-0">
                    <FormGroup id="template" title="分区模版">
                        <Selector name="template.id" items={this.state.templates} t-f="name" v-f="id"/>
                    </FormGroup>
                </div>
                <div style={{marginBottom: 10}}><b>提示：</b>关于“<b>热血传奇</b>”支持第二种游戏币,如人民币，用户可以通过克隆分区方式实现。</div>
                {/* <Table items={this.state.data} fields={this.state.fields} /> */}
                <Table url="/mer/partition/list" fields={this.state.fields} />
            </div>
        );
    }
}

module.exports = Partition;