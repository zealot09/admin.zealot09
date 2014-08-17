CREATE TABLE `gateway_config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `domain` varchar(32),
  `customer_no` varchar(32),
  `name` varchar(80) NOT NULL,
  `description` longtext,
  `dest_types` longtext,
  `broker_type` varchar(64) NOT NULL,
  `configuration` longtext NOT NULL,
  `enabled` tinyint(1) NOT NULL,
  `create_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

CREATE TABLE `app_domain` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `guid` char(32) NOT NULL,
  `domain_name` varchar(128) NOT NULL,
  `name` varchar(80) NOT NULL,
  `theme` varchar(64),
  `description` longtext,
  `create_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY (`guid`, `domain_name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

CREATE TABLE `customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `domain` char(32) NOT NULL,
  `customer_no` varchar(32) NOT NULL,
  `password` char(32),
  `name` varchar(80) NOT NULL,
  `contact` varchar(32),
  `contact_phone` varchar(32),
  `send_start_quarter` int(2) NOT NULL,
  `send_end_quarter` int(2) NOT NULL,
  `area` varchar(32) NOT NULL,
  `manager` varchar(32) NOT NULL,
  `signature` varchar(16) NOT NULL,
  `description` longtext,
  `balance` int(11) NOT NULL DEFAULT '0',
  `status` enum('Normal', 'Trusted', 'Disabled', 'Pending') NOT NULL,
  `create_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY (`customer_no`, `domain`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE `customer_balance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `domain` char(32) NOT NULL,
  `customer_no` varchar(32) NOT NULL,
  `balance_name` varchar(80) NOT NULL,
  `balance` int(11) NOT NULL DEFAULT '0',
  `credit` int(11) NOT NULL DEFAULT '0',
  `value` int(11) NOT NULL DEFAULT '0',
  `description` longtext,
  `create_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY (`domain`, `customer_no`, `balance_name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE `customer_subscription` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `domain` char(32) NOT NULL,
  `customer_no` varchar(32) NOT NULL,
  `dest_type` enum('CmccSms', 'UnicomSms', 'TelecomSms', 'CmccMms', 'UnicomMms', 'TelecomMms', 'Email', 'Other') NOT NULL,
  `subscrtipion_name` varchar(32) NOT NULL,
  `balance_id` int(11) NOT NULL,
  `balance_name` varchar(80) NOT NULL,
  `rate` int(11) NOT NULL DEFAULT '1',
  `exceeded_rate` int(11) NOT NULL DEFAULT '100',
  `description` longtext,
  `gateway_config_id` int(11) NOT NULL,
  `extended_code` varchar(2),
  `message_per_second` int(3),
  `enabled` tinyint(1) NOT NULL DEFAULT '1',
  `create_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY (`domain`, `customer_no`, `dest_type`),
  UNIQUE KEY (`domain`, `customer_no`, `subscrtipion_name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE `recurring_plan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `balance_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `plan_name` varchar(32) NOT NULL,
  `recurring_type` enum('MonthlyAdd', 'SeasonlyAdd', 'AnnuallyAdd', 'MonthlyReset', 'SeasonlyReset', 'AnnuallyReset'),
  `last_run` datetime,
  `description` longtext,
  `enabled` tinyint(1) NOT NULL DEFAULT '1',
  `create_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY (`customer_id`, `balance_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE `sms_template` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `domain` varchar(32),
  `customer_no` varchar(32),
  `template` longtext NOT NULL,
  `name` varchar(80) NOT NULL,
  `description` longtext,
  `create_time` datetime NOT NULL,
  `audit_by` varchar(32),
  `status` enum('Allowed', 'OnHold', 'Disallowed') NOT NULL DEFAULT 'OnHold',
  `status_text` varchar(64),
  `last_update` datetime NOT NULL,
  `is_global` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

CREATE TABLE `customer_blacklist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `domain` varchar(32),
  `customer_no` varchar(32),
  `receiver` varchar(32) NOT NULL,
  `user_reply` varchar(128) NOT NULL,
  `reason` varchar(32),
  `is_global` tinyint(1) NOT NULL DEFAULT '0',
  `create_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY (`receiver`, `customer_no`, `domain`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

CREATE TABLE `scheduled_mt_task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `domain` varchar(32) NOT NULL,
  `app_name` varchar(32) NOT NULL,
  `customer_no` varchar(32) NOT NULL,
  `name` varchar(80) NOT NULL,
  `description` longtext,
  `create_time` datetime NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime,
  `template_id` int(11),
  `template` varchar(500) NOT NULL,
  `recurring_type` enum('Weekly', 'Daily', 'Monthly', 'Once') NOT NULL,
  `time_points` varchar(256) NOT NULL,
  `payload` longtext NOT NULL,
  `last_run` datetime,
  `last_run_status` varchar(32),
  `enabled` tinyint(1) NOT NULL DEFAULT '1',
  `audit_by` varchar(32),
  `status` enum('Allowed', 'OnHold', 'Disallowed') NOT NULL DEFAULT 'OnHold',
  `status_text` longtext,
  `last_update` datetime NOT NULL,
  PRIMARY KEY (`id`),
  INDEX (`domain`, `customer_no`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 


CREATE TABLE `administrator` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(32) NOT NULL,
  `password` char(128) NOT NULL,
  `create_time` datetime NOT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT '1',
  `last_login` datetime,
  `last_ip` varchar(15),
  `roles` longtext NOT NULL,
  `permissions` longtext NOT NULL,
  `domains` longtext NOT NULL,
  `session_token` char(32),
  PRIMARY KEY (`id`),
  UNIQUE KEY (`login`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE `administrator_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(32),
  `description` varchar(256),
  `permissions` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

CREATE TABLE `mo_task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `domain` varchar(32) NOT NULL,
  `customer_no` varchar(32) NOT NULL,
  `app_name` varchar(32) NOT NULL,
  `content` varchar(500),
  `payload` longtext,
  `is_public` tinyint(1) NOT NULL DEFAULT '0',
  `auto_reply_content` varchar(500),
  `mt_task_id` int(11),
  `mo_extended_code` varchar(4) NOT NULL,
  `due_time` datetime NOT NULL,
  `create_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  INDEX (`domain`, `customer_no`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

CREATE TABLE `mo_task_reply` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mo_task_id` int(11) NOT NULL,
  `replyer` varchar(32) NOT NULL,
  `reply_content` varchar(500) NOT NULL,
  `reply_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  INDEX (`mo_task_id`, `replyer`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

CREATE TABLE `mt_task` (
  `task_id` bigint NOT NULL,
  `domain` varchar(32) NOT NULL,
  `customer_no` varchar(32) NOT NULL,
  `template_id` int(11),
  `template` longtext NOT NULL,
  `payload` longtext NOT NULL,
  `create_time` datetime NOT NULL,
  `start_time` datetime,
  `end_time` datetime,
  `due_time` datetime,
  `extended_code` varchar(4),
  `receiver_amount` int(11),
  `msg_amount` int(11),
  `app` varchar(64) NOT NULL,
  `audit_by` varchar(32),
  `status` enum('Allowed', 'OnHold', 'Disallowed', 'Running', 'Finished', 'Canceled') NOT NULL DEFAULT 'OnHold',
  `status_text` longtext,
  PRIMARY KEY (`task_id`),
  INDEX (`domain`, `customer_no`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

CREATE TABLE `mt_message` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `task_id` bigint NOT NULL,
  `msg_id` bigint,
  `domain` varchar(32) NOT NULL,
  `customer_no` varchar(32) NOT NULL,
  `payload` longtext NOT NULL,
  `receiver` varchar(32) NOT NULL,
  `subscription_id` int(11),
  `subscription_name` varchar(32),
  `receiver_type` enum('Cmcc', 'Unicom', 'Telecom', 'Email', 'Unknown'),
  `price` int(4),
  `amount` int(2),
  `subtotal` int(6),
  `balance_id` int(11),
  `balance_name` varchar(80),
  `charge_status` enum('UnCharged', 'Charged', 'Refunded', 'ChargeFailed', 'RefundFailed') NOT NULL DEFAULT 'UnCharged',
  `status` enum('Pending', 'Canceled', 'Submitted', 'Success', 'Failed', 'Timeout') NOT NULL DEFAULT 'Pending',
  `status_text` varchar(32),
  `create_time` datetime NOT NULL,
  `submit_time` datetime,
  `status_time` datetime,
  `due_time` datetime,
  PRIMARY KEY (`id`),
  INDEX (`msg_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

CREATE TABLE `mt_message_status` (
  `mt_message_id` bigint NOT NULL,
  `msg_id` bigint NOT NULL,
  `status_text` varchar(32),
  `status_time` datetime,
  PRIMARY KEY (`mt_message_id`, `msg_id`),
  KEY (`msg_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE `mo_message` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `msg_type` enum('Sms', 'Mms', 'Email', 'Other') NOT NULL,
  `source` varchar(64) NOT NULL,
  `destination` varchar(64) NOT NULL,
  `content` longtext NOT NULL,
  `receive_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

CREATE TABLE `system_log` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `level` enum('Info', 'Warn', 'Error'),
  `event` varchar(32) NOT NULL,
  `detail` longtext NOT NULL,
  `event_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

CREATE TABLE `admin_log` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `operator` varchar(32) NOT NULL,
  `event` varchar(32) NOT NULL,
  `detail` longtext NOT NULL,
  `event_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  INDEX (`operator`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

CREATE TABLE `user_log` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `domain` varchar(32) NOT NULL,
  `customer_no` varchar(32) NOT NULL,
  `event` varchar(32) NOT NULL,
  `detail` longtext NOT NULL,
  `event_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  INDEX (`domain`, `customer_no`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

CREATE TABLE `customer_recharge_record` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `domain` varchar(32) NOT NULL,
  `customer_no` varchar(32) NOT NULL,
  `balance_id` int(11) NOT NULL,
  `balance_name` varchar(80) NOT NULL,
  `amount` int(11) NOT NULL,
  `value` int(11) NOT NULL,
  `remarks` varchar(64) NOT NULL,
  `event_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  INDEX (`domain`, `customer_no`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

CREATE TABLE `task_payload` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `guid` char(32) NOT NULL,
  `item` longtext NOT NULL,
  PRIMARY KEY (`id`),
  INDEX (`guid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

CREATE TABLE `keyword_blacklist` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `keyword` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 
