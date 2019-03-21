// JavaScript Document


meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
laSemana = ["Domingo", "Lunes", "Martes", "Míercoles", "Jueves","Viernes", "Sábado"];//para el pie
diasSemana = ["lun", "mar", "míe", "jue", "vie", "sáb", "dom"];//para la cabecera

window.onload = function() {
	
	hoy = new Date();// fecha actualizada de hoy
	diaSemanaHoy = hoy.getDay(); // del 1 al 6 actualizada
	diaHoy = hoy.getDate(); // del 1 al 30 actualizada
	mesHoy = hoy.getMonth();// mes del 1 al 12 actualizada
	anio = hoy.getFullYear();// año actualizada
	
	tit = document.getElementById("titulos");
	ant = document.getElementById("anterior");
	pos = document.getElementById("posterior");
	f0 = document.getElementById("fila0");
	
	pie = document.getElementById("fechaActual");
	
	mesCalenda = mesHoy;
	anioCalenda = anio;
	
	cabecera();
	
	primeraLinea();
	escribirDias();
	
	pie.innerHTML += laSemana[diaSemanaHoy] + ", " + diaHoy + " de " + meses[mesHoy] + " de " + anio +
	"</br>" + "Día de tanda: " + dth + muestraBalsa;
	}
	
function cabecera() {
	
	tit.innerHTML = meses[mesCalenda] + " de " + anioCalenda;
	mesant = mesCalenda - 1;
	mespost = mesCalenda + 1;
	if (mesant < 0){mesant = 11};
	if (mespost > 11) {mespost = 0};
	ant.innerHTML = meses[mesant];
	pos.innerHTML = meses[mespost];
	
	}
	
function primeraLinea(){
	
	for (i = 0; i < 7; i++) {
		
		celda0 = f0.getElementsByTagName("th")[i];
		celda0.innerHTML = diasSemana[i];
		
	}
	
}

