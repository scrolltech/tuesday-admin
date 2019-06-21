// import Home from './components/Home'
import ErrorPage from './components/ErrorPage'
import LoginPage from './components/Login'
import SectionWrapper from './components/SectionWrapper'
import AssetFeed from './components/publications/AssetFeed'
import CommentFeed from './components/publications/CommentFeed'
import Comment from './components/publications/Comment'
import UserProfile from './components/users/UserProfile'
import AssetRequestSectionWrapper from './components/assetRequests'
import AssetRequestFeed from './components/assetRequests/AssetRequestFeed'

import VueRouter from 'vue-router'


const routes = [
  { path: '/login', component: LoginPage },
  { path: '/', redirect: '/publication', meta: {protected: true}},
  { path: '/publication/:publication_id/:asset_id/status/:status', component: CommentFeed, meta: {protected: true}},
  { path: '/publication/:publication_id/:asset_id/status', component: CommentFeed, meta: {protected: true}},
  { path: '/publication:publication_id/:asset_id/:comment_id', component: Comment, meta: {protected: true}},
  { path: '/publication/:publication_id/:asset_id', component: CommentFeed, meta: {protected: true}},
  { path: '/publication/:publication_id', component: AssetFeed, meta: {protected: true}},
  { path: '/publication', component: SectionWrapper, meta: {protected: true}},
  { path: '/assetrequest/:publication_id/status/:status', component: AssetRequestFeed, meta: {protected: true}},
  { path: '/assetrequest/:publication_id/status', component: AssetRequestFeed, meta: {protected: true}},
  { path: '/assetrequest/:publication_id', component: AssetRequestFeed, meta: {protected: true}},
  { path: '/assetrequest', component: AssetRequestSectionWrapper, meta: {protected: true}},
  { path: '/user/:user_id', component: UserProfile, meta: {protected: true}},
  { path: '/user', component: UserProfile, meta: {protected: true}},
  { path: '/*', component: ErrorPage}
]

const router = new VueRouter({
	mode: 'history',
  routes
});

export default router;
