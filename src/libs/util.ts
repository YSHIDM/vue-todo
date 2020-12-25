import config from '@/config';
import Cookies from 'js-cookie';
import rules from "@/plugins/validate/rules";
// import * as moment from 'moment';

const prefix = process.env.VUE_APP_PREFIX ? process.env.VUE_APP_PREFIX : '';
// import vPinyin from '@/libs/vue-py.ts';
/**
 * ============ Cookie ============
*/
const { cookieExpires, title } = config;
const TOKEN = 'token';
export const setToken = (token: string) => window.localStorage.setItem(TOKEN, token);
export const getToken = (): any => window.localStorage.getItem(TOKEN);

const isNil = (val: any) => (val === null || val === undefined)
/**
 * 判断值是否为null或者undefined或者''或者'undefined'
 * @param val value
*/
export const isEmpty = (val: any) => isNil(val) || val === 'undefined' || val === '';

export const setCookie = (name: string, value: any, expires?: any): void => {
  if (isEmpty(value)) { return; }
  Cookies.set(prefix + name, value, { expires: expires || cookieExpires || 1 });
};
export const getCookie = (name: any): any => {
  if (name) { return Cookies.get(name); } return false;
};
export const removeCookie = (name: any) => {
  if (name) {
    Cookies.remove(name);
  }
};
/**
 * ===================localStorage==================
*/

/**
 *
 * @param name 设置localStorage 的key
 * @param value 对应key的值
 */
export const setLocalStorage = (name: string, value: any): void => {
  if (isEmpty(value)) { return; }
  window.localStorage.setItem(prefix ? `${prefix}${name}` : name, value);
};
/**
 *
 * @param name 获取localStorage中 key 为name的值
 */
export const getLocalStorage = (name: string): any => window.localStorage.getItem(prefix ? `${prefix}${name}` : name);
/**
 *
 * @param name 删除localStorage中 key 为name的整个对象
 */
export const removeLocalStorage = (name: string): void => {
  window.localStorage.removeItem(prefix + name);
};
/**
 * 删除所有localStorage
 */
export const clearLocal = (): void => {
  window.localStorage.clear();
};

/**
 * ===================sessionStorage================
 */

/**
  *
  * @param name 设置sessionStorage 对象的key
  * @param value 设置key对应的值
  */
export const setSessionStorage = (name: string, value: any): void => {
  if (isEmpty(value)) { return; }
  window.sessionStorage.setItem(prefix + name, value);
};
/**
 *
 * @param name 获取sessionStorage中 key 为name的值
 */
export const getSessionStorage = (name: string): any => window.sessionStorage.getItem(prefix + name);
/**
 *
 * @param name 删除sessionStorage中 key 为name的值
 */
export const removeSessionStorage = (name: string) => {
  window.sessionStorage.removeItem(prefix + name);
};
/**
 * 删除所有sessionStorage
 */
export const clearSession = (): void => {
  window.sessionStorage.clear();
};
// 判定设备类型
export const getEquipment = () => {
  const ua: any = navigator.userAgent.toLowerCase();
  const Agents: any = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
  let flag = true;
  for (const v of Agents) {
    if (ua.indexOf(v.toLowerCase()) > -1) {
      flag = false;
      break;
    }
  }
  if (flag) {
    if (ua.indexOf('wechat') > -1) {
      return 'windowswechat';
    }
    return 'PC';
  } if (ua.indexOf('wxwork') > -1) {
    return 'wxwork';
  }
  return 'APP';
};
/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = (url: any) => {
  const paramObj: any = {};
  if (url.indexOf('?') !== -1) {
    const keyValueArr = url.split('?')[1].split('&');
    keyValueArr.forEach((item: any) => {
      const keyValue: any = item.split('=');
      paramObj[keyValue[0]] = keyValue[1];
    });
  }
  return paramObj;
};
/* 对象数组针对key值去重 */
export const Es6duplicate = (arr: any, key: any): any => {
  const res = new Map();
  return arr.filter((item: any) => !res.has(item[key]) && res.set(item[key], 1));
};

