import React from 'react';
import {Link} from 'router';

import Table from '../../utils/paging';
import {Input, Selector, CheckBox, FormGroup} from '../../components/tools'
import {groupList, partitionList, productList} from '../../api/api';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Vanson',
            date: new Date(),
            data: [],
            fields: [
                {key: 'orderNumber', label: '订单号', render: (item) => <a href="javascript:;" class="link">{item.orderNumber}</a>},
                {key: 'playerAccount', label: '充值账号'},
                {key: 'partitionName', label: '分区'},
                {key: 'amount', label: '充值金额'},
                {key: 'merchantProfit', label: '利润'},
                {key: 'productName', label: '充值方式'},
                {key: 'orderDate', label: '充值时间', render: (item) => new Date(item.orderDate).format('MM-dd HH:mm:ss')},
                {key: 'state', label: '订单状态', render: () => <span class="labels labels-l bg-success">成　功</span>}
            ]
        }
		console.log(new Date())
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({
            name: e.target.value
        });
    }
	
	componentDidMount() {
		fetch('http://192.168.0.100/mer/product/list').then(res => res.json())
        .then(data => {
            console.log(data);
            this.setState({
                data: data
            })
        }).catch(e => console.log(e));
	}

    render() {
        return (
            <div>
                <div class="option-setting">
                    <div class="option-info">
                        <ul class="user-col">
                            <li>
                                <span>今日充值</span>
                                <span>0.00</span>
                            </li>
                            <li>
                                <span>今日利润</span>
                                <span>0.00</span>
                            </li>
                            <li>
                                <span>等待发送</span>
                                <span>0</span>
                            </li>
                            <li class="divide">
                                <span>代理利润</span>
                                <span>0.00</span>
                            </li>
                            <li>
                                <span>下属商户</span>
                                <span>2</span>
                            </li>
                            <li class="no-float inline-block">
                                <span>代理充值</span>
                                <span>0.00</span>
                            </li>
                        </ul>
                        <div class="dot-line">
                            <ul class="notice"></ul>
                        </div>
                    </div>
                </div>
                <div class="option-setting">
                    <div class="option-title"><i class="icon iconfont" style={{color: '#00bcd4'}}>&#xe652;</i>功能设置</div>
                    <div class="col-xs-6 pl-0 pull-left">
                        <ul class="option-box">
                            <li>
                                <span class="option-row-icon">订单通知</span>
                                <span>
                                    使用微信接收订单通知推送，<Link to="" class="link">绑定微信</Link>
                                </span>
                                <span></span>
                            </li>
                            <li>
                                <span class="option-row-icon">玩家留言</span>
                                <span>开启 <Link to="" class="link">留言箱(0)</Link>，玩家可以向您反映充值问题</span>
                                <span></span>
                            </li>
                            <li class="border-0">
                                <span class="option-row-icon">留言通知</span>
                                <span>使用微信接收玩家留言并通过微信回复玩家</span>
                                <span></span>
                            </li>
                        </ul>
                    </div>
                    <div class="col-xs-6 pr-0">
                        <ul class="option-box">
                            <li>
                                <span class="option-row-icon">在线客服</span>
                                <span>
                                    使用微信接收订单通知推送，<Link to="" class="link">绑定微信</Link>
                                </span>
                                <span></span>
                            </li>
                            <li>
                                <span class="option-row-icon">手机号码</span>
                                <span>
                                玩家充值时可提供 <b class="link">手机号码</b>，方便后续订单查询
                                </span>
                                <span></span>
                            </li>
                            <li class="border-0">
                                <span class="option-row-icon">注册推广</span>
                                <span>
                                    使用微信接收订单通知推送，<Link to="" class="link">绑定微信</Link>
                                </span>
                                <span></span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="option-setting">
                    <div class="option-title" style={{padding: 0}}>最新充值订单</div>
                    <Table url="/mer/order/list?orderDate=2019-12-27 00:00:00&payDate=2019-12-27 20:00:00&state=1&payAmount=" fields={this.state.fields} page-size="10" no-paging="true" />
                </div>
            </div>
        );
    }
}

module.exports = Home;