import { EditPresenter } from "../../editPreenter";
import ColSlider from './ColSlider';
// import Readonly from './Readonly';

export interface IPropComponent {
    presenter: EditPresenter;
}


export const propsComponents: Array<React.FC> = [
    ColSlider,
]