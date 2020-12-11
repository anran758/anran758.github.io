# anran758's Homepage

[![Travis (.com)](https://img.shields.io/travis/com/anran758/anran758.github.io)](https://travis-ci.com/github/anran758/anran758.github.io/)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![GitHub](https://img.shields.io/github/license/anran758/anran758.github.io)](https://github.com/anran758/anran758.github.io/blob/master/LICENSE)

配置式展示个人相关数据与 web 功能实现后的 demo。

Tips: 目前调用的 API 大多都是 Github 的服务，因此国内用户访问可能会有加载不了资源的情况，这个问题后续再进行处理。

## TDDO

- [x] 使用 `mobx` 进行数据管理
- [x] Demo 展示框架
- [x] 支持配置路由
- [ ] 完成 “数据概况” 页
- [ ] 菜单组件完善
- [ ] 支持响应式
- [ ] API utils
- [ ] 制定统一项目规范
- [ ] 单元测试
- [ ] 状态管理切回 `redux` 架构

**交互优化**

- [x] 骨架屏 - list
- [ ] 骨架屏 - images
- [ ] fetch new content loading
- [ ] error 处理
- [ ] empty 处理

## start

``` shell
# 开发模式
npm run start

# 生产打包
npm run start

# 校验 typescitpt 是否符合规范
npm run lint:ts

# 编译 typescipt 为 js
npm run tsc

# 打开 commit 推荐信息，通过指示来提交 commit
npm run cz
```

## commit

commit 结构 (注意隔行):

``` example
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

- `type`: 本次 `commit` 类型
- `optional scope`: 可选的改动范围
- `description`: 本次 commit 简短的描述

类型含义如下:

| 类型        | 说明                                                                              |
| ----------- | --------------------------------------------------------------------------------- |
| `feat:`     | 新增功能                                                                          |
| `fix:`      | 修复 bug                                                                          |
| `docs:`     | 仅修改文档类                                                                      |
| `style:`    | 样式不会影响代码含义的更改(**空白符、格式、分号补全、错别字修改等**)            |
| `refactor:` | 既不修复错误也不增加功能的代码更改 (**重构**等)                                                |
| `perf:`     | 本次代码的更改可提高性能                                                          |
| `build:`    | 影响构建系统或外部依赖项的更改 (**Example scopes**: `webpack`, `npm`)             |
| `test:`     | 添加或修改测试内容                                                                |
| `chore:`    | 其他不会修改 src 或测试文件的更改，如 `.gitignore`,`package.json`、`yarn.json` 等 |
| `ci:`       | 对 CI 配置文件和脚本的更改 (**Example scopes**: `Travis`)                         |
| `revert:`   | 回退旧版本                                                                        |

commit 示例:

``` shell
feat(html): HTML 模板新增 favicon
```

``` shell
fix: 纠正代码中的错别字

有关已修正错字的详细信息，请参见 issue

closes issue #12
```

``` shell
build(webpack): 调整 webpack 构建方式
```

``` shell
ci(Travis): Travis ci 添加 commitlint-travis 脚本
```

更多示例参见: [约定式提交](https://www.conventionalcommits.org/zh-hans)

## 分支

| branch    | 用途                                                                        |
| --------- | --------------------------------------------------------------------------- |
| `master`  | `<username>.github.io` 储存库只有 `master` 分支才可以使用 Github Pages 服务 |
| `develop` | 触发构建的开发分支                                                          |
