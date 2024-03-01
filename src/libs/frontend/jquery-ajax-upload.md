---
title: ajax 文件上传
toc: true
date: 2021-08-11 19:18:35
categories: 
  - 前端工程
sidebar: auto
permalink: /frontend/jquery-ajax-upload/
---

```javascript
function upload(){
      $.ajaxFileUpload({
          url:'/Tools/ajaxUpload',
          secureuri:false,
          fileElementId:'logo',
          dataType: 'json',
          success: function (data, status){
              if(data.error)
              {
                alert(data.error);
              }else
              {
                $("#logoPath").attr('value',data.logo);
                $("#upload-tip").html('文件上传成功！'+ getFileName(data.logo));
                alert('文件上传成功！');
              }
          },
          error: function (data, status, e)
          {
            alert(e);
          }
      }) ;
    }
```

需要载入 ajaxFileUpload 
