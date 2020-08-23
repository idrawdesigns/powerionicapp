/*
A custom hook that handles all forms actions. i.e onFocus, onBlur, onChange and onSubmit
*/

import { useState } from "react";

import { AuthValidators } from "../";

// Validate all fields before submit

const validateAllFieldsBeforeSubmit = (
	inputValues,
	setErrorState,
	setSpecialErrorState
) => {
	const { email, password, phoneNumber } = inputValues;

	if (inputValues["email"] !== undefined) {
		const result = AuthValidators.validEmail.test(email);
		setSpecialErrorState((prevState) => ({ ...prevState, email: !result }));
		setErrorState((prevState) => ({ ...prevState, email: !email }));
	}
	if (inputValues["password"] !== undefined) {
		const result = AuthValidators.validPassword.test(password);
		setSpecialErrorState((prevState) => ({ ...prevState, password: !result }));
		setErrorState((prevState) => ({ ...prevState, password: !password }));
	}
	if (inputValues["phoneNumber"] !== undefined) {
		const result = AuthValidators.validPhone(phoneNumber);
		setSpecialErrorState((prevState) => ({ ...prevState, phoneNumber: !result }));
		setErrorState((prevState) => ({ ...prevState, phoneNumber: !phoneNumber }));
	} else {
		Object.keys(inputValues).forEach((inputName) => {
			setErrorState((prevState) => ({
				...prevState,
				[inputName]: !inputValues[inputName]
			}));
		});
	}
};

/*
Handle all on change operations
*/

// This aids in displaying the correct err msg to aid user to input a valid input
const validateInputsOnChange = (
	result,
	name,
	value,
	setErrorState,
	setSpecialErrorState
) => {
	if (value) {
		/*
		If a value exists, update state by negating the result
		i.e If value is valid, result === true, by negating, result === false,
		hence no error will be shown
		*/
		setSpecialErrorState((prevState) => ({ ...prevState, [name]: !result }));
		setErrorState((prevState) => ({ ...prevState, [name]: false }));
	} else {
		// Normal error state is true since all fields are required
		setErrorState((prevState) => ({ ...prevState, [name]: true }));
		// If no value, special error state is false across since there is nothing to validate
		setSpecialErrorState((prevState) => ({ ...prevState, [name]: false }));
	}
};

const handleOnChangeOperations = (
	e,
	inputValues,
	setErrorState,
	setSpecialErrorState
) => {
	const { name, value } = e.target;

	if (name.includes("email")) {
		const result = AuthValidators.validEmail.test(value);
		validateInputsOnChange(result, name, value, setErrorState, setSpecialErrorState);
	} else if (name === "password") {
		const result = AuthValidators.validPassword.test(value);
		validateInputsOnChange(result, name, value, setErrorState, setSpecialErrorState);
	} else if (name === "password_confirmation") {
		const result = inputValues.password === value;
		validateInputsOnChange(result, name, value, setErrorState, setSpecialErrorState);
	} else if (name === "phoneNumber") {
		const result = AuthValidators.validPhone(value);
		validateInputsOnChange(result, name, value, setErrorState, setSpecialErrorState);
	} else if (name.includes("verificationCodePart")) {
		const result = AuthValidators.validVerificationCodePart.test(value);
		validateInputsOnChange(result, name, value, setErrorState, setSpecialErrorState);
	} else if (name.includes("url")) {
		const result = AuthValidators.validUrl(value);
		validateInputsOnChange(result, name, value, setErrorState, setSpecialErrorState);
	} else {
		// All fields that don't require any special validation
		setErrorState((prevState) => ({ ...prevState, [name]: !value }));
	}
};

const dateEventHandlers = (inputValues, setInputValues) => {
	const onDateChange = (value, input) => {
		setInputValues({ ...inputValues, [input]: value });
	};

	return { onDateChange };
};

const normalInputEventHandlers = ({
	inputValues,
	setInputValues,
	setFocusState,
	setErrorState,
	setSpecialErrorState,
	checkBoxInputValues,
	setCheckBoxInputValues
}) => {
	const onFocus = (e) => {
		e.persist();
		setFocusState((prevFocusState) => ({
			...prevFocusState,
			[e.target.name]: true
		}));
	};
	const onBlur = (e) => {
		const { name, value } = e.target;

		// Invalidate state set on focus
		setFocusState((prevFocusState) => ({
			...prevFocusState,
			[name]: false
		}));

		// Set new state for on Blur
		setErrorState((prevErrorState) => ({
			...prevErrorState,
			[name]: !value && true
		}));
	};

	const onChange = (e) => {
		// handles all validations
		handleOnChangeOperations(e, inputValues, setErrorState, setSpecialErrorState);
		// Execution gets here when all necessary validation is passed
		setInputValues({
			...inputValues,
			[e.target.name]: e.target.value
		});
	};

	/* For checkbox input types only */
	const onCheckBoxChange = (e) => {
		const { name, checked } = e.target;

		setCheckBoxInputValues({
			...checkBoxInputValues,
			[name]: checked
		});
	};

	return { onFocus, onBlur, onChange, onCheckBoxChange };
};

