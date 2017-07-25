<?php
	include 'phpData.php';
	class GameLogic
	{
		function canLevelUp($currentLev, $currentExp, $currentWechatID, $currentPhoneID, $currentZoneThumbsUpID, $currentZoneReplyID)
		{
			global $level;
			global $level_up;
			$strCurrentLev = strval($currentLev);
			if ($level["LEV_LEV_".$strCurrentLev]["LEV_EXP"] <= $currentExp)
			{
				if($level_up["LEVEL_UP_LEV_".$strCurrentLev ]["PHONE_END_ID"] <= $currentPhoneID
				&& $level_up["LEVEL_UP_LEV_".$strCurrentLev]["WECHAT_END_ID"] <= $currentWechatID
				&& $level_up["LEVEL_UP_LEV_".$strCurrentLev ]["ZONE_END_ID"] <= $currentZoneThumbsUpID
				&& $level_up["LEVEL_UP_LEV_".$strCurrentLev ]["ZONE_END_ID"] <= $currentZoneReplyID)
					return true;
			}
			return false;
		}
		function completePhoneID($id)
		{
			global $phone;
			return array($phone["PHONE_ID_".$id]["PHONE_EXP"],$phone["PHONE_ID_".$id]["PHONE_AUDIO"]);
		}
		function completeWechatID($id)
		{
			global $wechat;
			return array($wechat["WECHAT_ID_".$id]["WECHAT_EXP"],$wechat["WECHAT_ID_".$id]["WECHAT_NEXT"]);
		}
		function completeZoneThumbsUpID($id)
		{
			global $zone;
			return array($zone["ID_".$id]["ZONE_THUMBS_UP"],$id);
		}	
		function completeZoneReplyID($id)
		{
			global $reply;
			return array($reply["ID_".$id]["REPLY_PLAYER_REPLY"],$reply["ID_".$id]["ZONE_ID"]);
		}
		function completeWorkID($id)
		{
			global $work;
			return $work["ID_".$id]["REWARD"];
		}
		function getWodkEveryDayTimes($id)
		{
			global $work;
			return $work["ID_".$id]["TIME"];
		}
		function getWodkLevelUpCondition($id)
		{
			global $work;
			return $work["ID_".$id]["NEED_LEVEL"];
		}
	}
	
	$logic = new GameLogic;
	echo $logic->canLevelUp(2,10,5,5,5,5)?"true":"false";
	echo $logic->canLevelUp(2,10,22,25,25,25)?"true":"false";
	echo $logic->completePhoneID(3)[0],"  ",$logic->completePhoneID(3)[1];
?>