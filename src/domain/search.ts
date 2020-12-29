import {
  ENUM_SearchOperatorEnum_Equal,
  ENUM_SearchOperatorEnum_GE,
  ENUM_SearchOperatorEnum_GT,
  ENUM_SearchOperatorEnum_Includes,
  ENUM_SearchOperatorEnum_LE,
  ENUM_SearchOperatorEnum_LT,
  ENUM_SearchOperatorEnum_NotEqual,
  SearchItem,
} from "@gen";

export class Search {
  list: Array<SearchItem> = [];

  addItem(name: string, operator: string, value: any) {
    this.list.push(createSearchItem(name, operator, value));
  }

  clear() {
    this.list = [];
  }

  searchMapping(searchList: Array<SearchItem>) {
    return searchList.reduce((prev, item) => {
      prev[item.name] = item;
      return prev;
    }, {});
  }

  // 过滤
  exec(list: Array<any>, searchList: Array<SearchItem>) {
    return searchExec(list, searchList);
  }
}

// 创建过滤条件
export function createSearchItem(name: string, operator: string, value: any) {
  return new SearchItem({
    name,
    operator,
    value,
  });
}

// 将过滤条件数组转为map
export function searchMapping(searchList: Array<SearchItem>) {
  return searchList.reduce((prev, item) => {
    prev[item.name] = item;
    return prev;
  }, {});
}

// 过滤数据
export function searchExec(list: Array<any>, searchList: Array<SearchItem>) {
  const searchMap = searchMapping(searchList);
  const searchKeys = Reflect.ownKeys(searchMap);

  if (!searchKeys.length) {
    return list;
  }

  return list.filter((item) => {
    return searchKeys.every((key) => {
      switch (searchMap[key].operator) {
        case ENUM_SearchOperatorEnum_Equal:
          return item[key] === searchMap[key].value;
        case ENUM_SearchOperatorEnum_NotEqual:
          return item[key] === searchMap[key].value;
        case ENUM_SearchOperatorEnum_Includes:
          if (Array.isArray(item[key]) || typeof item[key] === "string") {
            return item[key].includes(searchMap[key].value);
          }
          return false;
        case ENUM_SearchOperatorEnum_GT:
          return item[key] > searchMap[key].value;
        case ENUM_SearchOperatorEnum_LT:
          return item[key] < searchMap[key].value;
        case ENUM_SearchOperatorEnum_GE:
          return item[key] >= searchMap[key].value;
        case ENUM_SearchOperatorEnum_LE:
          return item[key] <= searchMap[key].value;
        default:
          return false;
      }
    });
  });
}