/**
 *
 * @param arr1 每一项最全而且项数最多的数组
 * @param arr2 项数较少的数组
 * @param key 参照每一项对应的key
 * @description 返回两个对象数组以key值为准的交集
 */
export const intersectionWith = (arr1: any, arr2: any, key1: any, key2?: any): any[] => {
  const newArr: any[] = [];
  arr1.forEach((arr: any) => {
    arr2.forEach((list: any) => {
      if (arr[key1] === list[key2 || key1]) {
        newArr.push(arr);
      }
    });
  });
  return newArr;
};
/**
 *
 * @param arr1 对象数组
 * @param arr2 字符串数组
 * @param key 对象数组key
 * @description 返回arr2中存在arr1中key值的
 */
export const intersectionWith1 = (arr1: any, arr2: any, key: any): any[] => {
  const newArr: any[] = [];
  arr1.forEach((arr: any) => {
    arr2.forEach((list: any) => {
      if (arr[key] === list) {
        newArr.push(arr);
      }
    });
  });
  return newArr;
};
/**
 *
 * @param arr1 字符串数组
 * @param arr2 字符串数组
 * @description 返回arr1中存在arr2中key值的
 */
export const intersectionWith2 = (arr1: any, arr2: any): any[] => {
  const newArr: any[] = [];
  arr1.forEach((arr: any) => {
    arr2.forEach((list: any) => {
      if (arr === list) {
        newArr.push(arr);
      }
    });
  });
  return newArr;
};

/**
  * 数组元素交换位置
  * @param {array} arr 数组
  * @param {number} index1 添加项目的位置
  * @param {number} index2 删除项目的位置
  * index1和index2分别是两个数组的索引值，即是两个要交换元素位置的索引值，如1，5就是数组中下标为1和5的两个元素交换位置
  */
export const swapArray = (arr: any, index1: any, index2: any) => {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0];
  return arr;
};

/**
 * ===================路由相关================
 */
