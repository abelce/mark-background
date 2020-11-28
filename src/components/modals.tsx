import _ from "lodash";
import * as React from "react";

export interface IModals {
  onOk: () => void;
  onCancel: () => void;
  visible: boolean;
}

export class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

export default class Modals extends React.Component {
  static Single = null;

  state = {
    modals: [],
  };

  static show = (component, props={}) => {
    const key = _.uniqueId("modal");
    const deferred = new Deferred();
    const { onOk, onCancel } = props;
    const { modals } = Modals.Single.state;

    props.visible = true;
    props.onOk = (val) => {
      deferred.resolve(val);
      _.remove(modals, (m) => m.key === key);
      Modals.Single.setState({ modals });
    };

    props.onCancel = () => {
      deferred.reject();
      _.remove(modals, (m) => m.key === key);
      Modals.Single.setState({ modals });
    };

    modals.push({ key, component, props });
    Modals.Single.setState({ modals });
    return deferred.promise;
  };

  constructor(props) {
    super(props);
    Modals.Single = this;
    return Modals.Single;
  }

  render() {
    return (
      <div>
        {this.state.modals.map((m) => (
          <m.component key={m.key} {...m.props} />
        ))}
      </div>
    );
  }
}
