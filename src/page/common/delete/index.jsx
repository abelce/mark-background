import React from 'react';
// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
import {Button, Popconfirm} from 'antd';

export default function Delete({
    message,
    description,
    onOk,
    onCancel,
}) {
    const [open, setOpen] = React.useState(false);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {

        setOpen(false);
    }

    function handleAggress() {
        if (onOk) {
            onOk();
        }
        handleClose()
    }

    function handleDisaggress() {
        if (onCancel) {
            onCancel();
        }
        handleClose();
    }

    return (
        <span>
            <a href="javascript:;" onClick={handleClickOpen}>
                <Popconfirm
                placement="topLeft"
                title={message}
                onConfirm={handleAggress}
                okText="确定"
                cancelText="取消">
                    删除
                </Popconfirm>
            </a>
        </span>
    );
}
