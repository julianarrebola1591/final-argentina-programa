
/*----------------------------------------Carrousel----------------------------------------*/
let items = document.querySelectorAll('.slider .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let active = 5;

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
            items[i].style.opacity = stt > 2 ? 0 : 0.4;
        }
        stt = 0;
        for(var i = active - 1; i >= 0; i--){
            stt++;
            items[i].style.transform = `translateX(${-120*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(1deg)`;
            items[i].style.zIndex = -stt;
            items[i].style.filter = 'blur(1px)';
            items[i].style.opacity = stt > 2 ? 0 : 0.4;
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
jQuery.validator.addMethod("exactlength", function(value, element, param) {
    return this.optional(element) || value.length == param;
   }, $.validator.format("Por favor ingrese {0} characteres."));

$("#form-tab-1").validate({
    rules: {
        usuario: {
            required: true,
            minlength: 3,
            maxlength: 30,
        },
        email: {
            required: true,
            email: true
        },
        contraseña: {
            required: true,
            minlength: 8,
            maxlength: 30
        }
    }
});

$("#form-tab-2").validate({
    rules: {
        nombre: {
            required: true,
            minlength: 3,
            maxlength: 30
        },

        apellido: {
            required: true,
            minlength: 3,
            maxlength: 30
        },
        telefono: {
            required: true,
            number: true
        },
        pais: {
            required: true,
            minlength: 3,
            maxlength: 30
        },
        provincia: {
            required: true,
            minlength: 3,
            maxlength: 30
        },
        ciudad: {
            required: true,
            minlength: 3,
            maxlength: 30
        },
        direccion: {
            required: true,
            minlength: 3,
            maxlength: 30
        },
        codigoPostal: {
            required: true,
            number: true
        }
    }
});

$("#form-tab-3").validate({
    rules: {
        cardCredit:{
            required: false
        },
        cardName:{
            required: true,
            minlength: 3,
            maxlength: 30,
        },
        cardNumber:{
            required: true,
            minlength: 16,
            maxlength: 16,
            number: true
        },
        mesVencimiento:{
            required: true,
            minlength: 2,
            maxlength: 2,
            number: true
        },
        añoVencimiento:{
            required: true,
            minlength: 2,
            maxlength: 2,
            number: true
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

    window.html2canvas = html2canvas
    window.jsPDF = window.jspdf.jsPDF

    html2canvas(document.querySelector("#formContacto"),{
        allowTaint:true,
        useCORS: true,
        scale: 1
    }).then(canvas => {
        var img = canvas.toDataURL("image/png");

        var doc = new jsPDF();
        doc.getFontSize(11);
        doc.addImage(img,'pdf',10,20,155,155);
        doc.save("Contacto.pdf");
    });
});

/*---------------------------------------- Botones Formulario Multipaso ----------------------------------------*/



const tabList = document.querySelectorAll('button[data-bs-toggle="tab"]')
var tab_actual = 0;

$(".btn-siguiente").click(function(){

    if(tab_actual == 2 && $("#form-tab-3").valid() == false){
        return;
    }
    if(tab_actual == 2){
        cargarResumen();
    }
    if(tab_actual == 1 && $("#form-tab-2").valid() == false){
        return;
    }
    if(tab_actual == 0 && $("#form-tab-1").valid() == false){
        return;
    }
    tab_actual++;
    let tab_siguiente = new bootstrap.Tab(tabList[tab_actual]);
    tab_siguiente.show();
});

$(".btn-anterior").click(function(){
    if(tab_actual == 3)
    {
        return;
    }
    tab_actual--;
    let tab_anterior = new bootstrap.Tab(tabList[tab_actual]);
    tab_anterior.show();
});

$("#btn-confirmar").click(function(event){
    event.preventDefault();
    email = $("#email").val();
    nombre = $("#nombre").val();
    apellido = $("#apellido").val();
    generatePDF(nombre, apellido, email);
});

$("#btn-cancelar").click(function(event){
    event.preventDefault();
});

/*---------------------------------------- Previsualizacion ----------------------------------------*/

function cargarResumen(){ 
    let usuario = $("#usuario").val();
    let email = $("#email").val();
    let contraseña = $("#contraseña").val();
    let nombre = $("#nombre").val();
    let apellido = $("#apellido").val();
    let telefono =$("#telefono").val();
    let pais = $("#pais").val();
    let provincia = $("#provincia").val();
    let ciudad = $("#ciudad").val();
    let direccion = $("#direccion").val();
    let codigoPostal = $("#codigoPostal").val();
    let tipoTarjeta = $("#cardCredit").val();
    let numeroTarjeta = $("#cardName").val();
    let nombreTarjeta = $("#cardNumber").val();
    let mesVencimiento = $("#mesVencimiento").val();
    let añoVencimiento = $("#añoVencimiento").val();
    let p = $("p.text-start");
    $(p).empty();
    $(p).append(`<h5>Datos de usuario</h5>`);
    $(p).append(`<strong>Usuario</strong>: ${usuario} <br>`);
    $(p).append(`<strong>Email</strong>: ${email} <br>`);
    $(p).append(`<strong>Contraseña</strong>: ${contraseña} <br><br>`);
    $(p).append(`<h5>Datos personales</h5>`);
    $(p).append(`<strong>Nombre</strong>: ${nombre} <br>`);
    $(p).append(`<strong>Apellido</strong>: ${apellido} <br>`);
    $(p).append(`<strong>Telefono</strong>: ${telefono} <br>`);
    $(p).append(`<strong>Pais</strong>: ${pais} <br>`);
    $(p).append(`<strong>Provincia</strong>: ${provincia} <br>`);
    $(p).append(`<strong>Ciudad</strong>: ${ciudad} <br>`);
    $(p).append(`<strong>Direccion</strong>: ${direccion} <br>`);
    $(p).append(`<strong>Codigo Postal</strong>: ${codigoPostal} <br><br>`);
    $(p).append(`<h5>Datos de la tarjeta</h5>`);
    $(p).append(`<strong>Tarjeta de credito</strong>: ${(tipoTarjeta)? "Si" : "No"} <br>`);
    $(p).append(`<strong>Nombre de Tarjeta</strong>: ${nombreTarjeta} <br>`);
    $(p).append(`<strong>Numero de Tarjeta</strong>: ${numeroTarjeta} <br>`);
    $(p).append(`<strong>Fecha de Vencimiento</strong>: ${mesVencimiento} / ${añoVencimiento}`);
};