const reactSelectInputEventHandlers = ({
	setFocusState,
	setErrorState,
	setInputValues,
	inputValues
}) => {
	// Handle react select focus
	const onSelectInputFocus = (input) => {
		setFocusState((prevFocusState) => ({
			...prevFocusState,
			[input]: true
		}));
	};

	// Handle react select blur
	const onSelectInputBlur = (input, selectedObj) => {
		// Invalidate state set on focus

		setFocusState((prevFocusState) => ({
			...prevFocusState,
			[input]: false
		}));

		// Set new state for on Blur - depends if the field has a value or it is empty
		setErrorState((prevErrorState) => ({
			...prevErrorState,
			[input]: selectedObj.value.length === 0 && true
		}));
	};

	/* React select single value change */
	const onSingleValueSelectChange = (value, action) => {
		setErrorState((prevErrorState) => ({
			...prevErrorState,
			[action.name]: !value.value
		}));
		setInputValues({
			...inputValues,
			[action.name]: value
		});
	};

	return { onSelectInputFocus, onSelectInputBlur, onSingleValueSelectChange };
};

const reactIntlTelInputEventHandlers = ({
	setFocusState,
	setErrorState,
	setInputValues,
	inputValues,
	setSpecialErrorState
}) => {
	const onPhoneNumberFocus = () => {
		setFocusState((prevFocusState) => ({
			...prevFocusState,
			phoneNumber: true
		}));
	};

	const onPhoneNumberBlur = (_, value) => {
		setFocusState((prevFocusState) => ({
			...prevFocusState,
			phoneNumber: false
		}));
		setErrorState((prevErrorState) => ({
			...prevErrorState,
			phoneNumber: !value && true
		}));
	};

	const onPhoneNumberChange = (validationStatus, value) => {
		setInputValues({
			...inputValues,
			phoneNumber: value
		});
		// handle validations
		if (value) {
			// Validate if phoneNumber is valid
			setSpecialErrorState((prevSpecialErrorState) => ({
				...prevSpecialErrorState,
				phoneNumber: !validationStatus
			}));
			// Invalidate normal error state since there is some value
			setErrorState((prevErrorState) => ({
				...prevErrorState,
				phoneNumber: false
			}));
		} else {
			// Normal error state to trigger is required warning
			setErrorState((prevErrorState) => ({
				...prevErrorState,
				phoneNumber: true
			}));
			// Invalidate special error state since value is empty
			setSpecialErrorState((prevSpecialErrorState) => ({
				...prevSpecialErrorState,
				phoneNumber: false
			}));
		}
	};

	return { onPhoneNumberFocus, onPhoneNumberBlur, onPhoneNumberChange };
};

const useForm = ({
	initialState = {},
	initialCheckBoxState = {},
	initialOnFocusState = {},
	initialOnErrorState = {}
}) => {
	// Exact input values
	const [inputValues, setInputValues] = useState(initialState);
	// checkbox state
	const [checkBoxInputValues, setCheckBoxInputValues] = useState(initialCheckBoxState);
	// State to determine what to be shown onFocus
	const [focusState, setFocusState] = useState(initialOnFocusState);
	// State to determine what to be shown onChange and onBlur
	const [errorState, setErrorState] = useState(initialOnErrorState);
	// Controls fields with special validation. i.e email, password and phone
	const [specialErrorState, setSpecialErrorState] = useState(initialOnErrorState);

	/*
		---------------- Normal Inputs field events ------------------
	*/
	const { onFocus, onBlur, onChange, onCheckBoxChange } = normalInputEventHandlers({
		inputValues: inputValues,
		setInputValues: setInputValues,
		setFocusState: setFocusState,
		setErrorState: setErrorState,
		setSpecialErrorState: setSpecialErrorState,
		checkBoxInputValues: checkBoxInputValues,
		setCheckBoxInputValues: setCheckBoxInputValues,
		focusState: focusState,
		errorState: errorState
	});

	/*:
		---------------- React select Inputs field events ------------------
	*/

	const {
		onSelectInputFocus,
		onSelectInputBlur,
		onSingleValueSelectChange
	} = reactSelectInputEventHandlers({
		setFocusState: setFocusState,
		focusState: focusState,
		errorState: errorState,
		setErrorState: setErrorState,
		setInputValues: setInputValues,
		inputValues: inputValues
	});

	/*
		---------------- React Intl input field events ------------------
	*/

	const {
		onPhoneNumberFocus,
		onPhoneNumberBlur,
		onPhoneNumberChange
	} = reactIntlTelInputEventHandlers({
		setFocusState: setFocusState,
		focusState: focusState,
		setErrorState: setErrorState,
		errorState: errorState,
		setInputValues: setInputValues,
		inputValues: inputValues,
		setSpecialErrorState: setSpecialErrorState
	});

	/* -------------------- Date event handlers ------------------ */
	const { onDateChange } = dateEventHandlers(inputValues, setInputValues);

	// validate form field values before submit
	const onFinalSubmit = () => {
		validateAllFieldsBeforeSubmit(inputValues, setErrorState, setSpecialErrorState);
	};

	return {
		// Normal input events
		onFocus,
		onBlur,
		onChange,
		onCheckBoxChange,
		// React select input events
		onSingleValueSelectChange,
		onSelectInputFocus,
		onSelectInputBlur,
		// react intl input events
		onPhoneNumberFocus,
		onPhoneNumberBlur,
		onPhoneNumberChange,
		// react-date-picker input events
		onDateChange,
		// input values
		setCheckBoxInputValues,
		inputValues,
		checkBoxInputValues,
		// action states
		focusState,
		errorState,
		specialErrorState,
		// onSubmit
		onFinalSubmit
	};
};

export default useForm;
