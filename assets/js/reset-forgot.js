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
const url = window.location.href;
const values = url.split('/');


let resetForm = document.getElementById('reset-forgot-form');
resetForm.addEventListener('submit',function(e){
    e.preventDefault();
    let data = new FormData(resetForm);
    if(data.get('new_password')!=data.get('confirm_password')){
        new Noty({
            type: 'error',
            layout: 'topRight',
            text: "Password Not Matched",
            timeout:2000
        }).show(); 
        return;
    }
    const datas = serialize(data);
    Object.assign(datas, {user_id:values[5]});
    fetch('/app/password-reset',{
        method:"POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(datas),
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