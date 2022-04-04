---
title: docker 自带镜像仓库清理
toc: true
date: 2021-08-11 19:18:35
categories: 
  - docker
sidebar: auto
permalink: /docker/docker-registry-clean/
---

Docker存储使用的aufs文件系统分层存储结构,将容器文件以读写分层的形式存储在宿主机中。自带的镜像仓库删除比较麻烦，需要调用 API 删除，然后进入容器执行。


## 手动删除

进入 registry 容器

> vim /etc/docker/registry/config.yml

添加配置

```
storage:
  delete:
    enabled: true
```

重启 registry

调用 API 获取所有镜像仓库 

> curl http://host:5000/v2/_catalog

获取仓库标签

> curl http://host:5000/v2/app-frontend/tags/list

获取标签对应的digest

> curl http://host:5000/v2/app-frontend/manifests/v1

注意： 必须配置 Header Accept: application/vnd.docker.distribution.manifest.v2+json，否则获取的值不对

注意看前面操作返回值的 Header，使用 Docker-Content-Digest 的完整值，包含 sha256: 前缀。

删除 manifest 

> curl http://host:5000/v2/app-frontend/manifests/sha256:1234455 -X DELETE

调用API清理后，进入容器，清理磁盘空间

清理空间

> registry garbage-collect /etc/docker/registry/config.yml

## 参考资料

> 参考 API https://docs.docker.com/registry/spec/api
> 单个清理过程 https://blog.csdn.net/isea533/article/details/87622213
> 批量清理 https://blog.csdn.net/ywq935/article/details/83828888

## 网友编写的自动调API的 python2.7 脚本

```
import requests
from concurrent.futures import ThreadPoolExecutor

class Docker(object):
    def __init__(self, hub, repos):
        self.hub = hub
        self.repos = repos

    @staticmethod
    def get_tag_list(hub, repo):
        # 获取这个repo的所有tags
        tag_list_url = '%s/v2/%s/tags/list' % (hub, repo)
        r1 = requests.get(url=tag_list_url)
        tag_list = r1.json().get('tags')
        return tag_list

    def main(self):
        thpool = ThreadPoolExecutor(10)
        for repo in self.repos:
            thpool.submit(self.delete_images, repo)

        thpool.shutdown(wait=True)

    def delete_images(self, repo):
        hub = self.hub
        tag_list = self.get_tag_list(hub=hub, repo=repo)
        num = 0
        try:
            # 保留最后两个版本的镜像
            for tag in tag_list[:-2]:
                # 获取image digest摘要信息
                get_info_url = '{}/v2/{}/manifests/{}'.format(hub, repo, tag)
                header = {"Accept": "application/vnd.docker.distribution.manifest.v2+json"}
                r2 = requests.get(url=get_info_url, headers=header, timeout=10)
                digest = r2.headers.get('Docker-Content-Digest')

                # 删除镜像
                delete_url = '%s/v2/%s/manifests/%s' % (hub, repo, digest)
                r3 = requests.delete(url=delete_url)
                if r3.status_code == 202:
                    num += 1

        except Exception as e:
            print(str(e))

        print('仓库%s 共删除了%i个历史镜像' % (repo, num))


if __name__ == '__main__':
    hub = 'http://registry.xxx.com:5000'
    repos = ['zdtest', 'ordertest', 'bjdev', 'zhqtest', 'systemtest', 'zddev', 'bjtest', 'dsystemtest', 'tooltest']
    d = Docker(hub=hub, repos=repos)
    d.main()
————————————————
版权声明：本文为CSDN博主「ywq935」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/ywq935/article/details/83828888
```
