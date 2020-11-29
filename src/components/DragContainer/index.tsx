// import { Tabs } from "antd";
// import React from "react";
// import { DndProvider, DragSource, DropTarget } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import ComponentSet from "../ComponentSet";
// import PropsContainer from "../PropsContainer";
// import * as Style from './style.scss';

// const { TabPane } = Tabs;

// // Drag & Drop node
// class TabNode extends React.Component {
//   render() {
//     const { connectDragSource, connectDropTarget, children } = this.props;

//     return connectDragSource(connectDropTarget(children));
//   }
// }

// const cardTarget = {
//   drop(props, monitor) {
//     const dragKey = monitor.getItem().index;
//     const hoverKey = props.index;

//     if (dragKey === hoverKey) {
//       return;
//     }

//     props.moveTabNode(dragKey, hoverKey);
//     monitor.getItem().index = hoverKey;
//   },
// };

// const cardSource = {
//   beginDrag(props) {
//     return {
//       id: props.id,
//       index: props.index,
//     };
//   },
// };

// const WrapTabNode = DropTarget("DND_NODE", cardTarget, (connect) => ({
//   connectDropTarget: connect.dropTarget(),
// }))(
//   DragSource("DND_NODE", cardSource, (connect, monitor) => ({
//     connectDragSource: connect.dragSource(),
//     isDragging: monitor.isDragging(),
//   }))(TabNode)
// );

// class DraggableTabs extends React.Component {
//   state = {
//     order: [],
//   };

//   moveTabNode = (dragKey, hoverKey) => {
//     const newOrder = this.state.order.slice();
//     const { children } = this.props;

//     React.Children.forEach(children, (c) => {
//       if (newOrder.indexOf(c.key) === -1) {
//         newOrder.push(c.key);
//       }
//     });

//     const dragIndex = newOrder.indexOf(dragKey);
//     const hoverIndex = newOrder.indexOf(hoverKey);

//     newOrder.splice(dragIndex, 1);
//     newOrder.splice(hoverIndex, 0, dragKey);

//     this.setState({
//       order: newOrder,
//     });
//   };

//   renderTabBar = (props, DefaultTabBar) => (
//     <DefaultTabBar {...props}>
//       {(node) => (
//         <WrapTabNode
//           key={node.key}
//           index={node.key}
//           moveTabNode={this.moveTabNode}
//         >
//           {node}
//         </WrapTabNode>
//       )}
//     </DefaultTabBar>
//   );

//   render() {
//     const { order } = this.state;
//     const { children } = this.props;

//     const tabs = [];
//     React.Children.forEach(children, (c) => {
//       tabs.push(c);
//     });

//     const orderTabs = tabs.slice().sort((a, b) => {
//       const orderA = order.indexOf(a.key);
//       const orderB = order.indexOf(b.key);

//       if (orderA !== -1 && orderB !== -1) {
//         return orderA - orderB;
//       }
//       if (orderA !== -1) {
//         return -1;
//       }
//       if (orderB !== -1) {
//         return 1;
//       }

//       const ia = tabs.indexOf(a);
//       const ib = tabs.indexOf(b);

//       return ia - ib;
//     });

//     return (
//       <DndProvider backend={HTML5Backend}>
//         <Tabs renderTabBar={this.renderTabBar} {...this.props}>
//           {orderTabs}
//         </Tabs>
//       </DndProvider>
//     );
//   }
// }

// export default function PropsTabs(props: any) {
//   console.log(props.item);
//   return (
//     <div className={Style.propsTabs}>
//     <DraggableTabs>
//       <TabPane tab="属性" key="1">
//         <PropsContainer {...props}/>
//       </TabPane>
//       <TabPane tab="组件" key="2">
//         <ComponentSet {...props}/>
//       </TabPane>
//     </DraggableTabs>
//     </div>
//   );
// }
