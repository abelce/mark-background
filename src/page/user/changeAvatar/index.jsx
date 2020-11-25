import React, { useState, useEffect } from 'react';
import './style.scss';
import { changeAvatar } from '@domain/user/action';
import UserStore from '@domain/user/store';
import { CHANGE_AVATAR } from '@common/constants/user';
import Continer from '../container';
import { Upload, Icon, message, notification, Button } from 'antd';
import {cdnURL} from '@common/utils/http';

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
  if (!isJpgOrPng) {
    message.error('图片只能为JPG/PNG!');
  }
  const isLt2M = file.size / 1024 / 1024 < 0.5;
  if (!isLt2M) {
    message.error('图片必须不能大于512KB!');
  }
  return isJpgOrPng && isLt2M;
}

export default function ChangeAvatar() {

  const [loading, setLoading] = useState(false);

  const onChange = () => {
    const { type } = UserStore.lastAction;
    switch (type) {
      case CHANGE_AVATAR:
        setLoading(false);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    const subscription = UserStore.addListener(onChange);
    return () => {
      subscription.remove();
    }
  })

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      const src = `${cdnURL}/${info.file.response.hash}`;
      changeAvatar({
        avatar: src,
      });
    }
    if (info.file.status === 'error') {
      setLoading(false);
      notification.error({
        message: "错误提示",
        description: "上传头像失败"
      });
    }
  };

  return <Continer
    header={<h2>修改头像</h2>}
  >
    <div className="user_avatar">
      <img className="avatar" src={UserStore.avatar} />
      <Upload
        name="file"
        className="avatar-uploader"
        showUploadList={false}
        data={UserStore.uploadParams}
        action="https://up-z2.qiniup.com"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        <Button loading={loading}>
          <Icon type="upload" /> 上传图片
        </Button>
      </Upload>
    </div>
  </Continer>
}