import React from 'react';
var number = 1;

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: props.type || 'text',
            value: props.value || ''
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({
            value: e.target.value
        });
    }

    render() {
        return <input class="form-control" type={this.state.type} value={this.props.value} onChange={this.props.onChange && this.props.onChange} style={this.props.style} />;
    }
}
class Selector extends React.Component {
    constructor(props) {
        super(props);
        let def = this.props.def||{title: '-请选择-', value: ''};
        this.state = {
            title: def.title,
            value: def.value,
            on: -1,
            def: def,
            no_def: this.props['no-def']||false,
            t_f: this.props['t-f'] || 'title',
            v_f: this.props['v-f'] || 'value',
            checked: false
        };
        this.onClick = this.onClick.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onCheck = this.onCheck.bind(this);
        this.onDefault = this.onDefault.bind(this);
    }

    onClick() {
        this.setState({
            checked: !this.state.checked
        });
    }

    onBlur() {
        this.setState({
            checked: false
        });
    }

    onCheck(item, index) {
        this.setState({
            title: item[this.state.t_f],
            value: item[this.state.v_f],
            on: index
        });
    }

    onDefault() {
        this.setState({
            title: this.state.def.title,
            value: this.state.def.value,
            on: -1
        });
    }

    render() {
        return (
            <div class={'selector form-control' + (this.state.checked ? ' on' : '')} title={this.state.title} tabIndex="1" onClick={this.onClick} onBlur={this.onBlur}>
                {this.state.title}
                <ul class="selector-list">
                    {!this.props['no-def'] && <li class={this.state.on == -1 ? 'on' :''} onClick={this.onDefault}>{this.state.def.title}</li>}
                    {this.props.children||this.props.items.map((item, index) => <li class={index == this.state.on ? 'on' :''} title={item[this.state.t_f]} onClick={() => this.onCheck(item, index)}>{item[this.state.t_f]}</li>)}
                </ul>
                <input name={this.props.name} value={this.state.value} type="hidden"/>
            </div>
        );
    }
}
class CheckBox extends React.Component {
    constructor(props) {
        super(props);
        let id = this.props.id;
        if (!this.props.id) {
            id = 'checkbox-' + number;
            number++;
        }
        this.state = {
            id: id
        }
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <div class={'form-checks ' + this.props['class-name']||''}>
                <input id={this.state.id} name={this.props.name} value={this.props.value} type="checkbox"/>
                <label for={this.state.id} class="check-box">{typeof this.props.children === 'string' ? this.props.children : ''}</label>
            </div>
        );
    }
}
class Radios extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class={'form-checks ' + this.props['class-name']||''}>
                <input id={this.props.id} name={this.props.name} value={this.props.value} type="radio"/>
                <label for={this.props.id} class="radios">{this.props.children}</label>
            </div>
        );
    }
}
class FormGroup extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <table class="tab-input-group">
                {
                    this.props['label-end'] ? (
                        <tr>
                            <td class="tig-head">
                                {this.props.children}
                            </td>
                            <td class="tab-input-addon tig-end">
                                <label for={this.props.id} class={'tab-input-tag ' + (this.props['label-class']||'')}>{this.props.title}</label>
                            </td>
                        </tr>
                    ) : (
                        <tr>
                            <td class="tab-input-addon tig-head">
                                <label for={this.props.id} class={'tab-input-tag ' + (this.props['label-class']||'')}>{this.props.title}</label>
                            </td>
                            <td class="tig-end">
                                {this.props.children}
                            </td>
                        </tr>
                    )
                }
            </table>
        );
    }
}
class FormRow extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <div class={'form-row ' + (this.props['class-name']||'')}>
                <label class={'col-label ' + (this.props['label-class']||'')}>{this.props.label}</label>
                <div class={'col ' + (this.props['col-class']||'')}>{this.props.children}</div>
            </div>
        );
    }
}

module.exports = {Input, Selector, CheckBox , Radios, FormGroup, FormRow};