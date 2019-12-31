//兼容低版本IE
import '../polyfill/object-assign-polyfill';
import '../polyfill/isarray';
import 'es5-shim'; //IE8 ^4.5.13
import 'object-create-ie8';//IE8
import 'object-defineproperty-ie8';//IE8
import 'console-polyfill';//IE8下，如果你不打开开发者工具，window下是没有console这个对象的，只有打开了F12才会有这个方法
import 'json3';  //比IE8的JSON好用
import 'fetch-polyfill2'; //fetch 实现
Object.is = require('object-is');
window.Promise = require('bluebird');

import React from 'react';
import ReactDOM from 'react-dom';

require('./static/css/style.css');
require('./static/css/iconfont.css')
import Header from './components/header';
import Body from './components/body';

const render = function render() {
    ReactDOM.render(
        <div style={{height: '100%'}}>
            <Header/>
            <Body/>
        </div>,
        document.getElementById('root')
    );
};

render();
