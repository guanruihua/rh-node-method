import { event, message } from "../../../assets/APP-Utils";

const callback = (res, success = true, error = true) => {
	if (res && res.code === "0") {
		success && message({ type: "success", msg: res.message });
		return true;
	} else {
		error && message({ type: "error", msg: res.message });
		return false;
	}
};

const checkCode = (res) => {
	if (res.code !== '0') {
		message({ type: 'error', msg: res.message })
		return false;
	}
	return true;
}

const handleClick = (flag, record) => {
	if (!flag) return;
	event.emit("modal", {
		pageName: flag,
		itemData: record,
	});
}

export {
	handleClick,
	callback,
	checkCode,
}