---
title: Jenkins 停止所有的构建
toc: true
date: 2021-08-11 19:18:35
categories: 
  - 运维开发
sidebar: auto
permalink: /devops/jenkins-stop-builds/
---

使用管理员进入 Manage Jenkins > Script Console

```groovy
Jenkins.instance.queue.items.findAll { !it.task.name.contains("Extenda") }.each { 
  println "Cancel ${it.task.name}"
  Jenkins.instance.queue.cancel(it.task)
}
Jenkins.instance.items.each {
  stopJobs(it)
}
def stopJobs(job) {
  if (job in jenkins.branch.OrganizationFolder) {
    // Git behaves well so no need to traverse it.
    return
  } else if (job in com.cloudbees.hudson.plugins.folder.Folder) {
    job.items.each { stopJobs(it) }
  } else if (job in org.jenkinsci.plugins.workflow.multibranch.WorkflowMultiBranchProject) {
    job.items.each { stopJobs(it) }
  } else if (job in org.jenkinsci.plugins.workflow.job.WorkflowJob) {
     println job;
    job.builds.findAll { it.inProgress || it.building }.each { build ->
      println "Kill $build"
      build.finish(hudson.model.Result.ABORTED, new java.io.IOException("Aborted from Script Console"));
    }
  }
}

return true
```

