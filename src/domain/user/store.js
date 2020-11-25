import {
    Store
} from 'flux/utils';
import AppDispatcher from '@common/utils/AppDispatcher';
import {
    USER_GET,
    LOG_IN,
    LOG_OUT,
    CHANGE_PASSWORD,
    CHANGE_AVATAR,
    REGISTRY,
    CHANGE_USER_BASEINFO,
} from '@common/constants/user';
import LocalStorage from 'store';
import {
    FormatOperator
} from '@domain/user/user.js'

class UserStore extends Store {

    _lastAction = {};

    constructor() {
        super(AppDispatcher);
        this._user = null;
        this._currentUser = LocalStorage.get('user');;
    }

    dealAuthInfo = data => {
        LocalStorage.set('user', data);
        this._currentUser = data;
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
            case USER_GET:
                this._user = FormatOperator(payload);
                this.__emitChange();
                break;
            case LOG_IN:
                this.dealAuthInfo(payload);
                this.__emitChange();
                break;
            case CHANGE_PASSWORD:
            case LOG_OUT:
                LocalStorage.remove('user');
                location.href = "/login";
                this.__emitChange();
                break;
            case CHANGE_AVATAR:
                this._user = FormatOperator(payload);
                this.__emitChange();
                break;
            case REGISTRY:
                this.__emitChange();
                break;
            case CHANGE_USER_BASEINFO:
                this._user = FormatOperator(payload);
                this.__emitChange();
                break;
            default:
                break;
        }
    }

    get lastAction() {
        return this._lastAction;
    }

    get current() {
        return this._currentUser;
    }

    get user() {
        return this._user;
    }

    get email() {
        if (this._user) {
            return this._user.email;
        }
        return '';
    }

    get name() {
        if (this._user) {
            return this._user.name;
        }
        return '';
    }

    get avatar() {
        return this._user ? this._user.avatar : null;
    }

    get uploadParams() {
        if (!this._currentUser) {
            return null;
        }

        return {
            token: this._currentUser.qiniuToken,
        }
    }
}

export default new UserStore();