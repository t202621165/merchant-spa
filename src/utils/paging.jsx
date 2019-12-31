import React from 'react';
import {Selector} from '../components/tools';

class Paging extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: props.fields,
            items: props.items || [],
            pageData: {},
            totalElements: 0,
            param: {
                number: 0,
                pageSize: props['page-size']||20
            },
            pageSizes: [
                {title: '10条/页', value: 10},
                {title: '20条/页', value: 20},
                {title: '30条/页', value: 30},
                {title: '50条/页', value: 50},
                {title: '100条/页', value: 100}
            ]
        }
        if (!props.items) {
            this.postData();
        }
    }

    postData() {
        let url = this.props.url;
        url = url + (url.indexOf('?') > -1 ? '&' : '?') + this.serialize();
        console.log("【Paging】", url)
        fetch('http://192.168.0.100' + url,{method: 'POST'}).then(res => res.json())
        .then(data => {
            console.log(data)
            this.setState({
                items: data.content||[],
                totalElements: data.totalElements||0,
                pageData: data
            })
        }).catch(e => console.log(e));
    }

    serialize() {
        var str = [];
        for (var key in this.state.param) {
            str.push(key + "=" + this.state.param[key]);
        }
        return str.join("&");
    }

    componentDidMount() {
        const row = <Row cloumns={this.state.fields}/>
        let h_items = [];
        this.state.fields.map(field => {
            h_items.push(<th class={field.clazz||''}>{field.label?field.label:field.render()}</th>);
        });
        this.setState({
            head: <tr>{h_items}</tr>,
            body: (item, index) => {
                return React.cloneElement(row,{item: item, index: index});
            }
        });
    }

    render() {
        return (
            <div>
                <table class="table">
                    {this.props['no-paging'] ? '' : (<caption>
                        共 <b>{this.state.totalElements}</b> 条，显示
                        <select class="form-control" style={{marginLeft: 10}}>
                            <option>10 条/页</option>
                            <option selected>20 条/页</option>
                            <option>30 条/页</option>
                            <option>50 条/页</option>
                        </select>
                    </caption>)}
                    <thead>{this.state.head}</thead>
                    <tbody>
                        {this.state.items.length == 0 ? (<tr><td colSpan={this.state.fields.length} style={{color: '#ccc'}}><p><i class="icon iconfont" style={{fontSize: 36}}>&#xe708;</i></p><p>暂无数据</p></td></tr>) : 
                            (this.state.items.map((item, index) =>
                            this.state.body(item, index)
                        ))}
                    </tbody>
                    {this.props['no-paging'] ? '' : (<tfoot>
                        <tr>
                            <td colSpan={this.state.fields.length} class="p-0">
                                {this.state.totalElements > this.state.param.pageSize ? (
                                    <div class="btn-paging pull-right">
                                        <button class="btn ">上一页</button>
                                        <button class="btn ">1</button>
                                        <button class="btn ">2</button>
                                        <button class="btn ">下一页</button>
                                    </div>
                                ) : ''}
                            </td>
                        </tr>
                    </tfoot>)}
                </table>
            </div>
        );
    }
}

class Row extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            item: props.item || {},
            index: props.index || 0
        };
    }

    render() {
        return (
            <tr>
                {
                    this.props.cloumns.map(c => <td class={c.clazz||''}>{c.render?c.render(this.state.item, this.state.index):this.state.item[c.key]}</td>)
                }
            </tr>
        );
    }
}

module.exports = Paging;