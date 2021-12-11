import { Table, AROptRow, Permission } from 'components';
const { AROptItem } = AROptRow;

const Index = ({
	exportFn,
	locales,
	editLocale,
	addFn,
	downloadImportTemplateFn,
	importFn,
	languageEditCallBack,
	...listProps, }) => {
	return (
		<Table
			{...listProps}
			rowKey={(record) => record.id}
			sortNum
		>
			<AROptRow languageEditCallBack={languageEditCallBack} lang={editLocale}>
				<Permission>
					<AROptItem
						permission='product:extjson:add'
						icon='plus'
						title={locales.add}
						onClick={() => addFn()}
					/>
				</Permission>
			</AROptRow>
		</Table>
	)
}

export default Index;
