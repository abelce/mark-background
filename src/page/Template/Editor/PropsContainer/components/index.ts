import { EditPresenter } from "../../editPreenter";
import ColSlider from './ColSlider';
import Readonly from "./Readonly";
import Required from './Required';
import WidthSlider from "./WidthSlider";
import SizeRadio from "@page/Template/Editor/PropsContainer/components/SizeRadio";

export interface IPropComponent {
    presenter: EditPresenter;
}


export const propsComponents: Array<React.FC | null> = [
    ColSlider,
    Required,
    WidthSlider,
    Readonly,
    SizeRadio,
]