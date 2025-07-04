// 부트 페이에 요청을 위한 객실 정보 가공 처리
export const getRoomInfo = (roomInfo) => {
  const items = roomInfo.map((value, idx) => {
    return {
      id: value.roomNo,
      name: `${value.accomName} - ${value.roomName}`,
      qty: 1,
      price: value.roomPrice,
    };
  });

  return items;
};

// 총 가격 구하기 (쿠폰 적용)
export const calcTotalPrice = (coupon, totalPrice) => {
  return coupon
    ? totalPrice - coupon.value <= 0
      ? 100
      : totalPrice - coupon.value
    : totalPrice;
};
