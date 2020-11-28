import BaseEntityForm from '@components/EntityForm ';
import FieldSelect from '@components/FieldSelect';
import * as React from 'react';
import ComponentSet from './ComponentSet';
import Main from './Main';
import PropsContainer from './PropsContainer';
import * as Style from './style.scss';

@BaseEntityForm("Template")
export default class Editor extends React.Component {

    entityID: string = '';

    // constructor(props){

    // }

    render() {
        const {referEntityID} = this.props.data;
        return <div className={Style.editor}>
            <div className={Style.editor_fields}>
                {/* <ComponentSet onClick={handleComponentSetClick}/> */}
                <FieldSelect entityName="entity" entityID={referEntityID}/>
            </div>
            <div className={Style.editor_content}>
                <Main />
            </div>
            <div className={Style.editor_props}>
                <PropsContainer />
            </div>
        </div>
    }
}