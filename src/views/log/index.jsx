import React from 'react';
import Table from '../../utils/paging';

class Log extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            fields: [
                {key: 'dateTime', label: '记录时间', render: (item) => new Date(item.dateTime).format('MM-dd HH:mm:ss')},
                {key: 'discription', label: '日志记录'},
                {key: 'ip', label: '访问IP'},
                {key: 'message', label: '描述'}
            ]
        }
    }
    
    componentDidMount() {
        
    }

    render() {
        return (
            <div>
                <Table url="/mer/log/list" fields={this.state.fields} />
            </div>
        );
    }
}

module.exports = Log;