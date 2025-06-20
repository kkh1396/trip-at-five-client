import './address.style.scss';
import {
	ButtonPrimary,
	ButtonSecondary,
	InputPrimary,
} from '../../../components';
import {
	useRegisterInfostore,
	useRegisterStore,
} from '../../../states/register/registerStore';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useState } from 'react';
import { sendRegister } from '../../../services/register/apiService';
import { postCodeUrl } from '../../../services/login/loginService';
import { errorAlert, successAlert } from '../../../utils/toastUtils/toastUtils';

export default function RegisterAdress() {
	const { setAddStep } = useRegisterStore();
	const { email, pwd, nickName, tel, address, setAddress } =
		useRegisterInfostore();
	const [postNum, setPostNum] = useState('');
	const [basicAddress, setBasicAddress] = useState('');
	const [otherAddress, setOtherAddress] = useState('');

	const open = useDaumPostcodePopup(postCodeUrl);

	const handleComplete = (data) => {
		let fullAddress = data.address;
		let extraAddress = '';
		if (data.addressType === 'R') {
			if (data.bname !== '') {
				extraAddress += data.bname;
			}
			if (data.buildingName !== '') {
				extraAddress +=
					extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
			}
			fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
		}

		setPostNum(data.zonecode);
		setBasicAddress(fullAddress);
	};

	const handleClick = () => {
		open({ onComplete: handleComplete });
	};

	const sendRegisterCall = async () => {
		const result = await sendRegister(email, pwd, nickName, tel, address);
		if (result.data === 1 && result.status === 200) {
			setAddStep();
			return 1;
		} else {
			return 0;
		}
	};

	const sendAddress = async () => {
		if (postNum.length !== 0 && otherAddress.length !== 0) {
			setAddress(postNum + ',' + basicAddress + ',' + otherAddress);
			if (sendRegisterCall() == 1) {
				successAlert('가입성공');
			}
		} else {
			errorAlert('주소를 입력해주세요');
		}
	};

	return (
		<div className='register-address-wrap'>
			<p className='register-address-text bold'>우편번호</p>
			<div></div>

			<div className='register-address-Postal'>
				<InputPrimary
					className={'register-postal-input'}
					placeholder={'우편번호 입력'}
					value={postNum}
				/>
				<ButtonPrimary
					onClick={handleClick}
					className={'register-address-serch '}
				>
					우편 번호 검색
				</ButtonPrimary>
			</div>

			<p className='register-address-text bold'>기본 주소</p>
			<div>
				<InputPrimary
					className={'address-main-input'}
					placeholder={'주소를 입력하세요'}
					value={basicAddress}
				/>
			</div>

			<p className='register-address-text'>상세 주소</p>
			<InputPrimary
				className={'address-sub-input'}
				placeholder={'나머지 주소'}
				onChange={(e) => {
					setOtherAddress(e.target.value);
				}}
			/>

			<ButtonPrimary
				className={'adress-btn-check'}
				onClick={sendAddress}
			>
				회원가입
			</ButtonPrimary>
		</div>
	);
}
