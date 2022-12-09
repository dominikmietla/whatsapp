
const getRecipientEmail = (users, userLoggedIn) => {
    const userLoggedInEmail = userLoggedIn?.email;
    let userName = '';

    users.forEach(user => {
        if(user !== userLoggedInEmail){
            userName = user;
        }  
    });

    return userName;

}
export default getRecipientEmail;