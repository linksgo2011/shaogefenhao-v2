CREATE TABLE ``
(
    `id`                 VARCHAR(64) NOT NULL COMMENT 'id',
    `branch_id`        VARCHAR(64) NOT NULL COMMENT '机构编码',
    `is_trade_finance` BOOLEAN NOT NULL COMMENT '是否贸易融资',
    `term_type`          VARCHAR(12) NOT NULL COMMENT '期限类型',
    `begin_date`         DATETIME    NOT NULL COMMENT '开始期限',
    `end_date`           DATETIME    NOT NULL COMMENT '结束期限',
    `currency_id`      VARCHAR(64) NOT NULL COMMENT '币种编码',
    `base_rate_type`     VARCHAR(12) NOT NULL COMMENT '基准利率类型',
    `is_full_mortgage` VARCHAR(12) NOT NULL COMMENT '是否全额质押',
    `guide_rate`         DECIMAL     NOT NULL COMMENT '指导利率/外币加减点',
    `created_by`         VARCHAR(64) NOT NULL COMMENT '创建人',
    `created_time`       DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_by`         VARCHAR(64) NOT NULL COMMENT '更新人',
    `updated_time`       DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    primary key (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='外币贷款指导利率';
