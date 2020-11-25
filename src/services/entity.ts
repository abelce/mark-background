import http from '@common/utils/http';

export async function createEntity(entityName:string, data: any) {
  return http({
    method: 'post',
    url: `/${entityName}`,
    data
});
}

export async function updateEntity(entityName:string, data: any) {
  return http({
    method: 'PUT',
    url: `/${entityName}/${data.id}`,
    data,
  });
}

export async function deleteEntity(entityName:string, id: string) {
  return http( {
    method: 'PUT',
    url: `/${entityName}`,
    data: {
      id,
    },
  });
}

export async function getEntityByID(entityName:string, id: string) {
  return http({
    method: 'get',
    url: `/${entityName}/${id}`,
  });
}