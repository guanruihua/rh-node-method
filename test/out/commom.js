const namespace = 'productExtJson';

const localesByIntl = (intl) => {
	return {
		code: intl.formatMessage({ id: "label.list.code" }),
		name: intl.formatMessage({ id: "label.list.name" }),
		order: intl.formatMessage({id: 'label.list.order'}),
		add: intl.formatMessage({ id: 'global.addBtn' }),
		view: intl.formatMessage({ id: 'global.app.opt.view' }),
		edit: intl.formatMessage({ id: 'global.editBtn' }),
		operations: intl.formatMessage({ id: 'global.operation' }),
		desc: intl.formatMessage({ id: 'global.description' }),
	}
}


export default {
	namespace,
	localesByIntl
}