export const notShowRouter = ((origin: any, notShowArray: any, exist?: boolean) => {
  let array: any[] = [];
  if (exist) {
    for (let i = 0; i < origin.length; i++) {
      array.push(origin[i].name);
      origin[i].children ? array = [...array, ...notShowRouter(origin[i].children, notShowArray, true)] : '';
    }
  } else {
    for (let i = 0; i < origin.length; i++) {
      if (notShowArray.includes(origin[i].name)) {
        array.push(origin[i].name);
        origin[i].children ? array = [...array, ...notShowRouter(origin[i].children, notShowArray, true)] : '';
      } else {
        origin[i].children ? array = [...array, ...notShowRouter(origin[i].children, notShowArray)] : '';
      }
      // origin[i]['name']
      // array.push(notShowArray[i]['name'])
      // array.push(new Set(notShowRouter()))
    }
  }
  return array;
  // if(showArray) {
  //   return array.filter((i:any) => !showArray.includes(i))
  // } else {
  //   return array;
  // }
});
export const filterRouter = (origin: any, selection: any) => {
  const len: number = origin.length;
  for (let i = 0; i < len; i++) {
    if (origin[i] && selection.includes(origin[i].name)) {
      origin.splice(i--, 1);
    }
    if (origin[i] && origin[i].children) {
      const array: any[] = filterRouter(origin[i].children, selection);
      array.length > 0 ? origin[i].redirect = { name: array[0].name } : '';
    }
  }
  // origin.map((item:any,index:number) => {
  //   console.log('权限模块存在--------------',index,item.name, item.name === 'permission')
  //   console.log('长度--------------',origin.length)
  //   selection.includes(item.name) ? origin.splice(index,1) : ''
  //   if(item.children) {
  //     console.log('item是谁------',item.name)
  //     let array:Array<any> = filterRouter(item.children,selection)
  //     array.length > 0 ? item.redirect = {name: array[0].name} : ''
  //   }
  // })
  return origin;
};
/* 复杂类型深拷贝 */
export const copyObject = (obj: any) => (obj instanceof Array ? obj.map((e: any) => {
  if (typeof e === 'object') {
    return { ...e };
  }
  return e;
}) : ({ ...obj }));
export const setDedupe = (array: any): any => Array.from(new Set(array));
/* 绘制图片旋转 */
export const rotateImg = (img: any, direction: any, canvas: any): any => {
  // 最小与最大旋转方向，图片旋转4次后回到原方向
  const min_step = 0;
  const max_step = 3;
  if (img == null) { return; }
  // img的高度和宽度不能在img元素隐藏后获取，否则会出错
  const { height } = img;
  const { width } = img;
  let step = 2;
  if (step == null) {
    step = min_step;
  }
  if (direction === 'right') {
    step++;
    // 旋转到原位置，即超过最大值
    step > max_step && (step = min_step);
  } else {
    step--;
    step < min_step && (step = max_step);
  }
  // 旋转角度以弧度值为参数
  const degree = step * 90 * Math.PI / 180;
  const ctx = canvas.getContext('2d');
  switch (step) {
    case 0:
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0);
      break;
    case 1:
      canvas.width = height;
      canvas.height = width;
      ctx.rotate(degree);
      ctx.drawImage(img, 0, -height);
      break;
    case 2:
      canvas.width = width;
      canvas.height = height;
      ctx.rotate(degree);
      ctx.drawImage(img, -width, -height);
      break;
    case 3:
      canvas.width = height;
      canvas.height = width;
      ctx.rotate(degree);
      ctx.drawImage(img, -width, 0);
      break;
  }
};
/* 图片压缩 */
export const compress = (img: any, Orientation?: any): any => {
  const canvas = document.createElement('canvas');
  const ctx: any = canvas.getContext('2d');
  // 瓦片canvas
  const tCanvas = document.createElement('canvas');
  const tctx: any = tCanvas.getContext('2d');
  // const initSize = img.src.length;
  let { width } = img;
  let { height } = img;
  // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
  let ratio;
  if ((ratio = width * height / 4000000) > 1) {
    ratio = Math.sqrt(ratio);
    width /= ratio;
    height /= ratio;
  } else {
    ratio = 1;
  }
  canvas.width = width;
  canvas.height = height;
  //        铺底色
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // 如果图片像素大于100万则使用瓦片绘制
  let count;
  if ((count = width * height / 1000000) > 1) {
    count = ~~(Math.sqrt(count) + 1); // 计算要分成多少块瓦片
    //            计算每块瓦片的宽和高
    const nw = ~~(width / count);
    const nh = ~~(height / count);
    tCanvas.width = nw;
    tCanvas.height = nh;
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
        ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
      }
    }
  } else {
    ctx.drawImage(img, 0, 0, width, height);
  }
  // 修复ios上传图片的时候 被旋转的问题
  if (Orientation !== '' && Orientation !== 1) {
    switch (Orientation) {
      case 6: // 需要顺时针（向左）90度旋转
        rotateImg(img, 'left', canvas);
        break;
      case 8: // 需要逆时针（向右）90度旋转
        rotateImg(img, 'right', canvas);
        break;
      case 3: // 需要180度旋转
        rotateImg(img, 'right', canvas); // 转两次
        rotateImg(img, 'right', canvas);
        break;
    }
  }
  // 进行最小压缩
  const ndata = canvas.toDataURL('image/jpeg', 0.1);
  // // console.log('压缩前：' + initSize);
  // // console.log('压缩后：' + ndata.length);
  // // console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
  tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
  return ndata;
};
/* 随机生成唯一主键 */
export const genID = (length: number) => Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
/**
 *
 * @param url 图片src
 * @param callback 回调函数
 */
export const getImageWidth = (url: string, callback: Function) => {
  const img: any = new Image();
  img.src = url;
  // 如果图片被缓存，则直接返回缓存数据
  if (img.complete) {
    callback(img.width, img.height);
  } else {
    img.onload = function () {
      callback(img.width, img.height);
    };
  }
};
/* 把双字节的替换成两个单字节的然后再获得长度（英文占1个字符，中文汉字占2个字符） */
export const getTrueLength = (str: any): any => {
  if (str == null) { return 0; }
  if (typeof str !== 'string') {
    str += '';
  }
  return str.replace(/[^\x00-\xff]/g, '01').length;
};
export const getItem = (arr: any[], key: any, value: any): any => {
  // //console.log(arr)
  // //console.log(key)
  // //console.log(value)
  let result = null;
  if (!!arr && arr.length > 0) {
    // const itemArr: any = arr.filter((n) => n[key] === value);
    // // console.error(itemArr)
    result = arr.filter((n) => n[key] === value) ? arr.filter((n) => n[key] === value)[0] : null;
  }
  // // console.error(result)
  return result;
};
/**
 * @description 根据当前跳转的路由设置显示在浏览器标签的title
 * @param {Object} routeItem 路由对象
 * @param {Object} vm Vue实例
 */
