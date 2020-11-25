import {
    Store
} from 'flux/utils';
import AppDispatcher from '@common/utils/AppDispatcher';
import {
    SAVE_TYPE,
    GET_TYPES,
} from '@common/constants/stypes';
import Stype from './stypes';

class StypesStores extends Store {

    _stypes = {};
    // 最近一次的action
    _lastAction = {};

    // 请求状态
    _fetching = {};

    _total = 0;

    constructor() {
        super(AppDispatcher);
    }

    dealStypes = (stypes) => {
        this._stypes = {};
        this._total = stypes.total;
        if (Array.isArray(stypes.data)) {
            stypes.data.forEach((stype) => {
                this.dealStype(stype);
            })
        }
    }

    dealStype = (stype) => {
        if (typeof stype === 'object' && stype) {
            const item = new Stype({
                id: stype.id,
                operatorID: stype.relationships.operator.data.id,
                ...stype.attributes,
            });
            if (!this._stypes[item.operatorID]) {
                this._stypes[item.operatorID] = {};
                if (!Array.isArray(this._stypes[item.operatorID][item.type])) {
                    this._stypes[item.operatorID][item.type] = [];
                }
            }
            this._stypes[item.operatorID][item.type].push(item);
        }
    }


    __onDispatch(_data) {
        const {
            type,
            payload = null,
        } = _data;
        this._lastAction = {
            type,
            payload,
        };
        switch (type) {
            case SAVE_TYPE:
                this.dealStype(payload);
                this.__emitChange();
                break;
            case GET_TYPES:
                this.dealStypes(payload);
                this.__emitChange();
                break;
            default:
                break;
        }
    }

    get lastAction() {
        return this._lastAction;
    }

    getTypes(operatorID, typeName) {
        if (!this._stypes[operatorID]) {
            return [];
        }
        return this._stypes[operatorID][typeName] || [];
    }

    get total() {
        return this._total;
    }

    isFetching(type) {
        return this._fetching[type];
    }
}

export default new StypesStores();