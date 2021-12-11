import { ARSearchRow } from 'components'
import { Input, Select } from 'antd'
const { ARSearchItem } = ARSearchRow

const Index = ({ intl, locales, onSearch }) => {
	return (
		<ARSearchRow
			callBack={onSearch}
			searchBtnName={intl.formatMessage({ id: 'global.searchBtn' })}
			resetUseCallBack={true}>
			
			{/* ${fields} */}
			
		</ARSearchRow>
	)
}

export default Index;