/* 获取当前路由title */
export const getRouteTitleHandled = (route: any) => {
  const router = { ...route };
  const meta = { ...route.meta };
  let title = '';
  if (meta.title) {
    if (typeof meta.title === 'function') {
      meta.__titleIsFunction__ = true;
      title = meta.title(router);
    } else { title = meta.title; }
  }
  meta.title = title;
  router.meta = meta;
  return router;
};
export const showTitle = (item: any) => {
  const { title, name } = item.meta;
  const page_title: any = title || name;
  if (!page_title) { return; }
  return page_title;
};
export const setTitle = (routeItem: any) => {
  const handledRoute = getRouteTitleHandled(routeItem);
  const pageTitle = showTitle(handledRoute);
  // const resTitle = pageTitle ? `${title} - ${pageTitle}` : title
  const resTitle = pageTitle ? `${pageTitle}` : title;
  window.document.title = resTitle;
};
// 数据类型判定
export const typeOf = (obj: any) => {
  const { toString } = Object.prototype;
  const map: any = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
  };
  return map[toString.call(obj)];
}
// 数据深拷贝
export const deepCopy = (data: any) => {
  const t: string = typeOf(data);
  let o: any;

  if (t === 'array') {
    o = [];
  } else if (t === 'object') {
    o = {};
  } else {
    return data;
  }
  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]));
    }
  } else if (t === 'object') {
    for (const i in data) {
      o[i] = deepCopy(data[i]);
    }
  }
  return o;
}
// 向上寻找组件
export const findComponentUpward = (context: any, componentName: string) => {
  let parent: any = context.$parent;
  let { name }: any = parent.$options;
  while (parent && (!name || [componentName].indexOf(name) < 0)) {
    parent = parent.$parent;
    if (parent) name = parent.$options.name;
  }
  return parent;
}
// 获取树的根节点
function getRootObj(array: Array<any>): any {
  let root: any = null;
  if (array) {
    array.map((item: any) => {
      if (item.parentid === 0) { // 根节点的id为1   这个要与后台确认
        root = item;
      }
    })
  }
  return root;
}
// 递归设置树结构子节点
function setChild(root: any, array: Array<any>) {
  array.map((item: any) => {
    if (item.parentid === root.id) {
      if (root.children) {
        root.children.push(item);
      } else {
        root.children = [];
        root.children.push(item);
      }
      setChild(item, array)
    }
  })
}
// 将数组转换为树结构
export const parseArrayToTree = (array: Array<any>): Array<any> => {
  const tree: Array<any> = [];
  const root: any = getRootObj(array);
  if (root) {
    tree.push(root);
    setChild(root, array);
  }
  return tree;
}
/*
 * 获取当前时间  返回的是2017/12/10 12:20:18
 */
export const getNowFormatDateTime = () => {
  const date = new Date();
  const seperator1 = '/';
  const seperator2 = ':';
  const month = date.getMonth() + 1;
  let strDate: any = date.getDate();
  let strSecond: any = date.getSeconds();
  let strMin: any = date.getMinutes();
  // 	if (month >= 1 && month <= 9) {
  // 		 month = "0" + month;
  // 	}
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate;
  }
  if (strSecond >= 0 && strSecond <= 9) {
    strSecond = '0' + strSecond;
  }
  if (strMin >= 0 && strMin <= 9) {
    strMin = '0' + strMin;
  }
  return date.getFullYear() + seperator1 + month + seperator1 + strDate + ' ' + date.getHours() + seperator2 + strMin + seperator2 + strSecond;
};
/*
 * 判断是周几
 */
