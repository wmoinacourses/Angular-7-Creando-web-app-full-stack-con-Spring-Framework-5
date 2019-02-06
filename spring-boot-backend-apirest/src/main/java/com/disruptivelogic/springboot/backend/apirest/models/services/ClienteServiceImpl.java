/**
 * 
 */
package com.disruptivelogic.springboot.backend.apirest.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.disruptivelogic.springboot.backend.apirest.models.dao.IClienteDao;
import com.disruptivelogic.springboot.backend.apirest.models.entity.Cliente;

/**
 * @author WMOINA
 *
 */
@Service
public class ClienteServiceImpl implements IClienteService {

	//inyeccion de depencia en spring
	@Autowired
	private IClienteDao clienteDao;
	
	@Transactional(readOnly=true)
	public List<Cliente> findAll() {
		return  (List<Cliente>) clienteDao.findAll();
	}
	
	@Transactional (readOnly= true)
	public Cliente findById(Long id) {
		return clienteDao.findById(id).orElse(null);
	}
	@Transactional
	public Cliente save(Cliente cliente) {
		
		return clienteDao.save(cliente);
	}
	
	@Transactional
	public void delete(Long id) {
		clienteDao.deleteById(id);		
	}

}
