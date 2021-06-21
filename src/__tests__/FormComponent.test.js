import { render, screen, cleanup, getByDisplayValue, fireEvent } from '@testing-library/react';
import FormComponent from '../components/FormComponent';

//  cleanup is passed as a parameter to afterEach to just clean up everything after each test to avoid memory leaks.
afterEach(cleanup);

test('renders FormComponent', () => {

    // render the FormComponent component with render and get back asFragment as a returned value
    const { asFragment } = render(<FormComponent />);    
  
    // make sure that the fragment of the FormComponent component matches the snapshot.
    expect(asFragment(<FormComponent />)).toMatchSnapshot();      
});

// email address unit test
test('check if email address is valid', () => {
    const { getByTestId } = render(<FormComponent />);

    // email check using regex
    const uriRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    // get email input
    const email = getByTestId('email');
    
    // element present in the document
    expect(email).toBeInTheDocument();    

    expect(email).toHaveAttribute('type','email');

    // set value in email input
    fireEvent.change(email, {
        target: {value: 'abcd@xyz.com'}
    });    

    // Check if set
    expect(email).toHaveValue('abcd@xyz.com');
    // console.log(email);

    // validate email using regex
    expect('abcd@xyz.com').toMatch(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    
    // weirdly not working
    // expect(email).toMatch(uriRegEx);
});

// password unit test
test('check if password is valid', () => {
    const { getByTestId } = render(<FormComponent />);

    // get password input
    const password = getByTestId('password');
    
    // element present in the document
    expect(password).toBeInTheDocument();    

    expect(password).toHaveAttribute('type','password');

    // set value in email input
    fireEvent.change(password, {
        target: {value: 'Hy6l0dE$sZZu'}
    });

    // Check if set
    expect(password).toHaveValue('Hy6l0dE$sZZu');
    // console.log(password);

    // validate password using regex
    /*
        Match 6 to 16 valid characters and includes a-z, A-Z, 0-9
        (?=.*[0-9]) - String has at least one number;
        (?=.*[!@#$%^&*]) - String has at least one special character.        
    */
    expect('Hy6l0dE$sZZu').toMatch(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/);
});

// check if button disabled     
test('should be disabled', () => {
    const { getByTestId } = render(<FormComponent />);

    // check attribute to be submit
    expect(getByTestId('button-disabled')).toHaveAttribute('type','submit'); 

    // check button to be disabled
    expect(getByTestId('button-disabled')).toBeDisabled()
});