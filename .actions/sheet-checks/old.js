"use strict";
const https = require("https");
const crypto = require("crypto");

// ENV Variables
const GITHUB_WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET;
const GITHUB_ACCT = process.env.GITHUB_ACCT;
const GITHUB_API_TOKEN = process.env.GITHUB_API_TOKEN;

// String Constants
const
	PR_STATUSES_ACCEPT = ["opened", "synchronize", "edited", "labeled", "unlabeled"],
	PR_BASE_ACCEPT = ["statusTest", "master", "release"],
	C_STATUS_PENDING = "pending",
	C_STATUS_SUCCESS = "success",
	C_STATUS_FAILURE = "failure",
	C_STATUS_ERROR = "error",
	GITHUB_STATUSES = {
		pending: {
			state: "pending",
			description: "Running a validation check…",
			context: "Character Sheet Validation"
		},
		success: {
			state: "success",
			context: "Character Sheet Validation"
		},
		failure: {
			state: "failure",
			description: "Pull Request failed to validate. Correct errors below.",
			context: "Character Sheet Validation"
		},
		failure_modifiedRoot: {
			state: "failure",
			description: "You cannot modify files in the root directory.",
			context: "No Modify Root Rule"
		},
		failure_multipleSheets: {
			state: "failure",
			description: "You can only modify 1 character sheet folder per Pull Request. Use branches to change multiple sheets.",
			context: "Single Sheet Rule"
		},
		failure_noSheet: {
			state: "failure",
			description: "No sheet was found in this Pull Request.",
			context: "No Sheet"
		},
		failure_sheetBadJson: {
			state: "failure",
			description: "Your sheet.json is not a valid json object.",
			context: "Sheet.json Invalid"
		},
		failure_sheetJsonMissing: {
			state: "failure",
			description: "You are missing the 'sheet.json' file.",
			context: "Sheet.json Missing"
		},
		failure_translationBadJson: {
			state: "failure",
			description: "Your 'translation.json' is not a valid json object.",
			context: "Translation.json Invalid"
		},
		failure_sheetJsonInvalid: {
			state: "failure",
			description: "Your sheet.json is not a valid JSON object.",
			context: "Sheet.json Invalid"
		},
		failure_htmlNotSetSheetJson: {
			state: "failure",
			description: "Your sheet.json is missing the 'html' field.",
			context: "Missing HTML Field"
		},
		failure_htmlNoFileSheetJson: {
			state: "failure",
			description: "The 'html' file entered in the sheet.json does not exist or the name does not match the file.",
			context: "Missing HTML File"
		},
		failure_cssNotSetSheetJson: {
			state: "failure",
			description: "Your sheet.json is missing the 'css' field.",
			context: "Missing CSS Field"
		},
		failure_cssNoFileSheetJson: {
			state: "failure",
			description: "The 'css' file linked in the sheet.json does not exist or the name does not match the file.",
			context: "Missing CSS File"
		},
		failure_previewNotSetSheetJson: {
			state: "failure",
			description: "Your sheet.json is missing the 'preview' field.",
			context: "Missing Preview Field"
		},
		failure_previewNoFileSheetJson: {
			state: "failure",
			description: "The 'preview' file linked in the sheet.json does not exist or the name does not match the file.",
			context: "Missing Preview File"
		},
		failure_instructionsNotSetSheetJson: {
			state: "failure",
			description: "Your sheet.json is missing the 'instructions' field.",
			context: "Missing Instructions Field"
		},
		failure_nonExist: {
			state: "failure",
			description: "This is a new sheet that has not yet been added to the approved.yaml",
			context: "Character Sheet Validation"
		},
		error: {
			state: "error",
			description: "There was an error with the validation check.",
			context: "Character Sheet Validation"
		}
	};

const gitHubAuth = Buffer.from(GITHUB_ACCT + ":" + GITHUB_API_TOKEN).toString("base64");
function gitHubReqOpts(reqPath, reqMethod, opts = {}) {
	const
		reqAccept = (opts["reqAccept"] || "application/vnd.github.v3+json"),
		reqContentType = (opts["reqContentType"] || "application/json");
	return {
		host: "api.github.com",
		path: encodeURI(reqPath).replace(/&/g, "%26"),
		port: 443,
		method: reqMethod,
		headers: {
			"Accept": reqAccept,
			"User-Agent": "GitHub-Statuses",
			"Content-Type": reqContentType,
			"Authorization": "Basic " + gitHubAuth
		}
	};
}

