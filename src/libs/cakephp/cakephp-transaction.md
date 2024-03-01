---
title: Cake PHP 事务
toc: true
date: 2021-08-11 19:18:35
categories: 
  - cakephp
sidebar: auto
permalink: /cakephp/cakephp-transaction/
---

```java
$db = $this->UserAccount->getDataSource();
            $db->begin();

            $this->UserAccount->updateAll(array('amount' => 'UserAccount.amount - ' . $total_price), array('user_id' => $user_id, 'amount >=' => $total_price));
            $affectedrows = $this->UserAccount->getAffectedRows();
            if (!$affectedrows) { // 没有响应行数则为扣失败
                $this->log("VoucherComponent->send UserAccount 他帐号( $user_id )上没钱 $user_id = $user_id, \$total_price = $total_price");
                $db->rollback();
            }

            $data['MerchantProductOrder']['voucher_number'] = $this->Voucher->generateQrCode();
            if ($data['MerchantProductOrder']['voucher_total'] < 1) {
                $this->error('错误的凭证总数');
                $db->rollback();
            }

            $data['MerchantProductOrder']['voucher_remaining'] = $data['MerchantProductOrder']['voucher_total'];
            $data['MerchantProductOrder']['send_type']='sms+mms';
            $data['MerchantProductOrder']['sms_content']='';
            $data['MerchantProductOrder']['mms_content']=''; 
            $data['MerchantProductOrder']['mms_title']='';
            $data['MerchantProductOrder']['callback_url']='';
            $data['MerchantProductOrder']['buyer_user_id']=$user_id;

            $ret = $this->MerchantProductOrder->save($data);
            $send_result = -1;
            if ($ret) {
                $send_result = $this->Voucher->send(
                    $ret['MerchantProductOrder']['id'], $data['MerchantProductOrder']['voucher_number'], $data['MerchantProductOrder']['mobile'], $data['MerchantProductOrder']['send_type'], $data['MerchantProductOrder']['sms_content'], $data['MerchantProductOrder']['mms_content'], $data['MerchantProductOrder']['mms_title']
                );
            }

            if ($send_result == 0) {
                $db->commit();
                $this->succ('订单已经成功添加,订单ID：' . $ret['MerchantProductOrder']['id']);
                $this->redirect(array('action' => 'buy_succ', $ret['MerchantProductOrder']['id']));
            }else{
                $db->rollback();
                $this->log("ecommerceet_buy 创建订单失败 ");
                $this->error('创建订单失败');
            }
```

1、获取数据库资源

2、开始事务

3、如果有问题就回滚

4、如果没有问题就提交
