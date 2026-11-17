# 剑门使用手册

这是剑门客户手册的主仓库。合作伙伴可在这里编写简体中文正文、维护目录和截图，独立预览和构建文档镜像。构建和预览只需本仓库，首次安装依赖需要可用的包源。

## 预览

准备 Node.js 24 和 pnpm 10.33.4。从仓库根目录执行：

```bash
pnpm install --frozen-lockfile
pnpm dev:manual
```

打开 http://localhost:3020/manual。改稿保存后即可预览。远程开发时可转发 3020 端口。

## 正文和截图怎么改

正文目录是 `manual/guide/`。章节与平台入口对应：

| 内容 | 路径 |
| --- | --- |
| 欢迎页与平台介绍 | `getting-started.mdx` |
| 从登录到发布的快速上手 | `quick-start.mdx` |
| 聊天 | `chat/` |
| 智能体、工作流及节点教程 | `agent/`、`agent/workflow/nodes/` |
| 代码 | `code/` |
| 知识库 | `dataset/` |
| 我的、团队权限、模型和统计 | `account/` |

新增文章时在同目录的 `meta.json` 的 `pages` 中登记不带扩展名的文件名。目录的 `index.mdx` 是章节首页，由侧栏目录标题打开。每篇至少写清适用角色、操作入口、步骤、预期结果和常见问题。节点教程请描述输入、输出、连线或下游变量，以及至少一个能复现的例子。修改既有路径时同时检查站内链接和平台按钮使用的旧帮助地址。

MDX 的示例：

```md
---
title: 角色矩阵与权限分配
description: 区分团队角色并检查资源授权。
---

[模型配置](./models.mdx)

![演示账号的团队权限页](./assets/team-permissions.png)
```

截图使用隔离演示环境和合成数据，放在文章附近的 `assets/`。裁掉真实账号、凭据、内部地址和业务数据。预览后至少点一次站内链接、打开截图并试一次中文搜索。正文发布前由有对应业务角色的人员校对。

## 自己构建镜像

需要可用的 Docker。从仓库根目录执行：

```bash
bash script/build-manual-image.sh 2026.11.17-docs.1
docker save -o glowlink-docs-2026.11.17-docs.1.tar glowlink-docs:2026.11.17-docs.1
```

构建机准备好 Node 依赖和 Docker 基础镜像后即可打包。修订号会显示在手册侧栏。交付方验收后在部署仓库的 `.images` 登记标签，手册继续由平台网关的 `/manual` 提供访问。

## 如何合并

从最新 `main` 创建自己的分支。没有写权限时，按仓库访问设置使用 fork，或把提交补丁发给维护者。有写权限时可以直接推送分支并发起 PR。

```bash
git checkout -b docs/team-permissions
git add manual/
git commit -m "补充团队权限教程"
git push -u origin docs/team-permissions
```

PR 附上改动章节、核对过的平台版本、操作角色及预览证据。维护者核对帮助链接和交付兼容性后合并。权限、计费或模型行为以目标交付版本为准，客户示例使用合成数据。

## 内容依据

欢迎页和上手流程参考剑门 4.11.1 的「平台介绍」与「平台上手说明」，节点教程参考与平台版本对应的 FastGPT 上游资料。本手册按当前剑门界面、节点模板及已核实的行为重新表述。上线前用目标版本核对名称、权限和步骤。 [FastGPT 节点说明](https://doc.fastgpt.cn/zh-CN/guide/build/workflow/nodes/ai_chat)
