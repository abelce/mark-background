import {EditPresenter} from "@page/Template/Editor/editPreenter";
import Main from "@page/Template/Editor/Main";

interface IFormRender {
    presenter: EditPresenter;
}
export function FormRender(props: IFormRender) {
    //@ts-ingore
    // return <Main presenter={props.presenter} isPreview={true} />
    return Main({
        ...props,
        isPreview: true,
    });
}