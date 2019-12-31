import React, { useState, useEffect } from 'react';
import {Link, Router} from 'router';

import Home from '../../views/home';
import Page1 from '../../views/page1/async';
import Page2 from '../../views/page2';
import PageNotFound from '../../views/404';

import Order from '../../views/order';
import Partition from '../../views/partition';
import PartitionMerge from '../../views/partition/merge';
import Group from '../../views/group';
import Template from '../../views/template';
import Log from '../../views/log';
console.log("【use】", useState, useEffect)
class Body extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            menus: [
                {name: '分区模板', to: 'templates', icon: <i class="icon iconfont" style={{color:'#03b0ce'}}>&#xe730;</i>, title: '模板管理'},
                {name: '安装分区', to: 'par_merge', icon: <i class="icon iconfont" style={{color:'#009688'}}>&#xe711;</i>},
                {name: '分区管理', to: 'partitionss', icon: <i class="icon iconfont" style={{color:'#2196F3'}}>&#xe672;</i>},
                {name: '分组管理', to: 'groups', icon: <i class="icon iconfont" style={{color:'#ff8345'}}>&#xe613;</i>},
                {name: '补发记录', to: 'page2', icon: <i class="icon iconfont" style={{color:'#009688'}}>&#xe60d;</i>},
                {name: '订单补发', to: 'page2', icon: <i class="icon iconfont" style={{color:'#2196F3'}}>&#xe642;</i>},
                {name: '提现记录', to: 'page2', icon: <i class="icon iconfont" style={{color:'#009688'}}>&#xe6bb;</i>},
                {name: '用户日志', to: 'log', icon: <i class="icon iconfont" style={{color:'#2196F3'}}>&#xe6aa;</i>},
                {name: '获取代码', to: 'page2', icon: <i class="icon iconfont" style={{color:'#ff8345'}}>&#xe606;</i>}
            ]
        };

        this.onClick = this.onClick.bind(this);
    }

    onClick(item) {
        console.log(item.name)
    }

    render() {
        return (
            <div class="container">
                <div class="control">
                    <div class="title bg-primary">控制面板</div>
                    <div class="wrapper">
                        {this.state.menus.map(menu =>
                            <Link to={menu.to} getProps={({ isCurrent }) => {
                                return {class: isCurrent ? "menu on" : "menu"};
                              }} onClick={() => this.onClick(menu)}>{menu.icon}{menu.name}</Link>
                        )}
                        <Link to="page2">
                            <i class="icon iconfont" style={{color:'#ff35f2'}}>&#xe610;</i>下载网关
                        </Link>
                        <Link to="page2">
                            <i class="icon iconfont" style={{color:'#d83420'}}>&#xe659;</i>退出登录
                        </Link>
                    </div>
                </div>
                <div class="content">
                    <div class="title"></div>
                    <Router class="body">
                        <Home path="mer"/>
                        <Home path="/"/>
                        <Page2 path="page2"/>
                        <Order path="orders"/>
                        <Partition path="partitionss"/>
                        <PartitionMerge path="par_merge"/>
                        <Group path="groups"/>
                        <Template path="templates"/>
                        <Log path="log"/>
                        <PageNotFound default />
                    </Router>
                </div>
            </div>
        );
    }

}

module.exports = Body;
