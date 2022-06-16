// arrange the form data in the json format
function serialize(data) {
	let obj = {};
	for (let [key, value] of data) {
		if (obj[key] !== undefined) {
			if (!Array.isArray(obj[key])) {
				obj[key] = [obj[key]];
			}
			obj[key].push(value);
		} else {
			obj[key] = value;
		}
	}
	return obj;
}

// verify the valid user and add it in the database
function verifyUser(){
    let signUpForm = document.getElementById('signup-form');
    signUpForm.addEventListener('submit',function(e){
        e.preventDefault();
        let data = new FormData(signUpForm);
        if(data.get('confirm_password')!=data.get('password')){
            new Noty({
                type: 'error',
                layout: 'topRight',
                text: "Password Don't Match",
                timeout:2000
            }).show();
        }
        else{
            fetch('sign-up',{
                method:"POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(serialize(data)),
            })
            .then(response=>response.json())
            .then(json=>{
                console.log(json)
                if(json.hasOwnProperty('error')){
                    new Noty({
                        type: 'error',
                        layout: 'topRight',
                        text: json.error,
                        timeout:2000
                    }).show();
                }
                else{
                    new Noty({
                        type: 'success',
                        layout: 'topRight',
                        text: 'Signed up Successfully, Redirecting to login page',
                        timeout:2000
                    }).show();
                    // redirecting login page after sign up success
                    setTimeout(()=>{window.location = json.redirectUrl},3000);
                }
            }
            )
            .catch((err)=>{console.log(err)});
        }
    });
}

// calling of the function
verifyUser();