/*
 * File: API.d.ts
 * Project: wait
 * File Created: Tuesday, 24th November 2020 11:40:14 pm
 * Author: zxtang (1061225829@qq.com)
 * -----
 * Last Modified: Tuesday, 24th November 2020 11:40:16 pm
 * Modified By: zxtang (1061225829@qq.com>)
 * -----
 * Copyright 2017 - 2020 Your Company, Your Company
 */
declare namespace API {
  export interface CurrentUser {
    avatar?: string;
    name?: string;
    title?: string;
    group?: string;
    signature?: string;
    tags?: {
      key: string;
      label: string;
    }[];
    userid?: string;
    access?: 'user' | 'guest' | 'admin';
    unreadCount?: number;
  }

  export interface LoginStateType {
    status?: 'ok' | 'error';
    type?: string;
  }

  export interface NoticeIconData {
    id: string;
    key: string;
    avatar: string;
    title: string;
    datetime: string;
    type: string;
    read?: boolean;
    description: string;
    clickClose?: boolean;
    extra: any;
    status: string;
  }
}
