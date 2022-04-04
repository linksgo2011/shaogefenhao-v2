---
title: 文件上传
toc: true
date: 2021-08-11 19:18:36
categories: 
  - 技术方案
sidebar: auto
permalink: /solution/file-upload/
---

## 上传到本地服务器



```java
public class UploadImgUtils {

    private static String savePath = "";

    /**
     * 上传照片工具类
     *
     * @param file     文件
     * @param workNo   工单号
     * @param property 配置的环境（dev,prod,test）
     * @return
     * @throws OperationException
     */
    public static String uploadImg(MultipartFile file, String workNo, String property) throws OperationException {
        if (file == null) {
          System.out.println("异常"); 
        }
        if (file.getSize() > 1024 * 1024 * 1) {
          System.out.println("异常");
        }
        //获取文件后缀
        String suffix = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".") + 1);
        if (!"jpg,jpeg,gif,png".toUpperCase().contains(suffix.toUpperCase())) {
            System.out.println("异常");
        }
        //对savePath进行过赋值
        getProperties(property);
        File savePathFile = new File(savePath);
        if (!savePathFile.exists()) {
            //若不存在该目录，则创建目录
            savePathFile.mkdir();
        }
        //用工单号作为唯一的标识符
        String filename = workNo + "." + suffix;
        try {
            //将文件保存指定目录
            file.transferTo(new File(savePath + filename));
        } catch (Exception e) {
           System.out.println("异常");
        }
        //返回文件名称
        return savePath + filename;
    }

    /**
     * 读取配置文件中的信息.
     *
     * @return
     */
    private static void getProperties(String name) {
        YamlPropertiesFactoryBean factoryBean = new YamlPropertiesFactoryBean();
        factoryBean.setResources(new ClassPathResource("application-" + name + ".yml"));
        factoryBean.afterPropertiesSet();
        Properties object = factoryBean.getObject();
在配置文件中书写配置路径信息
        savePath = (String) object.get("savePath");
    }
}
```

