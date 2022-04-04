---
title: Cake PHP 学习笔记
toc: true
date: 2021-08-11 19:18:35
categories: 
  - cakephp
sidebar: auto
permalink: /cakephp/cakephp-lean-note/
---

**控制器部分**

　　1、一个控制器就是一组的逻辑结合相似的页面的组成的。

　　2、一个action就是一个控制器之中的一个方法。也就是一个页面。

　　3、几个组件

　　4、核心组建可以不需要导入直接使用即可。

```
$components
$helpers
$uses
```

　4、三个回调方法

```
Controller::beforeFilter()``Controller::beforeRender()``Controller::afterFilter()
```

　5、$this->set();为页面赋值

　6、$this->render();

　7、 `$this->autoRender` to false 设置自动渲染

　8、If `$view` starts with ‘/’ it is assumed to be a view or element file relative to the `/app/View` folder. This allows direct rendering of elements, very useful in ajax calls.

　　关于渲染路径的说明

　9、

```
几种跳转的方法、``$this``->redirect(``'/orders/thanks'``)); ``//相对路径``$this``->redirect(``'http://www.example.com'``); //绝对路径``$this``->redirect(``array``(``'action'` `=> ``'edit'``, ``$id``)); ``//组装路径
```

　10、

```
$this->redirect($this->referer());
返回上一个页面
11、
 $this->redirect($this->referer());
另外一个返回上一页的方法

12、获取登陆的用户验证数据
$user_id = $this->UserAuth->getUserId();
        
```

13、判断是否提交表单

　　

```
$this->request->is('post')
```

14、存储数据

如果是新的数据模型，开始要先使用create()创建一个新的记录。

```
$this->模型->save($data)
```

15、发送成功消息

　　

```
 $this->succ('已保存');
```

16、发送错误

```
$this->error('保存失败');
```

17、警告信息

```
$this->warning("没有记录");
```

18、载入模型

```
$this->loadModel("Tools");
```

19、发送用户消息

```
$this->Session->setFlash($message, 'default', array('class' => 'alert alert-success'));
```

 20、cake用户密码

```
md5(md5($password) . $salt);
```

 21、使用app::uses();载入一个包，那个包，如果没有那个包，App::build('APackage/SubPackage', $paths)构建一个即可

 22、App::import('Vendor', 'phpqrcode/qrlib'); 类的引入
