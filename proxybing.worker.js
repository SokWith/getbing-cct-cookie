//本项目作为 BING_PROXY_DM,用于对www.bing.com/turing/*的套娃
const KievRPSSecAuth ='';
const MUID = '';
const _U = '';
const _RwBf = '';

//const BING_PROXY = 'https://rendcreate.onrender.com'; 
const BING_PROXY = 'https://sokwith-nbing.hf.space'; 
//const BING_PROXY = 'https://dswnb-proxycfweb.hf.space'; 
//const BING_PROXY = 'https://sokwith-proxybing.hf.space'; 
const BING_ORIGIN = 'https://rendcreate.onrender.com'; 
const KEEP_REQ_HEADERS = [ 
  'accept',
  'accept-encoding',
  'accept-language',
  'authorization',
  'connection',
  'cookie',
  'upgrade',
  'user-agent',
  'sec-websocket-extensions',
  'sec-websocket-key',
  'sec-websocket-version',
  'x-request-id',
  'content-length',
  'content-type',
  'access-control-request-headers',
  'access-control-request-method',
  'sec-ms-gec',
  'sec-ms-gec-version',
  'x-client-data',
  'x-ms-client-request-id',
  'x-ms-useragent',
];
const IP_RANGE = [
  ['4.150.64.0', '4.150.127.255'],       // Azure Cloud EastUS2 16382
  ['4.152.0.0', '4.153.255.255'],        // Azure Cloud EastUS2 131070
  ['13.68.0.0', '13.68.127.255'],        // Azure Cloud EastUS2 32766
  ['13.104.216.0', '13.104.216.255'],    // Azure EastUS2 256
  ['20.1.128.0', '20.1.255.255'],        // Azure Cloud EastUS2 32766
  ['20.7.0.0', '20.7.255.255'],          // Azure Cloud EastUS2 65534
  ['20.22.0.0', '20.22.255.255'],        // Azure Cloud EastUS2 65534
  ['40.84.0.0', '40.84.127.255'],        // Azure Cloud EastUS2 32766
  ['40.123.0.0', '40.123.127.255'],      // Azure Cloud EastUS2 32766
  ['4.214.0.0', '4.215.255.255'],        // Azure Cloud JapanEast 131070
  ['4.241.0.0', '4.241.255.255'],        // Azure Cloud JapanEast 65534
  ['40.115.128.0', '40.115.255.255'],    // Azure Cloud JapanEast 32766
  ['52.140.192.0', '52.140.255.255'],    // Azure Cloud JapanEast 16382
  ['104.41.160.0', '104.41.191.255'],    // Azure Cloud JapanEast 8190
  ['138.91.0.0', '138.91.15.255'],       // Azure Cloud JapanEast 4094
  ['151.206.65.0', '151.206.79.255'],    // Azure Cloud JapanEast 256
  ['191.237.240.0', '191.237.241.255'],  // Azure Cloud JapanEast 512
  ['4.208.0.0', '4.209.255.255'],        // Azure Cloud NorthEurope 131070
  ['52.169.0.0', '52.169.255.255'],      // Azure Cloud NorthEurope 65534
  ['68.219.0.0', '68.219.127.255'],      // Azure Cloud NorthEurope 32766
  ['65.52.64.0', '65.52.79.255'],        // Azure Cloud NorthEurope 4094
  ['98.71.0.0', '98.71.127.255'],        // Azure Cloud NorthEurope 32766
  ['74.234.0.0', '74.234.127.255'],      // Azure Cloud NorthEurope 32766
  ['4.151.0.0', '4.151.255.255'],        // Azure Cloud SouthCentralUS 65534
  ['13.84.0.0', '13.85.255.255'],        // Azure Cloud SouthCentralUS 131070
  ['4.255.128.0', '4.255.255.255'],      // Azure Cloud WestCentralUS 32766
  ['13.78.128.0', '13.78.255.255'],      // Azure Cloud WestCentralUS 32766
  ['4.175.0.0', '4.175.255.255'],        // Azure Cloud WestEurope 65534
  ['13.80.0.0', '13.81.255.255'],        // Azure Cloud WestEurope 131070
  ['20.73.0.0', '20.73.255.255'],        // Azure Cloud WestEurope 65534
];

/**
 * 随机整数 [min,max)
 * @param {number} min
 * @param {number} max
 * @returns
 */
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

/**
 * ip 转 int
 * @param {string} ip
 * @returns
 */
const ipToInt = (ip) => {
  const ipArr = ip.split('.');
  let result = 0;
  result += +ipArr[0] << 24;
  result += +ipArr[1] << 16;
  result += +ipArr[2] << 8;
  result += +ipArr[3];
  return result;
};

/**
 * int 转 ip
 * @param {number} intIP
 * @returns
 */
const intToIp = (intIP) => {
  return `${(intIP >> 24) & 255}.${(intIP >> 16) & 255}.${(intIP >> 8) & 255}.${intIP & 255}`;
};

const getRandomIP = () => {
  const randIndex = getRandomInt(0, IP_RANGE.length);
  const startIp = IP_RANGE[randIndex][0];
  const endIp = IP_RANGE[randIndex][1];
  const startIPInt = ipToInt(startIp);
  const endIPInt = ipToInt(endIp);
  const randomInt = getRandomInt(startIPInt, endIPInt);
  const randomIP = intToIp(randomInt);
  return randomIP;
};

