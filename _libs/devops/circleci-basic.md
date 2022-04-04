---
title: Circle CI 基本使用
date: 2021-08-11 19:18:35
categories: 
  - 运维开发
sidebar: auto
permalink: /devops/circleci-basic/
---

## CircleCI是什么

CircleCI is a continuous integration engine offered as SaaS and on premise.


## CircleCI特点

- 容易和Github集成
- SasS平台，无需自己搭建环境

## 有用的资源

- 官网：https://circleci.com/
- 文档：https://circleci.com/docs/
- 技术雷达的演讲keynote：http://wiki.printf.cn/media/CIrcleCI%20on%20tech%20Radar.key


## 一个构建java并部署的例子

```yaml

version: 2
jobs:
  build:
    machine:
      java:
        version: oraclejdk8

    working_directory: ~/whoisspy

    steps:

      - checkout

      - run: ./gradlew clean build

      - store_artifacts:
          path: build/libs

  deploy:
    machine: true
    working_directory: ~/whoisspy
    steps:

      - checkout

      - run:
          name: Display current position
          command: pwd

      - run:
          name: Display those variables
          command: env

      - run:
          name: Download jar file
          command: |

            export CIRCLE_TOKEN='?circle-token=93106a0b530273d9cb344ea608bc609490fdf202'

            curl https://circleci.com/api/v1.1/project/github/$CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME/$CIRCLE_PREVIOUS_BUILD_NUM/artifacts$CIRCLE_TOKEN | grep -o 'https://[^"]*' > artifacts.txt

            <artifacts.txt xargs -P4 -I % wget %

      - run:
          name: Display whole list
          command: ls -al & aws --version

      - run:
          name: Change permission for aws.pem
          command: chmod 0600 .circleci/aws.pem

      - run:
          name: SCP file to instance
          command: scp -i "./.circleci/aws.pem" whoisspy-0.0.1-SNAPSHOT.jar ubuntu@ec2-18-217-113-62.us-east-2.compute.amazonaws.com:/home/ubuntu/workspace/whoisspy-0.0.1-SNAPSHOT.jar

      - run:
          name: login to target instance
          command: |

            ssh -i "./.circleci/aws.pem" ubuntu@ec2-18-217-113-62.us-east-2.compute.amazonaws.com 'ls
            cd workspace
            #kill old instance
            output=$( netstat -apn | grep 8086 | grep LISTEN) && read num1 num2 num3 num4 num5  <<<${output//[^0-9]/ } && kill -9 $num5 || pwd

            # todo start new instance
            java -jar whoisspy-0.0.1-SNAPSHOT.jar > /dev/null 2>&1 &

            # test if it has been started
            netstat -apn | grep 8086'

      - run:
          name: last step
          command: pwd

#      - run:
#          name: kill ssh process
#          command: |
#
#            pid=$( ps aux | grep amazonaws | awk '{print $2}' | sort -n | head -n 1 )
#            sleep 5 && kill ${pid} && echo "ssh command is complete"

workflows:
  version: 2
  build-deploy:
    jobs:
      - build
      - deploy:
          requires:
            - build
          filters:
            branches:
              only: set-ci


```
