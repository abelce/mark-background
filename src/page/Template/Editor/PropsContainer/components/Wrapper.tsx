import * as React from "react";
import { IPropComponent } from "./index";
import {oc} from "ts-optchain";

export default function Wrapper(attr: string) {
  return function (Comp: (p: IPropComponent) => React.FC) {
    return (props: IPropComponent) => {
      const {
        presenter: { currentItem },
      } = props;
      if (oc(currentItem).extendProps([]).some((p) => p.key === attr)) {
        return Comp(props);
      }
      return null;
    };
  };
}
