---
title: cake 分页一个典型的条件
toc: true
date: 2021-08-11 19:18:35
categories: 
  - cakephp
sidebar: auto
permalink: /cakephp/cakephp-paginate-example/
---

```php
$this->paginate = array(
            'limit' => $limit,
            'order' => array('MerchantProductOrder.id' => 'desc'),
            'fields' => array(
                'MerchantProductOrder.*',
                'MerchantProduct.*',
                'Merchant.*'
            ),
            'joins' => array(
                array(
                    'table' => 'media_app_order',
                    'alias' => 'MediaAppOrder',
                    'type' => 'inner',
                    'conditions' => array(
                        'MediaAppOrder.merchant_product_order_id = MerchantProductOrder.id',
                    )
                ),
                array(
                    'table' => 'merchant_products',
                    'alias' => 'MerchantProduct',
                    'type' => 'inner',
                    'conditions' => array(
                        'MerchantProduct.id = MerchantProductOrder.product_id',
                    )
                ),
                array(
                    'table' => 'merchants',
                    'alias' => 'Merchant',
                    'type' => 'inner',
                    'conditions' => array(
                        'Merchant.id = MerchantProduct.merchant_id',
                    )
                ),
            ),
            'conditions' => $conditions,
        );
```