function escribirDias(){
	
	primeroMes = new Date(anioCalenda, mesCalenda, "1");//primer dia del mes que estamos
	primeraSemana = primeroMes.getDay();// dia de la semana siendo 0=domingo, 1=lunes, 2=martes, 3=miercoles, 4=jueves, 5=viernes, 6=sabado
	primeraSemana--;//le quitamos 1 para que empiece el lunes en 0
	
	if (primeraSemana == -1) {primeraSemana = 6};//si es domingo que es 0 y le quitamos 1 seria -1 lo pasamos a 6 entonces domingo=6 y lunes=0
	
	diaPrimerMes = primeroMes.getDate();// dia del mes
	primeraCelda = diaPrimerMes - primeraSemana; //del 1 al 31 - del 0 al 6
	empezar = primeroMes.setDate(primeraCelda); //nos devuelve la fecha en milisegundos que seria el 1 del mes y año que estamos
	
	diaMes = new Date(); // dia mes y año actual
	diaMes.setTime(empezar); //se cambia al 1 del mes y año que estamos
	
	diaTandaHoy = tandaDoce(); //variable con el dia de tanda del dia uno del mes actual

	for(i = 1; i < 7; i++){ //bucle para recorrer las filas de la tablan empezamos en la fila 1
		
		fila = document.getElementById("fila" + i);
		
		for(j = 0;j < 7; j++) { //bucle para recorrer dias de la semana de lunes a domingo
			
			miDia = diaMes.getDate();
			miMes = diaMes.getMonth();
			miAnio = diaMes.getFullYear();
			
			celda = fila.getElementsByTagName("td")[j]; // aqui seria la celda 0 osea la primera de la fila 1
			celda.innerHTML = miDia + "</br>" + "<a id= 'evento' href= '#'> <p id= 'tanda'>" + " Tanda: " +  diaTandaHoy + "</p> </a>"; //en la celda 0 de la fila 1 escribimos el primer dia del mes en el que estamos
			
			celda.style.backgroundColor = "#9bf5ff"; // color de fondo de las celdas por defecto
            celda.style.color = "#492736"; // color de texto por defecto
			
			if (j == 6) {  //si j es igual a 6 osea domingo le cambio color al texto
				celda.style.color = "#f11445";
            }
			
			if (miMes != mesCalenda) { //si mi mes es diferente del actual cambiamos color del texto
				celda.style.color="#a0babc";
				if (j == 6) {  //si j es igual a 6 osea domingo le cambio color al texto
					celda.style.color = "#ffc6b3";
				}
				diaTandaHoy--; // para que no sume y escriba la tanda en los dias de color claro
				celda.innerHTML = miDia;
			}
			
			if (miMes==mesHoy && miDia==diaHoy && miAnio==anio ) { //si estamos en la celda con el dia mes y año actual cambio color de fondo y resalto el texto
				celda.style.backgroundColor = "#f0b19e";
				celda.innerHTML = "<cite title='Fecha Actual'>" + miDia + "</cite>" + "</br>" + "<a id= 'evento' href= '#'> <p id= 'tanda'>" + " Tanda: " +  diaTandaHoy + "</p> </a>";
				
				dth = diaTandaHoy;
				muestraBalsa = "";
				switch (dth) {
					case 6:
					muestraBalsa = "</br>" + "Hoy se tapa la Salvadora (12-h,(del dia 6 por la mañana al dia 7 por la mañana))" + "</br>" +
					"Y la Nueva (12-h,(del dia 6 a las 09:00-h a las 21:00-h))";
					break;
					case 11:
					muestraBalsa = "</br>" + "Hoy se tapa la Salvadora (48-h,(del dia 11 por la tarde al dia 1 por la tarde))";
					break;
					case 12:
					muestraBalsa = "</br>" + "Hoy se tapa la Malagon (12-h,(del dia 12 a las 09:00-h a las 21:00-h))";
					break;
					default:
					muestraBalsa = "</br>" + "Hoy no se tapa ninguna balsa.";
				}
				
				if (miMes != mesCalenda) {
					celda.style.backgroundColor = "#f0b19e";
					celda.innerHTML = "<cite title='Fecha Actual'>" + miDia + "</cite>"
				}
			}
			
			miDia = miDia + 1; //le sumamos uno para que pase a la siguiente celda
			diaMes.setDate(miDia);
			
			diaTandaHoy++;
			
			if (diaTandaHoy == 13) {diaTandaHoy = 1;}
		}
	}
}

function mesAntes(){
	
	nuevoMes = new Date();
	primeroMes--;
	nuevoMes.setTime(primeroMes);
	mesCalenda = nuevoMes.getMonth();
	anioCalenda = nuevoMes.getFullYear();
	cabecera();
	escribirDias();
	
}

function mesDespues(){
	
	nuevoMes = new Date();
	tiempoUnix = primeroMes.getTime();
	tiempoUnix = tiempoUnix + (45 * 24 *60 * 60 * 1000);
	nuevoMes.setTime(tiempoUnix);
	mesCalenda = nuevoMes.getMonth();
	anioCalenda = nuevoMes.getFullYear();
	cabecera();
	escribirDias();
	
}

function actualizar() {
	
	mesCalenda =hoy.getMonth();
	anioCalenda = hoy.getFullYear();
	cabecera();
	escribirDias();
}

function tandaDoce(){
	
	nuevoMes = new Date(anioCalenda, 2, 1);
	
	primerDiaMesTanda = nuevoMes.getDate();
	primerMesTanda = nuevoMes.getMonth();
	primerAnioTanda = nuevoMes.getFullYear();
	
	tandaDeDoce = 0;
	
	while(primerMesTanda != mesCalenda){
		
		primerDiaMesTanda = nuevoMes.getDate();
		primerMesTanda = nuevoMes.getMonth();
		primerAnioTanda = nuevoMes.getFullYear();
		
	    primerDiaMesTanda = primerDiaMesTanda + 1;
		nuevoMes.setDate(primerDiaMesTanda);
		
		tandaDeDoce++;
		
		if (tandaDeDoce == 13){tandaDeDoce = 1;}
		
	}
	
	if (tandaDeDoce == 0) {
		tandaDeDoce = 1;
		return tandaDeDoce;
	} else {
		return tandaDeDoce;
	}
}





























