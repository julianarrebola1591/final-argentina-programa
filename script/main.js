
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

$("#formDescuento").validate({
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
            minlength: 3,
            maxlength: 30,
        },
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
        telefono: {
            required: true,
            number: true
        },
        pais: {
            required: true,
            minlength: 3,
            maxlength: 30,
        },
        provincia: {
            required: true,
            minlength: 3,
            maxlength: 30,
        },
        ciudad: {
            required: true,
            minlength: 3,
            maxlength: 30,
        },
        direccion: {
            required: true,
            minlength: 3,
            maxlength: 30,
        },
        codigoPostal: {
            required: true,
            minlength: 3,
            maxlength: 30,
        },
        cardName: {
            required: true,
            minlength: 3,
            maxlength: 30,
        },
        cardNumber: {
            required: true,
            number: true
        },
        expirationMonth: {
            required: true,
            number: true,
            exactlength: 2
        },
        expirationYear: {
            required: true,
            number: true,
            exactlength: 2
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
    event.preventDefault();
    if($("#formDescuento").valid() == false)
    {
        return;
    }
    email = $("#email").val();
    nombre= $("#nombre").val();
    apellido= $("#apellido").val();

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

$("#btn-enviar").click(function(event){
    event.preventDefault();
    generatePDF(nombre, apellido, email);
    alert("Formulario enviado");
});

$("#btn-cancelar").click(function(event){
    event.preventDefault();
    alert("Formulario cancelado");
});

/*---------------------------------------- Previsualizacion ----------------------------------------*/

var usuario = $("#usuario");
var email;
var telefono =$("#telefono");
var contraseña = $("#contraseña");

var nombre;
var apellido;
var pais = $("#pais");
var provincia = $("#provincia");
var ciudad = $("#ciudad");
var direccion = $("#direccion");
var codigoPostal = $("#codigoPostal");

var tipoTarjeta = $("#tipoTarjeta");
var numeroTarjeta = $("#numeroTarjeta");
var nombreTarjeta = $("#nombreTarjeta");
var fechaVencimiento = $("#fechaVencimiento");





