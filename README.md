# chinese fonts server

> 类似于google font实现对中文字体的切片加载,提高访问速度

## 说明

> 此项目为最小实验品

## 使用

将字体文件放入`lib\fonts`
`server\generateCss.ts`处添加字体
```
pip install -r requirements.txt
npx esno .\scripts\splitFonts.ts
npm run build
git commit -am 'update'
git push
```
首次克隆至服务器
```
npm i -g pm2
cd chinese-fonts-server/
pm2 start dist/server/main.cjs
pnpm i --production
pm2 restart 0
pm2 save
pm2 startup
```

## 支持的字体
- 阿里巴巴普惠体2.0
  - 字体名：AlibabaPuHuiTi-2
  - 字重：100, 300, 400, 500, 600, 700, 800, 900
- 鸿蒙字体简体中文
  - 字体名：HarmonyOS_Sans_SC
  - 字重：100, 300, 400, 500, 700, 900
- 鸿蒙字体繁体中文
  - 字体名：HarmonyOS_Sans_TC
  - 字重：100, 300, 400, 500, 700, 900
- 小米国永字体
  - 字体名：MiSans
  - 字重：100, 200, 300, 400, 500, 600, 700, 900
- 得以黑
  - 字体名：smiley-sans
  - 字重：400
- [霞鹜文楷](https://github.com/lxgw/LxgwWenKai/tree/main)
  - 字体名：LXGWWenKai
  - 字体名：LXGWWenKaiMono
  - 字重：300, 400, 700
## 使用方式
1. css import 引入
```.css
/* 阿里巴巴普惠体 */
@import url('https://124.223.71.44/font?family=AlibabaPuHuiTi-2:wght@100|200|300|400|500|600|700|800|900');
/* 小米国永体 */
@import url('https://124.223.71.44/font?family=MiSans:wght@100|200|300|400|500|600|700|800|900');
/* 得意黑 */
@import url('https://124.223.71.44/font?family=smiley-sans:wght@100|200|300|400|500|600|700|800|900');
/* 鸿蒙简体 */
@import url('https://124.223.71.44/font?family=HarmonyOS_Sans_SC:wght@100|200|300|400|500|600|700|800|900');
/* 鸿蒙繁体 */
@import url('https://124.223.71.44/font?family=HarmonyOS_Sans_TC:wght@100|200|300|400|500|600|700|800|900');

```
2. link 标签
```.html
  <!-- /* 阿里巴巴普惠体 */ -->
  <link rel="stylesheet" href="https://124.223.71.44/font?family=AlibabaPuHuiTi-2:wght@100|200|300|400|500|600|700|800|900"></link>
  <!-- /* 阿里巴巴普惠体 */ -->
  <link rel="stylesheet" href="https://124.223.71.44/font?family=MiSans:wght@100|200|300|400|500|600|700|800|900"></link>
  <!-- /* 阿里巴巴普惠体 */ -->
  <link rel="stylesheet" href="https://124.223.71.44/font?family=smiley-sans:wght@100|200|300|400|500|600|700|800|900"></link>
  <!-- /* 阿里巴巴普惠体 */ -->
  <link rel="stylesheet" href="https://124.223.71.44/font?family=HarmonyOS_Sans_SC:wght@100|200|300|400|500|600|700|800|900"></link>
```
## 效果展示
![字体效果](https://user-images.githubusercontent.com/105197349/269029309-f3b00fab-6b13-44c4-b0cd-7c60745dec89.png)

**服务器可能随时关闭,如需使用,可以将项目将项目部署在自己的服务器**