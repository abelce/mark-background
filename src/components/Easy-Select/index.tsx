
import * as React from 'react';
import { oc } from 'ts-optchain';
import cs from 'classnames';
import * as Style from './style.scss';
const { useMemo, useState, useEffect, useRef } = React;

type IOption = {
    value: any;
    label: string;
}

interface IEasySelect {
    options: Array<IOption>;
    value: any;
    onChange: (value: string, option?: IOption) => void;
}

export function EasySelect(props: IEasySelect) {
    const _ref = useRef(null);
    const [showList, setShowList] = useState(false);
    const { options = [], value, onChange } = props;
    const currentItem = useMemo(() => {
        return options.find(option => option.value === value);
    }, [value]);

    useEffect(() => {
        const callback = (e: Event) => {
            if (!(_ref.current as any).contains(e.target)) {
                setShowList(false);
            }
        }
        document.addEventListener('click', callback, false);
        return () => {
            document.removeEventListener('click', callback, false);
        }
    }, []);

    // 修改时关闭list
    const handleChange = (value: string, option?: IOption) => {
        onChange(value, option);
        setShowList(false);
    }

    return <div className={Style['easy-selector']} ref={_ref}>
        <div
            className={Style.content}
            onClick={() => setShowList(!showList)}
            >
            <div className={Style.title} >
                <div>{oc(currentItem).label('')}</div>
            </div>
        </div>
        <div className={Style.list}
            style={{ display: showList ? 'block' : 'none' }}
        >
            {
                options.map(item => <Item key={item.value} data={item} isActive={item.value === oc(currentItem).value('')} onChange={handleChange} />)
            }
        </div>
    </div>
}


interface IItem {
    data: IOption;
    isActive?: boolean;
    onChange: (value: string, option?: IOption) => void;
}

function Item(props: IItem) {
    const { data, onChange, isActive } = props;
    return <div className={cs(Style.item, { [Style.active]: isActive })} onClick={() => onChange(data.value, data)}>
        <span>{props.data.label}</span>
    </div>
}