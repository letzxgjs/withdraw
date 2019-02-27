import http from '@/libs/httpRequest'
import qs from 'qs'
export const orderlist = (data) => {
  return http({
    url: http.adornUrl('api/bets/orderlist?'+ qs.stringify(data)),
    method: 'get',
  })
}






