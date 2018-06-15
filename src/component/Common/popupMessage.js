import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {Icon,notification} from 'antd';





// 全局提示框
export const openNotification = () => {
    notification.open({
      message: '保存成功',
      duration:3,
      icon: <Icon type="check-circle-o" style={{ color: '#108ee9' }} />,
    //   description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
};

export const ChangeSuccessNotification = () => {
  notification.open({
    message: '修改成功',
    duration:3,
    icon: <Icon type="check-circle-o" style={{ color: '#5ED5D1' }} />,
  //   description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
  });
};

export const ChangeFailNotification = () => {
  notification.open({
    message: '修改失败',
    duration:3,
    icon: <Icon type="check-circle-o" style={{ color: '#FF534D' }} />,
  //   description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
  });
};

export const DelopenNotification = () => {
    notification.open({
      message: '删除成功',
      duration:3,
      icon: <Icon type="delete" style={{ color: '#FF9102' }} />,
    //   description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
};

// export {openNotification,DelopenNotification}