/**
 * 格式化数据
 * @param {*} param0
 */
export const formatMusic = ({ id, name, artists, duration, ar, dt, fee, sourcePlaylistId }) => {
  // 统一格式
  if (ar && !artists) {
    artists = ar;
    duration = dt;
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
    art.push(item.name);
  });
  // 打包
  return {
    id,
    fee,
    name,
    duration,
    artists: art,
    formatDuration,
    sourcePlaylistId
  };
};
