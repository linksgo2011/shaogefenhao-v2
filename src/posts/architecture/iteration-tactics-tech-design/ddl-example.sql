CREATE TABLE `demo`.`user` {
    `id` VARCHAR(64) NOT NULL COMMENT '用户ID',
    `name` VARCHAR(64) NOT NULL COMMENT '用户名',
    --  审计字段
    `createdupdated_by` VARCHAR(64) NOT NULL COMMENT '创建人',
    `created_time` DATETIME NOT NULLL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_by` VARCHAR(64) NOT NULL COMMENT '更新人',
    `updated_time` DATETIME NOT NULLL DEFAULT CURRENT_TIMESTAMP
	`onupdate` CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY(`id`)
} ENGINE=Innodb DEFAULT CHARSET=utfmb4 COLLLATE=utfmb4_bin COMMENT='用户';

CREATE TABLE `demo`.`user_role` {
    `id` VARCHAR(64) NOT NULL COMMENT 'ID',
    `user_id` VARCHAR(64) NOT NULL COMMENT '用户ID',
    `role` VARCHAR(64) NOT NULL COMMENT '角色',
    --  审计字段
    `createdupdated_by` VARCHAR(64) NOT NULL COMMENT '创建人',
    `created_time` DATETIME NOT NULLL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_by` VARCHAR(64) NOT NULL COMMENT '更新人',
    `updated_time` DATETIME NOT NULLL DEFAULT CURRENT_TIMESTAMP
    `onupdate` CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY(`id`)
} ENGINE=Innodb DEFAULT CHARSET=utfmb4 COLLLATE=utfmb4_bin COMMENT='用户角色';