export const getMyDay = (date: string | number | Date) => ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][new Date(date).getDay()];

// 判断是不是属于同一周  （一周以周日开始）
export const isSameWeek = (oldTime: string | number | Date) => {
  const old: any = new Date(oldTime);
  const now: any = new Date(getNowFormatDateTime());
  const oneDayTime: any = 1000 * 60 * 60 * 24;
  const old_count: any = old.getTime() / oneDayTime;
  const now_other: any = now.getTime() / oneDayTime;
  return Math.floor((old_count + 5) / 7) === Math.floor((now_other + 5) / 7);
};
/* 判断已知日期时间与当天开始时间的差值,从而判断出是否是今天或者昨天 */
export const isOrSameDay = (knownDate: string | number | Date): any => {
  /* 获取当日开始时间 如2019-04-24 12:00:00 */
  const startTime = new Date(
    new Date(new Date().toLocaleDateString()).getTime(),
  );
  const knownTime = new Date(knownDate);
  const oneDayTime = 1000 * 60 * 60 * 24;
  const old_count = knownTime.getTime() / oneDayTime;
  const now_other = startTime.getTime() / oneDayTime;
  return now_other - old_count;
};
/**
 * 根据时间 返回格式时间
 * @param ymdt 时间
 * @param splitText 时间分割符
 */
export const timeShow = (ymdt: { indexOf: (arg0: string) => number; split: (arg0: string) => { join: (arg0: string) => { split: (arg0: string) => void } } }, splitText?: any) => {
  let ymdt_d: any
  if (ymdt.indexOf(`${splitText ? splitText : '-'}`) !== -1) {
    const ymdt_s: any = ymdt.split('-').join(' ').split(' ');
    ymdt_d = ymdt_s[0] + '/' + Number(ymdt_s[1]) + '/' + Number(ymdt_s[2]) + ' ' + ymdt_s[3];
  }
  const data = ymdt_d.split(' ')[0];
  const time = ymdt_d.split(' ')[1] ? ymdt_d.split(' ')[1] : '';
  const datatime = ymdt_d;
  if (isSameWeek(data)) {
    if (isOrSameDay(datatime) <= 0 && isOrSameDay(datatime) > -1) {
      return time;
    } else if (isOrSameDay(datatime) > 0 && isOrSameDay(datatime) <= 1) {
      return `昨天  ${time}`;
    } else {
      return `${getMyDay(new Date(data))}  ${time && time !== 'undefined' ? time : ''}`;
    }
  } else {
    return ymdt; // 只要日期不要时间的话: data.substring(2)
  }
};
/**
 * 根据时间戳 返回格式时间
 * @param timestamp
 */
export const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const h = date.getHours();
  const mi = date.getMinutes();
  return `${y}/${m}/${d} ${h.toString().length < 2 ? `0${h}` : h}:${mi.toString().length < 2 ? `0${mi}` : mi}`;
}

/**
 * 复制内容
 * @param msg
 */
export const copyMsg = (msg: string): void => {
  function copy(e: ClipboardEvent) {
    e.preventDefault();
    e.clipboardData && e.clipboardData.setData("text/plain", msg)
  }
  document.addEventListener('copy', copy)
  // 执行 copy 命令
  document.execCommand('copy');
  // 移除绑定事件
  document.removeEventListener('copy', copy);
}

/**
 * 根据身份证号获取用户的生日和性别
 * @param code
 */
export const getUserBirthdayAndSex = (code: string): object => {
  let year, month, day, sex
  if (rules.codeNum.validate(code)) {
    // 校验通过需要带出客户的生日和性别
    switch (code.length) {
      // 15位的身份证号
      case 15:
        year = `19${code.slice(6, 8)}`
        month = code.slice(8, 10)
        day = code.slice(10, 12)
        sex = Number(code.slice(-1)) % 2
        break;
      case 18:
        // 18位身份证号
        year = `${code.slice(6, 10)}`
        month = code.slice(10, 12)
        day = code.slice(12, 14)
        sex = Number(code.slice(-2, -1)) % 2
        break;
    }
  }
  return {
    year,
    month,
    day,
    sex
  }
}
