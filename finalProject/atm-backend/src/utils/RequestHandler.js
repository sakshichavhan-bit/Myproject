
function sendSuccess(res, code, result, message) {

	if (code == "getdata") {
		res.status(200).json({
			message: "Retrived Data Successfully",
			result
		});
	}

	if (code == "create") {
		res.status(200).json({
			message: "Created Successfully",
		});
	}

	if (code == "update") {
		res.status(200).json({
			message: "Updated Successfully",
		});
	}

	if (code == "delete") {
		res.status(200).json({
			message: "Deleted Successfully"
		});
	}

	if (code == "verify") {
		res.status(200).json({
			message: "Verified"
		});
	}

	if (code == "send") {
		res.status(200).json({
			message: "Send"
		});
	}

	if (code == "custom") {
		res.status(200).json({
			message,
		});
	}

	if (code == "qrCode") {
		res.status(200).json({
			message: message,
			url: result
		})
	}
}

function sendError(res, code, message) {

	if (code == "norecord") {
		res.status(200).json({
			error: true,
			message: "No Records"
		});
	}

	if (code == "getdata") {
		res.status(200).json({
			error: true,
			message: "Data Not Retrived"
		});
	}

	if (code == "create") {
		res.status(200).json({
			error: true,
			message: "Not Created"
		});
	}

	if (code == "update") {
		res.status(200).json({
			error: true,
			message: "Not Updated"
		});
	}

	if (code == "delete") {
		res.status(200).json({
			error: true,
			message: "Not Deleted"
		});
	}

	if (code == "verify") {
		res.status(200).json({
			error: true,
			message: "Not Verified"
		});
	}

	if (code == "send") {
		res.status(200).json({
			error: true,
			message: "Not Send"
		});
	}

	if (code == "custom") {
		res.status(200).json({
			error: true,
			message
		});
	}

	if (code == "server_error") {
		res.status(500).json({
			error: true,
			message: 'Internal Server'
		});
	}

}

module.exports = { sendSuccess, sendError };

