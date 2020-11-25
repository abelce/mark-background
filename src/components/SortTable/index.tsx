import * as React from 'react';
import { Table } from 'antd';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import { MenuOutlined } from '@ant-design/icons';
import arrayMove from 'array-move';
import { ColumnsType, TableProps } from 'antd/lib/table/Table';
import * as Style from './style.scss';

const DragHandle = sortableHandle(() => (
  <MenuOutlined style={{ cursor: 'pointer', color: '#999' }} />
));

const SortableItem = sortableElement(props => <tr {...props} />);
const SortableContainer = sortableContainer(props => <tbody {...props} />);

interface ISortableTable<T> extends TableProps<T> {
    onChange?: (data: any ) => void;
}

export class SortableTable<T> extends React.Component<ISortableTable<T>> {
  get columns (): ColumnsType<T> {
      return [
        {
            title: '',
            dataIndex: 'sort',
            width: 30,
            className: Style['drag-visible'],
            render: () => <DragHandle />,
            fixed: 'left',
          },
          ...this.props.columns,
      ]
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { dataSource, onChange} = this.props;
    if (oldIndex !== newIndex) {
      const newData = arrayMove([].concat(dataSource), oldIndex, newIndex).filter(el => !!el);
      console.log('Sorted items: ', newData);
      onChange && onChange(newData);
    }
  };

  DraggableBodyRow = ({ className, style, ...restProps }) => {
    const { dataSource=[]} = this.props;
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = dataSource.findIndex(x => x.index === restProps['data-row-key']);
    return <SortableItem index={index} {...restProps} />;
  };

  render() {
    const { dataSource} = this.props;
    const DraggableContainer = props => (
      <SortableContainer
        useDragHandle
        helperClass="row-dragging"
        onSortEnd={this.onSortEnd}
        {...props}
      />
    );
    
    return (
      <Table
        pagination={false}
        dataSource={dataSource || []}
        columns={this.columns}
        rowKey="index"
        components={{
          body: {
            wrapper: DraggableContainer,
            row: this.DraggableBodyRow,
          },
        }}
      />
    );
  }
}