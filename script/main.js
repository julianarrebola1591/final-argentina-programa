
/*----------------------------------------Carrousel----------------------------------------*/
let items = document.querySelectorAll('.slider .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let active = 3;

function loadShow()
{
        let stt = 0;
        items[active].style.transform = `none`;
        items[active].style.zIndex = 1;
        items[active].style.filter = 'none';
        items[active].style.opacity = 1;
        for(var i = active + 1; i < items.length; i++){
            stt++;
            items[i].style.transform = `translateX(${120*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(-1deg)`;
            items[i].style.zIndex = -stt;
            items[i].style.filter = 'blur(1px)';
            items[i].style.opacity = stt > 2 ? 0 : 0.6;
        }
        stt = 0;
        for(var i = active - 1; i >= 0; i--){
            stt++;
            items[i].style.transform = `translateX(${-120*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(1deg)`;
            items[i].style.zIndex = -stt;
            items[i].style.filter = 'blur(1px)';
            items[i].style.opacity = stt > 2 ? 0 : 0.6;
        }
}

loadShow();
next.onclick = function()
{
    active = active + 1 < items.length ? active + 1 : active;
    loadShow();
}
prev.onclick = function()
{
    active = active - 1 >= 0 ? active - 1 : active;
    loadShow();
}


/*----------------------------------------Validate----------------------------------------*/

$("#formDescuento").validate({
    rules: {
        nombre: {
            required: true,
            minlength: 3,
            maxlength: 30,
        },
        apellido: {
            required: true,
            minlength: 3,
            maxlength: 30
        },
        email: {
            required: true,
            email: true
        }
    }
});

$("#formContacto").validate({
    rules: {
        nombreContacto: {
            required: true,
            minlength: 3,
            maxlength: 30
        },
        apellidoContacto: {
            required: true,
            minlength: 3,
            maxlength: 30
        },
        emailContacto: {
            required: true,
            email: true
        },
        telefonoContacto: {
            required: true,
            number: true
        },
        mensaje: {
            required: true,
            minlength: 5,
            maxlength: 200
        }
    }
});

$("#btnEnviarDescuento").click(function()
{
    if($("#formDescuento").valid() == false)
    {
        return;
    }

    let nombre = $("#nombre").val();
    let apellido = $("#apellido").val();
    let email = $("#email").val();

    console.log(nombre);
    console.log(apellido);
    console.log(email);
    
});

$("#btnEnviarContacto").click(function()
{
    if($("#formContacto").valid() == false)
    {
        return;
    }

    let nombre = $("#nombreContacto").val();
    let apellido = $("#apellidoContacto").val();
    let email = $("#emailContacto").val();
    let telefono = $("#telefono").val();
    let mensaje = $("#mensaje").val();

    console.log(nombre);
    console.log(apellido);
    console.log(email);
    console.log(telefono);
    console.log(mensaje);
    
});