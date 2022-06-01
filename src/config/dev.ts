interface DevConfig {
  serverUrl: string;
  title: string;
  cookieExpires: number;
}

const serverUrl = 'http://192.168.199.54:7001';

const config: DevConfig = {
  /**
   * @description 后端域名
   */
  serverUrl,
  /**
    * @description 配置显示在浏览器标签的title
     */
  title: '流乘云',
  /**
   * @description token 在 Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
};
export default config