/**
 * 生成随机字符串
 * @param {number} e
 * @returns
 */
const randomString = (e) => {
  e = e || 32;
  const t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678_-+";
  var n = "";
  for (let i = 0; i < e; i++) n += t.charAt(getRandomInt(0, t.length));
  return n;
}
 

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
 // const newcctReq = new Request(request.url, {
   // method: request.method,
 //   method: 'GET',
 //   headers: request.headers,  
  //  body: request.body,
 // });
  try {
    let response = await fetch(request);
  // let response = await fetch(newcctReq);
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

//   return new Response(strValues, { status: 200 });

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
    const currentUrl = new URL(request.url); 
    let targetUrl;
    if (currentUrl.pathname.includes('/turing/captcha/challenge')) {
      targetUrl = new URL(BING_PROXY + currentUrl.pathname + currentUrl.search);
    } else {
      targetUrl = new URL(BING_ORIGIN + currentUrl.pathname + currentUrl.search);
    }

    const newHeaders = new Headers();
    request.headers.forEach((value, key) => {
      if (KEEP_REQ_HEADERS.includes(key)) {
        newHeaders.set(key, value);
      }
    });
    newHeaders.set('host', targetUrl.host);
    newHeaders.set('origin', targetUrl.origin);
    newHeaders.set('referer', 'https://www.bing.com/search?q=Bing+AI');
    const randIP = getRandomIP();
    newHeaders.set('X-Forwarded-For', randIP);
    const cookie = request.headers.get('Cookie') || '';
    let cookies = cookie;

    if (currentUrl.pathname === '/pass') {
      let res = JSON.parse(await request.text())
      targetUrl = res['url'];
      newHeaders.set('origin', res['url']);
      const newReq = new Request(targetUrl, {
        method: request.method,
        headers: newHeaders,
        body: '{"cookies":"'+ cookies +'"}',
      });
      return await fetch(newReq);
    }

 
    if (currentUrl.pathname.includes('/turing/captcha/challenge')) {
      if (!cookie.includes('_U=')) {
        cookies += '; _U=' + randomString(128);
      } else {
        cookies = cookies.replace(/_U=[^;]+/, '_U=' + randomString(128));
      }
      
      if (!cookie.includes('KievRPSSecAuth=')) {
        cookies += '; KievRPSSecAuth=' + randomString(128);
      } else {
        cookies = cookies.replace(/KievRPSSecAuth=[^;]+/, 'KievRPSSecAuth=' + randomString(128));
      }
      
      if (!cookie.includes('_RwBf=')) {
        cookies += '; _RwBf=' + randomString(128);
      } else {
        cookies = cookies.replace(/_RwBf=[^;]+/, '_RwBf=' + randomString(128));
      }
       }else {
        
        if (!cookie.includes('KievRPSSecAuth=')) {
          if (KievRPSSecAuth.length !== 0) {
            cookies += '; KievRPSSecAuth=' + KievRPSSecAuth;
          } else {
            cookies += '; KievRPSSecAuth=' + randomString(512);
          }
        }
        if (!cookie.includes('_RwBf=')) {
          if (_RwBf.length !== 0) {
            cookies += '; _RwBf=' + _RwBf
          } else {
            cookies += '; _RwBf=' + randomString(256);
          }
       }
      
        if (!cookie.includes('MUID=')) {
            if (MUID.length !== 0) {
              cookies += '; MUID=' + MUID;
            } else {
              cookies += '; MUID=' + randomString(32);
            }
        }
        if (!cookie.includes('_U=')) {
          if (_U.length !== 0) {
            cookies += '; _U=' + _U;
          } else {
            cookies += '; _U=' + randomString(128);
          }
        }
       }
      
      

    newHeaders.set('Cookie', cookies);

    const oldUA = request.headers.get('user-agent') || '';
    let isMobile = oldUA.includes('Mobile') || oldUA.includes('Android');
    if (isMobile = true) {
      newHeaders.set(
        'user-agent',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 15_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.7 Mobile/15E148 Safari/605.1.15 BingSapphire/1.0.410427012'
      );
    } else {
      newHeaders.set('user-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.35');
    }
   
    const newReq = new Request(targetUrl, {
      method: request.method,
      headers: newHeaders, 
      body: request.body,
    });

    if (currentUrl.pathname.includes('/challenge/verify')) {
    //  return await fetch('/turing/captcha/challenge');//这个会出现1101错误；
    //下面这样就不会出现1101错误了：
    //return Response.redirect('https://proxybing.nbing.eu.org/turing/captcha/challenge', 301) // 301 表示永久重定向
   
    //下面这样调用就返回了目标站点的值了
    return await getfreeCookies(request);
    }

    const res = await fetch(newReq);  
    let newRes = new Response(res.body, res);

    newRes.headers.set('Access-Control-Allow-Origin', request.headers.get('Origin'));
    newRes.headers.set('Access-Control-Allow-Methods', 'GET,HEAD,POST,OPTIONS');
    newRes.headers.set('Access-Control-Allow-Credentials', 'true');
    newRes.headers.set('Access-Control-Allow-Headers', '*');
    return newRes;
  },
};

