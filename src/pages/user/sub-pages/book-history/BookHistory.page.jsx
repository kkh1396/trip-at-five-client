import { useEffect, useState } from 'react';
import { loginStateStore } from '../../../../states/login/loginStore';
import { reservationSelect } from '../../../../services/user/userService';
import { UserPageContainer } from '../../components/page-container/UserPageContainer.component';
import './bookHistory.style.scss';
import { BookHistoryItem } from './components/book-history-item/BookHistoryItem.component';

// const dummyData = [
//   {
//     resCd: 'RES2025050101',
//     resName: '김민수',
//     resPhone: '010-1234-5678',
//     checkInDt: '2025-05-10',
//     checkOutDt: '2025-05-12',
//     ckResSt: 'COMPLETED',
//     accName: '제주오름호텔',
//     roomName: '오션뷰 스위트',
//   },
//   {
//     resCd: 'RES2025050102',
//     resName: '이서윤',
//     resPhone: '010-2345-6789',
//     checkInDt: '2025-05-20',
//     checkOutDt: '2025-05-22',
//     ckResSt: 'PROCESSING',
//     accName: '부산비치리조트',
//     roomName: '패밀리 더블룸',
//   },
//   {
//     resCd: 'RES2025050103',
//     resName: '박지훈',
//     resPhone: '010-3456-7890',
//     checkInDt: '2025-05-15',
//     checkOutDt: '2025-05-16',
//     ckResSt: 'CANCEL',
//     accName: '강릉해변펜션',
//     roomName: '스탠다드룸',
//   },
//   {
//     resCd: 'RES2025050104',
//     resName: '최유진',
//     resPhone: '010-4567-8901',
//     checkInDt: '2025-06-01',
//     checkOutDt: '2025-06-04',
//     ckResSt: 'COMPLETED',
//     accName: '남해하늘호텔',
//     roomName: '디럭스 트윈',
//   },
//   {
//     resCd: 'RES2025050105',
//     resName: '정현우',
//     resPhone: '010-5678-9012',
//     checkInDt: '2025-05-30',
//     checkOutDt: '2025-06-01',
//     ckResSt: 'PROCESSING',
//     accName: '속초스카이리조트',
//     roomName: '프리미엄룸',
//   },
//   {
//     resCd: 'RES2025050106',
//     resName: '한지민',
//     resPhone: '010-6789-0123',
//     checkInDt: '2025-05-18',
//     checkOutDt: '2025-05-19',
//     ckResSt: 'COMPLETED',
//     accName: '제주블루힐',
//     roomName: '스위트룸',
//   },
//   {
//     resCd: 'RES2025050107',
//     resName: '장도연',
//     resPhone: '010-7890-1234',
//     checkInDt: '2025-05-25',
//     checkOutDt: '2025-05-26',
//     ckResSt: 'CANCEL',
//     accName: '여수그랜드호텔',
//     roomName: '오션뷰 더블',
//   },
//   {
//     resCd: 'RES2025050108',
//     resName: '신지후',
//     resPhone: '010-8901-2345',
//     checkInDt: '2025-06-05',
//     checkOutDt: '2025-06-07',
//     ckResSt: 'PROCESSING',
//     accName: '부산프라임호텔',
//     roomName: '스탠다드룸',
//   },
//   {
//     resCd: 'RES2025050109',
//     resName: '고은비',
//     resPhone: '010-9012-3456',
//     checkInDt: '2025-05-11',
//     checkOutDt: '2025-05-13',
//     ckResSt: 'COMPLETED',
//     accName: '제주클라우드호텔',
//     roomName: '디럭스 퀸룸',
//   },
//   {
//     resCd: 'RES2025050110',
//     resName: '윤태호',
//     resPhone: '010-1122-3344',
//     checkInDt: '2025-05-14',
//     checkOutDt: '2025-05-16',
//     ckResSt: 'COMPLETED',
//     accName: '경주역사호텔',
//     roomName: '패밀리룸',
//   },
//   {
//     resCd: 'RES2025050111',
//     resName: '백소연',
//     resPhone: '010-2233-4455',
//     checkInDt: '2025-05-21',
//     checkOutDt: '2025-05-23',
//     ckResSt: 'PROCESSING',
//     accName: '대구센트럴호텔',
//     roomName: '트윈룸',
//   },
//   {
//     resCd: 'RES2025050112',
//     resName: '이도현',
//     resPhone: '010-3344-5566',
//     checkInDt: '2025-06-10',
//     checkOutDt: '2025-06-12',
//     ckResSt: 'COMPLETED',
//     accName: '포항오션팰리스',
//     roomName: 'VIP룸',
//   },
//   {
//     resCd: 'RES2025050113',
//     resName: '서지우',
//     resPhone: '010-4455-6677',
//     checkInDt: '2025-05-27',
//     checkOutDt: '2025-05-28',
//     ckResSt: 'CANCEL',
//     accName: '춘천호반호텔',
//     roomName: '한옥 스위트',
//   },
//   {
//     resCd: 'RES2025050114',
//     resName: '임세진',
//     resPhone: '010-5566-7788',
//     checkInDt: '2025-05-31',
//     checkOutDt: '2025-06-02',
//     ckResSt: 'COMPLETED',
//     accName: '강릉레이크호텔',
//     roomName: '디럭스 트윈',
//   },
//   {
//     resCd: 'RES2025050115',
//     resName: '최도영',
//     resPhone: '010-6677-8899',
//     checkInDt: '2025-06-03',
//     checkOutDt: '2025-06-06',
//     ckResSt: 'PROCESSING',
//     accName: '서울가든호텔',
//     roomName: '싱글룸',
//   },
//   {
//     resCd: 'RES2025050116',
//     resName: '문하윤',
//     resPhone: '010-7788-9900',
//     checkInDt: '2025-06-07',
//     checkOutDt: '2025-06-08',
//     ckResSt: 'COMPLETED',
//     accName: '남해힐링리조트',
//     roomName: '풀빌라',
//   },
//   {
//     resCd: 'RES2025050117',
//     resName: '정가온',
//     resPhone: '010-8899-0011',
//     checkInDt: '2025-05-09',
//     checkOutDt: '2025-05-11',
//     ckResSt: 'CANCEL',
//     accName: '대천해변호텔',
//     roomName: '스탠다드룸',
//   },
//   {
//     resCd: 'RES2025050118',
//     resName: '오지민',
//     resPhone: '010-9900-1122',
//     checkInDt: '2025-05-17',
//     checkOutDt: '2025-05-18',
//     ckResSt: 'COMPLETED',
//     accName: '인천씨사이드호텔',
//     roomName: '더블룸',
//   },
//   {
//     resCd: 'RES2025050119',
//     resName: '유태연',
//     resPhone: '010-1010-2020',
//     checkInDt: '2025-06-09',
//     checkOutDt: '2025-06-11',
//     ckResSt: 'PROCESSING',
//     accName: '제주브리즈호텔',
//     roomName: '가든뷰 트윈',
//   },
//   {
//     resCd: 'RES2025050120',
//     resName: '남하늘',
//     resPhone: '010-2020-3030',
//     checkInDt: '2025-06-12',
//     checkOutDt: '2025-06-14',
//     ckResSt: 'COMPLETED',
//     accName: '서울리버사이드호텔',
//     roomName: '리버뷰 디럭스',
//   },
// ];

export const BookHistoryPage = () => {
	const [list, setList] = useState([]);
	const { loginInfo } = loginStateStore();
	const [refresh, setRefresh] = useState(false);

	useEffect(() => {
		console.log;
		const fetchData = async () => {
			const result = await reservationSelect(loginInfo.memSq);
			if (result.status === 200) {
				setList(result.data);
			}
		};
		fetchData();
	}, [refresh]);

	return (
		<UserPageContainer className='user-page book-history__container'>
			{/* TODO: history list map, dummyData를 bookHistoryList로 변경해야 함 */}
			{list.map((bookHistory, idx) => {
				return (
					<BookHistoryItem
						key={idx}
						bookHistory={bookHistory}
						onRefresh={() => setRefresh((prev) => !prev)}
					/>
				);
			})}
			{/* TODO: totalCount > 10 && pagination */}
		</UserPageContainer>
	);
};
