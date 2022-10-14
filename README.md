# anran758's Homepage

[![Travis (.com)](https://img.shields.io/travis/com/anran758/anran758.github.io)](https://travis-ci.com/github/anran758/anran758.github.io/)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![GitHub](https://img.shields.io/github/license/anran758/anran758.github.io)](https://github.com/anran758/anran758.github.io/blob/master/LICENSE)

web example website.

## TDDO

- [x] Mock Browser component
- [x] 支持配置路由

**交互优化**

- [x] [Skeleton] list
- [ ] [Skeleton] images
- [ ] error handle
- [ ] empty handle

:sparkles: Feature

- Mock Browser 支持基础的 URL 输入和 reload Demo page 的功能

## start

``` shell
# 开发模式
npm run start

# 生产打包
npm run start

# 校验 TypeScript 是否符合规范
npm run lint:ts

# 编译 TypeScript 为 js
npm run tsc

# 打开 commit 推荐信息，通过指示来提交 commit
npm run cz
```

## commit

**commit 结构** (注意换行):

``` example
<type>[optional scope]: [emoji]<description>

[optional body]

[optional footer(s)]
```

- `type`: 本次 commit 类型
- `optional scope`: 可选的改动范围
- `description`: 本次 commit 简短的描述
- `emoji`: 约定的 emoji

以下是各类型的含义，还可以增加可选的 `emoji` 增强语义:

### feat

新增功能。

- :tada: 初次提交
- :sparkles: 引入新功能

### fix

修复 bug。

- :bug: 修复 bug
- :ambulance: 修复紧急 bug
- :apple: 修复 MacOS 上的问题
- :penguin: 修复 Linux 上的问题
- :checkered_flag: 修复 Windows 上的问题
- :robot: 解决 AndroidOS 上的问题
- :green_apple: 解决 ios 上的问题

### pref

本次的代码修改可提升性能。

- :zap: 提升页面性能
- :children_crossing: 改善用户体验/可用性
- :wheelchair: 改善无障碍

### docs

仅修改文档类。

- :memo: 编写文档
- :page_facing_up: 添加或更新 License

### style

样式不会影响代码含义的更改。

- :art: 改进代码的结构 / 格式 / 分号补全等
- :pencil2: 修改文案，错别字等文字相关的工作

### refactor

既不修复错误也不增加功能的代码更改。

- :recycle: 代码重构
- :chart_with_upwards_trend: 添加分析或埋点代码等

### build

影响构建系统或外部依赖项的更改。例如 `webpack`、`npm`、`nginx` 等。

- :wrench: 更改配置文件
- :package:  更新构建相关的逻辑

### test

添加或修改测试内容。

### chore

不会涉及到 src 或测试文件的更改。比如修改 `.gitignore`,`package.json`、`yarn.json` 等文件。

- :pushpin: 将依赖关系固定到特定的版本
- :heavy_plus_sign: 添加依赖项
- :heavy_minus_sign: 移除依赖项
- :arrow_up: 升级依赖
- :arrow_down: 降级依赖

### ci

对 CI 配置文件和脚本的更改。

- :construction_worker: 添加 CI 构建系统
- :green_heart: 修复 CI 构建
- :whale: 处理 docker 相关的工作

### revert

:rewind: 回退旧版本

### commit example

``` shell
feat(html): HTML 模板新增 favicon
```

``` shell
fix: 纠正代码中的错别字

有关已修正错字的详细信息，请参见 issue

closes issue #12
```

``` shell
style: :pencil2:修改文案错别字

# or
style: ✏️修改文案错别字
```

``` shell
build(webpack): 调整 webpack 构建方式
```

``` shell
ci(travis): travis-ci 添加 commitlint-travis 脚本
```

更多示例参见: [约定式提交](https://www.conventionalcommits.org/zh-hans)

## 分支

| branch    | 用途               |
| --------- | ------------------ |
| `master`  | Github Pages 服务  |
| `develop` | 触发构建的开发分支 |

由于 `<username>.github.io` 储存库只有 `master` 分支才可以使用 Github Pages 服务，因此 `master branch` 不是 source code.
