/* eslint-disable */

import axios from 'axios'
import { getCookie } from './utils'
import Config from './config'
import router from './routes.js';

const Authorization = getCookie(Config.SessionCookieName)

let headers = {};
if (Authorization) {
  headers.Authorization = Authorization;
}

const apiClient = axios.create({
  baseURL: Config.API_URL,
  timeout: 10000,
  headers
});

apiClient.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401) {
    window.location = "/login";
  } else {
    return error;
  }
});

export default {
  getPublications() {
    return apiClient.get('/publications')
  },
  getAllAssets(publication_id) {
    return apiClient.get('/publications/' + publication_id + '/assets?limit=1000')
  },
  getPendingComments(asset_id) {
    return apiClient.get('/comments/pending?asset_id=' + asset_id + '&page=&size')
  },
  getApprovedComments(asset_id) {
    return apiClient.get('/comments/?asset_id=' + asset_id + '&page=&size')
  },
  getDeclinedComments(asset_id) {
    return apiClient.get('/comments/rejected/?asset_id=' + asset_id + '&page=&size')
  },
  getEditorspickComments(asset_id) {
    return apiClient.get('/comments/?asset_id=' + asset_id + '&editors_pick=true')
  },

  getAllAssetRequests() {
    return apiClient.get('/assetrequests')
  },


  approveComment(id) {
    return apiClient.post('/comments/pending/' + id + '/approve')
  },
  declineComment(id, data) {
    return apiClient.post('/comments/pending/' + id + '/reject', data)
  },
  enableComment(id) {
    return apiClient.get('/assetrequests/' + id + '/approve')
  },
  pickComment(id, editors_pick) {
    return apiClient.patch('/comments/' + id, { editors_pick })
  },
  approveDeclinedComment(id) {
    return apiClient.post('/comments/rejected/' + id + '/approve')
  },
  declineApproveComment(id) {
    return apiClient.post('/comments/approved/' + id + '/reject')
  },

  submitAssetRequest(data) {
    return apiClient.post('/assetrequests/', data)
  },
  acceptAssetRequest(id, data) {
    return apiClient.post('/assetrequests/' + id + '/approve', data)
  },
  rejectAssetRequest(id) {
    return apiClient.post('/assetrequests/' + id + '/reject')
  },
  cancelAssetRequest(id) {
    return apiClient.post('/assetrequests/' + id + '/cancel')
  },

  openAsset(id) {
    return apiClient.post('/assets/' + id + '/restart')
  },
  closeAsset(id) {
    return apiClient.post('/assets/' + id + '/stop')
  }
}
