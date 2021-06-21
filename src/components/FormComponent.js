import { Component } from 'react';
import FormErrorComponent from './FormErrorComponent';

class FormComponent extends Component{
    
    // Initial state
    constructor (props) {
        super(props);
        this.state = {
            email: '',
            password: '',

            // Added a property called formErrors which will be an object with the input field names as keys and any validation errors as their values. 
            // The initial value for each key is an empty string.
            formErrors: {email: '', password: ''},
            emailValid: false,
            passwordValid: false,
            formValid: false
        }
    }

    handleSubmit(e) {
        alert('A email address was submitted: ' + this.state.value);
        e.preventDefault();
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value}, () => { this.validateField(name, value) });
    }

    // validateField function takes fieldName as 'email' or 'password'
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;

        switch(fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' address is invalid!';
            break;
            case 'password':
                passwordValid = value.length >= 8;
                fieldValidationErrors.password = passwordValid ? '': ' is too short.';
            break;
            default: break;
        }
        this.setState(
            {
                formErrors: fieldValidationErrors,
                emailValid: emailValid,
                passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid});
    }

    // render component
    render(){
        return (
            <div className="container">
                <div className="row mt-5">
                    <div className="col-lg">
                        <form className="demoForm" onSubmit={this.handleSubmit}>
                            <h2>Sign up</h2>
                            <FormErrorComponent formErrors={this.state.formErrors}/>
                            <div className="form-group mt-4">
                                <label htmlFor="email">Email address</label>

                                {/* Set value from state and handle user input onChange */}
                                <input data-testid="email" type="email" className="form-control" name="email" placeholder="Email address" value={this.state.email} onChange={this.handleUserInput}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>

                                {/* Set value from state and handle user input onChange */}
                                <input data-testid="password" type="password" className="form-control" name="password" placeholder="Password" value={this.state.password} onChange={this.handleUserInput}/>
                            </div>
                            <button data-testid="button-disabled" type="submit" className="btn btn-primary" disabled={!this.state.formValid}>Sign up</button>
                        </form>
                    </div>
                </div>                
            </div>            
        )
    }
}

export default FormComponent;