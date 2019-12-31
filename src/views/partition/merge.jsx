import React from 'react';
import {Input, Selector, CheckBox, Radios, FormGroup, FormRow} from '../../components/tools';
import {groupList, templateList} from '../../api/api';

class PartitionMerge extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
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
            <form>
                <FormRow label="注意：" label-class="f-bolder"><div style={{lineHeight: '30px'}}>创建分区前请先把客户端运行起来。</div></FormRow>
                <FormRow label="游戏类型：" class-name="no-margin">
                    <Radios id="cq" name="type" value="1">
                        <div class="game-card"></div>
                    </Radios>
                    <Radios id="cs" name="type" value="2">
                        <div class="game-card cs"></div>
                    </Radios>
                    <Radios id="cq3" name="type" value="3">
                        <div class="game-card cq3"></div>
                    </Radios>
                    <Radios id="sql" name="type" value="0">
                        <div class="game-card sql"></div>
                    </Radios>
                    <Radios id="web" name="type" value="4">
                        <div class="game-card web"></div>
                    </Radios>
                </FormRow>
                <FormRow label="分区名称：" class-name="no-margin">
                    <input class="form-control w-240" name="name" type="text" maxLength="50" placeholder="请输入分区名称, 如：热血传奇一区"/>
                    <CheckBox class-name="block" id="" name="" value="">在指定时间更改分区名称</CheckBox>
                </FormRow>
                <FormRow label="更改名称：">
                    <input class="form-control w-240" name="name" type="text" maxLength="50" placeholder="请输入更改后的分区名称"/>
                </FormRow>
                <FormRow label="更改时间：">
                    <input class="form-control" name="name" type="text" />
                </FormRow>
                <FormRow label="分　组：">
                    {this.state.groups.map((item, index) => {
                        <CheckBox id={'group-ids-'+index} name={'groupIds['+index+']'} value={item.id}>{item.name}</CheckBox>
                    })}
                    <CheckBox class-name="f-bolder" id="" name="" value="">全选</CheckBox>
                </FormRow>
                <FormRow label="服务器IP：">
                    <input class="form-control" name="name" type="text" maxLength="15" placeholder="请输入更改后的分区名称"/>
                    <div class="tip">您的游戏服务器IP和网关通讯端口</div>
                </FormRow>
                <FormRow label="安装路径：">
                    <input class="form-control w-240" name="name" type="text" placeholder="请输入更改后的分区名称"/>
                    <div class="tip">分区安装脚本目录或INI文件存放路径</div>
                </FormRow>
                <FormRow label="模　板：" class-name="font-0" col-class="w-240">
                    <FormGroup id="template" title="添加" label-end="true" label-class="btn bg-success">
                        <Selector name="template.id" items={this.state.templates} t-f="name" v-f="id"/>
                    </FormGroup>
                </FormRow>
                <FormRow label="元宝蛋：">
                    <Radios id="ybEgg-on" name="ybEgg" value="">开 启</Radios>
                    <Radios id="ybEgg-off" name="ybEgg" value="">关 闭</Radios>
                </FormRow>
                <FormRow label="分区公告：">
                    <textarea class="form-control" name="name" cols="50" placeholder="请输入分区公告" style={{height: 65}}></textarea>
                </FormRow>
                <FormRow label="定时开区：">
                    <input class="form-control" name="name" type="text" placeholder=""/>
                    <div class="tip inline-block">&nbsp;系统将在您指定的时间开始提供充值服务</div>
                    <CheckBox class-name="block" id="" name="" value="">创建脚本，系统将在您服务器上创建充值脚本</CheckBox>
                    <div class="tip font-danger">如果现在不需要创建脚本，您可以在分区管理中加载脚本</div>
                </FormRow>
                <FormRow label="">
                    <button class="btn bg-primary" type="button">确定保存</button>
                </FormRow>
            </form>
        );
    }
}

module.exports = PartitionMerge;