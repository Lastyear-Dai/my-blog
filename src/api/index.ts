import request from "@/utils/request";
import req from 'umi-request';
//随机语录 https://v1.hitokoto.cn/
export const getHitokoto = () => req.get('https://v.api.aa1.cn/api/pyq/index.php?aa1=json');
