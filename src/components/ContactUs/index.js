import { useState } from "react";
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength"
import isMobilePhone from "validator/lib/isMobilePhone"

const ContactUs = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [staff, setStaff] = useState('');
    const [bio, setBio] = useState('');
    const [phoneType, setPhoneType] = useState('');
    const [notifications, setNotifications] = useState(false);
    const [validationErrors, setValidationErrors] = useState('');

    const validate = () => {
        const validationErrors = [];

        if (!name) validationErrors.push('Please provide a name')
        if (!email) {
            validationErrors.push('Please provide an email');
        } else if (!isEmail(email)) {
            validationErrors.push('Please provide a valid email');
        }
        if (!phone) {
            validationErrors.push('Please provide a phone number')
        } else if (!isMobilePhone(phone, 'en-CA')) {
            validationErrors.push('Please provide a valid phone number')
        }
        if (!isLength(bio, { min: 0, max: 280 })) validationErrors.push('Bio must be 280 characters or less')
        if (phone && phoneType === '') validationErrors.push('Please provide a phone type')

        return validationErrors;
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const errors = validate();

        if (errors.length > 0) return setValidationErrors(errors);

        const registrationInformation = {
            name,
            email,
            phone,
            phoneType,
            staff,
            bio,
            notifications,
            submittedOn: new Date()
        };

        console.log(registrationInformation)
        setName('');
        setEmail('');
        setPhone('');
        setPhoneType('');
        setBio('');
        setStaff('');
        setNotifications(false);
        setValidationErrors([]);
    }

    return (
     <div>
         <h2>User Registration</h2>
         {validationErrors.length > 0 && (
             <div>
                The following errors were found:
                    <ul>
                        {validationErrors.map(error => <li key={error}>{error}</li>)}
                    </ul>
            </div>
         )}
         <form onSubmit={onSubmit}>
             <div>
                 <label htmlFor='name'>Name:</label>
                 <input 
                    id='name' 
                    type='text' 
                    onChange={(e) => setName(e.target.value)} 
                    value={name}
                />
             </div>
             <div>
                 <label htmlFor='email'>Email:</label>
                 <input 
                    id='email' 
                    type='text' 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
             </div>
             <div>
                 <label htmlFor='phone'>Phone:</label>
                 <input 
                    id='phone' 
                    type='text' 
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    placeholder='(___)-___ ____'
                />
                <select
                    name='phonetype'
                    onChange={e => setPhoneType(e.target.value)}
                    value={phoneType}
                    disabled={phone === ''}
                >
                    <option value='' disabled>Select a phone type...</option>
                    <option>Home</option>
                    <option>Work</option>
                    <option>Mobile</option>
                </select>
             </div>
             <div>
                 <label htmlFor='staff'>Staff:</label>
                 <input
                    id='instructor'
                    type='radio'
                    name='staff'
                    checked={staff === 'Instructor'}
                    onChange={(e) => setStaff('Instructor')}
                    value={staff} />
                    <label htmlFor='instructor'>Instructor</label>
                 <input
                    id='student'
                    type='radio'
                    name='staff'
                    checked={staff === 'Student'}
                    onChange={(e) => setStaff('Student')}
                    value={staff} />
                    <label htmlFor='student'>Student</label>
             </div>
             <div>
                 <label htmlFor='bio'>Bio:</label>
                 <textarea 
                    id='bio' 
                    name='bio' 
                    onChange={(e) => setBio(e.target.value)}
                    value={bio}
                />
             </div>
             <div>
                 <label htmlFor='notifications'>Sign Up for Email Notifications?</label>
                 <input 
                    type='checkbox'
                    checked={notifications}
                    id='notifications'
                    name='notifications'
                    onChange={(e) => setNotifications(!notifications)} />
             </div>
             <div>
                 <button>Submit</button>
             </div>
         </form>
     </div>
    );
}

export default ContactUs;