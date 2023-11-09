# chinese fonts server

> 类似于google font实现对中文字体的切片加载,提高访问速度

## 说明

> 此项目为最小实验品
> 
> 注意部分字体非免费商用，仅个人使用

## 支持的字体
- [霞鹜文楷](https://github.com/lxgw/LxgwWenKai/tree/main)
  - 字体名：LXGWWenKai
  - 字重：300, 400, 700
- 仓耳今楷
  - 字体名：仓耳今楷
  - 字重：100,300,500,700,900
- Cervanttis
  - 字体名：Cervanttis
  - 字重：400
- 方正新楷体简体
  - 字体名：FZXKTJW
  - 字重：400
- Ma Shan Zheng
  - 字体名：MaShanZheng
  - 字重：400

## 配置

已安装Node.js和npm

将字体文件放入`lib\fonts`,按照字重给ttf文件添加后缀，大小写不敏感，表格如下

| 字体名 | 字重 | ttf文件名 |
| :----: | :--: | :--------: |
| LXGWWenKai | 300 | LXGWWenKai-Light.ttf |
| LXGWWenKai | 400 | LXGWWenKai-Regular.ttf |
| LXGWWenKai | 700 | LXGWWenKai-Bold.ttf |

具体名称见`generateCss.ts`

在`server\generateCss.ts`的`allFamily`处添加字体

```shell
pip install -r requirements.txt
pnpm i
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
## 使用方式
1. css import 引入

```css
/* 霞鹜文楷 */
@import url('https://example.com/font?family=LXGWWenKai:wght@300|400|700');
```
2. link 标签

```html
  <!-- /* 霞鹜文楷 */ -->
  <link rel="stylesheet" href="https://example.com/font?family=LXGWWenKai:wght@300|400|700"></link>
```
## 字体预览

![font preview](./font-preview.png)

**服务器可能随时关闭,如需使用,可以将项目将项目部署在自己的服务器**
