// Stateless functional component
const FormErrorComponent = ({formErrors}) => {
    return (
        <div className="formErrors">
            <div className="alert alert-danger" role="alert">
                {
                    Object.keys(formErrors).map((fieldName, i) => {
                        if(formErrors[fieldName].length > 0){
                            return(
                                <p><span key={i}>{fieldName} {formErrors[fieldName]}</span></p>
                            )
                        } else {
                            return '';
                        }
                    })
                }
            </div>
        </div>        
    );
}
 
export default FormErrorComponent;