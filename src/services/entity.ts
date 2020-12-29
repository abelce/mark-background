import http from '@/common/utils/http';

function getEntityNameLowerCase(entityName: string) {
  if (!entityName) {
    return '';
  }
  return entityName[0].toLowerCase() + entityName.slice(1);
}

export async function createEntity(entityName:string, data: any) {
  return http({
    method: 'post',
    url: `/${getEntityNameLowerCase(entityName)}`,
    data
});
}

export async function updateEntity(entityName:string, data: any) {
  return http({
    method: 'PUT',
    url: `/${getEntityNameLowerCase(entityName)}`,
    data,
  });
}

export async function deleteEntity(entityName:string, id: string) {
  return http( {
    method: 'DELETE',
    url: `/${getEntityNameLowerCase(entityName)}`,
    data: {
      id,
    },
  });
}

export async function getEntityByID(entityName:string, id: string) {
  return http({
    method: 'get',
    url: `/${getEntityNameLowerCase(entityName)}/${id}`,
  });
}

// 查询列表
export async function getEntityList(entityName:string, params: object) {
  return http({
    method: 'get',
    url: `/${getEntityNameLowerCase(entityName)}`,
    params,
  });
}