function gitHubReqPromise(reqOpts, successStatus, opts = {}) {
	const
		bodyJson = (opts["bodyJson"] || ""),
		resAcceptJson = (typeof opts["resAcceptJson"] === "undefined" ? true : false);
	return new Promise((resolve, reject) => {
		const gitHubReq = https.request(reqOpts, gitHubRes => {
			let resBody = "";
			gitHubRes.on("data", chunk => {
				resBody += chunk;
			});
			gitHubRes.on("end", () => {
				if (gitHubRes.statusCode === successStatus) {
					if (resAcceptJson) {
						try {
							let gitHubResJson = JSON.parse(resBody);
							resolve(gitHubResJson);
						} catch (e) {
							reject("Bad JSON");
						}
					}
					else {
						resolve(resBody);
					}
				}
				else {
					let gitHubResJson = JSON.parse(resBody);
					reject({
						status: gitHubRes.statusCode,
						message: gitHubResJson.message
					});
				}
			});
		}).on("error", err => {
			reject("Unable to connect to GitHub. Err: " + err);
		});
		if (bodyJson !== "") {
			gitHubReq.write(JSON.stringify(bodyJson));
		}
		gitHubReq.end();
	});
}

// GitHub API set status for head commit in PR
function gitHubPrStatus(prRepo, pr, setStatus) {
	const
		reqOpts = gitHubReqOpts("/repos/" + prRepo + "/statuses/" + pr.head.sha, "POST"),
		setStatusJson = GITHUB_STATUSES[setStatus];
	return gitHubReqPromise(reqOpts, 201, { bodyJson: setStatusJson });
}

// GitHub API get all commits in a PR
function gitHubGetPrDiff(prRepo, prNumber) {
	const reqOpts = gitHubReqOpts("/repos/" + prRepo + "/pulls/" + prNumber, "GET", { reqAccept: "application/vnd.github.v3.diff" });
	return gitHubReqPromise(reqOpts, 200, { resAcceptJson: false });
}


// Get the contents of the sheet.json file
function gitHubGetSheetJson(prRepo, pr, charsheetName) {
	const reqOpts = gitHubReqOpts("/repos/" + prRepo + "/contents/" + charsheetName + "/sheet.json?ref=" + pr.head.ref, "GET", { reqAccept: "application/vnd.github.v3.raw" });
	return gitHubReqPromise(reqOpts, 200, { resAcceptJson: false });
}

// Get the contents of the translation.json file
function gitHubGetTranslationJson(prRepo, pr, charsheetName) {
	const reqOpts = gitHubReqOpts("/repos/" + prRepo + "/contents/" + charsheetName + "/translation.json?ref=" + pr.head.ref, "GET", { reqAccept: "application/vnd.github.v3.raw" });
	return gitHubReqPromise(reqOpts, 200, { resAcceptJson: false });
}

// Get all of the files in a charsheet folder
function gitHubGetSheetFolder(prRepo, pr, charsheetName) {
	const reqOpts = gitHubReqOpts("/repos/" + prRepo + "/contents/" + charsheetName + "?ref=" + pr.head.ref, "GET");
	return gitHubReqPromise(reqOpts, 200);
}

// Post a comment on a PR
function gitHubPostComment(prRepo, prNumber, message) {
	const
		reqOpts = gitHubReqOpts(`/repos/${prRepo}/issues/${prNumber}/comments`, "POST"),
		setStatusJson = {"body": message};
	return gitHubReqPromise(reqOpts, 201, { bodyJson: setStatusJson });
}

// Get a list of all comments on a PR
function gitHubCommentList(prRepo, pr) {
	const
		reqOpts = gitHubReqOpts(`/repos/${prRepo}/issues/${pr.number}/comments`, "GET");
	return gitHubReqPromise(reqOpts, 200);
}

// Add or remove labels to a PR
function gitHubSetLabels(prRepo, prNumber, labels) {
	const
		reqOpts = gitHubReqOpts(`/repos/${prRepo}/issues/${prNumber}`, "PATCH"),
		setStatusJson = {"labels": labels};
	return gitHubReqPromise(reqOpts, 200, { bodyJson: setStatusJson });
}

// Get a summary of the PR (including labels)
function gitHubIssue(prRepo, prNumber) {
	const
		reqOpts = gitHubReqOpts(`/repos/${prRepo}/issues/${prNumber}`, "GET");
	return gitHubReqPromise(reqOpts, 200);
}

