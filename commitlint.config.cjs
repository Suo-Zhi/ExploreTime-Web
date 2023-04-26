module.exports = {
    extends: ["@commitlint/config-conventional"],
    // 校验规则
    rules: {
        "type-enum": [
            2,
            "always",
            [
                "feat", // 新功能
                "fix", // 修改bug
                "docs", // 更新文档
                "style", // 页码样式
                "wrap", // 封装代码
                "config", // 配置
                "refactor", // 重构
                "perf", // 性能提升
                "test", // 测试
                "chore", // 不影响功能的琐碎操作(如调整文件名或目录)
                "revert", // 版本回退
                "build", // 打包
            ],
        ],
        "type-case": [0],
        "type-empty": [0],
        "scope-empty": [0],
        "scope-case": [0],
        "subject-full-stop": [0, "never"],
        "subject-case": [0, "never"],
        "header-max-length": [0, "always", 72],
    },
};