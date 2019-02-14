package com.disruptivelogic.springboot.backend.apirest.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.disruptivelogic.springboot.backend.apirest.models.entity.Cliente;
import com.disruptivelogic.springboot.backend.apirest.models.services.IClienteService;

@CrossOrigin(origins= {"http://localhost:4200"})
@RestController
@RequestMapping("/api")
public class ClienteRestController  {

	//esta es una clase completa que implementa de esta interfaz (ClienteServiceImpl)
	// va a buscar el primer candidato, una clase concreta que implemnta esta interface y la va a inyectar
	@Autowired
	private IClienteService clienteService;
	
	@GetMapping("/clientes")
	public List<Cliente> index(){
		return clienteService.findAll();	
	}
	
	//retorna el cliente convertido en json lo llamamos show y va a tener el path varibale al pasarlo por id
	//@ResponseStatus(HttpStatus.OK) Redundante
	@GetMapping("/clientes/{id}")
	public Cliente show (@PathVariable Long id ) {
		return clienteService.findById(id);
	}

	//Nos envian el cliente en formato json dentro del cuerpo del request por eso se tiene que anotar con un 
	//requestbody para poder transformar esos datos para que spring los busque y los mape al objeto cliente
	@PostMapping("/clientes")
	@ResponseStatus(HttpStatus.CREATED) // Status de respuesta
	public Cliente create(@RequestBody Cliente cliente) {
		return clienteService.save(cliente);
	}
	
	// Se utiliza el put para actualizar un contenido
	@PutMapping("/clientes/{id}")
	@ResponseStatus(HttpStatus.CREATED)
	public Cliente update (@RequestBody Cliente cliente, @PathVariable Long id)
	{
		Cliente clienteActual = clienteService.findById(id);
		clienteActual.setApellido(cliente.getApellido());
		clienteActual.setNombre(cliente.getNombre());
		clienteActual.setEmail(cliente.getEmail());
		
		return clienteService.save(clienteActual);
	}
	
	// No  debulve ningun contenido usamos el not content
	@DeleteMapping("/clientes/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		clienteService.delete(id);
	}
	
}
