import React from 'react';
import logo from './logo.svg';
import { connect } from 'react-redux'
import { Button, ConfigProvider, DatePicker } from 'antd'
import moment from 'moment';
import 'moment/locale/zh-cn';
import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';
import intl from 'react-intl-universal';
import zh from './i18n/zh/zh.js'
import en from './i18n/en/en.js'
import { addCountAsync, decrease } from './store/actions'
import './App.css';
moment.locale('en');
const locales = {
  "en": en,
  "zh": zh,
};

const mapStateToProps = (state) => {
  return {
    count: state.count
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    add: () => dispatch(addCountAsync()),
    decrease: () => dispatch(decrease())
  }
}
class App extends React.Component {
  constructor(props) {
    super(props)
    if (!this.getlocalStorage('lang')) {
      const lang = {
        antdLange: zhCN,
        intlLange: 'zh'
      }
      this.setlocalStorage('lang', lang)
    }
    this.state = {
      initDone: false,
    }
  }


  // 初始化加载
  UNSAFE_componentWillMount() {
    this.loadLocales();
  }
  // 切换语言
  changeLocale = () => {
    const lang = this.getlocalStorage('lang')
    if (lang.intlLange == 'zh') {
      const lang = {
        antdLange: enUS,
        intlLange: 'en'
      }
      this.setlocalStorage('lang', lang)
      this.loadLocales();
    } else {
      const lang = {
        antdLange: zhCN,
        intlLange: 'zh'
      }
      this.setlocalStorage('lang', lang)
      this.loadLocales();
    }
  }
  getlocalStorage(key) {
    if (typeof JSON.parse(localStorage.getItem(key)) == 'object') {
      return JSON.parse(localStorage.getItem(key))
    } else {
      return localStorage.getItem(key)
    }


  }

  setlocalStorage(key, value) {
    if (typeof value == 'object') {
      localStorage.setItem(key, JSON.stringify(value))
    } else {
      localStorage.setItem(key, value)
    }


  }

  loadLocales() {
    const lang = this.getlocalStorage('lang')
    intl.init({
      currentLocale: lang.intlLange,
      locales,
    })
      .then(() => {
        this.setState({ initDone: true });
      });
  }
  render() {
    const lang = this.getlocalStorage('lang')
    return (
      <ConfigProvider locale={lang.antdLange}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <p>
            <Button type="primary" onClick={this.changeLocale} >
              {intl.get('title')} &nbsp;&nbsp;
              {intl.get('ConfigRedux')}&nbsp;&nbsp;
              {intl.get('configRouter')}&nbsp;&nbsp;
              {intl.get('configReq')}&nbsp;&nbsp;
              {intl.get('i18n')}&nbsp;&nbsp;
            </Button>
          </p>

          <DatePicker />

          <p>redux示例-{this.props.count}</p>
          <span><Button type="primary" onClick={this.props.add} >+</Button></span>
          <span><Button type="primary" onClick={this.props.decrease}>-</Button></span>
        </header>
      </ConfigProvider>
    );

  }

}

export default connect(mapStateToProps, mapDispatchToProps)(App)
