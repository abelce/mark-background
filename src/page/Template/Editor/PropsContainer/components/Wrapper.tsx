import * as React from "react";
import { IPropComponent } from "./index";

export default function Wrapper(attr: string) {
  return function (Comp: (p: IPropComponent) => React.FC) {
    return (props: IPropComponent) => {
      const {
        presenter: { currentTemplateItem },
      } = props;
      if (currentTemplateItem.extendProps.some((p) => p.key === attr)) {
        return Comp(props);
      }
      return null;
    };
  };
}