function addLabelToPr(prRepo, prNumber, label) {
	gitHubIssue(prRepo, prNumber).then(issue => {
		let labels = [];
		issue.labels.forEach(labelInfo => {
			labels.push(labelInfo.name);
		});
		if (!labels.includes(label)) labels.push(label);
		gitHubSetLabels(prRepo, prNumber, labels);
	});
}

function removeLabelfromPr(prRepo, prNumber, label) {
	gitHubIssue(prRepo, prNumber).then(issue => {
		let labels = [],
			needsSet = false;
		issue.labels.forEach(labelInfo => {
			if (label === labelInfo.name) {
				needsSet = true;
			} else {
				labels.push(labelInfo.name);
			}
		});
		if (needsSet) gitHubSetLabels(prRepo, prNumber, labels);
	});
}

// Query the charsheet service to check if sheet exists in db
function charsheetServiceCheck(repoName, sheetPath) {
	const
		query = {query:`{characterSheet(repo: "${repoName}", path: "${sheetPath}"){shortname}}`},
		reqOpts = {
			host: 'api.charactersheet.production.roll20preflight.net',
			path: '/graphql',
			port: 443,
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			}
		};
	return new Promise((resolve, reject) => {
		const charsheetReq = https.request(reqOpts, charsheetRes => {
			let resBody = "";
			charsheetRes.on("data", chunk => {
				resBody += chunk;
			});
			charsheetRes.on("end", () => {
				if (charsheetRes.statusCode === 200) {
					try {
						let charsheetResJson = JSON.parse(resBody);
						resolve(charsheetResJson.data.characterSheet !== null);
					} catch (e) {
						reject("Bad JSON");
					}
				}
				else {
					reject({
						status: charsheetRes.statusCode,
						message: charsheetResJson.message
					});
				}
			});
		}).on("error", err => {
			reject("Unable to connect to character sheet service. Err: " + err);
		});
		charsheetReq.write(JSON.stringify(query));
		charsheetReq.end();
	});
}

function sheetJsonValidateField(sheetJson, field, files) {
	if (typeof sheetJson[field] === "undefined") {
		return field + "NotSet";
	}
	else if (files !== false && files.indexOf(sheetJson[field]) === -1) {
		return field + "NoFile";
	}
	else {
		return true;
	}
}

class ValidationError extends Error {
	constructor(message) {
		super(message);
		this.name = "ValidationError";
	}
}

