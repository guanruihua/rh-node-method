import { ARSearchRow } from '../../../components'
import { Input } from 'antd'
const { ARSearchItem } = ARSearchRow

const Index = ({ intl, locales, onSearch }) => {
	return (
		<ARSearchRow
			callBack={onSearch}
			searchBtnName={intl.formatMessage({ id: 'global.searchBtn' })}
			resetUseCallBack={true}>

			<ARSearchItem id='code' label={locales.code} >
				<Input name='code' placeholder={locales.code} style={{ width: '170px' }}/>
			</ARSearchItem>

		</ARSearchRow>
	)
}

export default Index;
