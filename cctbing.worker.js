//本项目获取bing cct

//const BING_PROXY = 'https://rendcreate.onrender.com'; 
const BING_PROXY = 'https://sokwith-nbing.hf.space'; 
//const BING_PROXY = 'https://dswnb-proxycfweb.hf.space'; 
//const BING_PROXY = 'https://sokwith-proxybing.hf.space'; 


function generateUUID() {
  let dt = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}


async function getfreeCookies(request) {
  const uuid = generateUUID();
  const oldUA = request.headers.get('user-agent') || '';
  let freeisMobile = oldUA.includes('Mobile') || oldUA.includes('Android');
  const newcctHeaders = new Headers();
  if (freeisMobile = true) {
      newcctHeaders.set(
        'user-agent',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 15_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.7 Mobile/15E148 Safari/605.1.15 BingSapphire/1.0.410427012'
      );
    } else {
      newcctHeaders.set('user-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.35');
    }
    const  challtargetUrl = new URL(BING_PROXY + '/turing/captcha/challenge?q=&iframeid=local-gen-' + uuid);
    const newcctReq = new Request(challtargetUrl, {
   //   method: request.method,
      method: 'GET',
      headers: newcctHeaders,  
   //   body: request.body,
    });

    const cctcookie = await getCookies(newcctReq);
  //  const responseBody = await cctcookie.text(); // 获取响应体的文本内容
  //  const result = JSON.parse(responseBody); // 解析 JSON 数据
  //  const freecctcookie = result.result.cookies;

  const newcctRes = new Response(cctcookie.body, cctcookie);
  newcctRes.headers.set('Access-Control-Allow-Origin', request.headers.get('Origin'));
  newcctRes.headers.set('Access-Control-Allow-Methods', 'GET,HEAD,POST,OPTIONS');
  newcctRes.headers.set('Access-Control-Allow-Credentials', 'true');
  newcctRes.headers.set('Access-Control-Allow-Headers', '*');
  //newcctRes.headers.set('FreeCookie', freecctcookie); 
  return  newcctRes;

}

// 编写一个 cf workers 的函数，访问指定的网址，从返回的相应头中获取全部 set-cookie，取出主键值，用分号“;"连接起来，赋值给 strValues
async function getCookies(request) {
  try {
    let response = await fetch(request);
    let cookies = response.headers.get('set-cookie');
    let strValues = '';

    if (cookies) {
      const pairs = cookies.split(','); // 使用逗号分隔
      const values = pairs.map(pair => {
        const firstSemicolonIndex = pair.indexOf(';'); // 找到第一个分号的位置
        const keyValue = firstSemicolonIndex !== -1 ? pair.slice(0, firstSemicolonIndex) : pair; // 提取第一个分号前的数据
        const [key, value] = keyValue.split('='); // 拆分键值对
      //  return keyValue.trim(); // 去除首尾空格
        if (key && value) {
          return `${key}=${value.trim()}`; // 去除首尾空格
        }
        return ''; // 无效的 cookie
      });
   strValues = values.filter(cookie => cookie !== '').join('; '); // 去除无效的 cookie
    }
    const result = { result: { cookies: strValues } };
    const jsonResult = JSON.stringify(result);

    return new Response(jsonResult, {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
   });
  } catch (error) {
    console.error(error);
   return new Response('', { status: 500 });
  }
}
 



export default {
  /**
   * fetch
   * @param {Request} request
   * @param {*} env
   * @param {*} ctx
   * @returns
   */
  async fetch (request, env, ctx) {

    //由于go-proxy-bingai项目base58加密验证作者信息，追加token返回：
    
    const currentUrl = new URL(request.url);
    const keytoken = {
    T:'SjQH0q3MzCEXay9WfVPAdkL518iZcghu4Uteprwl7bxTvG6RsK2oYIFONDBmnJ',
    TP:[21,58,22,34,0,51,58,37,20,54,16,41,29,16,14,33,24,46,7,60,5,16,54,27,28,44,1,26,57,21,46,49,19,45,16,14,3,26]
  };
    const jsonResult = JSON.stringify(keytoken);
   
    if (currentUrl.pathname.startsWith('/gettoken')) {
    return new Response(jsonResult, {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
   });
    }
 
    return await getfreeCookies(request);
    
  },
};

