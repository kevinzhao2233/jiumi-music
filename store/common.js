/**
 * 格式化数据
 * @param {*} param0
 */
export const formatMusic = ({
  id,
  name,
  al,
  album,
  artists,
  duration,
  ar,
  dt,
  fee,
  sourcePlaylistId
}) => {
  // 统一格式
  if (ar && !artists) {
    artists = ar;
    duration = dt;
    album = al;
  }
  // 格式化时间
  let formatDuration = '';
  const time = duration / 60000;
  const int = parseInt(time);
  const dec = parseInt((time - int) * 60);
  formatDuration = `${int > 9 ? int : '0' + int}:${dec > 9 ? dec : '0' + dec}`;
  // 歌手, 试试 reduce
  const art = [];
  artists.map(item => {
    art.push({ id: item.id, name: item.name });
  });
  // 专辑
  const alb = { id: album.id, name: album.name };
  // 打包
  return {
    id,
    fee,
    name,
    duration,
    album: alb,
    artists: art,
    formatDuration,
    sourcePlaylistId
  };
};

/**
 * localStorage.getItem
 * @param {String} key 要从locasSorage中获取的key
 */
export function getLocalStorage(key) {
  if (localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key));
  }
  return undefined;
}

/**
 * localStorage.setItem
 * @param {String} key 要给localStorage中设置的key
 * @param {*} value 设置的value
 */
export function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
