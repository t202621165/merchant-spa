import React from 'react';
import {Link} from 'router';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menus: [
                {name: '首　页', to: 'mer', icon: <i class="icon iconfont">&#xe61e;</i>},
                {name: '订单管理', to: 'orders', icon: <i class="icon iconfont">&#xe64e;</i>},
                {name: '分区管理', to: 'partitionss', icon: <i class="icon iconfont">&#xe672;</i>},
                {name: '数据分析', to: 'page2', icon: <i class="icon iconfont">&#xe600;</i>},
                {name: '账户管理', to: 'page2', icon: <i class="icon iconfont">&#xe601;</i>},
                {name: '代理系统', to: 'page2', icon: <i class="icon iconfont">&#xe689;</i>}
            ]
        };
    }

    componentDidMount() {
        console.log(location.pathname);
    }

    render() {
        return (
            <div class="header bg-primary">
                <div class="header-content">
                    <div id="menu">
                        {this.state.menus.map(menu =>
                            <Link to={menu.to} getProps={({ isCurrent }) => {
                                return {class: isCurrent ? "menu on" : "menu"};
                              }}>{menu.icon}{menu.name}</Link>
                        )}
                        <a href="javascript:;" class="users"><i class="icon iconfont">&#xe60c;</i>a123</a>
                    </div>
                </div>
            </div>
        );
    }

}

module.exports = Header;
