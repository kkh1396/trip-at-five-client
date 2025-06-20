import './tel.style.scss';
import {
	ButtonPrimary,
	ButtonSecondary,
	InputPrimary,
} from '../../../components';
import {
	useRegisterInfostore,
	useRegisterStore,
} from '../../../states/register/registerStore';
import { useState } from 'react';
import { validatePhoneNumber } from '../util/validate';

export default function RegisterTel() {
	const { setAddStep } = useRegisterStore();
	const { tel, setTel } = useRegisterInfostore();
	const [error, setError] = useState();
	const [telText, setTelText] = useState();

	const telSkip = () => {
		setAddStep();
	};

	const telOk = () => {
		if (tel.length === 11) {
			setAddStep();
		} else {
			setTelText('연락처를 입력해주세요');
			setError('');
		}
	};

	const validatePhoneNumberCheck = (e) => {
		const value = e.target.value;
		setTel(value);

		if (value.length === 0) {
			setError('');
		} else if (value.includes('-')) {
			setError(" '-'를 제외하고 입력해주세요 ");
			setTelText('');
		} else if (!validatePhoneNumber(value)) {
			setError('올바른 전화번호 형식이 아닙니다.');
			setTelText('');
		} else {
			setError('');
		}
	};

	return (
		<div className='register-tel-wrap'>
			<div className='register-tel-input-wrap'>
				<p className='register-tel-text'>전화번호</p>
				<InputPrimary
					className={'register-tel-input'}
					placeholder={'연락처를 입력해주세요'}
					onChange={validatePhoneNumberCheck}
				/>
				{error && <p className='validatePhone-step4-error'>{error}</p>}
				{telText && <p className='validatePhone-step4-telText'>{telText}</p>}
			</div>


				<ButtonPrimary
					className={'tel-btn-check'}
					onClick={telOk}
				>
					확인
				</ButtonPrimary>

		</div>
	);
}
