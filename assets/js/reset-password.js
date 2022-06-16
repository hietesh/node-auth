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

let resetForm = document.getElementById('reset-password');

resetForm.addEventListener('submit',function(e){
    e.preventDefault();
    let data = new FormData(resetForm);
    if(data.get('new_password')==data.get('password')){
        new Noty({
            type: 'error',
            layout: 'topRight',
            text: "You cannot update same password",
            timeout:2000
        }).show(); 
        return;
    }
    fetch('reset-password',{
        method:"POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(serialize(data)),
    })
    .then(response=>response.json())
    .then(json=>{
        if(json.success){
            new Noty({
                type: 'success',
                layout: 'topRight',
                text: json.success,
                timeout:2000
            }).show();
            resetForm.reset();     
        }
        else{
            new Noty({
                type: 'error',
                layout: 'topRight',
                text: json.error,
                timeout:2000
            }).show();     
        }
    })
    
})