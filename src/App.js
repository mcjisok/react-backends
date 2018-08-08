import React, { Component } from 'react';
import logo from './lg.png';
import './App.css';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

// 路由组件
import Silder from './component/silder'
import UserList from './component/User/userlist'
import PushList from './component/Push/pushlist'
import PushDetail from './component/Push/pushdetail'
import AddTag from './component/Tag/addTag'
import GroupList from './component/Group/grouplist'
import Home from './component/Home/home'
import Photo from './component/Photo/photo'
import PhotoGroupDetail from './component/Photo/photogroupDetail'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;



class App extends Component {

  rootSubmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4','sub5'];
  state = {
    openKeys: ['sub1'],
  };
  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }
  render() {
    return (
      <Router>        
      
      <Layout>
        <Header className="header">
          <div className="logo" >
            <img src={logo} height="100%"/>
          </div>
          {/* <Menu
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu> */}
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              // defaultSelectedKeys={['1']}
              // defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
              openKeys={this.state.openKeys}
              onOpenChange={this.onOpenChange}
            >
              <SubMenu key="sub1" title={<span><Icon type="user" />用户管理</span>}>
                <Menu.Item key="1"><Link to="/home">主页</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/userlist">用户列表</Link></Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title={<span><Icon type="laptop" />Push管理</span>}>
                <Menu.Item key="5"><Link to="/pushlist">Push列表</Link></Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" title={<span><Icon type="notification" />分组管理</span>}>
                <Menu.Item key="9"><Link to="/grouplist">分组列表</Link></Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
              <SubMenu key="sub4" title={<span><Icon type="notification" />标签管理</span>}>
                <Menu.Item key="13"><Link to="/addtag">新建标签</Link></Menu.Item>
                <Menu.Item key="14">option10</Menu.Item>
                <Menu.Item key="15">option11</Menu.Item>
                <Menu.Item key="16">option12</Menu.Item>
              </SubMenu>
              <SubMenu key="sub5" title={<span><Icon type="notification" />相册管理</span>}>
                <Menu.Item key="17"><Link to="/photo">所有相册</Link></Menu.Item>
                <Menu.Item key="18">option10</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
            </Breadcrumb>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
              <Route path="/home" component={Home}/>
              <Route path="/userlist" component={UserList}/>
              <Route path="/pushlist" component={PushList}/>
              <Route path="/pushdetail/:id" component={PushDetail}></Route>
              <Route path="/addtag" component={AddTag}></Route>
              <Route path="/grouplist" component={GroupList}></Route>
              <Route path="/photo" component={Photo}></Route>
              <Route path="/photoGroupDetail/:id" component={PhotoGroupDetail}></Route>
            </Content>
          </Layout>
        </Layout>
      </Layout>
      </Router>      
      
    );
  }
}

export default App;
