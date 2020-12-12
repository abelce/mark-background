// 表头导入项
export function getImportString() {
    return [
        `import * as React from 'react';`,
        `import { Form } from 'antd';`,
        `import * as Style from './style.scss';`,
    ].join('\n');
}