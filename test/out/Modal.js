import { Modal, Input, Form } from 'components'
import { InputNumber } from 'antd';
import Validates from '../../../assets/APP-Validates'

const modal = ({ intl, locales, handleOk, editLocale, payload = {} }) => {
	const { pageName = 'view', itemData = {} } = payload;
	const { id, code, name, orders } = itemData
	const { required, max } = Validates(intl);

	const validates = {
		name: [required, max(64)],
		code: [required, max(64)],
		order: [required],
	};

	/* 通过的可编辑标识 */
	const commonFlag = (flag = []) => {
		if (pageName === 'add') return flag.includes('add')
		if (pageName === 'edit') return flag.includes('edit')
		if (pageName === 'view') return !flag.includes('view') // view默认是全部都不可以编辑
		return false;
	}

	const modalFormItemFlag = {
		name: commonFlag(),
		code: commonFlag(['edit']),
		order: commonFlag(),
	}

	return (
		<Modal
			id='modal'
			width={600}
			title={locales[pageName]}
			onOk={handleOk}
			maskClosable={false}>
			{
				<Form layout='horizontal' style={{ margin: '10px 30px' }}>
					<Input prefixCls='ant-input' name='id' initialValue={id || ''} hidden />
					<Input prefixCls='ant-input' name='pageFlag' initialValue={pageName || ''} hidden />
					<Input prefixCls='ant-input' name='localeStr' initialValue={editLocale || 'en_US'} hidden />
					name1, name2, name3
					
					

				</Form>
			}
		</Modal>
	)
}

export default Modal.connect('modal')(modal)
