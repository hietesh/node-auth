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

let forgotForm = document.getElementById('forgot-password');

forgotForm.addEventListener('submit',function(e){
    e.preventDefault();
    document.getElementById('loading-icon').style.display='block';
    let data = new FormData(forgotForm);
    fetch('forgot-password',{
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
            setTimeout(()=>{window.location = json.redirectUrl},3000);    
        }
        else{
            new Noty({
                type: 'error',
                layout: 'topRight',
                text: json.error,
                timeout:2000
            }).show();     
        }
        document.getElementById('loading-icon').style.display='none';
    }).catch(err=> console.log(err));
});
