import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import RoomRegForm from './local-components/RoomRegForm.component';
import './RoomMain.style.scss';
const RoomMain = () => {
  /**
   * useParams로 숙박업소 Id 값 받아오기
   * useLocation으로 객실 Id 값 받아오기
   */
  // const location = useLocation();
  const id = useParams();
  const accomNo = id.id;
  const roomNo = id.roomSq;
  // const { no } = location.state;

  // useEffect(() => {
  //   console.log('accomNo : ' + accomNo);
  //   console.log('no : ' + no);
  //   console.log('roomNo : ' + roomNo);
  // }, []);

  return (
    <div className='room-main__container'>
      <div className='room-main-header'>
        {/* 임시로 숙박업소 ID값 출력 서버 연동 후 숙박업소명으로 출력 예정 */}
        <h1>{accomNo}</h1>
      </div>
      <RoomRegForm
        accomId={accomNo}
        roomId={roomNo !== undefined ? roomNo : 0}
      />
    </div>
  );
};

export default RoomMain;
