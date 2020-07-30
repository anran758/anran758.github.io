import { observable, action } from 'mobx';
import { GITHUB_USER_INFO_KEY } from '@/constant/store-key';
import siteConfig from 'Config/site';

export interface GithubUserInfo {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: false;
  name: string;
  company: string;
  blog: string;
  location: string;
  email?: string | null;
  hireable: true;
  bio: string;
  twitter_username?: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export class SkeletonStore {
  @observable.ref
  githubUserInfo: GithubUserInfo | { name: string } = {
    name: siteConfig.name,
  };

  @action
  async initUserInfo() {
    // 从缓存读取数据
    const currentUser = localStorage.getItem(GITHUB_USER_INFO_KEY);
    if (currentUser) {
      this.githubUserInfo = JSON.parse(currentUser);
    }

    try {
      // 获取最新的数据
      const result = await this.fetchUserInfo();

      this.githubUserInfo = result;
      localStorage.setItem(GITHUB_USER_INFO_KEY, JSON.stringify(result));
    } catch (err) {
      console.warn('获取信息失败: ', err);
    }

    return this.githubUserInfo;
  }

  @action
  fetchUserInfo(): Promise<GithubUserInfo> {
    return fetch(`https://api.github.com/users/${siteConfig.name}`)
      .then((res) => res.json())
      .then((res) => {
        this.githubUserInfo = res;

        return res;
      });
  }
}
