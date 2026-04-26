# Remotion 技能管理动画

## 🎬 演示

### 技能流程动画 (SkillFlow)

![SkillFlow](./docx/SkillFlow.gif)

### 技能分发动画 (SkillDistribution)

![SkillDistribution](./docx/SkillDistribution.gif)

---

这是一个使用 Remotion 框架制作的 macOS 风格动画，展示技能文件在不同 IDE 之间的管理和分发流程。

## 🎬 动画内容

### SkillFlow（技能流程）
展示技能文件从 Cursor 到技能管理中心，再到 Claude Code 的完整流程：
- **第一步**：从 `~/.cursor/skills` 找到 my-skill 技能
- **第二步**：复制到 `~/.skills-managers/skills` 技能管理中心
- **第三步**：创建软连接到 `~/.claude/skills`

### SkillDistribution（技能分发）
展示技能从管理中心分发到多个 IDE 的过程：
- 技能管理中心：`~/.skills-managers/skills`
- 分发目标：
  - Cursor/Skills
  - Codex/Skills
  - Claude/Skills

## ✨ 特性

- 🎨 **macOS Big Sur 风格界面**
  - 真实的文件夹图标
  - 菜单栏和 Dock 栏
  - 精美的阴影和动画效果

- 🎯 **品牌图标展示**
  - Cursor 图标
  - GPT 图标
  - Claude 图标
  - 章鱼管理中心图标

- 🌐 **双语标签**
  - 中文主标签
  - 英文副标签
  - 白色字体配阴影效果

- ⚡ **流畅动画**
  - Spring 物理动画
  - 方向性箭头动画
  - 文件弹出和弹跳效果

## 🚀 快速开始

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

或者使用启动脚本：
```bash
./start.sh
```

### 构建项目
```bash
npm run build
```

## 📁 项目结构

```
src/
├── SkillFlow.tsx           # 技能流程动画
├── SkillDistribution.tsx   # 技能分发动画
├── Root.tsx                # Remotion 根组件
├── Composition.tsx         # 示例合成组件
└── 资源文件/
    ├── mac-folder.png      # macOS 文件夹图标
    ├── bg.png              # 背景图片
    ├── claude.svg          # Claude 图标
    ├── cursor.svg          # Cursor 图标
    ├── GPT.svg             # GPT 图标
    └── octopus-logo.png    # 章鱼 Logo
```

## 🎞️ 动画配置

- **分辨率**: 1280x720
- **帧率**: 30 FPS
- **SkillFlow 时长**: 150 帧 (5 秒)
- **SkillDistribution 时长**: 180 帧 (6 秒)

## 🛠️ 技术栈

- **Remotion 4.0** - 动画框架
- **React 19** - UI 组件
- **TypeScript** - 类型安全
- **SVG** - 矢量图标和图形
- **Tailwind CSS 4.0** - 样式管理

## 📝 许可证

版权所有 © 2025

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！
