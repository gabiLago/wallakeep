#  WallaKeep


![React Version](https://img.shields.io/badge/React-16.9.0-blue.svg)

## DESCRIPTION
### WallaKeep is an app for educatonal purposes.
### This is an exercice for the React module of the 8th Mobile Development Bootcamp from KeepCoding.

## NOTAS SOBRE LA PRÁCTICA

* **Nodepop**
	* La práctica que desarrollé de nodepop difiere en algunas aspectos de la que se debe de estar utilizando para la práctica.
	
	* Tras el módulo de DevOps sigo teniendo activo un AWS con mi versión nodepop. Para que sea todo más fácil, las llamadas a la API las hago contra él: [https://nodepop.lagoblasco.es](https://nodepop.lagoblasco.es)
	
	* Aún así mi versión está en la carpeta nodepop del proyecto
		
	* Estos son los ajustes que he tenido que hacer:
    	1. **Authentication**. La práctica de nodepop en pincipio requería autenticación con JWT. No he deshabilitado el módulo por lo que en la app de React he añadido una llamada previa para que se autentique en la API y recoja en el token que tiene que ir como parametro en todas las queries.
    	2. **Precio**. He añadido un select para utilizar las 3 opciones de filtrado por precio que tenía que permitir nodepop: mayor que, menor que y por rango.
    	3. **Llamadas**. Los párametros de las queries y la estructura de los response también he tenido que cambiarlos un poco.
	

* **HTML y css**
	* Por alguna razón a mí se me descuadraba todo bastante en el navegador, he cargado el css de bootstrap y he hecho algunos ajustes, espero que no te moleste ;-)
