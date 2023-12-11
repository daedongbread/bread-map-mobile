export const convertToRecentFormat = (date: string) => {
  const now = new Date();
  const targetDate = new Date(date);

  const betweenTime = Math.floor((now.getTime() - targetDate.getTime()) / 1000 / 60);
  if (betweenTime < 1) {
    return '방금전';
  }
  if (betweenTime < 60) {
    return `${betweenTime}분전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 10) {
    return `${betweenTimeDay}일전`;
  }

  return `${targetDate.getMonth() + 1}월 ${targetDate.getDate()}일`;
};
