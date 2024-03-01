---
title: Cake PHP 缓存
toc: true
date: 2021-08-11 19:18:35
categories: 
  - cakephp
sidebar: auto
permalink: /cakephp/cakephp-cache/
---

```
class Post extends AppModel {

    public function newest() {
        $result = Cache::read('newest_posts', 'longterm');  //去拿缓存数据
        if (!$result) {  //如果缓存没有数据，就从数据库中去那数据
            $result = $this->find('all', array('order' => 'Post.updated DESC', 'limit' => 10));  //获取数据
            Cache::write('newest_posts', $result, 'longterm');  //写入一个缓存
        }
        return $result;
    }
}
```

我以前一直不知道缓存怎么使用，其实是原来公司他们更本没有把缓存这样用，简直是吧缓当成了文件存储。

上面的例子一目了然啊、

在cakePHP 中使用的方法为

cakephp支持配置几个配置方案和存储引擎，分别对文件存储和外部存储进行使用

```
Cache::config(``'short'``, ``array``(``  ``'engine'` `=> ``'File'``,``  ``'duration'` `=> ``'+1 hours'``,``  ``'path'` `=> CACHE,``  ``'prefix'` `=> ``'cake_short_'``));` `// long``Cache::config(``'long'``, ``array``(``  ``'engine'` `=> ``'File'``,``  ``'duration'` `=> ``'+1 week'``,``  ``'probability'` `=> 100,``  ``'path'` `=> CACHE . ``'long'` `. DS,``));
```

　　上面就是两种配置方案

```
CacheEngine::write($key, $value, $config = 'default')
Returns:    boolean for success.
Write value for a key into cache, optional string $config specifies configuration name to write to.

CacheEngine::read($key)
Returns:    The cached value or false for failure.
Read a key from the cache. Return false to indicate the entry has expired or does not exist.

CacheEngine::delete($key)
Returns:    Boolean true on success.
Delete a key from the cache. Return false to indicate that the entry did not exist or could not be deleted.

CacheEngine::clear($check)
Returns:    Boolean true on success.
Delete all keys from the cache. If $check is true, you should validate that each value is actually expired.

CacheEngine::clearGroup($group)
Returns:    Boolean true on success.
Delete all keys from the cache belonging to the same group.

CacheEngine::decrement($key, $offset = 1)
Returns:    Boolean true on success.
Decrement a number under the key and return decremented value

CacheEngine::increment($key, $offset = 1)
Returns:    Boolean true on success.
Increment a number under the key and return incremented value

CacheEngine::gc()
Not required, but used to do clean up when resources expire. FileEngine uses this to delete files containing expired content.
```

这里的存储引擎，可以自己修改，使用的时候就使用自己的存储引擎，如果没有使用基类cache类就可以啊

配置一个组

```
Cache::config('site_home', array(
    'engine' => 'Redis', //redis服务器
    'duration' => '+999 days',  //时间
    'groups' => array('comment', 'post')  //组模型
));
```
