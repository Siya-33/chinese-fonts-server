# chinese fonts server

> 类似于google font实现对中文字体的切片加载,提高访问速度

## 说明

> 此项目为最小实验品

## 使用

已安装Node.js和npm

将字体文件放入`lib\fonts`

`server\generateCss.ts`处添加字体

```shell
pip install -r requirements.txt
npx esno .\scripts\splitFonts.ts
npm run build
git commit -am 'update'
git push
```

首次克隆至服务器

```shell
npm i -g pm2
cd chinese-fonts-server/
pm2 start dist/server/main.cjs
pnpm i --production
pm2 restart 0
pm2 save
pm2 startup
```

再次使用

```shell
git pull
pm2 restart 0
```

## 支持的字体
- [霞鹜文楷](https://github.com/lxgw/LxgwWenKai/tree/main)
  - 字体名：LXGWWenKai
  - 字重：300, 400, 700
  
## 使用方式
1. css import 引入

```css
/* 霞鹜文楷 */
@import url('https://example.com/font?family=LXGWWenKai:wght@300|400|700');
```
2. link 标签

```html
  <!-- /* 阿里巴巴普惠体 */ -->
  <link rel="stylesheet" href="https://example.com/font?family=LXGWWenKai:wght@300|400|700"></link>
```
## 效果展示

**服务器可能随时关闭,如需使用,可以将项目将项目部署在自己的服务器**