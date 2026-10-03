# Taste Vault · 让 AI 理解你的选择标准

[English](README.md) · [复制启动 Prompt](prompts/00-bootstrap.md) · [文件夹架构](docs/architecture.md) · [来源与致谢](SOURCES.md)

Taste 是面对多个合理答案时，你注意什么、重视什么，以及愿意为了什么舍弃什么。这个仓库把“看例子 → 做选择 → 推测与校准 → 提炼标准 → 应用与反馈”整理成可复现的机制，适用于文章表达、视觉偏好、research 选题和 judgement。

## 最简单的开始方式

把 `prompts/00-bootstrap.md` 的中文部分发给 AI，先选一个领域。每轮看三四个可比较的例子，选喜欢和不喜欢的。你可以说“都不喜欢”“说不清”或“喜欢 B 的语气、C 的结构”。解释不是必选项。

AI 保存原始案例与你的原话，提出假设，再用新的例子和反例验证。确认后的偏好可以整理成 rubrics，但原始证据和例外仍然保留。实际任务时，读取相关 rubrics 和样本作为上下文。

这是输入、外部记忆和反馈组成的 harness；仓库不会修改模型 weights，也不包含自动浏览、模型调用或后台调度服务。能否主动找例子、保存文件和定时推送，取决于你使用的宿主工具。没有这些能力也可以手动继续。

## 文件模式

Python 3.10+，仅用标准库，不需要 API key。

```bash
python3 scripts/vault.py init vaults/me --domain writing
python3 scripts/vault.py import-round vaults/me examples/writing/round-001.json
python3 scripts/vault.py feedback vaults/me examples/writing/feedback-001.json
python3 scripts/vault.py validate vaults/me
python3 scripts/vault.py context vaults/me --task "写一个关于学习新技能的开头" > /tmp/taste-context.md
```

把导出的 context 和任务发给你的 AI。第一次选择只提供初步证据，不会自动生成“已确认”的规则。完整的两轮虚构示例在 `examples/writing/complete-vault/`，可直接 validate 和 context。

## 使用顺序

| 步骤 | 文件 |
| --- | --- |
| 初始化目标、受众和能力边界 | `prompts/00-bootstrap.md` |
| 找例子，不提前暗示正确选择 | `prompts/01-discover.md` |
| 记录原话，提出待验证假设 | `prompts/02-calibrate.md` |
| 将用户认可的标准编成 rubrics | `prompts/03-compile.md` |
| 将相关规则和案例用于任务 | `prompts/04-apply.md` |
| 用未见过的例子测试理解 | `prompts/05-evaluate.md` |

个人数据放在 `vaults/`，默认不提交 Git。正负样本是同一轮案例上的反馈索引，不必把原图复制到多个目录。更完整的目录说明见 `docs/architecture.md`。

## 保留这几个区别

- 你的原话、AI 的解释、用户认可的规则，是三层不同的信息。
- 没有回复代表未评价，不代表不喜欢。
- 喜欢一个作品，不等于认可它的每个元素。
- “它更懂我”和“我的判断正确”需要不同的验证。
- 没有唯一答案，不等于偏好无法通过参数学习；本仓库选择外部上下文，便于检查、修订与迁移。
- 用户可以改主意。保留旧记录，新增修正，避免把偏好永久固化。

例子全部是原创文字与虚构反馈，不包含作者的私人记录。源代码和原创 prompts 使用 MIT；外部参考保留原权利。这个仓库承诺可复现流程，不承诺不同模型输出一致或保证审美、科研与投资结果提升。

## 可选：云端 Taste Library

`web/` 提供可编辑的云端图库：并排比较、修改反馈、保存版本历史、查看规则背后的证据，以及导出 AI context。需要 Node.js 和独立的私有部署，不能直接放在 GitHub Pages。详见 [云端使用说明](docs/cloud-library.md)。公开代码不包含个人选择记录。
