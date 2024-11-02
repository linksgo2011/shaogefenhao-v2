---
title: 技术方案 Webinar - 开源依赖 License 合规和扫描
date: 2024-11-02 20:54:03
sidebar: true
head:
- - meta
- name: keyword
  content: 开源依赖 License 合规和扫描
  description:  开源依赖 License 合规和扫描
---

## 问题

- 如何保证开源 License 合规？
- 如何保证依赖的包没有 CVE 漏洞？

## 背景知识

### 常见开源 License 和商业使用判定

- 开源许可证类型（MIT、GPL、Apache等）
- 许可证允许的用途（商业用途、个人用途等）
- 许可证的分发要求（是否需要附带许可证文本）
- 许可证的修改要求（是否允许修改）
- 许可证的兼容性（是否与其他许可证兼容）
- 是否附带专利授权

### 常见开源 License

| License       | 商业用途 | 分发要求               | 修改要求 | 专利       |
|---------------|---------|------------------------|---------|------------|
| MIT License   | 允许    | 需要附带许可证文本     | 允许    | 无专利授权 |
| GPL License   | 允许    | 需要提供源代码         | 允许    | 无专利授权 |
| Apache License| 允许    | 需要附带许可证文本     | 允许    | 授予专利授权|
| BSD License   | 允许    | 需要附带许可证文本     | 允许    | 无专利授权 |
| CC0 License   | 允许    | 无需附带许可证文本     | 允许    | 无专利授权 |
| LGPL License  | 允许    | 需要提供源代码         | 允许    | 无专利授权 |
| MPL License   | 允许    | 需要附带许可证文本     | 允许    | 无专利授权 |
| EPL License   | 允许    | 需要附带许可证文本     | 允许    | 授予专利授权|

### 什么是 SBOM？

SBOM 是软件材料清单的缩写。它是构建软件时使用的组件列表，包括开源和第三方库、框架和模块。SBOM 有助于跟踪和管理软件依赖关系，确保许可合规性，并识别漏洞。拥有 SBOM 对于软件开发中的供应链安全、风险管理和法规合规至关重要。

### SBOM 有哪几种格式和标准？

- SPDX (Software Package Data Exchange)
- CycloneDX
- SWID (Software Identification)

### 开源 SBOM 生成工具

