# anran758's Homepage

[![Travis (.com)](https://img.shields.io/travis/com/anran758/anran758.github.io)](https://travis-ci.com/github/anran758/anran758.github.io/)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![GitHub](https://img.shields.io/github/license/anran758/anran758.github.io)](https://github.com/anran758/anran758.github.io/blob/master/LICENSE)

> Web Demo 展示页

## TDDO

- [ ] 完成 Demo 页基础骨架
- [ ] 使用 `mobx` 进行数据管理
- [ ] 支持配置路由
- [ ] 完成“数据概况”页

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

| 类型        | 说明                                                                   |
| ----------- | ---------------------------------------------------------------------- |
| `feat:`     | 新增功能                                                               |
| `fix:`      | 修复 bug                                                               |
| `docs:`     | 仅修改文档类                                                           |
| `style:`    | 样式不会影响代码含义的更改，如**空白符、格式、分号补全、错别字修改等** |
| `refactor:` | 既不修复错误也不增加功能的代码更改                                     |
| `perf:`     | 本次代码的更改可提高性能                                               |
| `test:`     | 添加或修改测试内容                                                     |
| `build:`    | 影响构建系统或外部依赖项的更改 (**Example scopes**: `webpack`, `npm`)  |
| `ci:`       | 对 CI 配置文件和脚本的更改 (**Example scopes**: `Travis`)              |
| `chore:`    | 其他不会修改 src 或测试文件的更改，如 `.gitignore`,`package.json`、`yarn.json` 等                                      |
| `revert:`   | 回退旧版本                                                             |

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

| branch    | 用途     |
| --------- | -------- |
| `master`  | 用于 Github Pages 展示页面 |
| `develop` | 开发分支 |
