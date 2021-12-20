import { ARSearchRow } from 'components'
import { Input, Select } from 'antd'
const { ARSearchItem } = ARSearchRow

const Index = ({ intl, locales, onSearch }) => {
	return (
		<ARSearchRow
			callBack={onSearch}
			searchBtnName={intl.formatMessage({ id: 'global.searchBtn' })}
			resetUseCallBack={true}>

			<ARSearchItem id='name1' label={locales.name1} >
				<Select name='name1' placeholder={locales.name1} style={{ width: '170px' }}>
					<Select.Option key='aa' value='aa'>aaa</Select.Option>
					<Select.Option key='bb' value='bb'>bbb</Select.Option>
				</Select>
			</ARSearchItem>
			<ARSearchItem id='name2' label={locales.name2} >
				<Input name='name2' placeholder={locales.name2} style={{ width: '170px' }} />
			</ARSearchItem><ARSearchItem id='name3' label={locales.name3} >
				<Input name='name3' placeholder={locales.name3} style={{ width: '170px' }} />
			</ARSearchItem>

		</ARSearchRow>
	)
}

export default Index;
