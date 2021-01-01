import {
  ENUM_LOADING_FAILED,
  ENUM_LOADING_SENDING,
  ENUM_LOADING_SUCCESS,
  ENUM_MODE_CREATE,
  ENUM_MODE_EDIT,
} from "@domain/enums";
import { Search } from "@domain/search";
import {
  ENUM_MarkType_default,
  ENUM_SearchOperatorEnum_Equal,
  ENUM_SearchOperatorEnum_Includes,
  F_Mark_isDeleted,
  F_Mark_isRead,
  F_Mark_isStar,
  F_Mark_title,
  F_Mark_type,
  F_Mark_url,
  IMark,
  Mark,
} from "@gen";
import { createEntity, getEntityByID, updateEntity } from "@services/entity";
import { getStorage, setStorage } from "@services/storage";
import _ from "lodash";
import { action, observable, runInAction } from "mobx";
import { v4 as uuidv4 } from "uuid";

export class Presenter {
  // 业务对象, 不可更改
  public readonly entityName: string = "";

  public id: string = "";

  @observable
  public filter = {
    nav: 'all',
    type: 'all',
    text: '',
  }

  @observable
  public selectedItems: Array<string> = [];

  // 数据
  @observable
  public data: any = [];

  public mode: string = "";

  // 加载状态
  @observable
  public loading: string = ENUM_LOADING_SUCCESS;

  @observable
  public type: string = "all";

  @observable
  public currentItem: any = null;

  // 搜索字符串
  @observable
  public search: string = "";

  constructor(entityName: string) {
    this.entityName = entityName;
    this.init();
  }

  @action
  public setData(data: any) {
    this.data = _.cloneDeep(data);
  }

  public init() {
    this.queryData();
  }

  // 获取数据列表
  @action
  public async queryData() {
    const res = await getStorage("data");
    this.data = res || [];
  }

  saveData = () => {
    switch (this.mode) {
      case ENUM_MODE_CREATE:
        this.createData();
        break;
      case ENUM_MODE_EDIT:
        this.updateData();
        break;
    }
  };

  createData = async () => {
    try {
      this.loading = ENUM_LOADING_SENDING;
      await createEntity(this.entityName, this.data);
      this.loading = ENUM_LOADING_SUCCESS;
    } catch (e) {
      console.log(e);
      this.loading = ENUM_LOADING_FAILED;
    }
  };

  updateData = async () => {
    try {
      this.loading = ENUM_LOADING_SENDING;
      await updateEntity(this.entityName, this.data);
      this.loading = ENUM_LOADING_SUCCESS;
    } catch (e) {
      console.log(e);
      this.loading = ENUM_LOADING_FAILED;
    }
  };

  @action
  selectMark = (id: string) => {
    const index = this.selectedItems.findIndex((item) => item === id);
    if (index !== -1) {
      this.selectedItems.splice(index, 1);
    } else {
      this.selectedItems.push(id);
    }
    this.selectedItems = [...this.selectedItems];
  };

  @action
  starMark = (id: string) => {
    runInAction(() => {
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].id === id) {
          this.data[i].isStar = !this.data[i].isStar;
          this.data = [...this.data];
          break;
        }
      }
      setStorage("data", this.data);
    });
  };

  isSelected = (id: string) => {
    return this.selectedItems.includes(id);
  };

  getSearch = () => {
    const search = new Search();

    if (this.filter.nav === "star") {
      search.addItem(F_Mark_isStar, ENUM_SearchOperatorEnum_Equal, true);
    }
    if (this.filter.type && this.filter.type !== 'all') {
      search.addItem(F_Mark_type, ENUM_SearchOperatorEnum_Equal, this.filter.type);
    }

    // if (this.search) {
    //   search.addItem(
    //     F_Mark_title,
    //     ENUM_SearchOperatorEnum_Includes,
    //     this.search
    //   );
    //   search.addItem(F_Mark_url, ENUM_SearchOperatorEnum_Includes, this.search);
    // }
    return search;
  };

  getRenderData = () => {
    const search = this.getSearch();
    let list = this.data;
    if (search.list.length) {
      list = search.exec(list, search.list);
    }

    if (this.filter.text) {
      return list.filter( item => item.title.includes(this.filter.text) ||  item.url.includes(this.filter.text));
    }
    return list;
  };

  @action
  setType = (type: string) => {
    runInAction(() => {
      this.filter= {
        ...this.filter,
        type,
      }
      this.selectedItems = [];
      this.currentItem = null;
    });
  };

  @action
  setNav = (nav: string) => {
    runInAction(() => {
      this.filter= {
        ...this.filter,
        nav,
      }
      this.selectedItems = [];
      this.currentItem = null;
    });
  };

  @action
  newCurrentItem = () => {
    this.currentItem = new Mark({
      id: uuidv4(),
      type: ENUM_MarkType_default,
      createTime: +new Date(),
    });
  };

  @action
  setCurrentItem = (item: IMark) => {
    this.currentItem = item;
  };

  @action
  saveCurrentItem = async (data: any) => {
    runInAction(async () => {
      this.currentItem = {
        ...this.currentItem,
        ...data,
      };
      const index = this.data.findIndex(
        (item) => item.id === this.currentItem.id
      );
      if (index !== -1) {
        this.data = [
          ...this.data.slice(0, index),
          this.currentItem,
          ...this.data.slice(index + 1),
        ];
      } else {
        this.data.unshift(this.currentItem);
      }
      this.setStorage(this.data);
      this.currentItem = null;
    });
  };

  // 搜索
  @action
  onSearch = (data: string) => {
    const text = data.trim();
    this.filter = {
      ...this.filter,
      text,
    }
  }

  @action
  setStorage = async(data: any) => {
    await setStorage("data", data);
    this.data = await getStorage('data');
  }

  @action
  deleteMark = (id: string) => {
    const data = this.data.filter ((mark: IMark) => mark.id !== id);
    this.setStorage(data);
  }
}
