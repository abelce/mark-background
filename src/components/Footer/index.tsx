import { Button } from 'antd';
import React from 'react';
import * as Style from './style.scss';

interface IFooter {
  onSave: () => void;
  onCancel: () => void;
}
export function Footer(props: IFooter) {
  return (
    <div className={Style.footer}>
      <Button onClick={props.onCancel}>取消</Button>
      <Button type="primary" onClick={props.onSave}>
        提交
      </Button>
    </div>
  );
}