exports.webhook = (req, res) => {
	const
		reqBody = req.body,
		prAction = reqBody.action,
		prRepo = reqBody.repository.full_name,
		prRepoName = reqBody.repository.name,
		pr = reqBody.pull_request,
		headRepo = pr.head.repo.full_name;

	// We've set a secret for the GitHub webhooks to authenticate requests, since they are retreiving private data from JIRA.
	const webhookAuth = "sha1=" + crypto.createHmac('sha1', GITHUB_WEBHOOK_SECRET).update(req.rawBody).digest("hex");
	if (webhookAuth.length !== req.headers["x-hub-signature"].length) {
		res.status(500).send("GitHub Auth Different Lengths: " + webhookAuth + " " + req.headers["x-hub-signature"]);
		return;
	}
	else if (!crypto.timingSafeEqual(Buffer.from(webhookAuth), Buffer.from(req.headers["x-hub-signature"]))) {
		res.status(401).send("GitHub Auth Failed!");
		return;
	}

	if (PR_STATUSES_ACCEPT.includes(prAction) && PR_BASE_ACCEPT.includes(pr.base.ref)) {
		// Mark PR as pending
		const setPending = gitHubPrStatus(prRepo, pr, C_STATUS_PENDING);

		// Get PR commits
		// const getValidateCommits = gitHubGetPrCommits(prRepo, pr)
		const getPrDiff = gitHubGetPrDiff(prRepo, pr.number)
			.then(prDiff => {
				let prFiles = prDiff.match(/^\+\+\+ b\/.*$/gm);
				try {
					// Make sure only files in a single folder were modified.
					let sheetName = null;
					for (let i = 0; i < prFiles.length; i++) {
						let
							fileName = prFiles[i].trim().replace("+++ b/", ""),
							sheetFolders = fileName.split("/");

						if (sheetFolders.length === 1) {
							throw new ValidationError("failure_modifiedRoot");
						}
						else if (sheetName === null) {
							sheetName = sheetFolders[0];
						}
						else if (sheetName !== null && sheetName !== sheetFolders[0]) {
							throw new ValidationError("failure_multipleSheets");
						}
					}
					if (sheetName === null) {
						throw new ValidationError("failure_noSheet");
					}

					// We have the name of the charsheet that was modified. Get all of the files for that charsheet make make sure they are correct.
					const getSheetJsonContent = gitHubGetSheetJson(headRepo, pr, sheetName)
						.then(sheetJson => {
							// If the sheet.json is not valid JSON then we can't check it against the files. We can return a status now.
							try {
								return JSON.parse(sheetJson);
							}
							catch (e) {
								throw new ValidationError("failure_sheetBadJson");
							}
						})
						.catch(err => {
							if (err.status === 404) {
								throw new ValidationError("failure_sheetJsonMissing");
							}
							else {
								throw err;
							}
						});

					const getSheetFiles = gitHubGetSheetFolder(headRepo, pr, sheetName);

					const postComment = gitHubCommentList(prRepo, pr).then((comments) => {
						let commented = false;
						comments.forEach(comment => {
							if (comment.user.login === 'roll20deploy' && comment.body.includes('https://app.roll20.net/managesheets/')) commented = true;
						});
						const message = `[Character Sheet Info](https://app.roll20.net/managesheets/${encodeURI(sheetName)}/${prRepoName}) *Roll20 Internal Use only.*`;
						if(!commented) gitHubPostComment(prRepo, pr.number, message);
					});

					const serviceCheck = charsheetServiceCheck(prRepoName, sheetName);

					// After we have successfully retrieved both the sheet.json contents and all of the files in the sheet folder
					return Promise.all([getSheetJsonContent, getSheetFiles, serviceCheck, postComment])
						.then(results => {
							const
								sheetJsonContent = results[0],
								sheetFiles = results[1].map(file => file.name),
								exists = results[2];

							// Validation checks for values/files in sheet.json, to make sure the right files exist.
							const
								htmlValid = sheetJsonValidateField(sheetJsonContent, "html", sheetFiles),
								cssValid = sheetJsonValidateField(sheetJsonContent, "css", sheetFiles),
								previewValid = sheetJsonValidateField(sheetJsonContent, "preview", sheetFiles),
								instructionsValid = sheetJsonValidateField(sheetJsonContent, "instructions", false),
								sheetValidationFields = [htmlValid, cssValid, previewValid, instructionsValid];

							let sheetValid = true;

							for (let i = 0; i < sheetValidationFields.length; i++) {
								if (sheetValidationFields[i] !== true) {
									gitHubPrStatus(prRepo, pr, "failure_" + sheetValidationFields[i] + "SheetJson");
									sheetValid = false;
								}
							}

							if (exists) {
								removeLabelfromPr(prRepo, pr.number, 'new sheet')
							} else {
								addLabelToPr(prRepo, pr.number, 'new sheet')
								throw new ValidationError("failure_nonExist")
							}

							// If the translation file exists, check that it is valid json, before returning the over-all status.
							// Otherwise we can now return the over-all status.
							if (sheetFiles.indexOf("translation.json") !== -1) {
								return gitHubGetTranslationJson(headRepo, pr, sheetName)
									.then(translationJson => {
										try {
											JSON.parse(translationJson);
											if (sheetValid) {
												return C_STATUS_SUCCESS;
											}
											else {
												return C_STATUS_FAILURE;
											}
										}
										catch (e) {
											throw new ValidationError("failure_translationBadJson");
										}
									});
							}
							else if (sheetValid) {
								return C_STATUS_SUCCESS;
							}
							else {
								return C_STATUS_FAILURE;
							}
						})
						.catch(err => {
							if (err instanceof ValidationError) {
								return err.message;
							}
							else {
								throw err;
							}
						});
				}
				catch (err) {
					// If it's a validation error we want to return a 200 with a failed check. If it's a real error we want to 500.
					if (err instanceof ValidationError) {
						return err.message;
					}
					else {
						throw err;
					}
				}
			});

		// Promise.all([setPending, getValidateCommits])
		Promise.all([setPending, getPrDiff])
			.then(results => {
				const resultStatus = results[1];
				gitHubPrStatus(prRepo, pr, resultStatus);

				// If the status is not success, or has already been manually set to failure, automatically set the over-all status to failed
				if (resultStatus !== C_STATUS_SUCCESS && resultStatus !== C_STATUS_FAILURE) {
					gitHubPrStatus(prRepo, pr, C_STATUS_FAILURE);
				}
				res.status(200).send("PR Status Updated.");
			})
			.catch(err => {
				console.log(err);
				gitHubPrStatus(prRepo, pr, C_STATUS_ERROR);
				res.status(500).send(err.message);
			});
	}
	else {
		res.status(200).send("No update necessary.");
	}
};
