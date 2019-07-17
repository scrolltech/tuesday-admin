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
  getPublications () {
    return apiClient.get('/publications')
  },
  getAllAssets (publication_id) {
    return apiClient.get('/publications/' + publication_id + '/assets')
  },
  getPendingComments (asset_id) {
    return apiClient.get('/comments/pending?asset_id=' + asset_id + '&page=&size')
  },
  getApprovedComments (asset_id) {
    return apiClient.get('/comments/?asset_id=' + asset_id + '&page=&size')
  },
  getDeclinedComments (asset_id) {
    return apiClient.get('/comments/rejected/?asset_id=' + asset_id + '&page=&size')
  },
  getEditorspickComments (asset_id) {
    return apiClient.get('/comments/?asset_id=' + asset_id + '&editors_pick=true')
  },

  getAllAssetRequests () {
    return apiClient.get('/assetrequests')
  },


  approveComment (id) {
    return apiClient.post('/comments/pending/' + id + '/approve')
  },
  declineComment (id) {
    return apiClient.post('/comments/pending/' + id + '/reject')
  },
  enableComment (id) {
    return apiClient.get('/assetrequests/' + id + '/approve')
  },
  pickComment (id, editors_pick) {
    return apiClient.patch('/comments/' + id, {editors_pick})
  },
  revertDeclinedComment (id) {
    return apiClient.post('/comments/rejected/' + id + '/revert')
  },

  submitAssetRequest (data) {
    return apiClient.post('/assetrequests/', data)
  },
  acceptAssetRequest (asset_id) {
    return apiClient.post('/assetrequests/' + asset_id + '/approve')
  },
  rejectAssetRequest (asset_id) {
    return apiClient.post('/assetrequests/' + asset_id + '/reject')
  },
  cancelAssetRequest (asset_id) {
    return apiClient.post('/assetrequests/' + asset_id + '/cancel')
  },

  openAsset (asset_id) {
    return apiClient.post('/assets/' + asset_id + '/restart')
  },
  closeAsset (asset_id) {
    return apiClient.post('/assets/' + asset_id + '/stop')
  }
}