1. **Syft**
   - **语言**: Go
   - **简介**: Anchore 提供的一个轻量级、灵活的开源工具。可以扫描多种格式的文件（如 Docker 镜像、OCI 镜像、文件系统）生成 SBOM。
   - **支持格式**: CycloneDX, SPDX, GitHub Native JSON
   - **链接**: [Syft on GitHub](https://github.com/anchore/syft)

2. **CycloneDX CLI**
   - **语言**: Go
   - **简介**: 支持直接生成和转换 CycloneDX 格式的 SBOM，也提供丰富的插件供集成。
   - **支持格式**: CycloneDX XML, JSON
   - **链接**: [CycloneDX CLI](https://github.com/CycloneDX/cyclonedx-cli)

3. **Trivy**
   - **语言**: Go
   - **简介**: Aqua Security 的开源工具。主要用于安全漏洞扫描，同时支持生成 SBOM。
   - **支持格式**: SPDX, CycloneDX
   - **链接**: [Trivy](https://github.com/aquasecurity/trivy)

4. **SPDX Tools**
   - **语言**: 多种语言实现
   - **简介**: SPDX 项目提供的一系列工具，用于生成、验证 SPDX 格式的 SBOM。
   - **支持格式**: SPDX（多种版本）
   - **链接**: [SPDX Tools](https://spdx.dev)

5. **OSS Review Toolkit (ORT)**
   - **语言**: Kotlin
   - **简介**: 用于管理和验证依赖合规性的开源工具，支持生成 CycloneDX 格式的 SBOM。
   - **支持格式**: SPDX, CycloneDX
   - **链接**: [OSS Review Toolkit](https://github.com/oss-review-toolkit/ort)

6. **bom** (Eclipse Foundation)
   - **语言**: Java
   - **简介**: 提供生成 CycloneDX 格式的 SBOM 功能，适用于 Java 应用的 SBOM 创建。
   - **支持格式**: CycloneDX
   - **链接**: [Eclipse Foundation bom](https://github.com/CycloneDX/cyclonedx-java-bom)

### 商业 SBOM 生成工具

1. **Anchore Enterprise**
   - **简介**: Anchore 的企业版工具，支持 SBOM 生成、漏洞扫描、合规性检查，并与 CI/CD 管道集成。
   - **支持格式**: CycloneDX, SPDX, GitHub Native JSON
   - **链接**: [Anchore](https://anchore.com)

2. **FOSSA**
   - **简介**: 一个开源合规性和漏洞管理平台，支持生成和导出 SPDX、CycloneDX 格式的 SBOM。
   - **支持格式**: SPDX, CycloneDX
   - **链接**: [FOSSA](https://fossa.com)

3. **Snyk**
   - **简介**: Snyk 主要是一个漏洞扫描工具，也提供 SBOM 功能，支持主流的格式，适合企业安全需求。
   - **支持格式**: SPDX, CycloneDX
   - **链接**: [Snyk](https://snyk.io)

4. **JFrog Xray**
   - **简介**: JFrog 的漏洞扫描工具，支持生成 CycloneDX 格式的 SBOM 并检查依赖的安全性。
   - **支持格式**: CycloneDX
   - **链接**: [JFrog Xray](https://jfrog.com/xray/)

5. **Sonatype Nexus Lifecycle**
   - **简介**: Sonatype 提供的工具，用于依赖管理、开源合规性、漏洞检测等，支持 SBOM 生成。
   - **支持格式**: CycloneDX
   - **链接**: [Sonatype Nexus](https://www.sonatype.com)

6. **Black Duck**
   - **简介**: Synopsys 提供的开源安全和管理平台，主要用于合规性管理和漏洞扫描，支持 SBOM 生成。
   - **支持格式**: SPDX
   - **链接**: [Black Duck](https://www.synopsys.com/software-integrity/security-testing/software-composition-analysis.html)

7. **Revenera**
   - **简介**: Flexera 提供的开源管理和合规性工具，生成 SBOM 并用于合规性分析和漏洞管理。
   - **支持格式**: SPDX
   - **链接**: [Revenera](https://www.revenera.com)7. 

8. **FossID**
   - **简介**: FossID 专注于开源代码的安全性和合规性管理，通过代码扫描识别和管理开源依赖的 CVE 漏洞，尤其适合大型代码库和复杂项目。
   - **优势**: 检测开源代码使用情况，减少安全和法律风险
   - **支持环境**: 源代码库、容器、应用依赖
   - **链接**: [FossID](https://www.fossid.com)

**FossID** 提供全面的开源组件识别和漏洞检测，广泛应用于需要深入了解开源依赖风险的大型企业。

### CVE 扫描工具和方案


以下是一些常用的 CVE 漏洞扫描工具和解决方案，分为开源工具和商业工具。

### 开源 CVE 扫描工具

1. **Trivy**
   - **简介**: Aqua Security 开发的开源工具，用于容器、文件系统和代码依赖的 CVE 扫描。支持检测主流编程语言依赖库中的漏洞。
   - **优点**: 轻量、易用，集成 CI/CD 支持
   - **支持环境**: 容器、文件系统、Kubernetes、虚拟机
   - **链接**: [Trivy on GitHub](https://github.com/aquasecurity/trivy)

2. **Clair**
   - **简介**: CoreOS 开发的静态分析工具，可用于容器镜像的漏洞检测。定期与 CVE 数据库同步，提供 REST API 供用户使用。
   - **优点**: 支持集成到容器 CI/CD 管道
   - **支持环境**: 容器
   - **链接**: [Clair on GitHub](https://github.com/quay/clair)

3. **Grype**
   - **简介**: Anchore 提供的开源漏洞扫描工具，专门为容器和文件系统设计。与 Syft 集成效果最佳，生成 SBOM 的同时扫描 CVE。
   - **优点**: 支持本地文件和容器镜像的扫描
   - **支持环境**: 容器、文件系统
   - **链接**: [Grype on GitHub](https://github.com/anchore/grype)

4. **Dependency-Track**
   - **简介**: 采用 CycloneDX SBOM 格式，可以帮助识别和跟踪第三方依赖中的漏洞，适合大型软件工程项目。
   - **优点**: 支持持续集成，便于管理开源依赖库的漏洞
   - **支持环境**: 应用程序依赖管理
   - **链接**: [Dependency-Track on GitHub](https://github.com/DependencyTrack/dependency-track)

5. **OpenSCAP**
   - **简介**: SCAP 标准的安全合规工具，支持生成并扫描符合安全基准的报告。特别适用于企业级 Linux 系统合规。
   - **优点**: 支持 SCAP 标准报告，适合政策合规需求
   - **支持环境**: Linux 系统、虚拟机、容器
   - **链接**: [OpenSCAP](https://www.open-scap.org/)

6. **Vuls**
   - **简介**: 一款支持 Linux 和 FreeBSD 的无代理漏洞扫描工具。基于扫描数据库匹配漏洞，支持基于计划的扫描任务。
   - **优点**: 命令行工具，适合自动化
   - **支持环境**: Linux, FreeBSD
   - **链接**: [Vuls on GitHub](https://github.com/future-architect/vuls)

### 商业 CVE 扫描解决方案

1. **Snyk**
   - **简介**: SaaS 平台，支持多种语言依赖库和容器的漏洞扫描。主要面向开发者，提供集成到代码仓库、CI/CD 的工具。
   - **优势**: 深入依赖管理、实时 CVE 通知
   - **支持环境**: 容器、代码依赖、Kubernetes
   - **链接**: [Snyk](https://snyk.io)

2. **JFrog Xray**
   - **简介**: 支持在整个软件开发生命周期中扫描依赖库，适合 DevOps 流程，检测开源依赖漏洞。
   - **优势**: 集成 JFrog Artifactory，支持 SBOM 生成
   - **支持环境**: 容器、代码依赖、包管理
   - **链接**: [JFrog Xray](https://jfrog.com/xray/)

3. **WhiteSource (Mend)**
   - **简介**: 专注于开源依赖的安全和合规性管理。支持扫描并自动识别开源库的漏洞。
   - **优势**: 强调开源组件合规和漏洞检测
   - **支持环境**: 代码依赖、容器、应用程序
   - **链接**: [Mend (WhiteSource)](https://www.mend.io)

这些工具和解决方案帮助识别并管理 CVE 漏洞，适用于从小型项目到企业网络的多样需求。

### 如果同时需要 SBOM 和 CVE 扫描

1. 使用 FOSSA：FOSSA 是一个开源软件管理工具，专注于帮助开发团队管理和审查其开源软件使用情况。它提供了对开源许可证合规性的检查，帮助团队了解其项目中使用的开源软件的许可证要求和风险。
2. 使用 Syft + Dependency-Track：结合 Syft 和 Dependency-Track 可以实现全面的漏洞扫描和依赖跟踪。Syft 用于生成 SBOM（软件构建材料清单），而 Dependency-Track 则用于识别和跟踪第三方依赖中的漏洞，帮助团队管理开源依赖库的安全性。