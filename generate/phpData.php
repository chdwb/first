<?php
	$goods = array
	(
		"GOODS_ID_1"=>array("GOODS_ID"=>1, "GOODS_NAME"=>"道具1", "GOODS_ISSELL"=>1, "GOODS_PRICE"=>200, "GOODS_EFFECT"=>1, "GOODS_EFFECT_VALUE"=>10, "GOODS_DESC"=>"使用后可获得{0}点亲密度"),
		"GOODS_ID_2"=>array("GOODS_ID"=>2, "GOODS_NAME"=>"道具2", "GOODS_ISSELL"=>1, "GOODS_PRICE"=>200, "GOODS_EFFECT"=>2, "GOODS_EFFECT_VALUE"=>"", "GOODS_DESC"=>"送给女主可将当前亲密值补满"),
		"GOODS_ID_9"=>array("GOODS_ID"=>9, "GOODS_NAME"=>"道具3", "GOODS_ISSELL"=>1, "GOODS_PRICE"=>200, "GOODS_EFFECT"=>3, "GOODS_EFFECT_VALUE"=>"", "GOODS_DESC"=>"任务A所需道具")
	);
	$level = array
	(
		"LEV_LEV_1"=>array("LEV_LEV"=>1, "LEV_EXP"=>5, "LEV_DAY"=>1, "LEV_PLAY_VIDEO_EXP"=>"", "LEV_VIDEO_ID"=>"", "LEV_STORY_VIDEO_ID"=>"", "LEV_STORY_VIDEO_FONT"=>""),
		"LEV_LEV_2"=>array("LEV_LEV"=>2, "LEV_EXP"=>9, "LEV_DAY"=>1, "LEV_PLAY_VIDEO_EXP"=>5, "LEV_VIDEO_ID"=>6, "LEV_STORY_VIDEO_ID"=>3, "LEV_STORY_VIDEO_FONT"=>"客厅"),
		"LEV_LEV_3"=>array("LEV_LEV"=>3, "LEV_EXP"=>15, "LEV_DAY"=>2, "LEV_PLAY_VIDEO_EXP"=>6, "LEV_VIDEO_ID"=>5, "LEV_STORY_VIDEO_ID"=>4, "LEV_STORY_VIDEO_FONT"=>"客厅"),
		"LEV_LEV_4"=>array("LEV_LEV"=>4, "LEV_EXP"=>24, "LEV_DAY"=>5, "LEV_PLAY_VIDEO_EXP"=>5, "LEV_VIDEO_ID"=>9, "LEV_STORY_VIDEO_ID"=>5, "LEV_STORY_VIDEO_FONT"=>"家里"),
		"LEV_LEV_5"=>array("LEV_LEV"=>5, "LEV_EXP"=>37, "LEV_DAY"=>10, "LEV_PLAY_VIDEO_EXP"=>6, "LEV_VIDEO_ID"=>5, "LEV_STORY_VIDEO_ID"=>6, "LEV_STORY_VIDEO_FONT"=>"客厅"),
		"LEV_LEV_6"=>array("LEV_LEV"=>6, "LEV_EXP"=>55, "LEV_DAY"=>12, "LEV_PLAY_VIDEO_EXP"=>29, "LEV_VIDEO_ID"=>8, "LEV_STORY_VIDEO_ID"=>7, "LEV_STORY_VIDEO_FONT"=>"阳台"),
		"LEV_LEV_7"=>array("LEV_LEV"=>7, "LEV_EXP"=>69, "LEV_DAY"=>14, "LEV_PLAY_VIDEO_EXP"=>55, "LEV_VIDEO_ID"=>6, "LEV_STORY_VIDEO_ID"=>8, "LEV_STORY_VIDEO_FONT"=>"浴室"),
		"LEV_LEV_8"=>array("LEV_LEV"=>8, "LEV_EXP"=>83, "LEV_DAY"=>19, "LEV_PLAY_VIDEO_EXP"=>46, "LEV_VIDEO_ID"=>9, "LEV_STORY_VIDEO_ID"=>9, "LEV_STORY_VIDEO_FONT"=>"客厅"),
		"LEV_LEV_9"=>array("LEV_LEV"=>9, "LEV_EXP"=>99, "LEV_DAY"=>21, "LEV_PLAY_VIDEO_EXP"=>88, "LEV_VIDEO_ID"=>5, "LEV_STORY_VIDEO_ID"=>10, "LEV_STORY_VIDEO_FONT"=>"家里"),
		"LEV_LEV_10"=>array("LEV_LEV"=>10, "LEV_EXP"=>119, "LEV_DAY"=>24, "LEV_PLAY_VIDEO_EXP"=>59, "LEV_VIDEO_ID"=>4, "LEV_STORY_VIDEO_ID"=>11, "LEV_STORY_VIDEO_FONT"=>"客厅")
	);
	$phone = array
	(
		"PHONE_ID_1"=>array("PHONE_ID"=>1, "PHONE_LEV"=>2, "PHONE_OPTION"=>"", "PHONE_EXP"=>"", "PHONE_AUDIO"=>1, "PHONE_OPTION"=>"女主说话内容1"),
		"PHONE_ID_2"=>array("PHONE_ID"=>2, "PHONE_LEV"=>2, "PHONE_OPTION"=>1, "PHONE_EXP"=>1, "PHONE_AUDIO"=>5, "PHONE_OPTION"=>"用户选项1"),
		"PHONE_ID_3"=>array("PHONE_ID"=>3, "PHONE_LEV"=>2, "PHONE_OPTION"=>1, "PHONE_EXP"=>2, "PHONE_AUDIO"=>5, "PHONE_OPTION"=>"用户选项1"),
		"PHONE_ID_4"=>array("PHONE_ID"=>4, "PHONE_LEV"=>2, "PHONE_OPTION"=>1, "PHONE_EXP"=>-1, "PHONE_AUDIO"=>5, "PHONE_OPTION"=>"用户选项1"),
		"PHONE_ID_5"=>array("PHONE_ID"=>5, "PHONE_LEV"=>2, "PHONE_OPTION"=>"", "PHONE_EXP"=>"", "PHONE_AUDIO"=>2, "PHONE_OPTION"=>"女主说话内容2"),
		"PHONE_ID_6"=>array("PHONE_ID"=>6, "PHONE_LEV"=>2, "PHONE_OPTION"=>2, "PHONE_EXP"=>2, "PHONE_AUDIO"=>9, "PHONE_OPTION"=>"用户选项2"),
		"PHONE_ID_7"=>array("PHONE_ID"=>7, "PHONE_LEV"=>2, "PHONE_OPTION"=>2, "PHONE_EXP"=>1, "PHONE_AUDIO"=>9, "PHONE_OPTION"=>"用户选项2"),
		"PHONE_ID_8"=>array("PHONE_ID"=>8, "PHONE_LEV"=>2, "PHONE_OPTION"=>2, "PHONE_EXP"=>3, "PHONE_AUDIO"=>9, "PHONE_OPTION"=>"用户选项2"),
		"PHONE_ID_9"=>array("PHONE_ID"=>9, "PHONE_LEV"=>2, "PHONE_OPTION"=>"", "PHONE_EXP"=>"", "PHONE_AUDIO"=>3, "PHONE_OPTION"=>"女主说话内容3"),
		"PHONE_ID_10"=>array("PHONE_ID"=>10, "PHONE_LEV"=>2, "PHONE_OPTION"=>3, "PHONE_EXP"=>2, "PHONE_AUDIO"=>12, "PHONE_OPTION"=>"用户选项3"),
		"PHONE_ID_11"=>array("PHONE_ID"=>11, "PHONE_LEV"=>2, "PHONE_OPTION"=>3, "PHONE_EXP"=>1, "PHONE_AUDIO"=>12, "PHONE_OPTION"=>"用户选项3"),
		"PHONE_ID_12"=>array("PHONE_ID"=>12, "PHONE_LEV"=>2, "PHONE_OPTION"=>"", "PHONE_EXP"=>"", "PHONE_AUDIO"=>"", "PHONE_OPTION"=>"女主说话内容4")
	);
	$work = array
	(
		"ID_1"=>array("ID"=>1, "NAME"=>"职位1", "TIME"=>2, "EXECUTE_TIME"=>20, "REWARD"=>100, "NEED_LEVEL"=>10),
		"ID_2"=>array("ID"=>2, "NAME"=>"职位2", "TIME"=>2, "EXECUTE_TIME"=>20, "REWARD"=>200, "NEED_LEVEL"=>20),
		"ID_3"=>array("ID"=>3, "NAME"=>"职位3", "TIME"=>2, "EXECUTE_TIME"=>20, "REWARD"=>300, "NEED_LEVEL"=>30),
		"ID_4"=>array("ID"=>4, "NAME"=>"职位4", "TIME"=>2, "EXECUTE_TIME"=>20, "REWARD"=>500, "NEED_LEVEL"=>40),
		"ID_5"=>array("ID"=>5, "NAME"=>"职位5", "TIME"=>2, "EXECUTE_TIME"=>5, "REWARD"=>900, "NEED_LEVEL"=>50)
	);
	$role = array
	(
		"ID_1"=>array("ID"=>1, "FAMLIY_NAME"=>"赵", "NAME"=>"狗子"),
		"ID_2"=>array("ID"=>2, "FAMLIY_NAME"=>"钱", "NAME"=>"丫头"),
		"ID_3"=>array("ID"=>3, "FAMLIY_NAME"=>"孙", "NAME"=>"毛娃"),
		"ID_4"=>array("ID"=>4, "FAMLIY_NAME"=>"李", "NAME"=>"小妖")
	);
	$date = array
	(
		"DATE_ID_1"=>array("DATE_ID"=>1, "DATE_NAME"=>"名称1", "DATE_NEED_POWER"=>5, "DATE_NEED_GOODS_ID"=>"", "DATE_NEED_GOODS_COUNT"=>"", "DATE_EXECUTE_TIME"=>15, "DATE_EXP"=>5, "DATE_NEED_LEVEL"=>1),
		"DATE_ID_2"=>array("DATE_ID"=>2, "DATE_NAME"=>"名称2", "DATE_NEED_POWER"=>6, "DATE_NEED_GOODS_ID"=>"", "DATE_NEED_GOODS_COUNT"=>"", "DATE_EXECUTE_TIME"=>25, "DATE_EXP"=>6, "DATE_NEED_LEVEL"=>4),
		"DATE_ID_3"=>array("DATE_ID"=>3, "DATE_NAME"=>"名称3", "DATE_NEED_POWER"=>9, "DATE_NEED_GOODS_ID"=>1, "DATE_NEED_GOODS_COUNT"=>1, "DATE_EXECUTE_TIME"=>10, "DATE_EXP"=>8, "DATE_NEED_LEVEL"=>9),
		"DATE_ID_4"=>array("DATE_ID"=>4, "DATE_NAME"=>"名称4", "DATE_NEED_POWER"=>10, "DATE_NEED_GOODS_ID"=>2, "DATE_NEED_GOODS_COUNT"=>1, "DATE_EXECUTE_TIME"=>16, "DATE_EXP"=>9, "DATE_NEED_LEVEL"=>10)
	);
	$branchVideo = array
	(
		"PLOT_VIDEO_ID_1"=>array("PLOT_VIDEO_ID"=>1, "PLOT_VIDEO_OPTION_1"=>"送", "PLOT_VIDEO_LINK_VIDEO_1"=>10, "PLOT_VIDEO_OPTION_2"=>"不送", "PLOT_VIDEO_LINK_VIDEO_2"=>20),
		"PLOT_VIDEO_ID_2"=>array("PLOT_VIDEO_ID"=>2, "PLOT_VIDEO_OPTION_1"=>"要", "PLOT_VIDEO_LINK_VIDEO_1"=>5, "PLOT_VIDEO_OPTION_2"=>"不要", "PLOT_VIDEO_LINK_VIDEO_2"=>3)
	);
	$video = array
	(
		"VIDEO_ID_1"=>array("VIDEO_ID"=>1, "VIDEO_NAME"=>"珍藏视频01", "VIDEO_NEED_MONEY"=>100000),
		"VIDEO_ID_2"=>array("VIDEO_ID"=>2, "VIDEO_NAME"=>"珍藏视频02", "VIDEO_NEED_MONEY"=>100000)
	);
	$wechat = array
	(
		"WECHAT_ID_1"=>array("WECHAT_ID"=>1, "WECHAT_LEVEL"=>2, "WECHAT_OPTION"=>1, "WECHAT_EXP"=>1, "WECHAT_NEXT"=>3, "WECHAT_CONTENT"=>"内容1"),
		"WECHAT_ID_2"=>array("WECHAT_ID"=>2, "WECHAT_LEVEL"=>2, "WECHAT_OPTION"=>1, "WECHAT_EXP"=>-1, "WECHAT_NEXT"=>3, "WECHAT_CONTENT"=>"内容2"),
		"WECHAT_ID_3"=>array("WECHAT_ID"=>3, "WECHAT_LEVEL"=>2, "WECHAT_OPTION"=>"", "WECHAT_EXP"=>"", "WECHAT_NEXT"=>2, "WECHAT_CONTENT"=>"内容3"),
		"WECHAT_ID_4"=>array("WECHAT_ID"=>4, "WECHAT_LEVEL"=>2, "WECHAT_OPTION"=>2, "WECHAT_EXP"=>1, "WECHAT_NEXT"=>7, "WECHAT_CONTENT"=>"内容4"),
		"WECHAT_ID_5"=>array("WECHAT_ID"=>5, "WECHAT_LEVEL"=>2, "WECHAT_OPTION"=>2, "WECHAT_EXP"=>3, "WECHAT_NEXT"=>8, "WECHAT_CONTENT"=>"内容5"),
		"WECHAT_ID_6"=>array("WECHAT_ID"=>6, "WECHAT_LEVEL"=>2, "WECHAT_OPTION"=>2, "WECHAT_EXP"=>-1, "WECHAT_NEXT"=>9, "WECHAT_CONTENT"=>"内容6"),
		"WECHAT_ID_7"=>array("WECHAT_ID"=>7, "WECHAT_LEVEL"=>2, "WECHAT_OPTION"=>"", "WECHAT_EXP"=>"", "WECHAT_NEXT"=>3, "WECHAT_CONTENT"=>"内容7"),
		"WECHAT_ID_8"=>array("WECHAT_ID"=>8, "WECHAT_LEVEL"=>2, "WECHAT_OPTION"=>"", "WECHAT_EXP"=>"", "WECHAT_NEXT"=>3, "WECHAT_CONTENT"=>"内容8"),
		"WECHAT_ID_9"=>array("WECHAT_ID"=>9, "WECHAT_LEVEL"=>2, "WECHAT_OPTION"=>"", "WECHAT_EXP"=>"", "WECHAT_NEXT"=>3, "WECHAT_CONTENT"=>"内容9"),
		"WECHAT_ID_10"=>array("WECHAT_ID"=>10, "WECHAT_LEVEL"=>2, "WECHAT_OPTION"=>3, "WECHAT_EXP"=>-1, "WECHAT_NEXT"=>13, "WECHAT_CONTENT"=>"内容10"),
		"WECHAT_ID_11"=>array("WECHAT_ID"=>11, "WECHAT_LEVEL"=>2, "WECHAT_OPTION"=>3, "WECHAT_EXP"=>2, "WECHAT_NEXT"=>13, "WECHAT_CONTENT"=>"内容11"),
		"WECHAT_ID_12"=>array("WECHAT_ID"=>12, "WECHAT_LEVEL"=>2, "WECHAT_OPTION"=>3, "WECHAT_EXP"=>1, "WECHAT_NEXT"=>13, "WECHAT_CONTENT"=>"内容12"),
		"WECHAT_ID_13"=>array("WECHAT_ID"=>13, "WECHAT_LEVEL"=>2, "WECHAT_OPTION"=>"", "WECHAT_EXP"=>"", "WECHAT_NEXT"=>4, "WECHAT_CONTENT"=>"内容13"),
		"WECHAT_ID_14"=>array("WECHAT_ID"=>14, "WECHAT_LEVEL"=>2, "WECHAT_OPTION"=>4, "WECHAT_EXP"=>1, "WECHAT_NEXT"=>17, "WECHAT_CONTENT"=>"内容14"),
		"WECHAT_ID_15"=>array("WECHAT_ID"=>15, "WECHAT_LEVEL"=>2, "WECHAT_OPTION"=>4, "WECHAT_EXP"=>2, "WECHAT_NEXT"=>17, "WECHAT_CONTENT"=>"内容15"),
		"WECHAT_ID_16"=>array("WECHAT_ID"=>16, "WECHAT_LEVEL"=>2, "WECHAT_OPTION"=>4, "WECHAT_EXP"=>-1, "WECHAT_NEXT"=>17, "WECHAT_CONTENT"=>"内容16"),
		"WECHAT_ID_17"=>array("WECHAT_ID"=>17, "WECHAT_LEVEL"=>2, "WECHAT_OPTION"=>"", "WECHAT_EXP"=>"", "WECHAT_NEXT"=>"", "WECHAT_CONTENT"=>"内容17")
	);
	$level_up = array
	(
		"LEVEL_UP_LEV_2"=>array("LEVEL_UP_LEV"=>2, "PHONE_END_ID"=>12, "WECHAT_END_ID"=>17, "ZONE_END_ID"=>0),
		"LEVEL_UP_LEV_3"=>array("LEVEL_UP_LEV"=>3, "PHONE_END_ID"=>12, "WECHAT_END_ID"=>17, "ZONE_END_ID"=>3)
	);
	$function_conditions = array
	(
		"FUNCTION_ID_1"=>array("FUNCTION_ID"=>1, "FUNCTION_LEVEL"=>2),
		"FUNCTION_ID_2"=>array("FUNCTION_ID"=>2, "FUNCTION_LEVEL"=>3),
		"FUNCTION_ID_3"=>array("FUNCTION_ID"=>3, "FUNCTION_LEVEL"=>6)
	);
	$guide = array
	(
		"GUIDE_ID_1"=>array("GUIDE_ID"=>1, "GUIDE_TEXT"=>"引导文本1"),
		"GUIDE_ID_2"=>array("GUIDE_ID"=>2, "GUIDE_TEXT"=>"引导文本2"),
		"GUIDE_ID_3"=>array("GUIDE_ID"=>3, "GUIDE_TEXT"=>"引导文本3"),
		"GUIDE_ID_4"=>array("GUIDE_ID"=>4, "GUIDE_TEXT"=>"引导文本4"),
		"GUIDE_ID_5"=>array("GUIDE_ID"=>5, "GUIDE_TEXT"=>"引导文本5")
	);
	$zone = array
	(
		"ID_1"=>array("ID"=>1, "ZONE_LEVEL"=>3, "ZONE_TITLE"=>"朋友圈主题内容1", "ZONE_IMG_1"=>1, "ZONE_IMG_2"=>2, "ZONE_IMG_3"=>3, "ZONE_IMG_4"=>"", "ZONE_FOLLOW_NUM"=>1, "ZONE_FANS_COUNT"=>1, "ZONE_THUMBS_UP"=>1, "FB_END_ID"=>11),
		"ID_2"=>array("ID"=>2, "ZONE_LEVEL"=>4, "ZONE_TITLE"=>"朋友圈主题内容2", "ZONE_IMG_1"=>2, "ZONE_IMG_2"=>3, "ZONE_IMG_3"=>3, "ZONE_IMG_4"=>"", "ZONE_FOLLOW_NUM"=>2, "ZONE_FANS_COUNT"=>2, "ZONE_THUMBS_UP"=>2, "FB_END_ID"=>11),
		"ID_3"=>array("ID"=>3, "ZONE_LEVEL"=>5, "ZONE_TITLE"=>"朋友圈主题内容3", "ZONE_IMG_1"=>3, "ZONE_IMG_2"=>"", "ZONE_IMG_3"=>"", "ZONE_IMG_4"=>"", "ZONE_FOLLOW_NUM"=>3, "ZONE_FANS_COUNT"=>3, "ZONE_THUMBS_UP"=>3, "FB_END_ID"=>11),
		"ID_4"=>array("ID"=>4, "ZONE_LEVEL"=>6, "ZONE_TITLE"=>"朋友圈主题内容4", "ZONE_IMG_1"=>4, "ZONE_IMG_2"=>3, "ZONE_IMG_3"=>"", "ZONE_IMG_4"=>"", "ZONE_FOLLOW_NUM"=>4, "ZONE_FANS_COUNT"=>4, "ZONE_THUMBS_UP"=>4, "FB_END_ID"=>11),
		"ID_5"=>array("ID"=>5, "ZONE_LEVEL"=>7, "ZONE_TITLE"=>"朋友圈主题内容5", "ZONE_IMG_1"=>"", "ZONE_IMG_2"=>"", "ZONE_IMG_3"=>"", "ZONE_IMG_4"=>"", "ZONE_FOLLOW_NUM"=>5, "ZONE_FANS_COUNT"=>5, "ZONE_THUMBS_UP"=>5, "FB_END_ID"=>11),
		"ID_6"=>array("ID"=>6, "ZONE_LEVEL"=>8, "ZONE_TITLE"=>"朋友圈主题内容6", "ZONE_IMG_1"=>"", "ZONE_IMG_2"=>"", "ZONE_IMG_3"=>"", "ZONE_IMG_4"=>"", "ZONE_FOLLOW_NUM"=>6, "ZONE_FANS_COUNT"=>6, "ZONE_THUMBS_UP"=>6, "FB_END_ID"=>11),
		"ID_7"=>array("ID"=>7, "ZONE_LEVEL"=>9, "ZONE_TITLE"=>"朋友圈主题内容7", "ZONE_IMG_1"=>5, "ZONE_IMG_2"=>3, "ZONE_IMG_3"=>"", "ZONE_IMG_4"=>"", "ZONE_FOLLOW_NUM"=>7, "ZONE_FANS_COUNT"=>7, "ZONE_THUMBS_UP"=>7, "FB_END_ID"=>11),
		"ID_8"=>array("ID"=>8, "ZONE_LEVEL"=>10, "ZONE_TITLE"=>"朋友圈主题内容8", "ZONE_IMG_1"=>"", "ZONE_IMG_2"=>"", "ZONE_IMG_3"=>"", "ZONE_IMG_4"=>"", "ZONE_FOLLOW_NUM"=>8, "ZONE_FANS_COUNT"=>8, "ZONE_THUMBS_UP"=>8, "FB_END_ID"=>11)
	);
	$zonefeefback = array
	(
		"ID_1"=>array("ID"=>1, "ZONE_FB_LEVEL"=>3, "ZONE_FB_HAVE_FB"=>"", "ZONE_FB_FNAME"=>"阿里巴巴", "ZONE_FB_TEXT"=>"好友评论1", "ZONE_FB_REPLY"=>"主人回复1"),
		"ID_2"=>array("ID"=>2, "ZONE_FB_LEVEL"=>3, "ZONE_FB_HAVE_FB"=>"", "ZONE_FB_FNAME"=>"腾讯巴巴", "ZONE_FB_TEXT"=>"好友评论2", "ZONE_FB_REPLY"=>"主人回复2"),
		"ID_3"=>array("ID"=>3, "ZONE_FB_LEVEL"=>3, "ZONE_FB_HAVE_FB"=>"", "ZONE_FB_FNAME"=>"萨瓦迪卡", "ZONE_FB_TEXT"=>"好友评论3", "ZONE_FB_REPLY"=>"主人回复3"),
		"ID_4"=>array("ID"=>4, "ZONE_FB_LEVEL"=>3, "ZONE_FB_HAVE_FB"=>"", "ZONE_FB_FNAME"=>"特郭晓梅", "ZONE_FB_TEXT"=>"好友评论4", "ZONE_FB_REPLY"=>""),
		"ID_5"=>array("ID"=>5, "ZONE_FB_LEVEL"=>3, "ZONE_FB_HAVE_FB"=>"", "ZONE_FB_FNAME"=>"泰国欧", "ZONE_FB_TEXT"=>"好友评论5", "ZONE_FB_REPLY"=>"主人回复4"),
		"ID_6"=>array("ID"=>6, "ZONE_FB_LEVEL"=>3, "ZONE_FB_HAVE_FB"=>"", "ZONE_FB_FNAME"=>"欧巴", "ZONE_FB_TEXT"=>"好友评论6", "ZONE_FB_REPLY"=>"主人回复6"),
		"ID_7"=>array("ID"=>7, "ZONE_FB_LEVEL"=>3, "ZONE_FB_HAVE_FB"=>"", "ZONE_FB_FNAME"=>"欧尼酱", "ZONE_FB_TEXT"=>"好友评论7", "ZONE_FB_REPLY"=>"主人回复7"),
		"ID_8"=>array("ID"=>8, "ZONE_FB_LEVEL"=>3, "ZONE_FB_HAVE_FB"=>1, "ZONE_FB_FNAME"=>"偶了将", "ZONE_FB_TEXT"=>"好友评论8", "ZONE_FB_REPLY"=>""),
		"ID_9"=>array("ID"=>9, "ZONE_FB_LEVEL"=>3, "ZONE_FB_HAVE_FB"=>1, "ZONE_FB_FNAME"=>"哇咔咔", "ZONE_FB_TEXT"=>"好友评论9", "ZONE_FB_REPLY"=>"主人回复8"),
		"ID_10"=>array("ID"=>10, "ZONE_FB_LEVEL"=>3, "ZONE_FB_HAVE_FB"=>1, "ZONE_FB_FNAME"=>"无聊", "ZONE_FB_TEXT"=>"好友评论10", "ZONE_FB_REPLY"=>"主人回复9"),
		"ID_11"=>array("ID"=>11, "ZONE_FB_LEVEL"=>3, "ZONE_FB_HAVE_FB"=>1, "ZONE_FB_FNAME"=>"电视看不完", "ZONE_FB_TEXT"=>"好友评论11", "ZONE_FB_REPLY"=>"主人回复10")
	);
	$reply = array
	(
		"ID_1"=>array("ID"=>1, "REPLY_LEVEL"=>3, "REPLY_GROUP_ID"=>1, "REPLY_TEXT"=>"男主回复1", "REPLY_REPLY"=>"女主回复1", "REPLY_PLAYER_REPLY"=>1),
		"ID_2"=>array("ID"=>2, "REPLY_LEVEL"=>3, "REPLY_GROUP_ID"=>2, "REPLY_TEXT"=>"男主回复2", "REPLY_REPLY"=>"女主回复2", "REPLY_PLAYER_REPLY"=>2),
		"ID_3"=>array("ID"=>3, "REPLY_LEVEL"=>3, "REPLY_GROUP_ID"=>3, "REPLY_TEXT"=>"男主回复3", "REPLY_REPLY"=>"女主回复3", "REPLY_PLAYER_REPLY"=>3)
	);
	$http = array
	(
		"ID_1"=>array("ID"=>1, "Host"=>"http://112.74.36.182:8888", "Route"=>"/cygame/public/user/register", "Params"=>"username, password", "Method"=>"POST", "Remark"=>"用户账号注册使用。"),
		"ID_2"=>array("ID"=>2, "Host"=>"http://112.74.36.182:8888", "Route"=>"/cygame/public/user/login", "Params"=>"username, password", "Method"=>"POST", "Remark"=>"用户账号登录，相关数据初始化。"),
		"ID_3"=>array("ID"=>3, "Host"=>"http://112.74.36.182:8888", "Route"=>"/cygame/public/user/setname", "Params"=>"api_token,name", "Method"=>"POST", "Remark"=>"给玩家命名"),
		"ID_4"=>array("ID"=>4, "Host"=>"http://112.74.36.182:8888", "Route"=>"/cygame/public/sign/dosign", "Params"=>"api_token", "Method"=>"POST", "Remark"=>"玩家签到与奖励。"),
		"ID_5"=>array("ID"=>5, "Host"=>"http://112.74.36.182:8888", "Route"=>"/cygame/public/work/dowork", "Params"=>"api_token", "Method"=>"POST", "Remark"=>"玩家工作以及相关参数返回。"),
		"ID_6"=>array("ID"=>6, "Host"=>"http://112.74.36.182:8888", "Route"=>"/cygame/public/backpack/get", "Params"=>"api_token", "Method"=>"GET", "Remark"=>"获取玩家背包。")
	);
?>