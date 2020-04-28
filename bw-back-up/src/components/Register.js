import React from 'react';
import UserRegister from './Client/ClientRegister';
import InstructorRegister from './Instructors/InstructorRegister';
import Div from './styled-comp.jsx'

function Register(props) {


    return (
        <Div>
            <header>
                <h3>Anywhere Fitness</h3>
            </header>
            <img src="/img/fitness-couple.jpg" className="registerImage" alt="Man holding woman up with his feet as she poses" />
            
        </Div>
    )
}

export default Register
