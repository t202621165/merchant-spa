import React from 'react';
import Table from '../../utils/paging';
import {Selector, FormGroup} from '../../components/tools';
import {groupList, partitionList, productList} from '../../api/api';

class Order extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            fields: [
                {key: 'orderDate', label: '充值时间', render: (item) => new Date(item.orderDate).format('MM-dd HH:mm:ss')},
                {key: 'orderNumber', label: '订单号', render: (item) => <a href="javascript:;" class="link">{item.orderNumber}</a>},
                {key: 'playerAccount', label: '游戏帐号'},
                {key: 'partitionName', label: '分区'},
                {key: 'amount', label: '充值金额'},
                {key: 'merchantProfit', label: '利润'},
                {key: 'productName', label: '充值方式'},
                {key: 'state', label: '订单状态', render: (item) => {
                    if (item.state == 2) {
                        return <button class="btn btn-min bg-primary">补发</button>
                    }
                    let s = this.state.states[item.state];
                    return <span class={'labels labels-l ' + s.clazz}>{s.content}</span>;
                }}
            ],
            states: [
				{clazz:"bg-danger", content: "待付款"},
				{clazz:"bg-success", content: "成　功"},
				{clazz:"bg-info", content: "待发送"},
				{clazz:"orange", content: "已退款"}
            ],
            groups: [],
            partitions: [],
            products: []
        }
    }
    
    componentDidMount() {
        groupList(data => {
            this.setState({
                groups: data
            });
        });
        partitionList(data => {
            this.setState({
                partitions: data
            });
        });
        productList(data => {
            this.setState({
                products: data
            });
        });
    }

    render() {
        return (
            <div>
                
                <div class="col-xs-4 pl-0">
                    <FormGroup title="开始时间">
                        <input class="form-control calendar" id="startDate" name="orderDate" type="text" placeholder="-年-月-日  --:--:--" readOnly/>
                        <i class="icon iconfont">&#xe6c5;</i>
                    </FormGroup>
                </div>
                <div class="col-xs-4">
                    <FormGroup title="结束时间">
                        <input class="form-control calendar" id="endDate" name="payDate" type="text" placeholder="-年-月-日  --:--:--" readOnly/>
                        <i class="icon iconfont">&#xe6c5;</i>
                    </FormGroup>
                </div>
                <div class="col-xs-4 pr-0">
                    <FormGroup title="订单编号">
                        <input class="form-control" name="orderNumber" type="text" placeholder="请输入订单号"/>
                    </FormGroup>
                </div>
                <div class="col-xs-4 pl-0">
                    <FormGroup title="所属分组">
                        <Selector name="groupId" items={this.state.groups} t-f="name" v-f="id"/>
                    </FormGroup>
                </div>
                <div class="col-xs-4">
                    <FormGroup title="所属分区">
                        <Selector name="partition.id" items={this.state.partitions} t-f="name" v-f="id"/>
                    </FormGroup>
                </div>
                <div class="col-xs-4 pr-0">
                    <FormGroup title="充值方式">
                        <Selector name="product.id" items={this.state.products} t-f="name" v-f="id"/>
                    </FormGroup>
                </div>
                <div class="col-xs-4 pl-0">
                    <FormGroup title="游戏帐号">
                        <input class="form-control" name="playerAccount" type="text" placeholder="请输入游戏帐号"/>
                    </FormGroup>
                </div>
                <div class="col-xs-4">
                    <FormGroup title="分区名称">
                        <input class="form-control" name="discription" type="text" placeholder="根据游戏分区名模糊查询"/>
                    </FormGroup>
                </div>
                <div class="col-xs-4 pr-0">
                    <FormGroup title="充值金额">
                        <input class="form-control" name="orderNumber" type="text" placeholder="请输入订单号"/>
                    </FormGroup>
                </div>
                <div class="text-center" style={{padding: 3}}>
                    <button class="btn bg-success" style={{marginRight: 5}}>上一天</button>
                    <button class="btn bg-primary" style={{marginRight: 5}}>今天</button>
                    <button class="btn bg-success" style={{marginRight: 5}}>下一天</button>
                    <button class="btn bg-info">查询</button>
                </div>
                <div class="progress progress-active" data-percent="55%">
					<div class="progress-bar" style={{width: '55%'}}></div>
				</div>
                {/* <Table items={this.state.data} fields={this.state.fields} /> */}
                <Table url="/mer/order/list?orderDate=2019-11-27 00:00:00&payDate=2019-11-27 20:00:00&payAmount=" fields={this.state.fields} />
            </div>
        );
    }
}

module.exports = Order;